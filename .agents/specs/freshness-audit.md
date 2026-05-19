# Spec: Freshness Audit Script + Policy

> **Pattern**: [The Spec](https://asdlc.io/patterns/the-spec) — Living document, permanent source of truth.
> **Status**: `Draft`
> **Last updated**: 2026-05-19

---

## Intent

Blog posts grow stale over time — AI answer engines deprioritise old content, and readers lose trust when facts become outdated. The site already blocks publishing when a post is ≥90 days old with no `updatedDate` (enforced in `mdx-deep.ts`). That gate only covers one staleness case: posts that were never updated. It does not catch posts whose `updatedDate` has itself grown old.

This feature adds an **informational + CI-actionable** freshness audit:

1. A standalone script (`scripts/checks/freshness.ts`) that surfaces two staleness cases:
   - **Case A**: `today − publishDate > 90 days` AND no `updatedDate`
   - **Case B**: `today − updatedDate > 180 days`
2. An npm script `check:freshness` that runs it.
3. A weekly GitHub Actions workflow that runs the audit and opens/updates a single tracking issue listing stale posts.
4. A one-paragraph policy note in `CLAUDE.md` documenting the 90/180-day rule.

The script exits 1 when stale posts are found, making it usable in automation. It does not modify content — output is informational only.

---

## Scope

### In scope
- `scripts/checks/freshness.ts` — reads all MDX posts, prints stale list, exits 1 if any found
- `npm run check:freshness` in `package.json`
- `.github/workflows/freshness.yml` — weekly cron, opens/updates a single tracking issue
- One-paragraph policy note appended to `CLAUDE.md`

### Out of scope
- Automated content rewrites
- Modifying the existing `mdx-deep.ts` pre-commit check
- Making build or pre-commit fail for freshness (the new script is separate from the pre-commit chain)
- Per-post issue creation (one tracking issue total)

---

## Contract

```gherkin
Feature: Freshness audit script

  Scenario: Post older than 90 days with no updatedDate is flagged
    Given an MDX blog post with publishDate 100 days ago
    And no updatedDate field
    When I run `npm run check:freshness`
    Then the post slug appears in stdout output
    And the exit code is 1

  Scenario: Post with updatedDate older than 180 days is flagged
    Given an MDX blog post with updatedDate 200 days ago
    When I run `npm run check:freshness`
    Then the post slug appears in stdout output
    And the exit code is 1

  Scenario: Post with updatedDate within 180 days is not flagged
    Given an MDX blog post with publishDate 400 days ago
    And updatedDate 30 days ago
    When I run `npm run check:freshness`
    Then the post does not appear in stdout output

  Scenario: No stale posts exist
    When I run `npm run check:freshness`
    And no posts match either staleness condition
    Then stdout contains a "no stale posts" message
    And the exit code is 0

  Scenario: Output format is human-readable
    Given at least one stale post
    When I run `npm run check:freshness`
    Then each stale entry shows: slug, lang, publishDate, updatedDate (or "—"), and reason (Case A or B)

Feature: Weekly GitHub Actions tracking issue

  Scenario: Stale posts found on weekly run
    Given the freshness workflow runs on schedule
    And `npm run check:freshness` exits 1
    Then a GitHub issue is opened or updated with title "Freshness audit: stale posts [YYYY-WW]"
    And the issue body lists all stale posts

  Scenario: No stale posts on weekly run
    Given the freshness workflow runs on schedule
    And `npm run check:freshness` exits 0
    Then no issue is opened
    And any existing tracking issue is closed (if open)

Feature: Policy documentation

  Scenario: Policy paragraph present in CLAUDE.md
    Given the CLAUDE.md file
    Then it contains a paragraph referencing the 90-day and 180-day thresholds
    And explains that Case A is also enforced by mdx-deep.ts in CI
```

---

## Data Model

```typescript
interface StalePost {
    slug: string
    lang: 'en' | 'fi' | 'sv'
    publishDate: string       // ISO date, e.g. '2021-02-04'
    updatedDate: string | null
    reason: 'no-updated-date' | 'updated-date-stale'
    ageDays: number           // days since publishDate (Case A) or updatedDate (Case B)
}
```

Constants (parallel `mdx-deep.ts` naming):
```typescript
export const FRESHNESS_NO_UPDATE_DAYS = 90   // Case A threshold
export const FRESHNESS_STALE_UPDATE_DAYS = 180  // Case B threshold
```

---

## Dependencies

- `scripts/checks/mdx-deep.ts` — reuse `splitMdx()` and `fmField()` helpers; do not duplicate parsing logic
- `src/lib/mdxPosts.ts` — **not** used at runtime (build-time Astro glob); script reads MDX files directly via `fs` like `mdx-deep.ts` does

---

## Anti-patterns

- **Do not** import from `src/lib/mdxPosts.ts` in the script — it uses `import.meta.glob` which is Astro/Vite-only and will fail in Node
- **Do not** add `check:freshness` to the existing `validate-content` CI job — that job blocks merges; freshness is informational and runs separately (weekly workflow)
- **Do not** create one GitHub issue per stale post — one tracking issue with a list, updated weekly

---

## Open Questions

*(none — all resolved by user answers 2026-05-19)*

---

## Changelog

| Date | Change |
|------|--------|
| 2026-05-19 | Initial draft |
