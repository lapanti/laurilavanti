# Spec: Redirect Audit & Prune

> **Pattern**: [The Spec](https://asdlc.io/patterns/the-spec) — Living document, permanent source of truth.
> **Status**: `Active`
> **Last updated**: 2026-08-25
> **Issue**: [#1213](https://github.com/lapanti/laurilavanti/issues/1213)

---

## Intent

The historical `redirects` map can accumulate malformed paths, chains (`A → B`, `B → C`), cycles, and targets that no longer exist. These failures waste crawl budget or produce indexed 404s, so redirects are validated at both the source and generated-output boundaries.

The fast source audit validates path normalization and graph integrity without reconstructing application routes. The built-output contract audit parses the emitted `_redirects` file and discovers canonical routes and assets directly from `dist/`; it owns duplicate/conflict detection and proves that every target exists. Together they enforce the invariant that every redirect is a normalized, deterministic one-hop rule to generated output.

It also extracts the redirects literal out of `astro.config.mjs` into `src/lib/redirects.ts` so the audit script (and any future tooling) can import it cleanly.

---

## Scope

### In scope

- Extracting `redirects` into its own module `src/lib/redirects.ts` (behaviour-preserving refactor).
- Source audit `scripts/checks/redirects.mjs` for normalized local paths, chains, and cycles.
- Built-output target validation in `scripts/checks/dist-contracts.mjs`.
- npm script `audit:redirects`.
- Pre-commit gating via lint-staged when `src/lib/redirects.ts` changes.
- CI gating via a new step in the `validate-content` job.

### Out of scope

- Migrating to a Cloudflare-side `_redirects` file.
- Removing redirects whose terminals still resolve correctly (kept regardless of age).
- The fi/43 slug typo fix `kuka-paattaa-mista-puhumma → puhumme` (rides the same branch but is its own change).
- Reorganising redirect groupings or comments beyond the prune.
- Any change to redirect _semantics_ (HTTP status, target locale, etc.).

---

## Contract

```gherkin
Feature: Redirect audit & prune

  Background:
    Given the redirects map is exported from src/lib/redirects.ts
    And the audit script lives at scripts/checks/redirects.mjs
    And the source audit validates src/lib/redirects.ts
    And the output audit discovers canonical routes and assets from dist/
    And neither audit maintains a manual application-route allowlist

  Scenario: Clean baseline reports no findings
    Given every source redirect uses normalized local paths
    And every source redirect collapses in one hop
    When `npm run audit:redirects` runs
    Then stdout shows zero normalization findings, chains, and cycles
    And the process exits 0

  Scenario: Path normalization
    Given a redirect source or destination lacks a leading or trailing slash
    Or it contains duplicate slashes, a query, a fragment, or a non-local URL
    When the source audit runs
    Then a normalization finding identifies the source and invalid value
    And the process exits 1

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

  Scenario: Cycle detection does not hang
    Given the redirects map contains A → B and B → A
    When the audit runs
    Then a cycle entry is emitted
    And the process exits 1
    And the script does not loop infinitely

  Scenario: Generated target validation
    Given the emitted _redirects file contains entry X → /missing/
    And /missing/ is not a generated canonical route or real asset
    When `npm run check:dist` runs after a build
    Then a redirect-target-missing finding identifies X and /missing/
    And the process exits 1

  Scenario: Pre-commit gating fires on redirect-map change
    Given the redirects audit baseline is clean
    And a developer stages a malformed or chained entry in src/lib/redirects.ts
    When the lint-staged pre-commit hook runs
    Then `node --experimental-strip-types scripts/checks/redirects.mjs` runs
    And the commit is rejected

  Scenario: CI gating fails the pipeline on regression
    Given a PR introduces a malformed path, chain, cycle, or missing generated target
    When the `validate-content` job runs in GitHub Actions
    Then a redirect contract exits non-zero
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

Source-audit types:

```typescript
// scripts/checks/redirects.mjs — JSDoc, not runtime
/**
 * @typedef {Object} ChainFinding
 * @property {string} from        — original source key
 * @property {string[]} via       — intermediate hops, in order
 * @property {string} terminal    — final destination after collapsing
 * @property {boolean} isCycle    — true only for cycle findings
 */
```

Chain detection: for each redirect source, follow hops transitively until reaching a terminal not in the redirect map (or a cycle). Terminal differs from the immediate destination → chain.

Generated target detection: parse `dist/_redirects`, derive canonical routes and assets from the files in `dist/`, and reject any terminal absent from those generated sets.

---

## Dependencies

- [Site Hardening Spec](../site-hardening/spec.md) — owns built-output contracts and generated Finnish aliases.

---

## Anti-patterns

- **Do not** reconstruct application routes from source directories or hard-coded page lists. Generated output is the route truth.
- **Do not** auto-edit redirects from the audit script. Audit reports; humans confirm; humans commit. Per-entry approval is required for each prune commit.
- **Do not** move generated-target checks back into the pre-build source audit. They require a completed build.
- **Do not** narrow `redirects` to `as const` — Astro's redirect type accepts richer object forms and over-narrowing pessimises future entries; keep `Record<string, string>`.
- **Do not** remove a redirect just because the source URL "looks old". Removal requires audit evidence of dead-end (terminal unreachable). Static-output Astro generates an HTML stub per redirect source; deletion breaks external links.

---

## Notes

- **Runtime redirect mechanism**: `output: 'static'` means Astro compiles each redirect source into an HTML stub with `<meta http-equiv="refresh">`, not an HTTP 301. To recover true 301s, the `redirects-file` Astro integration (`src/lib/redirectsIntegration.ts`) emits `dist/_redirects` from the redirect map plus the bare-id → slug pairs; Cloudflare Pages serves those paths as genuine HTTP 301s in production (Pages always follows a `_redirects` rule even when a static asset exists at the same path, so the meta-refresh stubs are bypassed and remain only as an `astro preview` fallback). The audit script still verifies the redirect _map_ is clean. Note: `astro preview` does not honour `_redirects`, so a true-301 check requires `npx wrangler pages dev dist`.

## Open Questions

None.

---

## Changelog

| Date       | Change                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------ |
| 2026-05-18 | Initial draft                                                                                          |
| 2026-05-18 | Activated; fixed repo link, terminology, anti-patterns, added Notes section                            |
| 2026-08-25 | Split source graph checks from generated-output target validation; removed manual route reconstruction |
