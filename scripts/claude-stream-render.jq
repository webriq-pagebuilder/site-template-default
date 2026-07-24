# Renders `claude -p --output-format stream-json` events as compact one-line
# progress entries for the GitHub Actions log (claude-implement.yml). One JSON
# event per line comes in (-R raw mode); non-JSON lines (stderr interleaved by
# 2>&1, CLI warnings) pass through unchanged. Every lookup is guarded — event
# shapes may drift across CLI versions, and an unknown event must render as
# nothing, never as an error (a dying renderer would EPIPE tee and take the
# claude process down with it; see the render_stream fallback in the workflow).
def trunc($n): tostring | gsub("\\s+"; " ") | if length > $n then .[0:$n] + "…" else . end;

(fromjson? // {type: "raw", line: .}) |

if .type == "raw" then .line
elif .type == "system" then
  # The CLI emits many system events (hooks, status); only init is worth a line.
  if .subtype == "init" then "[init] model=\(.model // "?") session=\(.session_id // "?")" else empty end
elif .type == "assistant" then
  (.message.content // [])[] |
  if .type == "text" then "[claude] \(.text | trunc(300))"
  elif .type == "tool_use" then "[tool] \(.name // "?")(\(.input // {} | tojson | trunc(220)))"
  else empty end
elif .type == "user" then
  (.message.content // []) |
  if type == "array" then
    .[] |
    if .type == "tool_result" then
      "[result\(if .is_error == true then " ERROR" else "" end)] \(.content // "" | trunc(220))"
    else empty end
  else empty end
elif .type == "result" then
  "[done] subtype=\(.subtype // "?") turns=\(.num_turns // "?") duration_ms=\(.duration_ms // "?")",
  "[final] \(.result // "(no result text)" | trunc(600))"
else empty end
