# merge: legacy sitemap teardown (discovery + removal)

Retire whatever pre-existing sitemap mechanisms the project has so the
flag-driven generator is the single source of truth. **Nothing is assumed
present** — discover first, remove only what exists, and preserve the agents
sitemap (`sitemap-agents.xml`) which is a separate concern.

## Discover

```bash
# config-based generators
ls next-sitemap.config.* 2>/dev/null
grep -n "next-sitemap\|\"sitemap\"" package.json
# crawler / plugin based
grep -n "plugin-sitemap" netlify.toml 2>/dev/null
# runtime routes
ls pages/api/sitemap* pages/sitemap* 2>/dev/null; find pages -name "*sitemap*" 2>/dev/null
# rewrites pointing at a sitemap API
grep -n "sitemap" next.config.* 2>/dev/null
# a Sanity singleton feeding a sitemap + its desk entry
grep -rln "sitemap" schemas/ studio/ 2>/dev/null
# an already-committed static sitemap at the target path
git ls-files "public/*sitemap*.xml"
```

## Remove (only what discovery found)

- **next-sitemap:** delete `next-sitemap.config.*`; remove `next-sitemap` from
  `package.json` if no `postbuild` (or other script) actually invokes it.
- **Crawler plugin (Netlify):** remove the `@netlify/plugin-sitemap` block from
  `netlify.toml`. **Also tell the human to check the hosting UI** — a UI-installed
  plugin survives the file edit and would overwrite the generated sitemap in a
  post-build step. (Record this in the handoff doc.)
- **Runtime API routes** (`pages/api/sitemap*`, `pages/sitemap*`): delete them.
  Remove any `rewrites()` entry in `next.config.*` that points the public sitemap
  URL at such a route (the static `public/` file wins and serves the same URL).
- **Sanity sitemap singleton:** if a document type exists solely to curate
  sitemap URLs, remove its schema registration + deskStructure entry and delete
  the schema file. Carry any **external/cross-host** URLs it held into
  `sitemap.config.ts` `extraUrls` (documents it referenced become flags instead).
- **Committed static sitemap** at the target path: `git rm --cached <path>` so the
  gitignored generated file supersedes it (else a stale committed file may ship).
- Remove the `sitemap` npm dependency once the runtime routes that used it are gone.

## Notes

- The public sitemap **URL is preserved** — set `outputPath` in
  `sitemap.config.ts` to match whatever URL the project already serves, so
  Search Console needs no re-registration. Only the mechanism behind the URL
  changes (per-request route → static build artifact).
- After removals, run the project install to sync the lockfile.
