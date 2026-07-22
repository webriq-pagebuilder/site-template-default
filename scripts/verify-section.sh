#!/usr/bin/env bash
# verify-section.sh — mechanical verification gates for stackshift-section builds.
# Verdicts come from code, not model claims. Exit 0 = all PASS, non-zero = at least one FAIL.
#
# Usage:
#   scripts/verify-section.sh section <name> <folder> <sectionDocId> [variant_key] [--expect k=v ...]
#       W1  <name> registered in components/list.tsx
#       V1  no tsc errors in components/sections/<folder>/
#       V4b variant_key registered in the section router + every destructured prop is mapped
#       V6  section doc exists and variants holds populated fields
#       V6b every image-… ref resolves in THIS dataset; no foreign cdn.sanity.io URLs stored
#       E1  --expect enforcement (content-completeness contract from the A0/epic inventory):
#             --expect fields=6          populated top-level variants fields >= 6
#             --expect images=3          in-dataset images (refs + project CDN urls) == 3
#             --expect array.plans=3     variants.plans holds exactly 3 items
#           A section whose mockup shows N cards/images MUST be verified with these — V6 alone
#           passes on any non-empty doc and cannot see dropped cards.
#   scripts/verify-section.sh page <pageIdOrSlug> <expectedTypeCSV>
#       P1  page found; every sections[] item has a unique _key and a section _type
#       P2  sections[]->_type order EXACTLY matches expectedTypeCSV (mockup render order)
#   scripts/verify-section.sh schema
#       S1  no duplicate field names in any custom section schema (field factories have FIXED
#           names — calling title() twice in one schema = Studio "duplicate field" error)
#   scripts/verify-section.sh styles [<folder> ...]
#       T1  no phantom utility classes: semantic-looking class names (…-brand, …-card, …-foreground,
#           …-heading, …-muted, …-subtle, font-heading, bg-gradient-*) must be DEFINED in
#           tailwind.config.ts or styles/*.css; off-scale spacing (py-22) flagged. Unknown classes
#           silently render as NOTHING — the #1 "styling missing" failure.
#
# Requires: bash, curl, python3. Reads NEXT_PUBLIC_SANITY_* from env or .env.local/.env.development.

set -u
cd "$(dirname "$0")/.." || exit 2

# --- env ---------------------------------------------------------------------
set -a
. ./.env.local 2>/dev/null
. ./.env.development 2>/dev/null
set +a
: "${NEXT_PUBLIC_SANITY_PROJECT_ID:?missing NEXT_PUBLIC_SANITY_PROJECT_ID}"
: "${NEXT_PUBLIC_SANITY_DATASET:?missing NEXT_PUBLIC_SANITY_DATASET}"
: "${NEXT_PUBLIC_SANITY_API_READ_TOKEN:?missing NEXT_PUBLIC_SANITY_API_READ_TOKEN}"

API="https://$NEXT_PUBLIC_SANITY_PROJECT_ID.api.sanity.io/v2022-03-13/data/query/$NEXT_PUBLIC_SANITY_DATASET"
FAILS=0
pass() { echo "PASS  $1"; }
fail() { echo "FAIL  $1"; FAILS=$((FAILS + 1)); }

groq() { # groq '<query>' -> raw JSON result on stdout
  curl -s -G "$API" -H "Authorization: Bearer $NEXT_PUBLIC_SANITY_API_READ_TOKEN" \
    --data-urlencode "query=$1" | python3 -c 'import sys,json; json.dump(json.load(sys.stdin).get("result"), sys.stdout)'
}

mode="${1:-}"

# ==============================================================================
if [ "$mode" = "section" ]; then
  name="${2:?usage: verify-section.sh section <name> <folder> <sectionDocId> [variant_key] [--expect k=v ...]}"
  folder="${3:?missing <folder>}"
  docid="${4:?missing <sectionDocId>}"
  variant=""
  EXPECTS=""
  shift 4
  while [ $# -gt 0 ]; do
    case "$1" in
      --expect) EXPECTS="$EXPECTS ${2:?--expect needs k=v}"; shift 2 ;;
      *) variant="$1"; shift ;;
    esac
  done

  # W1 — registered in list.tsx
  if grep -qE "(^|[^a-zA-Z0-9_])${name}:" components/list.tsx; then
    pass "W1 list.tsx registers '${name}'"
  else
    fail "W1 '${name}:' not found in components/list.tsx — section will never render"
  fi

  # V1 — tsc errors touching this folder
  tsc_out=$(npx tsc --noEmit 2>&1 | grep "components/sections/${folder}/" || true)
  if [ -z "$tsc_out" ]; then
    pass "V1 tsc: 0 errors in components/sections/${folder}/"
  else
    fail "V1 tsc errors in components/sections/${folder}/:"$'\n'"$tsc_out"
  fi

  # V4b — variant registered + prop coverage
  router="components/sections/${folder}/index.tsx"
  if [ -n "$variant" ]; then
    vfile="components/sections/${folder}/${variant}.tsx"
    if [ ! -f "$router" ]; then
      fail "V4b router $router does not exist"
    elif ! grep -qE "${variant}\s*:" "$router"; then
      fail "V4b '${variant}' NOT registered in $router — variant file is dead code"
    else
      pass "V4b '${variant}' registered in $router"
      if [ -f "$vfile" ]; then
        missing=$(python3 - "$vfile" "$router" <<'PY'
import re, sys
vsrc, rsrc = open(sys.argv[1]).read(), open(sys.argv[2]).read()
# the DEFAULT-EXPORTED component's props are the contract — helper components don't count
fn = re.search(r'export default function\s+\w+\s*\(\s*\{([^}]*)\}', vsrc, re.S)
if not fn:
    m = re.search(r'export default (\w+)', vsrc)
    if m:
        fn = re.search(r'function\s+' + m.group(1) + r'\s*\(\s*\{([^}]*)\}', vsrc, re.S)
dest = [p.split(':')[0].split('=')[0].strip() for p in fn.group(1).split(',') if p.strip()] if fn else []
pm = re.search(r'const props\s*=\s*\{(.*?)\n\s*\};', rsrc, re.S)
mapped = set(re.findall(r'^\s*(\w+)\s*:', pm.group(1), re.M)) if pm else set()
# props destructured directly from a spread of data are fine only if mapped
print(' '.join(p for p in dest if p not in mapped))
PY
)
        if [ -z "$missing" ]; then
          pass "V4b all destructured props are mapped in the router"
        else
          fail "V4b unmapped props (silently undefined at render): $missing"
        fi
      fi
    fi
  fi

  # V6 — doc exists with populated variants
  doc=$(groq "*[_id==\"${docid}\"][0]")
  if [ "$doc" = "null" ] || [ -z "$doc" ]; then
    fail "V6 doc '${docid}' not found in dataset"
  else
    fields=$(echo "$doc" | python3 -c '
import sys, json
d = json.load(sys.stdin) or {}
v = d.get("variants") or {}
pop = [k for k, x in v.items() if x not in (None, "", [], {})]
print(len(pop), ",".join(sorted(pop)))
')
    count="${fields%% *}"
    if [ "${count:-0}" -gt 0 ]; then
      pass "V6 doc '${docid}' holds ${fields}"
    else
      fail "V6 doc '${docid}' has EMPTY variants — content not migrated"
    fi

    # V6b — image refs resolve in-dataset; no foreign CDN URLs
    echo "$doc" > /tmp/verify-section-doc.json
    v6b=$(python3 - "$NEXT_PUBLIC_SANITY_PROJECT_ID" <<'PY'
import json, re, sys, urllib.request, urllib.parse, os
pid = sys.argv[1]
raw = open('/tmp/verify-section-doc.json').read()
refs = sorted(set(re.findall(r'"image-[A-Za-z0-9]+-\d+x\d+-\w+"', raw)))
refs = [r.strip('"') for r in refs]
foreign = sorted(set(u for u in re.findall(r'https://cdn\.sanity\.io/(?:images|files)/([a-z0-9]+)/', raw) if u != pid))
bad = 0
if refs:
    ds, tok = os.environ['NEXT_PUBLIC_SANITY_DATASET'], os.environ['NEXT_PUBLIC_SANITY_API_READ_TOKEN']
    q = urllib.parse.urlencode({'query': '*[_type=="sanity.imageAsset" && _id in [%s]]._id' % ','.join(f'"{r}"' for r in refs)})
    req = urllib.request.Request(f"https://{pid}.api.sanity.io/v2022-03-13/data/query/{ds}?{q}",
                                 headers={'Authorization': f'Bearer {tok}'})
    found = set(json.load(urllib.request.urlopen(req))['result'] or [])
    missing = [r for r in refs if r not in found]
    if missing:
        print(f"FAIL {len(missing)}/{len(refs)} image refs do NOT resolve in this dataset: {missing}"); bad = 1
    else:
        print(f"PASS {len(refs)}/{len(refs)} image refs resolve in this dataset" if refs else "")
else:
    print("PASS 0 image refs stored (verify against the A0 inventory that 0 is expected!)")
if foreign:
    print(f"FAIL foreign-project cdn.sanity.io URLs stored (projects: {foreign}) — resolve to nothing on this site"); bad = 1
sys.exit(bad)
PY
)
    v6b_rc=$?
    echo "$v6b" | sed 's/^PASS/PASS  V6b/; s/^FAIL/FAIL  V6b/'
    [ $v6b_rc -ne 0 ] && FAILS=$((FAILS + 1))

    # E1 — expected-content contract (counts come from the mockup inventory)
    if [ -n "$EXPECTS" ]; then
      e1=$(EXPECTS="$EXPECTS" PID="$NEXT_PUBLIC_SANITY_PROJECT_ID" python3 <<'PY'
import json, os, re, sys
doc = json.load(open('/tmp/verify-section-doc.json')) or {}
raw = json.dumps(doc)
v = doc.get('variants') or {}
pid = os.environ['PID']
bad = 0
for spec in os.environ['EXPECTS'].split():
    key, _, want = spec.partition('=')
    want = int(want)
    if key == 'fields':
        got = len([k for k, x in v.items() if x not in (None, "", [], {})])
        ok = got >= want
        print(f"{'PASS' if ok else 'FAIL'}  E1 fields: {got} populated (need >= {want})")
    elif key == 'images':
        refs = set(re.findall(r'"image-[A-Za-z0-9]+-\d+x\d+-\w+"', raw))
        urls = set(re.findall(rf'https://cdn\.sanity\.io/images/{pid}/[^"\\\s]+', raw))
        got = len(refs) + len(urls)
        ok = got == want
        print(f"{'PASS' if ok else 'FAIL'}  E1 images: {got} in-dataset ({len(refs)} refs + {len(urls)} urls; need == {want})")
    elif key.startswith('array.'):
        field = key.split('.', 1)[1]
        arr = v.get(field)
        got = len(arr) if isinstance(arr, list) else 0
        ok = got == want
        print(f"{'PASS' if ok else 'FAIL'}  E1 array.{field}: {got} items (need == {want})")
    else:
        print(f"FAIL  E1 unknown --expect key '{key}'"); ok = False
    if not ok: bad = 1
sys.exit(bad)
PY
)
      e1_rc=$?
      echo "$e1"
      [ $e1_rc -ne 0 ] && FAILS=$((FAILS + 1))
    fi
  fi

# ==============================================================================
elif [ "$mode" = "page" ]; then
  pageid="${2:?usage: verify-section.sh page <pageIdOrSlug> <expectedTypeCSV>}"
  expected="${3:?missing expectedTypeCSV (mockup render order)}"

  pg=$(groq "*[_type==\"page\" && (_id==\"${pageid}\" || slug.current==\"${pageid}\")][0]{_id, \"items\": sections[]{_key,_type}, \"order\": sections[]->_type}")
  if [ "$pg" = "null" ] || [ -z "$pg" ]; then
    fail "P1 page '${pageid}' not found"
  else
    echo "$pg" > /tmp/verify-page.json
    python3 - "$expected" <<'PY'
import json, sys
pg = json.load(open('/tmp/verify-page.json'))
items, order = pg.get('items') or [], [t for t in (pg.get('order') or [])]
bad = 0
keys = [i.get('_key') for i in items]
if any(not k for k in keys) or len(set(keys)) != len(keys):
    print(f"FAIL  P1 sections[] _keys missing/duplicated: {keys}"); bad = 1
elif any(i.get('_type') in (None, 'reference') for i in items):
    print("FAIL  P1 a sections[] item has _type 'reference'/missing — must be the section name"); bad = 1
else:
    print(f"PASS  P1 {len(items)} sections, unique _keys, section-name _types")
exp = [t.strip() for t in sys.argv[1].split(',') if t.strip()]
if order == exp:
    print(f"PASS  P2 section order matches mockup ({len(order)} sections)")
else:
    print(f"FAIL  P2 order mismatch\n      expected: {exp}\n      actual:   {order}"); bad = 1
sys.exit(bad)
PY
    [ $? -ne 0 ] && FAILS=$((FAILS + 1))
  fi

elif [ "$mode" = "schema" ]; then
  out=$(python3 <<'PY'
import glob, re, sys

# Factories in common/fields.ts have FIXED field names (the call's identifier = the field name),
# EXCEPT those whose first argument is an explicit name string (e.g. arrayOfText("modelOptions", …)).
bad = 0
for f in sorted(glob.glob('schemas/custom/sanity-plugin-schema-default/src/schemas/sections/*/schema/index.ts')):
    src = open(f).read()
    m = re.search(r'export const \w+Schema\s*=\s*\[(.*?)\n\];', src, re.S)
    if not m:
        m = re.search(r'export const \w+Schema\s*=\s*\[(.*?)\];', src, re.S)
    if not m: continue
    body = m.group(1)
    # Depth-aware scan: only TOP-LEVEL fields count (nested object fields inside of:[{fields:[…]}]
    # live in their own namespace and may legally repeat names like "title").
    names, depth, i = [], 0, 0
    for tok in re.finditer(r'[\[\]{}()]|(\w+)\(\s*("[\w-]+")?|name:\s*"(\w+)"', body):
        t = tok.group(0)
        if t in '[{(': depth += 1; continue
        if t in ']})': depth -= 1; continue
        if tok.group(1) is not None and depth == 0:          # factory call at array top level
            names.append(tok.group(2).strip('"') if tok.group(2) else tok.group(1))
            depth += 1                                        # its own open paren was consumed
        elif tok.group(3) is not None and depth == 1:        # inline field object's own name
            names.append(tok.group(3))
    dups = sorted({n for n in names if names.count(n) > 1})
    if dups:
        print(f"FAIL  S1 {f}: duplicate field name(s) {dups} — Studio will reject this schema")
        bad = 1
    else:
        print(f"PASS  S1 {f.split('/sections/')[1].split('/')[0]}: {len(names)} unique fields")
sys.exit(bad)
PY
)
  rc=$?
  echo "$out"
  [ $rc -ne 0 ] && FAILS=$((FAILS + 1))

elif [ "$mode" = "styles" ]; then
  shift 2>/dev/null
  out=$(python3 - "$@" <<'PY'
import glob, re, sys

folders = sys.argv[1:]
files = []
for fo in (folders or ['*']):
    files += glob.glob(f'components/sections/{fo}/*.tsx')

defined = open('tailwind.config.ts').read()
for css in glob.glob('styles/*.css'):
    defined += open(css).read()

# Tailwind default spacing scale (numeric utilities outside it silently no-op)
SCALE = {'0','0.5','1','1.5','2','2.5','3','3.5','4','5','6','7','8','9','10','11','12','14','16',
         '20','24','28','32','36','40','44','48','52','56','60','64','72','80','96','px'}
SEMANTIC = re.compile(r'\b((?:bg|text|border|font|rounded|shadow|ring)-(?:gradient-)?'
                      r'(?:[\w-]*(?:brand|card|foreground|heading|muted|subtle|strong|accent|navy|mfg|eyebrow)[\w-]*)'
                      r'|eyebrow)\b')
SPACING = re.compile(r'\b((?:p|m|gap|space)(?:[xytblr])?-(\d+(?:\.\d+)?))\b')

bad = 0
for f in sorted(set(files)):
    src = open(f).read()
    classes = ' '.join(re.findall(r'class(?:Name)?=(?:"([^"]*)"|\{`([^`]*)`\})', src) and
                       [a or b for a, b in re.findall(r'class(?:Name)?=(?:"([^"]*)"|\{`([^`]*)`\})', src)])
    problems = []
    for cls in set(SEMANTIC.findall(classes)):
        # defined if the class name or its root custom word appears in config/css
        root = cls.split('bg-')[-1].split('text-')[-1].split('border-')[-1].split('font-')[-1]
        if cls not in defined and root not in defined:
            problems.append(f"undefined class '{cls}'")
    for full, num in set(SPACING.findall(classes)):
        if num not in SCALE:
            problems.append(f"off-scale spacing '{full}' (not in Tailwind default scale)")
    # T2 — mockup-style lucide tags never render in Next (no global lucide script runs)
    if 'data-lucide' in src:
        problems.append("T2 uses <i data-lucide> (renders NOTHING in Next — import from lucide-react)")
    # T3 — asset _ref used as an image src/url (a ref is a doc id, not a URL; renders nothing)
    for line in src.splitlines():
        if '_ref' in line and re.search(r'\b(src|Src|url|Url)\b', line) and 'projection' not in line and '//' != line.strip()[:2]:
            problems.append(f"T3 _ref used in a src/url expression: {line.strip()[:90]}")
            break
    # T4 — literal placeholder copy rendered as content (attribute placeholder= is fine)
    for mm in re.finditer(r'>([^<>]*[Pp]laceholder[^<>]*)<', src):
        problems.append(f"T4 rendered placeholder copy: '{mm.group(1).strip()[:60]}'")
        break
    if problems:
        print(f"FAIL  T1 {f}: " + "; ".join(sorted(problems)))
        bad = 1
if not bad:
    print(f"PASS  T1 {len(set(files))} variant files: no phantom classes, data-lucide, _ref-as-src, or placeholder copy")
sys.exit(bad)
PY
)
  rc=$?
  echo "$out"
  [ $rc -ne 0 ] && FAILS=$((FAILS + 1))

else
  echo "usage: verify-section.sh section <name> <folder> <sectionDocId> [variant_key]"
  echo "       verify-section.sh page <pageIdOrSlug> <expectedTypeCSV>"
  echo "       verify-section.sh schema"
  echo "       verify-section.sh styles [<folder> ...]"
  exit 2
fi

echo "----"
if [ "$FAILS" -eq 0 ]; then echo "RESULT: ALL PASS"; exit 0; else echo "RESULT: $FAILS FAIL(S)"; exit 1; fi
