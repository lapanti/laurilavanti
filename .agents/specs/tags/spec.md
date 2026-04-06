# Feature: Tag Taxonomy

## Blueprint

### Context
Tags are the content taxonomy used to categorise blog posts and generate category pages. They are defined centrally and referenced by `id` in post frontmatter. Tag filtering silently fails for unknown ids — there are no runtime errors, just missing results.

### Architecture
- **Single source of truth:** `src/content/tags.ts`
  ```ts
  interface LocalTag {
      id: string                                          // URL-safe, kebab-case, never changes
      names: { en: string; fi: string; sv: string }      // short display name (tag chips, links)
      pageTitle: { en: string; fi: string; sv: string }  // 34–44 raw chars; full <title> after suffix = 50–60 chars
      descriptions: { en: string; fi: string; sv: string } // intro paragraph text for category pages
      heroImage?: string                                  // Cloudinary image id; fallback: 'Lauri-Lavanti-next-to-a-table'
      heroImageAlt?: { en: string; fi: string; sv: string } // required when heroImage is set
      faq?: {                                             // per-locale; only renders when locale array has 2+ entries
          en?: Array<{ q: string; a: string }>
          fi?: Array<{ q: string; a: string }>
          sv?: Array<{ q: string; a: string }>
      }
  }
  export const tags: LocalTag[]
  export function getTagName(id: string, lang?: Lang): string | undefined
  ```
  Currently 24 tags.

- **Post frontmatter reference:** `tags: [id1, id2]` — array of tag `id` strings. No validation at build time — an unknown id silently produces no category page match.

- **`buildTagCollection(lang)`** (referenced in `ExcerptList` context): builds a `TagCollection`-compatible object. Comes from `tags.ts` via the pattern documented in `ARCHITECTURE.md`.

- **Category pages:** `src/pages/{lang}/category/[tag].astro` — `getStaticPaths` maps `tags` → `{ params: { tag: t.id }, props: { tag: t } }`. Only ids in `tags.ts` get a page generated.

- **Category page enrichment:** Each category page passes `type={COLLECTIONPAGE}`, `description` (from `tag.descriptions[lang]`), `heroImage` (tag override or `'Lauri-Lavanti-next-to-a-table'`), `alt`, and `faq` (locale-specific array) to `PageLayout`. An intro `<Paragraph>` is rendered before `<ExcerptList>`. FAQPage JSON-LD and a visible `<FaqSection>` are emitted when the locale's `faq` array has 2+ entries.

- **Filtering in `ExcerptList`:** filters `allMdxPosts` by `post.tags.includes(tagId)` — strict string equality. No fuzzy matching.

- **`getTagName(id, lang)`:** returns the display name for a given id and locale. Returns `undefined` for unknown ids.

- **Dependencies:** `tags.ts` ← category pages, ExcerptList, TitleBanner (tag links on post pages), post frontmatter (by convention, not enforced by TS)

### Anti-Patterns
- Do not add a tag id to post frontmatter that is not defined in `tags.ts` — the category page for that id will not exist, and no posts will appear under it
- Do not rename a tag `id` without updating every post that references the old id — the old category URL will 404 and posts will disappear from filtering
- Do not add locale-specific tags — all tags must have `fi`, `sv`, and `en` names; partial entries break the category page for the locales with missing names
- Do not add tags in components, layouts, or MDX content — `tags.ts` is the only place
- Do not sort or reorder `tags` array for display — components that need sorted display should sort locally
- Do not use `names` as the page `<title>` — `names` is for display only (tag chips, links); use `pageTitle` for category page SEO titles
- Do not add a `pageTitle` shorter than 34 raw chars or longer than 44 raw chars — the final rendered title (with ` | Lauri Lavanti` suffix) must be 50–60 chars
- Do not add `heroImage` without also setting `heroImageAlt` — alt text is required for accessibility

---

## Contract

### Definition of Done
- [ ] New tag has a unique `id` in kebab-case that does not conflict with existing ids
- [ ] All three locale names (`fi`, `sv`, `en`) are provided in `names`, `pageTitle`, and `descriptions`
- [ ] `pageTitle` raw length is 34–44 chars per locale (final title with suffix = 50–60 chars)
- [ ] Posts referencing the new tag `id` appear in `ExcerptList` when filtered by that tag
- [ ] `/{lang}/category/{id}` resolves to a generated page for all three locales
- [ ] `npm run build` passes (new category pages are generated)

### Regression Guardrails
- Tag `id` values are part of the public URL (`/category/{id}`) — changing an id is a breaking URL change; add a redirect if needed
- `getStaticPaths` in category pages iterates `tags` directly — every tag always gets a page generated in every locale, regardless of whether any post uses it
- `getTagName` returns `undefined` for unknown ids — callers must handle this case; do not assume it always returns a string

### Scenarios

**Scenario: New tag added**
- Given: A new tag with all required fields (`id`, `names`, `pageTitle`, `descriptions`) is added to `tags.ts`
- When: The site is built
- Then: `/fi/category/{id}`, `/sv/category/{id}`, and `/en/category/{id}` are generated with intro text and `CollectionPage` JSON-LD; posts with the tag appear in those pages

**Scenario: Post references unknown tag id**
- Given: A post has `tags: [olematon-tagi]` and that id is not in `tags.ts`
- When: A visitor navigates to `/fi/category/olematon-tagi`
- Then: The page does not exist (404) — `getStaticPaths` did not generate it; the post appears nowhere under that tag

**Scenario: Tag renamed (breaking change)**
- Given: Tag `id: 'kirkkonummi'` is renamed to `id: 'kirkkonummi-kunta'`
- When: The site is built without updating post frontmatter
- Then: `/fi/category/kirkkonummi` no longer exists; posts with `tags: [kirkkonummi]` in frontmatter appear in no category (silent failure); the new `/fi/category/kirkkonummi-kunta` page exists but is empty

**Scenario: getTagName for valid and invalid ids**
- Given: `getTagName('kirkkonummi', 'fi')` and `getTagName('nonexistent', 'fi')`
- When: Called at runtime
- Then: First returns `'Kirkkonummi'`; second returns `undefined`

**Scenario: Category page with FAQ (2+ entries)**
- Given: A tag has `faq.fi` with 2+ entries
- When: `/fi/category/{id}` is rendered
- Then: Two `<script type="application/ld+json">` blocks are emitted — one `CollectionPage`, one `FAQPage`. A visible `<FaqSection>` appears below the `<ExcerptList>`.

**Scenario: Category page FAQ in only one locale**
- Given: A tag has `faq.fi` with 2+ entries but no `faq.sv`
- When: `/sv/category/{id}` is rendered
- Then: No `FAQPage` JSON-LD and no `<FaqSection>` for the Swedish page; the Finnish page still gets both.
