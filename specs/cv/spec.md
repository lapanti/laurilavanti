# Feature: Curriculum Vitae

## Blueprint

### Context
The CV section appears on the About page and presents Lauri's fiduciary duties, work experience, and education in structured lists. Data is maintained in three locale-specific TypeScript files and rendered through a fixed component hierarchy.

### Architecture
- **Data files (one per locale):**
  - `src/content/fi-cv.ts`
  - `src/content/en-cv.ts`
  - `src/content/sv-cv.ts`
  - Each exports: `fiduciaries`, `fiduciariesTitle`, `jobExperiences`, `jobExperiencesTitle`, `degrees`, `degreesTitle`

- **Type:** `src/types/local.ts`
  ```ts
  interface CvRow {
      company?: string      // for job entries
      degree?: string       // for education entries
      duty?: string         // for fiduciary entries
      endYear?: number      // absent = current/ongoing (rendered as bold in LI)
      location?: string     // rendered in parentheses after org/company/school
      organization?: string // for fiduciary entries
      school?: string       // for education entries
      startYear: number     // required
      title?: string        // job title
  }
  ```

- **Component hierarchy:**
  ```
  CurriculumVitae.astro
    └── Section.astro (×3: fiduciaries, jobExperiences, degrees)
          └── Row.astro (one per CvRow)
                └── LI.astro
  ```

- **Render order** (fixed in `CurriculumVitae.astro`):
  1. Fiduciaries (`fiduciaries` / `fiduciariesTitle`)
  2. Job experiences (`jobExperiences` / `jobExperiencesTitle`)
  3. Degrees (`degreesTitle` / `degrees`)

- **Row rendering logic (`Row.astro`):**
  - Label: `duty || title || degree || ''` (first truthy wins)
  - Entity: `organization || company || school || ''` (first truthy wins)
  - Years: `startYear === endYear ? startYear : `${startYear}–${endYear ?? ''} `` — no endYear means "present" (renders as `"2024–"`)
  - `heavy` prop passed to `LI`: `!endYear` — current/ongoing entries are rendered bold

- **Usage:** `src/pages/{lang}/about/index.mdx` imports locale-specific cv data and `CurriculumVitae`, passes all six props explicitly

- **Dependencies:** `CurriculumVitae` ← `src/types/local.ts`. About page MDX ← `src/content/{lang}-cv.ts`. No build-time glob — data is statically imported.

### Anti-Patterns
- Do not add a `CvRow` that sets both `duty` and `title` — only one label is rendered (first truthy wins); the other is silently ignored
- Do not change the section rendering order in `CurriculumVitae.astro` without updating all three locale data files to match — the section titles are locale-specific
- Do not add a new locale's CV data file without also creating the About page MDX for that locale and importing from the new file
- Do not use `endYear: 0` to mean "present" — omit `endYear` entirely; `!endYear` is the ongoing-entry signal
- Do not add CV data to the component itself — all data lives in `src/content/{lang}-cv.ts`

---

## Contract

### Definition of Done
- [ ] All three locale data files (`fi-cv.ts`, `en-cv.ts`, `sv-cv.ts`) are in sync — same number of entries in the same sections, translated appropriately
- [ ] Every `CvRow` has `startYear` set
- [ ] Ongoing entries (no `endYear`) appear bold in the rendered list
- [ ] Entries with `location` show it in parentheses after the organisation
- [ ] Section order is fiduciaries → job experiences → degrees on all locales
- [ ] `npm run build` passes with no TypeScript errors

### Regression Guardrails
- The `duty || title || degree` fallback chain in `Row.astro` must not be reordered — `duty` is for fiduciary entries, `title` for job entries, `degree` for education entries; reordering would mis-label entries
- `LI heavy={!endYear}` must not be changed to `heavy={!!endYear}` — the heaviness signals current/ongoing, not past
- All three locale files must have the same structural shape — the TypeScript type `CvRow` is shared; type errors will surface at build time if fields are misused

### Scenarios

**Scenario: Ongoing entry rendered bold**
- Given: A fiduciary entry has `startYear: 2025` and no `endYear`
- When: The About page renders
- Then: The entry appears in the list with bold styling (`LI heavy={true}`); the year displays as `"2025–"`

**Scenario: Completed entry rendered normally**
- Given: A job entry has `startYear: 2022, endYear: 2024`
- When: The About page renders
- Then: The entry appears with normal weight; the year displays as `"2022–2024"`

**Scenario: Entry with location**
- Given: A job entry has `company: 'OP', location: 'Helsinki', startYear: 2024`
- When: The row renders
- Then: It displays `Lead developer` / `OP (Helsinki) 2024–`

**Scenario: Education entry**
- Given: A degree entry has `degree: 'Diplomi-insinööri (informaatioverkostot)', school: 'Aalto-yliopisto', startYear: 2012, endYear: 2018`
- When: The row renders
- Then: Label is `Diplomi-insinööri (informaatioverkostot)`, entity is `Aalto-yliopisto`, years are `2012–2018`

**Scenario: New locale added**
- Given: A new locale `de` is added to the site
- When: The About page for `de` is created
- Then: A new `src/content/de-cv.ts` must be created with all three sections; the German About page imports from it; `CurriculumVitae` does not change
