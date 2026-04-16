# Architecture

Personal homepage of Lauri Lavanti (https://laurilavanti.fi).
Built with **Astro + TypeScript + MDX**. All content is local — no CMS or external content API. Hosted on **Cloudflare Pages**.

Feature-specific specs (blueprint, contracts, scenarios) live at `.agents/specs/{feature}/spec.md`. Current specs:
- [`.agents/specs/posts/spec.md`](./.agents/specs/posts/spec.md) — blog posts
- [`.agents/specs/pages/spec.md`](./.agents/specs/pages/spec.md) — pages (home, about, contact, blog index, category, 404)
- [`.agents/specs/navigation/spec.md`](./.agents/specs/navigation/spec.md) — header nav, mobile/desktop split, language-switch script, skip links
- [`.agents/specs/seo/spec.md`](./.agents/specs/seo/spec.md) — JSON-LD, Open Graph, hreflang, canonical URLs, Twitter cards
- [`.agents/specs/images/spec.md`](./.agents/specs/images/spec.md) — Cloudinary integration, CldImage vs getCldImageUrl, alt text rules
- [`.agents/specs/cv/spec.md`](./.agents/specs/cv/spec.md) — curriculum vitae data files, CvRow type, component hierarchy
- [`.agents/specs/tags/spec.md`](./.agents/specs/tags/spec.md) — tag taxonomy, category page generation, silent failure on unknown ids
- [`.agents/specs/rss/spec.md`](./.agents/specs/rss/spec.md) — RSS feed endpoints, item structure, locale filtering
- [`.agents/specs/design-system/spec.md`](./.agents/specs/design-system/spec.md) — design tokens, define:vars pattern, spacing/colour/typography constants
- [`.agents/specs/recommendations/spec.md`](./.agents/specs/recommendations/spec.md) — recommendations page, Recommendation data type, single Finnish-only data file shared across locales

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Astro (static output) |
| Content | MDX files (local, no CMS) |
| Language | TypeScript |
| Styling | CSS (scoped in components) |
| Images | Cloudinary (via `astro-cloudinary`) |
| Icons | `astro-icon` + `@iconify-json/fa7-brands` |
| Hosting | Cloudflare Pages |
| Unit tests | Vitest + happy-dom |
| E2E tests | Playwright |
| Linting | ESLint + Prettier |

---

## Content structure

All content lives as MDX files under `src/pages/` in locale subdirectories.

```
src/pages/
  fi/
    index.mdx                        # home page
    {page}/index.mdx                 # about, contact, blog index, ...
    blog/{id}/{slug}/index.mdx       # blog posts
  sv/  (same structure)
  en/  (same structure)
```

Blog posts use a two-segment URL: a stable numeric `id` and a human-readable `slug`. The `id` never changes; the `slug` can.

---

## Layouts

Every MDX file declares a `layout:` in its frontmatter. There are three layouts plus a shared base.

| Layout | Used by | Props source |
|---|---|---|
| `FrontPageLayout.astro` | `{lang}/index.mdx` | `MDXLayoutProps<Frontmatter>` only |
| `PostLayout.astro` | All blog post MDX | `MDXLayoutProps<Frontmatter>` only |
| `PageLayout.astro` | About/contact/blog-index MDX **and** `.astro` files (404, category pages) | Dual-mode: `(Astro.props.frontmatter as Props \| undefined) ?? Astro.props` |
| `BaseLayout.astro` | Used by the three layouts above | Direct `.astro` props |

**Why dual-mode for PageLayout?** It is called both from MDX (where Astro injects props under `frontmatter`) and directly from `.astro` files (where props are at the top level). The pattern `(Astro.props.frontmatter as Props | undefined) ?? Astro.props` handles both cases.

---

## Images

All images are hosted on **Cloudinary** — there are no local image files in the repository.

- MDX frontmatter references images by their Cloudinary filename (no extension), e.g.:
  ```yaml
  heroImage: Lauri-Lavanti-nojaamassa-kasiin
  backgroundImage: Kirkkonummen-keskusta
  ```
- `astro-cloudinary` resolves and optimises these at build time.
- Background/decorative images: `alt=""`.
- Hero/portrait images: require descriptive `alt` text.

---

## Tags

Defined in `src/content/tags.ts` as `LocalTag[]` with `id` and `names: { fi, sv, en }`.

- **Never add tags anywhere else** — this is the single source of truth.
- `buildTagCollection(lang)` returns a `TagCollection`-compatible object for components.

---

## MDX posts helper

`src/lib/mdxPosts.ts` collects all blog post frontmatter at build time:

```ts
import.meta.glob<GlobResult>('../pages/*/blog/*/*/index.mdx', { eager: true })
```

Exports `allMdxPosts` sorted newest-first. Use this whenever you need to list or filter posts at build time.

---

## i18n / language switching

- Three locales: `fi`, `sv`, `en`.
- Nav links that switch language have `switchToLang?: Lang` in `src/content/nav.ts` → rendered with `data-switch-to-lang` attribute.
- An **inline script in `BaseLayout.astro`** rewrites those hrefs on page load by replacing the locale prefix in `window.location.pathname`. This is intentionally simple — no i18n library.

---

## Blog URL redirects

| From | To | Mechanism |
|---|---|---|
| `/{lang}/blog/{id}/` | `/{lang}/blog/{id}/{slug}/` | HTTP 301 via `src/pages/{lang}/blog/[id]/index.astro` (one file per locale) |
| `/{lang}/blog/{id}/{wrong-slug}/` | correct canonical URL | Client-side JS on 404 page using `window.__postIndex` lookup table |

---

## ExcerptList

`src/components/ExcerptList.astro` — renders a list of post excerpts.

- Merges MDX posts (from `allMdxPosts`) with any Contentful entries (legacy/future).
- Filters by `lang`, `tag`, and `currentSlug`.
- Accepts optional `limit` prop.
- Data flow: layout → `FrontPageExcerptList` → `ExcerptList` → `Excerpt` → `Meta`.

---

## Inline scripts in `.astro` files

Prettier parses `<script>` blocks as plain JavaScript — **TypeScript syntax causes parse errors**.

Use this pattern for scripts with complex logic:

```astro
<script is:inline set:html={`
    // plain JS only — no TypeScript
    var foo = 'bar'
    document.querySelectorAll('a').forEach(function(el) { ... })
`} />
```

For passing server-side data to a script:

```astro
---
const dataJson = JSON.stringify(someData)
---
<script is:inline set:html={'window.__data=' + dataJson + ';'} />
<script is:inline set:html={`(function() { var d = window.__data; ... })()`} />
```

---

## Code style constraints

| Rule | Detail |
|---|---|
| Linter | ESLint + Prettier — enforced by lint-staged on commit and CI |
| Import order | `simple-import-sort` — fix with `npx eslint --fix` |
| Blank line before `return` | Required by `@stylistic/padding-line-between-statements` |
| Attribute order | `astro/sort-attributes` — attributes must be alphabetically sorted |
| No `var` | Use `let`/`const` in normal code; `var` is acceptable only inside `is:inline set:html` strings (not parsed by ESLint) |
| No `_` to silence errors | Use proper error handling instead |
| No secrets in commits | `.env` files, tokens, credentials — never commit |

---

## Testing

### Unit tests (Vitest)
- Files: `*.spec.ts` alongside source files in `src/`.
- Environment: `happy-dom`.

### E2E tests (Playwright)
- Files: `tests/e2e/`.
- Pattern: **Page Object Model** — base class `AnyPage`, extended per page.
- `isMobile` flag: selects `nth(0)` (mobile nav) vs `nth(1)` (desktop nav) elements.
- **Web server**: `playwright.config.ts` runs `npm run build && npm run preview` on `:4321` automatically. Do not start a server manually.
  - `reuseExistingServer: !process.env.CI` — reuses a running server locally, always starts fresh on CI.
- **Snapshots**: aria snapshots + screenshot snapshots. After any DOM or visual change, update snapshots before committing:
  ```bash
  npm run test:e2e -- --update-snapshots
  ```

