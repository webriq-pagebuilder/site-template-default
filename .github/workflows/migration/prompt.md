Migrate the {{pageSlug}} page from @{{mockupPath}} into StackShift sections
using the stackshift-section skill. Execute the skill end-to-end in THIS run:
plan gate → Step 0 reuse triage → Phase 1 schema → Phase 2 content + images →
Phase 3 bare components → Phase 4 styling → Phase 5 verification → G7 completion
report. This is a headless one-shot run: no human is available mid-run, so never
pause for approval — but every guard and gate still binds (CLAUDE.md +
stackshift-section skill). Binding rules:

1. PLAN GATE FIRST, IN-RUN. Before any code or content push, write the task
   docs in docs/task/ — (a) epic doc with reuse triage table + dependency
   graph, (b) per-section subtask docs (one per mockup section, even L0),
   (c) serial-integration doc — and register them in TASKS.md.

2. NEVER COMMIT. No git add / git commit / git push at any point, in any
   subagent. End the run with every change (code, task docs, TASKS.md)
   uncommitted in the working tree for post-run review.

3. CONTENT IS THE POINT. Decode the bundler-snapshot mockup to files on disk
   first (skill Phase 2 Step A1). Push the FULL copy and EVERY image into
   this project's own Sanity dataset.

4. CONTEXT DISCIPLINE — SUBAGENTS ARE THE UNIT OF WORK. Build one section at
   a time in mockup order, delegating each section's build to a fresh
   subagent. Delegate ALL Phase 5 gates to verification subagents.

5. ALL GATES, MECHANICALLY. Run scripts/verify-section.sh and
   scripts/verify-render.mjs. A script FAIL can never be reported as PASS.

6. FINAL OUTPUT = the G7 completion report with V1–V7 verdicts, the exact
   Sanity write target (NEXT_PUBLIC_SANITY_PROJECT_ID + dataset from env —
   a deployment whose env points at a DIFFERENT dataset renders none of this
   content, so the reviewer must be able to cross-check), and
   "Verdict: DONE" or "Verdict: INCOMPLETE". Move TASKS.md rows to Testing.

7. DURABLE REPORT. Write the exact same G7 completion report to
   /tmp/g7-report.md with the Write tool BEFORE printing it as your final
   message. The CI wrapper greps that file for the verdict (stdout is only a
   fallback — it is lost if the process dies while exiting), and a missing
   file reads as INCOMPLETE. Write it even when the verdict is INCOMPLETE.

8. SHARED-FILE DISCIPLINE. Other pages may be migrating in parallel on
   sibling branches. In shared files (TASKS.md, schema/section registries,
   route indexes) only APPEND new entries — never reorder, rewrite, or
   reformat existing content — and prefer creating new per-page files over
   editing shared ones, so parallel PRs stay mergeable.

9. STALE-ATTEMPT GUARD. Before creating the page doc, query the target
   dataset for an existing page doc with this slug and for section docs
   left by prior attempts. Reuse the existing page \_id (patch, never
   createOrReplace) instead of minting a second doc — one slug must never
   resolve to two published pages — and never mint a new casing/spelling of
   an existing section \_type (e.g. fooScrollnav vs fooScrollNav): reuse the
   exact name or STOP with a "stale prior migration" note in the report.

10. REUSE MUST RENDER EVERY FIELD. An L0/L1 reuse passes triage only if the
    chosen variant visibly renders EVERY populated field of the section doc
    and adds no off-mockup chrome (e.g. a nav variant that silently drops
    primaryButton, or ships cart/search icons the mockup lacks, is a triage
    FAIL). Verify in the rendered browser, not by reading props.

11. SCROLL & DOUBLE-RENDER PARITY — the two failure classes the mechanical
    gates cannot see. (a) Elements the mockup styles position:sticky/fixed
    must pin identically in the app: scroll the rendered page past the fold
    and assert each pinned element's viewport offset matches the mockup
    (CSS sticky is clipped by its parent, so a sticky bar must be the
    section component's ROOT element — PageSections renders sections as
    siblings). (b) title/titleHighlight-style field pairs must not render
    the same phrase twice: either the title EXCLUDES the highlight text or
    the component splits around it — verify no heading repeats a phrase,
    since text-parity (R1) is one-directional and passes on extra text.

12. NAVIGATION IS A SECTION, NOT A FREEBIE. The header nav is the most
    commonly botched part of a migration: it gets triaged as a cheap L0
    reuse and ships missing its buttons and structure. Build an explicit
    element inventory of the mockup's nav FIRST — announce bar (separate
    bar or part of nav?), logo image + wordmark text, every link and its
    alignment, active-state treatment for the current route, every CTA
    button (label, shape, color), sticky behavior and offsets, and the
    mobile layout (hamburger + drawer vs hidden) — then map each element
    to a populated Sanity field and confirm each one RENDERS in the
    browser at desktop and mobile widths. A reused nav variant that drops
    the CTA button, loses the wordmark, or adds chrome the mockup lacks
    (search/cart/account) fails triage (rule 10) — clone it into a local
    variant (L1) styled to the mockup instead.

13. SUBAGENTS RUN FOREGROUND — ENDING YOUR TURN ENDS THE RUN. This is a
    one-shot claude -p process: the moment the main agent ends a turn, the
    run can exit — even with background subagents still building (observed
    twice on 2026-07-16: completion notifications silently never arrived
    and the run exited mid-build with no G7 report). Launch every Agent
    call with run_in_background: false and consume its result before
    moving on; NEVER "wait" for a background agent by ending your turn.
    If a background task is ever pending anyway, poll it with
    TaskList/TaskGet/TaskOutput inside the same turn until it resolves.
