# Spec: Canonical Person + ProfilePage JSON-LD with co-author support

> **Pattern**: [The Spec](https://asdlc.io/patterns/the-spec) — Living document, permanent source of truth.
> **Status**: `Active`
> **Last updated**: 2026-05-23

---

## Intent

Search engines, LLMs, and answer engines (Google AI Overviews, ChatGPT, Perplexity, Gemini) rely on schema.org structured data to identify and attach authority to real-world entities. Currently laurilavanti.fi emits a `Person` schema on About pages, but it lacks a stable `@id`, misses key authority signals (Wikipedia, Wikidata, employer, education, localized expertise), and every `BlogPosting.author` is a bare name stub with no entity link. This prevents LLMs from confidently resolving "Lauri Lavanti" as the same entity across pages and external knowledge sources.

This spec defines: a canonical `Person` entity with a stable `@id`, a `ProfilePage` wrapper for About pages (2025/2026 best practice per Google Search Central), entity-by-id references on all `BlogPosting` author fields, and optional co-author support with auto-rendered bylines.

The goal is maximum E-E-A-T entity reconciliation: LLMs and answer engines should attach Lauri Lavanti as an authority on artificial intelligence, digital independence, technology, and politics.

---

## Scope

### In scope
- `src/content/person.ts` — new file, single source of truth for all canonical Person data
- `PERSON_ID = 'https://laurilavanti.fi/fi/about/#person'` — stable entity identifier; `id="person"` anchor added to FI About page to make fragment resolvable
- `src/lib/jsonld.ts` — add `PROFILEPAGE = 'ProfilePage'` constant
- `src/components/Head.astro` — consume `person.ts`; emit `ProfilePage > mainEntity Person` branch; emit `BlogPosting.author` as Person id-reference array; emit `<meta property="article:author">` once per author
- `src/lib/mdxPosts.ts` — add optional `authors` field to `MdxPost` interface
- `src/layouts/PostLayout.astro` — auto-rendered co-author byline after `<slot />` when `authors.length > 1`
- About-page frontmatter: `type: 'Person'` → `'ProfilePage'` in fi/en/sv
- Visible Wikipedia link sentence on all three About pages
- Migrate hand-written `_Authors:…_` lines to `authors` frontmatter on 5 co-authored posts (× 3 locales = 15 files):
  - post 22 — Johanna Fleming, Lauri Lavanti, Paula Oittinen
  - post 27 — Johanna Fleming, Lauri Lavanti, Paula Oittinen
  - post 41 — Ronja Karkinen, Lauri Lavanti
  - post 48 — Atte Harjanne, Lauri Lavanti
  - post 56 — Miisa Jeremejew, Lauri Lavanti
- Tests: `Head.spec.ts`, `jsonld.spec.ts`

### Out of scope
- Editing Wikipedia (adding citations or sameAs links from Wikipedia to this site)
- `Organization` schema for the site itself
- `disambiguatingDescription` (no known namesakes)
- Backfilling `authors` on posts beyond the five listed above

---

## Contract

```gherkin
Feature: Canonical Person JSON-LD entity

  # ── Person source of truth ──────────────────────────────────────────────────

  Scenario: person.ts exports canonical Person data
    Given src/content/person.ts exists
    Then it exports PERSON_ID = 'https://laurilavanti.fi/fi/about/#person'
    And it exports personGivenName = 'Lauri', personFamilyName = 'Lavanti'
    And it exports personBirthDate = '1991-10-01'
    And it exports personBirthPlace as a Place with name 'Jyväskylä'
    And it exports personNationality as a Country with name 'FI'
    And it exports personWorksFor as Organization { name: 'OP', url: 'https://www.op.fi/' }
    And it exports personAlumniOf as an array of 3 educational orgs (Aalto-yliopisto, Omnia, Masalan lukio)
    And it exports personSameAs containing 'https://fi.wikipedia.org/wiki/Lauri_Lavanti'
    And it exports personSameAs containing 'https://www.wikidata.org/wiki/Q139711658'
    And personSameAs does NOT contain 'https://digitaalinenitsenaisyys.fi/'
    And it exports personAffiliation containing { '@type': 'Organization', name: 'Digitaalinen itsenäisyys -kansalaisaloite', url: 'https://digitaalinenitsenaisyys.fi/' }
    And it exports personKnowsAbout as a Record<Lang, string[]> with distinct values per locale
    And it exports personHasOccupation as a Record<Lang, array> with two Occupation entries (politician, lead developer)
    And personImage is a Cloudinary URL built with c_fill, g_north (top-anchored), 1200×1200 from 'Lauri-Lavanti-seisoo-suorassa-sinisella-taustalla'

  # ── ProfilePage on About pages ───────────────────────────────────────────────

  Scenario: About page emits ProfilePage with canonical Person
    Given an About page (fi/en/sv) with frontmatter type: 'ProfilePage'
    When the page is rendered
    Then the JSON-LD contains @type: 'ProfilePage'
    And the JSON-LD contains mainEntity with @type: 'Person'
    And mainEntity['@id'] = 'https://laurilavanti.fi/fi/about/#person'
    And mainEntity contains name, givenName, familyName, birthDate, birthPlace, nationality
    And mainEntity contains worksFor, alumniOf (3 entries), memberOf, affiliation
    And mainEntity contains knowsAbout localised to the page's lang
    And mainEntity contains hasOccupation localised to the page's lang
    And mainEntity contains knowsLanguage: ['fi', 'en', 'sv']
    And mainEntity.sameAs includes Wikipedia and Wikidata URLs
    And mainEntity.sameAs does NOT include 'https://digitaalinenitsenaisyys.fi/'
    And mainEntity.image is a Cloudinary URL with g_north crop, 1200×1200

  Scenario: PERSON_ID fragment resolves on FI About page
    Given the FI About page at /fi/about/
    When the HTML is rendered
    Then an element with id="person" exists in the page (wrapping the bio/hero section)
    And navigating to /fi/about/#person anchors to that element

  # ── BlogPosting author ────────────────────────────────────────────────────────

  Scenario: Solo-authored post references Person by id
    Given a BlogPosting with no authors frontmatter field
    When the page is rendered
    Then BlogPosting.author is an array with one entry
    And that entry is { '@type': 'Person', '@id': 'https://laurilavanti.fi/fi/about/#person' }
    And there is exactly one <meta property="article:author"> in the HTML

  Scenario: Co-authored post references multiple Persons
    Given a BlogPosting with authors: ['lauri', { name: 'Miisa Jeremejew', role: 'Kunnanvaltuutettu (Vihreät)', place: 'Kirkkonummi' }]
    When the page is rendered
    Then BlogPosting.author is an array with two entries
    And the first entry is { '@type': 'Person', '@id': 'https://laurilavanti.fi/fi/about/#person' }
    And the second entry is { '@type': 'Person', name: 'Miisa Jeremejew' }
    And there are exactly two <meta property="article:author"> tags in the HTML

  # ── Co-author byline rendering ───────────────────────────────────────────────

  Scenario: No byline rendered for solo-authored post
    Given a BlogPosting with no authors frontmatter field (or authors: ['lauri'])
    When the page is rendered
    Then no author byline element appears after the post content

  Scenario: Shared-role byline for co-authors with identical role and place
    Given a BlogPosting in lang 'en' with authors:
      | name              | role                                     | place       |
      | lauri             | Municipal councillor (Greens)            | Kirkkonummi |
      | Miisa Jeremejew   | Municipal councillor (Greens)            | Kirkkonummi |
    When the page is rendered
    Then the byline after the post content is:
      _Authors: Lauri Lavanti and Miisa Jeremejew, Municipal councillor (Greens), Kirkkonummi._
    And the byline is rendered as an italic paragraph

  Scenario: Shared-role byline localises prefix in Finnish
    Given a BlogPosting in lang 'fi' with two co-authors sharing the same role and place
    When the page is rendered
    Then the byline begins with "Tekijät:"

  Scenario: Shared-role byline localises prefix in Swedish
    Given a BlogPosting in lang 'sv' with two co-authors sharing the same role and place
    When the page is rendered
    Then the byline begins with "Författare:"

  Scenario: Per-author byline when roles differ
    Given a BlogPosting in lang 'en' with authors:
      | name              | role                    | place       |
      | lauri             | Lead developer          | Helsinki    |
      | Atte Harjanne     | Member of Parliament    | Helsinki    |
    When the page is rendered
    Then the byline uses per-author format:
      _Authors: Lauri Lavanti (Lead developer, Helsinki) and Atte Harjanne (Member of Parliament, Helsinki)._

  Scenario: Author with no role/place shows name only in byline
    Given a BlogPosting with a co-author entry that has no role or place
    When the page is rendered
    Then that author appears in the byline as name only (no parenthetical)

  Scenario: Lauri's defaults apply when his entry omits role/place
    Given a BlogPosting in lang 'en' with authors: ['lauri', { name: 'Co-author', role: 'Some role', place: 'Some place' }]
    And Lauri's entry has no explicit role or place
    When the page is rendered
    Then Lauri's name appears with his default jobTitle[lang] and 'Kirkkonummi' as role/place in the per-author format

  # ── knowsAbout localisation ──────────────────────────────────────────────────

  Scenario: knowsAbout uses correct locale
    Given an About page or BlogPosting in lang 'en'
    When the Person (or mainEntity) is emitted
    Then Person.knowsAbout contains English-language topic strings
    And does NOT contain Finnish-only strings (e.g. 'Talouspolitiikka')

  Scenario: knowsAbout uses Finnish for fi locale
    Given an About page or BlogPosting in lang 'fi'
    When the Person (or mainEntity) is emitted
    Then Person.knowsAbout contains Finnish-language topic strings

  # ── Co-authored posts migration ──────────────────────────────────────────────

  Scenario: Migrated co-authored post has no inline byline in content
    Given post 56 (Lähteelä) in any locale after migration
    When the MDX content is read
    Then there is no line matching the pattern _Authors:…_ in the MDX body
    And there is no line matching the pattern _Tekijät:…_ in the MDX body
    And there is no line matching the pattern _Författare:…_ in the MDX body
    And publication-info lines (_Published in…_ / _Julkaistu…_ / _Publicerad…_) remain unchanged

  Scenario: Migrated post renders auto-byline identically to former manual byline
    Given post 56 (Lähteelä) in lang 'en' after migration
    When the page is rendered
    Then the byline reads: _Authors: Miisa Jeremejew and Lauri Lavanti, municipal councillors (Greens), Kirkkonummi._
    And is rendered as an italic paragraph after the post body
```

---

## Data Model

```typescript
// src/content/person.ts

export const PERSON_ID = 'https://laurilavanti.fi/fi/about/#person'

// Co-author entry in post frontmatter
// String shorthand 'lauri' resolves to the canonical PERSON_ID reference
export type AuthorEntry =
  | 'lauri'
  | {
      name: string
      url?: string
      sameAs?: string[]
      role?: string   // localized role/title string; omit for name-only byline
      place?: string  // city/region; omit for name-only byline
    }

// Added to MdxPost in src/lib/mdxPosts.ts
// When absent, implementation defaults to ['lauri']
interface MdxPost {
  // … existing fields …
  authors?: AuthorEntry[]
}

// Resolved author for JSON-LD emission
type ResolvedAuthor =
  | { '@type': 'Person'; '@id': string }                   // Lauri → id ref
  | { '@type': 'Person'; name: string; url?: string; sameAs?: string[] }  // co-author

// Byline rendering decision:
// If all authors (after defaults applied) share identical role AND place
//   → "Authors: A and B, role, place."  (Lähteelä style)
// If any role OR place differs
//   → "Authors: A (role_a, place_a) and B (role_b, place_b)."
// If an author has no role/place → name only in list
// Lauri's defaults (when his entry omits role/place):
//   role = personJobTitle[lang], place = 'Kirkkonummi'
// Byline prefix per lang: 'en' → 'Authors:', 'fi' → 'Tekijät:', 'sv' → 'Författare:'
// Byline is italic (<em>), ends with period, rendered as a paragraph

// Person image: Cloudinary URL
// src: 'Lauri-Lavanti-seisoo-suorassa-sinisella-taustalla'
// crop: { type: 'fill', gravity: 'north' }  ← g_north, top-anchored
// width: 1200, height: 1200

// sameAs array (complete):
// 1. https://bsky.app/profile/laurilavanti.fi
// 2. https://www.facebook.com/laurilavanti
// 3. https://www.instagram.com/laurilavanti/
// 4. https://www.linkedin.com/in/lapanti
// 5. https://mastodon.social/@laurilavanti
// 6. https://www.threads.com/@laurilavanti
// 7. https://www.tiktok.com/@laurilavanti
// 8. https://fi.wikipedia.org/wiki/Lauri_Lavanti
// 9. https://www.wikidata.org/wiki/Q139711658
```

---

## Dependencies

- [seo/spec.md](./spec.md) — overarching SEO strategy for laurilavanti.fi; this spec extends it with entity/E-E-A-T concerns

---

## Anti-patterns

- **Do not** put `digitaalinenitsenaisyys.fi` in `sameAs` — it is a multi-author citizen initiative, not a canonical URL for Lauri Lavanti. Use `affiliation` instead.
- **Do not** repeat the full Person object on every `BlogPosting` — emit a bare `{ '@type': 'Person', '@id': PERSON_ID }` reference. Duplicating the full object risks entity fragmentation across pages.
- **Do not** use `g_center` (default Cloudinary gravity) for the Person image — the face will be cropped on square format. Always specify `gravity: 'north'`.
- **Do not** hardcode person data in `Head.astro` — all Person constants must come from `src/content/person.ts` to keep a single source of truth.
- **Do not** compare role/place with case-insensitive or trimmed equality for the shared-suffix byline decision — use exact string equality. If strings differ by even whitespace, use per-author format; let the content author standardise.

---

## Open Questions

*(none — all decisions resolved in planning)*

---

## Changelog

| Date | Change |
|------|--------|
| 2026-05-23 | Initial draft |
