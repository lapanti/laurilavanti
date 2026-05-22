# Spec: CV Entry Descriptions

> **Pattern**: [The Spec](https://asdlc.io/patterns/the-spec) — Living document, permanent source of truth.
> **Status**: `Active`
> **Last updated**: 2026-05-22

---

## Intent

The CV on the About page currently shows only title/role, organisation, and year range for each entry. Visitors have no context for what the person actually did or why it mattered. This feature adds an optional `description` field to each CV entry — rendered as a short text block beneath the row label — so the CV communicates impact, not just history.

Texts are sourced from the LinkedIn profile strategy document provided in issue #1228. Finnish is the primary language; English is used on the EN site. Swedish is translated from the EN/FI source.

Not every entry has a description in the issue. The `description` field is optional — entries without one render identically to the current output.

---

## Scope

### In scope
- Add optional `description` field to `CvRow` type in `src/types/local.ts`
- Render `description` beneath the existing label/entity/years line in `Row.astro`
- Populate `description` for all entries that have text in issue #1228 across all three locale data files: `fi-cv.ts`, `en-cv.ts`, `sv-cv.ts`
- SV descriptions translated from EN/FI source texts in the issue

### Out of scope
- Changing the visual structure of the row header (title, organisation, years)
- Adding descriptions to entries not covered by issue #1228
- Bullet-point sub-lists per entry (descriptions are plain prose paragraphs)
- New components, new sections, or restructuring the CV layout

---

## Contract

```gherkin
Feature: CV Entry Descriptions

  Scenario: Entry with description renders description below the header line
    Given a CvRow has a non-empty description field
    When the About page renders
    Then the description text appears beneath the title/organisation/years line for that entry
    And the description is visually distinct from the header line (separate element)

  Scenario: Entry without description renders unchanged
    Given a CvRow has no description field (or description is undefined)
    When the About page renders
    Then the row renders identically to current output — title/org/years only, no extra whitespace or empty element

  Scenario: Description with multiple bullets renders as list
    Given a CvRow has a description array with multiple items
    When the About page renders
    Then each item is rendered as a <li> inside a <ul> beneath the header line
    And the full list is rendered without truncation

  Scenario: All three locales have aligned entry counts
    Given fi-cv.ts, en-cv.ts, sv-cv.ts are updated with descriptions
    When npm run build runs
    Then TypeScript compilation passes with no type errors
    And all three locales have the same number of entries per section

  Scenario: FI locale shows Finnish descriptions
    Given the FI About page at /fi/about
    When a user views a job experience entry that has a description
    Then the description is in Finnish

  Scenario: EN locale shows English descriptions
    Given the EN About page at /en/about
    When a user views a job experience entry that has a description
    Then the description is in English

  Scenario: SV locale shows Swedish descriptions
    Given the SV About page at /sv/about
    When a user views a job experience entry that has a description
    Then the description is in Swedish
```

---

## Data Model

```typescript
// src/types/local.ts — add optional description field
export interface CvRow {
    company?: string
    degree?: string
    description?: string[]  // NEW: optional bullet list rendered as <ul>/<li> below the header line
    duty?: string
    endYear?: number
    location?: string
    organization?: string
    school?: string
    startYear: number
    title?: string
}
```

**Description content per entry (from issue #1228):**

Descriptions exist for:
- **jobExperiences**: OP Lead Developer, Verkkokauppa.com Team Lead, Verkkokauppa.com Software Developer, Gofore Software Developer, Solinor (now merged into Gofore entry), Zalando Software Engineer, Futurice Software Developer, Pulmaton Solutions Oy, Nokia S&N Seasonal Trainee
- **fiduciaries**: Kirkkonummen kunta Kunnanvaltuutettu, Kirkkonummen Vihreät Chair (2024–2025), Aalto Predators Chair, Aalto Predators Secretary, Athene KV-kapteeni, Kirkkonummen kunta Youth Board Chair
- **degrees**: Aalto MSc, Omnia Datanomi, Aalto BSc

Note: The issue separates Gofore and Solinor as distinct entries, but the current data files have only one Gofore entry (2018–2019). A separate Solinor row must be added to all three locale data files to match the issue structure. Solinor predates Gofore (Gofore acquired Solinor); the EN description for Gofore notes "After Gofore bought Solinor, I continued on the same project." The Solinor entry should appear after Gofore in the jobExperiences array (i.e. earlier in chronological terms — Solinor covers the same 2018–2019 period, so check the issue for exact years). Both entries carry their own descriptions from the issue.

---

## Dependencies

- [CV spec](../cv/spec.md) — base architecture for the CV feature; this spec extends it

---

## Anti-patterns

- **Do not** render an empty `<p>` or `<div>` when `description` is undefined — guard with a conditional so absent descriptions leave no DOM residue
- **Do not** merge Solinor into the Gofore entry — they are separate rows, each with their own description from issue #1228
- **Do not** use HTML inside description strings in the data files — plain text only; the component handles rendering
- **Do not** modify `CurriculumVitae.astro` or `Section.astro` — the change is localised to `Row.astro` (rendering) and the three data files (content)
- **Do not** use a single string for `description` — type is `string[]`; even single-item descriptions must be an array

---

## Open Questions

_None — all questions resolved._

---

## Changelog

| Date | Change |
|------|--------|
| 2026-05-22 | Initial draft |
