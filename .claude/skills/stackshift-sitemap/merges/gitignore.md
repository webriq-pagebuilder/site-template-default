# merge: .gitignore — ignore generated artifacts

**Target:** `.gitignore`. The generated sitemap and the diff report are build
artifacts — regenerated on every deploy, never committed.

## Idempotency check

```bash
grep -n ".sitemap-report.json" .gitignore && echo "ALREADY APPLIED — skip"
```

## Edit

Append (adjust the sitemap line to the project's `outputPath`):

```gitignore
# flag-driven sitemap — regenerated on every build (see sitemap.config.ts)
public/sitemap.xml
.sitemap-report.json
```

If `outputPath` is nested (e.g. `sitemaps/<name>.xml`), ignore the directory
instead of a single file:

```gitignore
public/sitemaps/
.sitemap-report.json
```

## Notes

- If a sitemap is **already committed** at the target path, ignoring it does not
  untrack it — `merges/legacy-teardown.md` handles `git rm --cached`.
- Confirm `git add -A` stages **0** sitemap artifacts after this edit.
