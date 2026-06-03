# Spec: About Page — Bio with Narrative Frame

> **Pattern**: [The Spec](https://asdlc.io/patterns/the-spec) — Living document, permanent source of truth.
> **Status**: `Active`
> **Last updated**: 2026-06-03

---

## Intent

The About page currently presents credentials in CV order (job title → education → political role → personal life) with no opening frame that tells the reader *why* Lauri's combination of skills is distinctive. A visitor arriving from a search result or social link cannot immediately answer: "Why is this person worth listening to?"

The current About page was written by a comms expert — the prose quality and outcome framing in the existing sections must be preserved. The change is primarily structural:

The change is primarily structural: reorder existing H2 sections from Tech → Education → Politics → Leisure into Tech → Politics → Civic → Education → Leisure, add one new theme sentence above the first H2, add a new "Civic & community" section (currently missing), and reorder `SummaryBox` bullet rows to lead with the narrative theme. All existing comms-expert prose is preserved verbatim.

The final copy must use canonical terminology. Key constraints: use **johtava ohjelmistokehittäjä** (FI) / **lead developer** (EN) / **ledande mjukvaruutvecklare** (SV); party is **Vihreät** / **Greens** / **De Gröna**.

---

## Scope

### In scope
- One new theme sentence added above the first H2 in all three locales — all other existing prose preserved verbatim
- Existing H2 sections reordered from Tech → Education → Politics → Leisure to Tech → Politics → Civic → Education → Leisure in all three locales
- New "Civic & community" H2 section added in all three locales (digital independence citizen initiative), written to match existing voice/style
- `SummaryBox` `summaryRows` reordered to lead with narrative theme; existing bullet text preserved where possible
- "Home and leisure" section retained after credential sections in all three locales
- `updatedDate` frontmatter field bumped to the implementation date in all three files
- Aria snapshots updated after content changes (`npm run test:e2e -- --update-snapshots`)

### Out of scope
- `CurriculumVitae` component at page bottom — kept as data layer, not modified
- Frontmatter `description`, `title`, `pageTitle`, `faq` fields — no change
- `SummaryBox` component implementation — only the `summaryRows` prop values change
- New components, new MDX imports, or structural changes to the page layout
- Any changes to `src/content/{fi,en,sv}-cv.ts` source data files
- Screenshot snapshots — only aria snapshots are updated; screenshot baselines regenerate on next full CI run
- Social media bios, schema.org data, or any other page outside the three about MDX files

---

## Contract

```gherkin
Feature: About page bio with narrative frame

  Scenario: Theme sentence is first prose on each locale's page
    Given a visitor navigates to any locale's /about/ page
    When the page loads
    Then the first paragraph after the SummaryBox is a theme sentence anchoring Lauri's practitioner+politician position
    And that paragraph appears before any H2 element

  Scenario: Four credential H2 sections appear in domain order
    Given a visitor is on any locale's /about/ page
    When the page loads
    Then exactly four credential H2 headings appear after the theme paragraph and before the Leisure section, in this order:
      1. Technology heading (references lead developer role at bank)
      2. Politics heading (references Kirkkonummi councillor role)
      3. Civic heading (references digital independence initiative or civic work)
      4. Education heading (references Aalto MSc / information networks)
    And the Technology, Politics, and Education sections contain the existing comms-expert prose unchanged

  Scenario: Home and leisure section is retained
    Given a visitor is on any locale's /about/ page
    When the visitor reads to the end of the prose body (before the CV component)
    Then a section heading and body about home life and leisure is present

  Scenario: SummaryBox leads with narrative theme, not job title
    Given a visitor is on any locale's /about/ page
    When the SummaryBox is expanded
    Then the first summaryRow reflects the practitioner+politician combination or the "what code means for society" theme
    And the first summaryRow does NOT start with the job title alone (e.g. not "Johtava ohjelmistokehittäjä pankissa" as the first bullet)

  Scenario: Canonical terminology used in new prose
    Given the new theme sentence and civic section have been written
    When inspected for terminology
    Then FI new prose uses "johtava ohjelmistokehittäjä" not "ohjelmistokehittäjä" alone
    And EN new prose uses "lead developer" not "lead software developer"
    And SV new prose uses "ledande mjukvaruutvecklare"
    And new prose uses "digitaalinen itsenäisyys" not "digitaalinen riippumattomuus"

  Scenario: All locales build without error
    Given the three about MDX files have been updated
    When npm run build is executed
    Then the build succeeds with no errors or type-check failures

  Scenario: Aria snapshots pass after update
    Given the about pages have been updated
    When npm run test:e2e is run with --update-snapshots
    Then new aria snapshots are saved for all three locale about pages
    When npm run test:e2e is run without --update-snapshots
    Then all aria snapshot tests pass for all three about pages
```

---

## Data Model

No new data types. All content is inline MDX prose + `summaryRows` string array prop on `SummaryBox`.

```typescript
// SummaryBox summaryRows — string[] prop, one bullet per entry
// New narrative order (all locales): theme-first, then tech outcome,
// politics, education, family — not CV title order
summaryRows: string[]
```

Canonical terms:

| Field | FI | EN | SV |
|-------|----|----|-----|
| Job title | johtava ohjelmistokehittäjä | lead developer | ledande mjukvaruutvecklare |
| Party | Vihreät | Greens | De Gröna |
| Role | Kirkkonummen kunnanvaltuutettu, Vihreän valtuustoryhmän pj. | Kirkkonummi councillor, Green group chair | fullmäktigeledamot i Kyrkslätt, ordförande för De Grönas fullmäktigegrupp |
| Education | DI (Aalto-yliopisto) | MSc (Aalto University) | DI (Aalto-universitetet) |

---

## Dependencies

- [Pages Spec](./pages/spec.md) — MDX page structure, frontmatter schema, layout constraints

---

## Anti-patterns

- **Do not** rewrite existing section prose — the Technology, Politics, Education, and Leisure sections were written by a comms expert; only reorder them and add the one theme sentence and the new Civic section.
- **Do not** remove the `CurriculumVitae` component — it is the structured data layer; removing it strips machine-readable credentials used by JSON-LD and search engines.
- **Do not** put the theme sentence inside the `SummaryBox` — it must appear as visible prose in the reading flow before any interactive widget.
- **Do not** use "digitaalinen riippumattomuus" — the canonical form is "digitaalinen itsenäisyys".
- **Do not** use "lead software developer" in English — the canonical form is "lead developer".
- **Do not** update screenshot baselines in this PR — content changes will produce different screenshots; commit only aria snapshots and let CI regenerate screenshots on the next full run.
- **Do not** change the `faq` frontmatter entries — they are tuned independently for AEO and out of scope for this change.

---

## Changelog

| Date | Change |
|------|--------|
| 2026-06-03 | Initial draft |
