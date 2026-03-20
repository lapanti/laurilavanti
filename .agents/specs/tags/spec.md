# Feature: Tag Taxonomy

## Blueprint

### Context
Tags are the content taxonomy used to categorise blog posts and generate category pages. They are defined centrally and referenced by `id` in post frontmatter. Tag filtering silently fails for unknown ids — there are no runtime errors, just missing results.

### Architecture
- **Single source of truth:** `src/content/tags.ts`
  ```ts
  interface LocalTag {
      id: string                             // URL-safe, kebab-case, never changes
      names: { en: string; fi: string; sv: string }  // display name per locale
  }
  export const tags: LocalTag[]
  export function getTagName(id: string, lang?: Lang): string | undefined
  ```
  Currently 24 tags.

- **Post frontmatter reference:** `tags: [id1, id2]` — array of tag `id` strings. No validation at build time — an unknown id silently produces no category page match.

- **`buildTagCollection(lang)`** (referenced in `ExcerptList` context): builds a `TagCollection`-compatible object. Comes from `tags.ts` via the pattern documented in `ARCHITECTURE.md`.

- **Category pages:** `src/pages/{lang}/category/[tag].astro` — `getStaticPaths` maps `tags` → `{ params: { tag: t.id }, props: { tag: t } }`. Only ids in `tags.ts` get a page generated.

- **Filtering in `ExcerptList`:** filters `allMdxPosts` by `post.tags.includes(tagId)` — strict string equality. No fuzzy matching.

- **`getTagName(id, lang)`:** returns the display name for a given id and locale. Returns `undefined` for unknown ids.

- **Dependencies:** `tags.ts` ← category pages, ExcerptList, TitleBanner (tag links on post pages), post frontmatter (by convention, not enforced by TS)

### Anti-Patterns
- Do not add a tag id to post frontmatter that is not defined in `tags.ts` — the category page for that id will not exist, and no posts will appear under it
- Do not rename a tag `id` without updating every post that references the old id — the old category URL will 404 and posts will disappear from filtering
- Do not add locale-specific tags — all tags must have `fi`, `sv`, and `en` names; partial entries break the category page for the locales with missing names
- Do not add tags in components, layouts, or MDX content — `tags.ts` is the only place
- Do not sort or reorder `tags` array for display — components that need sorted display should sort locally

---

## Contract

### Definition of Done
- [ ] New tag has a unique `id` in kebab-case that does not conflict with existing ids
- [ ] All three locale names (`fi`, `sv`, `en`) are provided
- [ ] Posts referencing the new tag `id` appear in `ExcerptList` when filtered by that tag
- [ ] `/{lang}/category/{id}` resolves to a generated page for all three locales
- [ ] `npm run build` passes (new category pages are generated)

### Regression Guardrails
- Tag `id` values are part of the public URL (`/category/{id}`) — changing an id is a breaking URL change; add a redirect if needed
- `getStaticPaths` in category pages iterates `tags` directly — every tag always gets a page generated in every locale, regardless of whether any post uses it
- `getTagName` returns `undefined` for unknown ids — callers must handle this case; do not assume it always returns a string

### Scenarios

**Scenario: New tag added**
- Given: A new tag `{ id: 'energia', names: { fi: 'Energia', sv: 'Energi', en: 'Energy' } }` is added to `tags.ts`
- When: The site is built
- Then: `/fi/category/energia`, `/sv/category/energia`, and `/en/category/energia` are generated; posts with `tags: [energia]` appear in those pages

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
