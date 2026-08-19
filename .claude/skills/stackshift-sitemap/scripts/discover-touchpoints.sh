#!/usr/bin/env bash
# discover-touchpoints.sh — read-only inventory of a target StackShift project's
# sitemap surface. Run from the project repo root:
#     bash "$SKILL_DIR/scripts/discover-touchpoints.sh"
# Prints a structured report the skill reasons over in Phase 0/1/3. Never writes,
# never deletes; safe in headless/CI. All probes tolerate missing files.
set -u

section() { printf '\n=== %s ===\n' "$1"; }
probe() { # label ; command...
  local label="$1"; shift
  local out; out="$("$@" 2>/dev/null)"
  if [ -n "$out" ]; then printf -- '- %s:\n%s\n' "$label" "$out" | sed 's/^\([^-]\)/    \1/'
  else printf -- '- %s: (none)\n' "$label"; fi
}

printf 'stackshift-sitemap discovery — %s\n' "$(pwd)"

section "Toolchain"
printf -- '- node: %s\n' "$(node --version 2>/dev/null || echo 'not found')"
printf -- '- .nvmrc: %s\n' "$(cat .nvmrc 2>/dev/null || echo '(none)')"
printf -- '- prebuild script: %s\n' "$(node -e 'try{process.stdout.write(require("./package.json").scripts?.prebuild||"(none)")}catch{process.stdout.write("(no package.json)")}' 2>/dev/null)"
printf -- '- already installed (marker): %s\n' "$([ -f .stackshift-sitemap.json ] && echo 'yes — UPDATE mode' || echo 'no — FRESH mode')"

section "Existing sitemap mechanisms"
probe "next-sitemap config" ls next-sitemap.config.js next-sitemap.config.cjs next-sitemap.config.mjs
probe "package.json sitemap deps" grep -nE '"next-sitemap"|"sitemap"' package.json
probe "Netlify sitemap plugin" grep -n "plugin-sitemap" netlify.toml
probe "runtime sitemap routes" bash -c 'ls pages/api/sitemap* pages/sitemap* 2>/dev/null; find pages -iname "*sitemap*" 2>/dev/null'
probe "next.config sitemap refs (rewrites/headers)" bash -c 'grep -n "sitemap" next.config.js next.config.mjs next.config.ts 2>/dev/null'
probe "Sanity sitemap singleton / desk refs" grep -rlni "sitemap" schemas studio
probe "committed static sitemaps (git-tracked)" git ls-files "public/*sitemap*.xml" "public/**/*sitemap*.xml"

section "Candidate served sitemap URL (for outputPath / legacySitemapUrl)"
echo "  Infer from the mechanisms above:"
echo "  · a rewrite in next.config maps a PUBLIC path -> an API route (that public path is the served URL)"
echo "  · a committed public/<name>.xml is served at /<name>.xml"
echo "  · a runtime route pages/api/sitemap.ts is served at /api/sitemap"
echo "  Set outputPath to preserve the served URL; if you standardize onto a"
echo "  different path, set legacySitemapUrl to the OLD served URL for the cutover."

section "Wiring targets"
probe "schema assembly point" bash -c 'grep -rn "schema: *{" sanity.config.* 2>/dev/null; grep -rn "export const schemaTypes\|withSitemapFlag" schemas 2>/dev/null'
probe "SEO head component" bash -c 'grep -rln "canonical\|og:title\|twitter:card" components 2>/dev/null | head'
probe "<SEO> call sites (published + preview)" bash -c 'grep -rn "<SEO" pages 2>/dev/null | grep -v node_modules'
probe "GROQ top-level spread (addToSitemap flows automatically?)" bash -c 'grep -rn "\.\.\.," pages/api/query.ts 2>/dev/null | head'
probe "robots mechanism" bash -c 'ls scripts/generate-robots-txt.ts public/robots.txt 2>/dev/null'

section "Sitemap flag system already present?"
probe "lib/sitemap payload" bash -c 'ls lib/sitemap/*.ts 2>/dev/null'
probe "sitemap.config" bash -c 'ls sitemap.config.ts sitemap.config.js sitemap.config.mjs 2>/dev/null'

printf '\n=== end discovery ===\n'
