#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Local test harness for generate-variant.yml
# Run from the repo root: bash scripts/test-variant-workflow.sh
# ---------------------------------------------------------------------------
set -e

# ── 1. Customise these before running ──────────────────────────────────────

export PAGE_TITLE="Homepage"
export SCREENSHOT_URL=""   # optional public URL

# Sample variants — edit to match what you want to test.
# scenario "B" = no local folder yet (wraps @stackshift-ui npm package)
# scenario "A" = local folder already exists (add new variant file)
export MISSING_VARIANTS='[
  {
    "componentName": "header",
    "variantName": "header_f",
    "scenario": "B",
    "label": "Header",
    "fieldValues": {
      "title": "Welcome to Our Site",
      "subtitle": "We build the web",
      "ctas": [{ "label": "Get Started", "link": "/" }],
      "links": [{ "label": "About", "link": "/about" }]
    }
  }
]'

# ── 2. Prereq checks ────────────────────────────────────────────────────────

if [ -z "$ANTHROPIC_API_KEY" ]; then
  echo "ERROR: ANTHROPIC_API_KEY is not set. Export it before running."
  exit 1
fi

if ! command -v claude &> /dev/null; then
  echo "ERROR: claude CLI not found. Run: npm install -g @anthropic-ai/claude-code"
  exit 1
fi

echo ""
echo "=========================================="
echo "  Local variant workflow test"
echo "  Page : $PAGE_TITLE"
echo "=========================================="
echo ""

# ── 3. Build /tmp/variant-request.md ───────────────────────────────────────

echo "→ Step 1: Building /tmp/variant-request.md"

node -e "
const v = JSON.parse(process.env.MISSING_VARIANTS);
const title = process.env.PAGE_TITLE || 'New Page';
const shot = process.env.SCREENSHOT_URL || '';
const variantRows = v.map(x =>
  '- \`' + x.componentName + '/' + x.variantName + '\`' +
  ' | Scenario ' + x.scenario +
  ' | ' + (x.label || x.componentName) +
  ' | fields: ' + Object.keys(x.fieldValues || {}).slice(0, 8).join(', ')
).join('\n');
const lines = [
  '# Variant Generation Request',
  '',
  '**Page:** ' + title,
  shot ? '**Screenshot:** ' + shot : '',
  '',
  '## Variants',
  '',
  variantRows,
  '',
  '## Scenario guide',
  '',
  '- **Scenario A**: component already has a local folder — add variant file + update index.tsx router',
  '- **Scenario B**: no local folder yet — create full local folder wrapping the @stackshift-ui npm package, update components/list.tsx import',
  '',
  '## Implementation notes',
  '',
  '- Follow CUSTOM_VARIANT_WORKFLOW.md for exact file structure',
  '- Use @stackshift-ui primitives: Section, Container, Flex, Grid, GridItem, Heading, Text, Button, Link, Image',
  '- For forms, use Form + FormField from @stackshift-ui',
  '- Export default function at the TOP of each variant file; helpers go below',
].filter(Boolean).join('\n');
require('fs').writeFileSync('/tmp/variant-request.md', lines);
console.log('Written /tmp/variant-request.md');
"

cat /tmp/variant-request.md
echo ""

# ── 4. /task ────────────────────────────────────────────────────────────────

echo "→ Step 2: Running /task"
echo ""

claude -p "/task Generate custom component variants for the '$PAGE_TITLE' page. Read /tmp/variant-request.md first — it has the full variant list, scenarios, and field keys. Follow CUSTOM_VARIANT_WORKFLOW.md for file structure. Priority: HIGH." \
  --allowedTools "Read,Write,Edit,Bash,Glob,Grep" \
  --max-turns 20

# ── 5. Read back task ID ────────────────────────────────────────────────────

TASK_ID=$(node -e "
const fs = require('fs');
const tasks = fs.readFileSync('TASKS.md', 'utf8');
const rows = tasks.match(/^\| \d+ \|/gm) || [];
const ids = rows.map(r => parseInt(r.match(/\d+/)[0]));
console.log(ids.length ? Math.max(...ids) : 1);
")

echo ""
echo "→ Task ID: $TASK_ID"
echo ""

# ── 6. /implement ───────────────────────────────────────────────────────────

echo "→ Step 3: Running /implement $TASK_ID"
echo ""

claude -p "/implement $TASK_ID" \
  --allowedTools "Read,Write,Edit,Bash,Glob,Grep" \
  --max-turns 80

# ── 7. /ship (optional — comment out to skip PR creation) ──────────────────

echo ""
echo "→ Step 4: Running /ship $TASK_ID"
echo "   (comment out in this script to skip PR creation)"
echo ""

# GH_TOKEN and GITHUB_TOKEN are needed for gh pr create
# export GH_TOKEN=ghp_...
# export GITHUB_TOKEN=ghp_...

claude -p "/ship $TASK_ID" \
  --allowedTools "Bash,Read,Write" \
  --max-turns 30

echo ""
echo "=========================================="
echo "  Done!"
echo "=========================================="
