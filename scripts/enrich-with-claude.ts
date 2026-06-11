import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are an expert content analyst. Given a blog post or web page, extract structured metadata for an AI agent knowledge base.

Return ONLY a JSON object (no markdown, no explanation) with these optional fields:
- faq: array of {q, a} pairs (max 5, only if genuinely FAQ-worthy content exists)
- best_for: string[] (audiences or use-cases this content is ideal for)
- not_for: string[] (audiences or situations this content is NOT a good fit for)
- use_cases: string[] (specific actionable use-cases described in the content)

If a field is not applicable, omit it entirely. Do not invent information not in the source content.`;

export interface EnrichOptions {
  model?: string;
  wikiContext?: string;
}

export interface EnrichedFields {
  faq?: { q: string; a: string }[];
  best_for?: string[];
  not_for?: string[];
  use_cases?: string[];
}

export async function enrichFrontmatter(
  content: string,
  options: EnrichOptions = {},
): Promise<EnrichedFields> {
  const client = new Anthropic();
  const model = options.model ?? "claude-sonnet-4-6";

  let userPrompt = `Please analyze the following content and return enriched metadata as JSON:\n\n${content}`;
  if (options.wikiContext) {
    userPrompt += `\n\nRelated knowledge base context:\n${options.wikiContext}`;
  }

  let rawText = "";
  try {
    const response = await client.messages.create({
      model,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const block = response.content[0];
    if (block.type !== "text") {
      console.warn(
        "[enrich-with-claude] unexpected response block type:",
        block.type,
      );
      return {};
    }
    rawText = block.text.trim();

    // Strip code fences if present
    const jsonMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)```/);
    const jsonStr = jsonMatch ? jsonMatch[1].trim() : rawText;

    const parsed = JSON.parse(jsonStr);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      console.warn("[enrich-with-claude] LLM returned non-object JSON");
      return {};
    }

    const result: EnrichedFields = {};

    if (Array.isArray(parsed.faq) && parsed.faq.length > 0) {
      result.faq = parsed.faq;
    }
    if (Array.isArray(parsed.best_for) && parsed.best_for.length > 0) {
      result.best_for = parsed.best_for;
    }
    if (Array.isArray(parsed.not_for) && parsed.not_for.length > 0) {
      result.not_for = parsed.not_for;
    }
    if (Array.isArray(parsed.use_cases) && parsed.use_cases.length > 0) {
      result.use_cases = parsed.use_cases;
    }

    return result;
  } catch (err) {
    console.warn("[enrich-with-claude] failed to parse LLM response:", err);
    if (rawText)
      console.warn(
        "[enrich-with-claude] raw response was:",
        rawText.slice(0, 200),
      );
    return {};
  }
}
