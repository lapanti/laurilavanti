# Spec: Scheduled Blog Post Publishing

> **Pattern**: [The Spec](https://asdlc.io/patterns/the-spec) — Living document, permanent source of truth.
> **Status**: `Implemented` (PR #1417)
> **Last updated**: 2026-08-31

---

## Intent

Posts could previously only go live by pushing to `main` — the site is static and deploys only on push, and no draft flag or date filter existed anywhere, so a future-dated post would appear immediately on the site, RSS, and sitemap. The author repeatedly needs to write a post now and have it appear on lavanti.fi on a chosen future date, with no manual step on publish day.

Accepted trade-off: scheduled posts are merged to `main` early, so their content is visible in the public repo before publish. Never schedule content that must stay non-public until its date.

---

## Contract

1. **Build filter** — `loadAllPosts()` (`src/lib/posts.ts`) excludes posts whose `publishDate` is after today in **Europe/Helsinki**, except under `astro dev`. Every consumer flows through `getAllPosts()`, so one filter gates post routes, bare-id redirect stubs and `dist/_redirects`, RSS, `llms.txt`, OG cards, excerpt lists, and sitemap page inclusion. Date helpers live in `src/lib/publishing.ts` (pure, no `astro:content`, DST-tested).
2. **Precision** — date-only. A post goes live shortly after Helsinki midnight on its `publishDate` (nightly cron at 22:00 UTC; GitHub cron never fires early). `updatedDate` is schema-required and set to the same future date.
3. **Due check** — `scripts/checks/publish-due.ts` (`npm run check:publish-due`) lists posts with `publishDate <= today` whose URLs are missing from the live production sitemap. Exit codes: 0 nothing due, 1 publish due, 2 fetch/parse error. Self-healing: a missed nightly run is caught by the next one.
4. **Nightly automation** — `.github/workflows/scheduled-publish.yml`: when the check exits 1, force-push branch `chore/scheduled-publish-{date}` at main HEAD, regenerate snapshot baselines against a branch preview via `.github/actions/regen-baselines` (shared with `update-screenshots.yml`; refuses `branch=main`), commit changed baselines via GraphQL `createCommitOnBranch` (GitHub web-flow signature satisfies signed-commit protection; no key in CI), open an **auto-merge PR**. Merging that PR is the production deploy — production E2E stays green against the just-merged baselines, no red main run. Fallback when baselines are unchanged: dispatch `main.yml` directly (`workflow_dispatch`).
5. **Tokens** — commit, PR creation, and auto-merge use the `SCHEDULED_PUBLISH_TOKEN` fine-grained PAT (contents + pull-requests read/write, this repo only): `GITHUB_TOKEN`-created PRs never trigger `pull_request` workflows, so auto-merge would wait forever. On PAT expiry the job fails 401 with an Actions notification.
6. **Review exemption** — automated baseline PRs merge without human review (exemption to Git Workflow rule 7 in `AGENTS.md`): they contain only mechanically regenerated goldens; the post content was human-reviewed in its own PR.

---

## Scope

### In scope
- `src/lib/publishing.ts` + filter in `src/lib/posts.ts`
- `scripts/checks/publish-due.ts`, `scripts/ci/commit-baselines.ts` (+ specs)
- `.github/actions/regen-baselines`, `.github/workflows/scheduled-publish.yml`, `workflow_dispatch` on `main.yml`
- Docs in `AGENTS.md` ("Scheduled Publishing") and `ARCHITECTURE.md`

### Out of scope
- Time-of-day precision (schema stays `YYYY-MM-DD`)
- True embargo (content hidden from the public repo before publish)
- Future posts in PR-preview builds (dev server only — keeps E2E baselines consistent between preview and production)

---

## Verification

- Unit: `src/lib/publishing.spec.ts` (DST boundaries), `scripts/checks/publish-due.spec.ts`, `scripts/ci/commit-baselines.spec.ts`.
- Probe: future-date a post's `meta.json` (then `rm -rf node_modules/.astro` — the content store digests only the MDX, so meta-only edits are otherwise served stale) → `npm run build` excludes it everywhere; `npm run dev` still shows it.
- Live: `npm run check:publish-due` → exit 0 when everything published is live.
- Smoke (on main): `gh workflow run scheduled-publish.yml` → check job exits 0, publish job skipped.
