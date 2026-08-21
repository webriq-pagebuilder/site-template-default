// Pass-through proxy for the OpenRouter Anthropic-compat endpoint that
// STRIPS thinking/redacted_thinking content blocks from responses, and
// image content blocks from requests.
//
// Why (responses): reasoning models (deepseek-v4-pro) return their answer as
// [thinking, text, redacted_thinking] — the message ENDS on a reasoning
// block, and `claude -p`'s final result assembly comes out empty (the
// text block is there, but not last). OpenRouter's Anthropic-compat
// endpoint ignores the request-side {"reasoning":{...}} params (verified
// 2026-07-13), so the response is the only place to fix it. With the
// reasoning blocks removed, the assistant message is pure text and the
// CLI prints it — and no unsigned thinking blocks get replayed on
// multi-turn requests either.
//
// Why (requests): the same models are TEXT-ONLY. The moment an image block
// enters the conversation (the agent Read a screenshot PNG at the V5 gate —
// runs 32226310025 / 32265786479, 2026-08-19), OpenRouter has no endpoint
// that accepts it, every subsequent request fails, and `claude -p` dies with
// "There's an issue with the selected model" minutes before writing the G7
// report. A repo hook (.claude/hooks/deny-image-read.sh) blocks the Read
// up front; this proxy is the API-boundary belt: any image block that still
// reaches an outgoing request is replaced with a text placeholder so the
// request survives and the model is told to use the no-vision path.
// Default ON; set PROXY_STRIP_IMAGES=0 only if this proxy is ever pointed
// at a vision-capable model.
import http from "node:http";
const UPSTREAM = process.env.PROXY_UPSTREAM || "https://openrouter.ai/api";
const PORT = Number(process.env.PROXY_PORT || 8787);
const HOP = new Set([
  "host",
  "connection",
  "content-length",
  "transfer-encoding",
  "keep-alive",
  "expect",
  "accept-encoding",
]);
const STRIP = new Set(["thinking", "redacted_thinking"]);
const STRIP_IMAGES = process.env.PROXY_STRIP_IMAGES !== "0";
const IMAGE_PLACEHOLDER_TEXT =
  "[image stripped by proxy: this model is text-only — the API rejects image blocks, so the image was NOT seen. Never read images/screenshots on this model; verify visuals with the no-vision computed-style path (SKILL.md V5) instead.]";

// Replace every image block in an outgoing /messages request with a text
// placeholder — top-level user content and tool_result content arrays (the
// shape a Read of a PNG produces). Returns the original buffer untouched
// when nothing was stripped or the body isn't JSON.
function stripImagesFromRequestBody(bodyBuf) {
  let parsed;
  try {
    parsed = JSON.parse(bodyBuf.toString("utf8"));
  } catch {
    return { body: bodyBuf, stripped: 0 };
  }
  let stripped = 0;
  const placeholder = () => {
    stripped++;
    return { type: "text", text: IMAGE_PLACEHOLDER_TEXT };
  };
  for (const msg of Array.isArray(parsed?.messages) ? parsed.messages : []) {
    if (!Array.isArray(msg?.content)) continue;
    msg.content = msg.content.map((b) => {
      if (b?.type === "image") return placeholder();
      if (b?.type === "tool_result" && Array.isArray(b?.content)) {
        b.content = b.content.map((ib) =>
          ib?.type === "image" ? placeholder() : ib,
        );
      }
      return b;
    });
  }
  if (!stripped) return { body: bodyBuf, stripped: 0 };
  return { body: Buffer.from(JSON.stringify(parsed), "utf8"), stripped };
}

function filterJsonMessage(obj) {
  if (Array.isArray(obj?.content)) {
    obj.content = obj.content.filter((b) => !STRIP.has(b?.type));
  }
  return obj;
}

// Incremental SSE transform: drops content_block_start/delta/stop events for
// thinking blocks and reindexes the kept blocks so indices stay contiguous.
function createSseFilter(write) {
  let buf = "";
  const keptIndex = new Map();
  const droppedIndex = new Set();
  let nextIndex = 0;
  // Per-response forensics, logged by the server after the stream ends: the
  // status line alone can't answer the one question that matters for the
  // empty-final-result dud (runs 29309962889, 29504803257) — did the model
  // return any usable NON-reasoning content? kept=[none] + stripped>0 on a
  // 200 stream is that dud, caught in proxy.log instead of by archaeology.
  const stats = { kept: {}, stripped: 0, stopReason: null, streamError: null };

  function emit(lines, obj) {
    const out = lines
      .map((l) => (l.startsWith("data:") ? "data: " + JSON.stringify(obj) : l))
      .join("\n");
    write(out + "\n\n");
  }

  function processEvent(raw) {
    if (!raw.trim()) return;
    const lines = raw.split("\n");
    const dataLine = lines.find((l) => l.startsWith("data:"));
    if (!dataLine) {
      write(raw + "\n\n");
      return;
    }
    let obj;
    try {
      obj = JSON.parse(dataLine.slice(5).trim());
    } catch {
      write(raw + "\n\n");
      return;
    }

    if (obj.type === "message_delta")
      stats.stopReason = obj.delta?.stop_reason ?? stats.stopReason;
    if (obj.type === "error")
      stats.streamError = obj.error?.message || "unknown";

    if (obj.type === "content_block_start") {
      if (STRIP.has(obj.content_block?.type)) {
        droppedIndex.add(obj.index);
        stats.stripped++;
        return;
      }
      const kind = obj.content_block?.type || "?";
      stats.kept[kind] = (stats.kept[kind] || 0) + 1;
      keptIndex.set(obj.index, nextIndex++);
      obj.index = keptIndex.get(obj.index);
      emit(lines, obj);
      return;
    }
    if (
      obj.type === "content_block_delta" ||
      obj.type === "content_block_stop"
    ) {
      if (droppedIndex.has(obj.index)) return;
      if (keptIndex.has(obj.index)) obj.index = keptIndex.get(obj.index);
      emit(lines, obj);
      return;
    }
    write(raw + "\n\n");
  }

  return {
    push(text) {
      buf += text;
      let sep;
      while ((sep = buf.indexOf("\n\n")) !== -1) {
        processEvent(buf.slice(0, sep));
        buf = buf.slice(sep + 2);
      }
    },
    flush() {
      if (buf.trim()) processEvent(buf);
      buf = "";
    },
    stats: () => stats,
  };
}

function statsLine({ kept, stripped, stopReason, streamError }) {
  const keptStr =
    Object.entries(kept)
      .map(([t, n]) => `${t}:${n}`)
      .join(",") || "none";
  return (
    `  ↳ blocks kept=[${keptStr}] stripped=${stripped} stop_reason=${stopReason ?? "?"}` +
    (streamError ? ` STREAM-ERROR: ${streamError}` : "")
  );
}

http
  .createServer(async (req, res) => {
    try {
      const chunks = [];
      for await (const c of req) chunks.push(c);
      let body = Buffer.concat(chunks);

      // Response filtering targets .../messages only; request-side image
      // stripping also covers .../messages/count_tokens (same rejection).
      const urlPath = req.url.split("?")[0];
      const isMessages = urlPath.endsWith("/messages");
      if (
        STRIP_IMAGES &&
        urlPath.includes("/messages") &&
        !["GET", "HEAD"].includes(req.method)
      ) {
        const filtered = stripImagesFromRequestBody(body);
        if (filtered.stripped) {
          body = filtered.body;
          console.log(
            `  ↳ request: replaced ${filtered.stripped} image block(s) with a text placeholder (text-only model)`,
          );
        }
      }

      const headers = {};
      for (const [k, v] of Object.entries(req.headers)) {
        if (!HOP.has(k.toLowerCase())) headers[k] = v;
      }
      const upstream = await fetch(UPSTREAM + req.url, {
        method: req.method,
        headers,
        body: ["GET", "HEAD"].includes(req.method) ? undefined : body,
      });

      const respHeaders = {};
      upstream.headers.forEach((v, k) => {
        if (!HOP.has(k) && k !== "content-encoding") respHeaders[k] = v;
      });
      const contentType = upstream.headers.get("content-type") || "";
      console.log(
        `${req.method} ${req.url} → ${upstream.status} (${contentType.split(";")[0]})`,
      );

      if (!isMessages || upstream.status !== 200) {
        res.writeHead(upstream.status, respHeaders);
        if (upstream.body)
          for await (const chunk of upstream.body) res.write(chunk);
        res.end();
        return;
      }

      if (contentType.includes("text/event-stream")) {
        res.writeHead(upstream.status, respHeaders);
        const decoder = new TextDecoder();
        const filter = createSseFilter((s) => res.write(s));
        for await (const chunk of upstream.body)
          filter.push(decoder.decode(chunk, { stream: true }));
        filter.push(decoder.decode());
        filter.flush();
        res.end();
        console.log(statsLine(filter.stats()));
        return;
      }

      // Non-streaming JSON message response
      const text = await upstream.text();
      let out = text;
      try {
        const parsed = JSON.parse(text);
        const before = Array.isArray(parsed?.content)
          ? parsed.content.length
          : 0;
        filterJsonMessage(parsed);
        const after = Array.isArray(parsed?.content)
          ? parsed.content.length
          : 0;
        const kept = {};
        for (const b of parsed?.content || [])
          kept[b?.type || "?"] = (kept[b?.type || "?"] || 0) + 1;
        console.log(
          statsLine({
            kept,
            stripped: before - after,
            stopReason: parsed?.stop_reason ?? null,
            streamError: null,
          }),
        );
        out = JSON.stringify(parsed);
      } catch {}
      res.writeHead(upstream.status, respHeaders);
      res.end(out);
    } catch (err) {
      console.error("proxy error:", err.message);
      res.writeHead(502, { "content-type": "application/json" });
      res.end(
        JSON.stringify({ error: { message: "proxy error: " + err.message } }),
      );
    }
  })
  .listen(PORT, () =>
    console.log(`thinking-strip proxy listening on :${PORT}`),
  );
