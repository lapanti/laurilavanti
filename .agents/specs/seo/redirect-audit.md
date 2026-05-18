# Spec: Redirect Audit & Prune

> **Pattern**: [The Spec](https://asdlc.io/patterns/the-spec) — Living document, permanent source of truth.
> **Status**: `Active`
> **Last updated**: 2026-05-18
> **Issue**: [#1213](https://github.com/lapanti/laurilavanti/issues/1213)

---

## Intent

The `redirects` map in `astro.config.mjs` has accreted 213 entries since the site was first migrated to the locale-prefixed URL scheme. Some legacy entries now form chains (`A → B`, `B → C` — search engines should be sent straight to `C`) and others have dead-end targets (the destination no longer corresponds to a page that exists). Chains waste crawl budget; dead-ends produce indexed 404s. Neither is visible from inside Astro's build, so they accumulate silently.

This feature introduces a pre-commit/CLI audit script that detects both pathologies, prunes the existing redirect map to a clean baseline, and gates further drift via pre-commit + CI. After this lands, the project has an enforceable invariant: every redirect collapses in one hop to a page that actually exists.

It also extracts the redirects literal out of `astro.config.mjs` into `src/lib/redirects.ts` so the audit script (and any future tooling) can import it cleanly.

---

## Scope

### In scope
- Extracting `redirects` into its own module `src/lib/redirects.ts` (behaviour-preserving refactor).
- New script `scripts/checks/redirects.mjs` that reports redirect chains and dead-end targets. (Issue specifies `.ts`; decision to use `.mjs` taken to match existing `scripts/checks/*.mjs` pattern and avoid a transpile step — runs via Node 24 `--experimental-strip-types`.)
- npm script `audit:redirects`.
- Manual prune of the current redirect map: collapse all detected chains, remove all detected dead-ends.
- Pre-commit gating via lint-staged on `src/lib/redirects.ts`, `src/content/tags/**`, `src/pages/**/*.mdx`.
- CI gating via a new step in the `validate-content` job.

### Out of scope
- Migrating to a Cloudflare-side `_redirects` file.
- Removing redirects whose terminals still resolve correctly (kept regardless of age).
- The fi/43 slug typo fix `kuka-paattaa-mista-puhumma → puhumme` (rides the same branch but is its own change).
- Reorganising redirect groupings or comments beyond the prune.
- Any change to redirect *semantics* (HTTP status, target locale, etc.).

---

## Contract

```gherkin
Feature: Redirect audit & prune

  Background:
    Given the redirects map is exported from src/lib/redirects.ts
    And the audit script lives at scripts/checks/redirects.mjs
    And the script enumerates valid routes from:
      | source                                                |
      | src/pages/{lang}/blog/{id}/{slug}/index.mdx           |
      | tags[] from src/content/tags.ts (× 3 locales)         |
      | hard-coded static page list                           |
    And bare /{lang}/blog/{id}/ directories are NOT valid routes

  Scenario: Clean baseline reports no findings
    Given every redirect in src/lib/redirects.ts collapses in one hop
    And every redirect terminal resolves to a generated page
    When `npm run audit:redirects` runs
    Then stdout shows "Summary: N total, 0 chains, 0 dead-ends, N clean"
    And the process exits 0

  Scenario: Chain detection
    Given the redirects map contains entry A → B
    And the redirects map contains entry B → C
    When the audit runs
    Then a chain entry is emitted listing A, its via list [B], and terminal C
    And the process exits 1

  Scenario: Transitive chain detection
    Given the redirects map contains A → B, B → C, and C → D
    When the audit runs
    Then a single chain entry is emitted for A with via [B, C] and terminal D
    And a separate chain entry is emitted for B with via [C] and terminal D

  Scenario: Cycle in redirects does not hang
    Given the redirects map contains A → B and B → A
    When the audit runs
    Then a chain entry is emitted with a cycle marker
    And the process exits 1
    And the script does not loop infinitely

  Scenario: Dead-end target detection
    Given the redirects map contains entry X → /missing/
    And /missing/ matches no generated page, category route, or static page
    When the audit runs
    Then a dead-end entry is emitted listing X and its terminal /missing/
    And the process exits 1

  Scenario: Bare /{lang}/blog/{id}/ is treated as a dead-end
    Given the redirects map contains entry X → /fi/blog/43/
    When the audit runs
    Then a dead-end entry is emitted for X
    Because bare id directories are excluded from the valid-route set

  Scenario: Category route is a valid target
    Given the redirects map contains entry X → /fi/category/technology/
    And tags[] contains a tag with id "technology"
    When the audit runs
    Then X is reported under "clean"

  Scenario: Pre-commit gating fires on MDX rename
    Given the redirects audit baseline is clean
    And a developer renames src/pages/fi/blog/43/{old-slug}/ to {new-slug}/
    And stages the rename without updating redirects.ts
    When the lint-staged pre-commit hook runs
    Then `node --experimental-strip-types scripts/checks/redirects.mjs` runs
    And the commit is rejected because the audit finds a dead-end pointing at {old-slug}

  Scenario: CI gating fails the pipeline on regression
    Given a PR introduces a new chain or dead-end
    When the `validate-content` job runs in GitHub Actions
    Then the "Run redirect audit" step exits non-zero
    And the job fails

  Scenario: Astro build is unaffected by the refactor
    Given src/lib/redirects.ts exports the same redirect entries
    And astro.config.mjs imports them via `import { redirects } from './src/lib/redirects'`
    When `npm run build` runs
    Then the generated dist/ tree contains an HTML stub for every redirect source
    And no behavioural diff exists versus the pre-refactor build
```

---

## Data Model

```typescript
// src/lib/redirects.ts
export const redirects: Record<string, string> = {
    // 213 entries — sources are old/legacy URLs, values are current canonical URLs.
    // Source paths always start with "/" and end with "/" (trailingSlash: 'always').
    // Target paths follow the same convention.
}
```

Audit-internal types (not exported):

```typescript
// scripts/checks/redirects.mjs — JSDoc, not runtime
/**
 * @typedef {Object} ChainFinding
 * @property {string} from        — original source key
 * @property {string[]} via       — intermediate hops, in order
 * @property {string} terminal    — final destination after collapsing
 * @property {boolean} isCycle    — true if a cycle was detected
 */

/**
 * @typedef {Object} DeadEndFinding
 * @property {string} from        — redirect source whose terminal is unreachable
 * @property {string} terminal    — the unresolvable destination
 */
```

Valid-route set construction:

1. **Blog pages** — `readdirSync('src/pages/{en,fi,sv}/blog/{id}/{slug}/')` → `/{lang}/blog/{id}/{slug}/`. Bare `/{lang}/blog/{id}/` (without slug) is **excluded**.
2. **Category pages** — `tags[].id` × `['en','fi','sv']` → `/{lang}/category/{tag.id}/`.
3. **Static pages** — explicit list: `/`, `/{lang}/`, `/{lang}/{about,contact,blog,newsletter,privacy-policy,recommendations,topics}/`, `/{lang}/topics/{tag.id}/`.

Chain detection: for each redirect source, follow hops transitively until reaching a terminal not in the redirect map (or a cycle). Terminal differs from the immediate destination → chain.

Dead-end detection: terminal not present in the union of (1)+(2)+(3).

---

## Dependencies

- [SEO Spec](./spec.md) — covers sitemap exclusion of bare `/{lang}/blog/{id}/` paths (line 154); the audit's "bare id is not a valid route" rule is consistent with that.

---

## Anti-patterns

- **Do not** count other redirect SOURCES as valid terminals when checking dead-ends — that would mask broken chains by labelling them clean. Chain detection handles chains; dead-end detection only consults real routes.
- **Do not** auto-edit redirects from the audit script. Audit reports; humans confirm; humans commit. Per-entry approval is required for each prune commit.
- **Do not** use `import.meta.glob` in the audit script — that helper is Vite-only and silently returns `{}` outside Astro. Use `fs.readdirSync` (precedent: `scripts/checks/cross-file.mjs`).
- **Do not** enable CI/pre-commit gating before the redirect map is pruned to a clean baseline. The new step will fail immediately and block the PR. Required order: refactor → script → prune (chains then dead-ends) → gating.
- **Do not** narrow `redirects` to `as const` — Astro's redirect type accepts richer object forms and over-narrowing pessimises future entries; keep `Record<string, string>`.
- **Do not** remove a redirect just because the source URL "looks old". Removal requires audit evidence of dead-end (terminal unreachable). Static-output Astro generates an HTML stub per redirect source; deletion breaks external links.

---

## Notes

- **Runtime redirect mechanism**: `output: 'static'` means Astro compiles each redirect source into an HTML stub with `<meta http-equiv="refresh">`, not an HTTP 301. The issue's verification criterion "return 301" is technically inaccurate for this site. The audit script verifies the redirect *map* is clean; actual HTTP status depends on Cloudflare's handling of the generated stubs.

## Open Questions

None.

---

## Changelog

| Date       | Change                                   |
|------------|------------------------------------------|
| 2026-05-18 | Initial draft                            |
| 2026-05-18 | Activated; fixed repo link, terminology, anti-patterns, added Notes section |
