# Feature: Blog Posts

## Blueprint

### Context
Blog posts are the primary content type on the site — political commentary, municipal news, and personal views. They must be stable (URLs never break), discoverable (by tag and language), and accessible (WCAG-compliant, keyboard navigable).

### Architecture
- **File location:** `src/pages/{lang}/blog/{id}/{slug}/index.mdx` — one file per locale per post
- **Layout:** `PostLayout.astro` via `layout:` frontmatter. Props arrive as `MDXLayoutProps<Frontmatter>` — never called directly from `.astro` files
- **Post index:** `src/lib/mdxPosts.ts` — `import.meta.glob` (eager) collects all post frontmatter at build time. Exports `allMdxPosts` sorted by `id` descending (newest-first)
- **Post list component:** `src/components/ExcerptList.astro` — filters `allMdxPosts` by `lang`, optional `tag`, and `currentSlug`
- **Tags:** defined in `src/content/tags.ts`. Posts reference tag `id` strings in their `tags[]` frontmatter array. Never invent new tag ids in post frontmatter — only use ids that exist in `tags.ts`
- **Images:** `heroImage` frontmatter field holds a Cloudinary filename (no extension). `astro-cloudinary` resolves it. Background/decorative images use `alt=""`. Hero images require descriptive `alt`
- **Dependencies:** `ExcerptList` → `allMdxPosts`; redirect pages → `allMdxPosts`; RSS feed → `allMdxPosts`

### URL & redirect contracts
| URL pattern | Behaviour |
|---|---|
| `/{lang}/blog/{id}/{slug}/` | Canonical post URL — serves the MDX page |
| `/{lang}/blog/{id}/` | HTTP 301 → canonical slug URL, via `src/pages/{lang}/blog/[id]/index.astro` |
| `/{lang}/blog/{id}/{wrong-slug}/` | 404 page performs client-side redirect to correct canonical URL via `window.__postIndex` |

The `id` is permanent and numeric. The `slug` may change; always redirect from old slugs rather than keeping stale files.

### Frontmatter schema
```yaml
layout: '../../../../layouts/PostLayout.astro'   # required, path relative to file
id: 42                                            # required, unique integer, never reuse
slug: 'my-post-slug'                              # required, URL-safe, kebab-case
lang: 'fi'                                        # required: fi | sv | en
title: 'Post title'                               # required
description: 'Short description'                  # required, used in meta tags
publishDate: '2025-01-01'                         # required, ISO 8601
updatedDate: '2025-06-01'                         # optional, ISO 8601
tags:                                             # required, at least one
  - kirkkonummi
heroImage: cloudinary-filename-no-extension       # required
alt: 'Descriptive alt text'                       # required, non-empty for hero images
```

### Multi-author byline
- Italic byline at end of MDX content: `_Kirjoittajat: Name1 ja Name2._` (fi) / `_Authors: Name1 and Name2._` (en) / `_Skribenter: Name1 och Name2._` (sv)
- List ALL authors including Lauri, alphabetical by last name
- If publication credits follow, separate with a horizontal rule (`---`) between co-author line and publication credits
- No horizontal rule before the co-author line itself

### Anti-Patterns
- Do not create a post without a matching entry in all three locales eventually — stubs are acceptable but the `id` must be reserved across locales
- Do not add a tag id in post frontmatter that is not defined in `src/content/tags.ts` — it silently breaks tag filtering
- Do not use TypeScript syntax in `<script>` blocks in `.astro` layout files — Prettier parses them as plain JS and will fail
- Do not import `allMdxPosts` at runtime in client-side code — it is a build-time-only export
- Do not give two posts the same `id`, even across locales — the redirect pages use `id` as the lookup key

---

## Contract

### Definition of Done
- [ ] Post MDX file exists at `src/pages/{lang}/blog/{id}/{slug}/index.mdx` with all required frontmatter fields
- [ ] `id` is unique across all locales and not previously used
- [ ] All tag ids in `tags[]` exist in `src/content/tags.ts`
- [ ] `heroImage` resolves to an existing Cloudinary asset; `alt` is descriptive
- [ ] Post appears in `ExcerptList` on the blog index page for the correct locale
- [ ] `/{lang}/blog/{id}/` redirects 301 to the canonical slug URL
- [ ] E2E tests pass: `npm run test:e2e`
- [ ] Accessibility scan passes (no axe violations)
- [ ] `npm run build` passes (lint and type-check are enforced by pre-commit hooks and CI)

### Regression Guardrails
- `allMdxPosts` must always be sorted newest-first by `id` — never sort by `publishDate` alone
- The redirect in `src/pages/{lang}/blog/[id]/index.astro` must cover every post `id` for that locale — adding a post without a corresponding redirect page for each locale breaks bare-id URLs
- Tag filtering in `ExcerptList` uses strict string equality against tag `id` — do not change tag ids in `tags.ts` without updating all post frontmatter that references them

### Scenarios

**Scenario: New post is added**
- Given: An MDX file is created at `src/pages/fi/blog/51/my-new-post/index.mdx` with valid frontmatter
- When: The site is built
- Then: The post appears at `/fi/blog/51/my-new-post/`, appears in `ExcerptList` on `/fi/blog/`, and `/fi/blog/51/` redirects 301 to `/fi/blog/51/my-new-post/`

**Scenario: Post slug is changed**
- Given: A post at `/{lang}/blog/{id}/{old-slug}/` has its slug updated in frontmatter to `{new-slug}`
- When: The site is built
- Then: `/{lang}/blog/{id}/{new-slug}/` serves the post; `/{lang}/blog/{id}/` still redirects to the new slug; `/{lang}/blog/{id}/{old-slug}/` hits the 404 page, which client-side redirects to the new canonical URL

**Scenario: Post filtered by tag**
- Given: A post has `tags: [kirkkonummi]` in frontmatter
- When: A visitor navigates to `/{lang}/category/kirkkonummi`
- Then: The post excerpt appears in the list; posts without that tag do not appear

**Scenario: Post with missing tag id**
- Given: A post frontmatter has `tags: [nonexistent-tag]`
- When: The site is built
- Then: The tag filter silently returns zero results for that tag — no build error, but the post is invisible under that category (anti-pattern: always use defined tag ids)
