#!/usr/bin/env bash
# PreToolUse hook (matcher: Read) — deny reading image files when the run
# executes on a TEXT-ONLY model (headless CI via OpenRouter, e.g. deepseek).
#
# Why: an image block in the conversation makes every subsequent API request
# fail ("There's an issue with the selected model …") and kills the whole
# run before the G7 report is written — observed on claude-implement runs
# #21 and #23 (2026-08-19), where the agent Read a screenshot PNG at the V5
# gate. The thinking-strip proxy also strips images at the API boundary
# (scripts/thinking-strip-proxy.mjs); this hook blocks the attempt up front
# and tells the model what to do instead.
#
# Model detection: the claude-implement workflow exports CLAUDE_MODEL on the
# claude step, and hook processes inherit it. Locally (interactive sessions
# on Anthropic vision models) CLAUDE_MODEL is unset → the hook allows all.
set -u

MODEL="${CLAUDE_MODEL:-}"
case "$MODEL" in
  "" | *claude* | *anthropic*) exit 0 ;; # vision-capable or local default
esac

INPUT="$(cat)"
FILE="$(printf '%s' "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null || true)"
[ -z "$FILE" ] && exit 0

case "$(printf '%s' "$FILE" | tr '[:upper:]' '[:lower:]')" in
  *.png | *.jpg | *.jpeg | *.gif | *.webp | *.bmp | *.ico | *.tif | *.tiff | *.avif | *.heic)
    echo "BLOCKED: this run executes on '$MODEL', a TEXT-ONLY model — an image block in the conversation makes every later API request fail and destroys the entire run. Never Read screenshots or images. For the V5 visual-parity gate use the stackshift-section SKILL.md 'No-vision path': build the delta table from getComputedStyle values in Playwright (mockup vs rendered page), which needs no vision." >&2
    exit 2
    ;;
esac
exit 0
