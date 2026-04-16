# Feature: Pages

## Blueprint

### Context
Static informational pages (home, about, contact, blog index, tag/category pages, 404) form the navigational skeleton of the site. They must render correctly in all three locales, be accessible, and support language switching via the nav.

### Architecture
- **File location:** `src/pages/{lang}/{page}/index.mdx` for MDX pages; `src/pages/{lang}/{page}/[param].astro` for dynamic pages (e.g. category)
- **Home page:** `src/pages/{lang}/index.mdx` — uses `FrontPageLayout.astro`. Props arrive as `MDXLayoutProps<Frontmatter>` only
- **Content pages (about, contact, blog index):** use `PageLayout.astro` via `layout:` frontmatter. Props arrive as `MDXLayoutProps<Frontmatter>`
- **Dynamic/programmatic pages (404, category/tag pages):** use `PageLayout.astro` directly from `.astro` files. Props passed directly (not via `frontmatter` wrapper). PageLayout handles both modes: `(Astro.props.frontmatter as Props | undefined) ?? Astro.props`
- **Base layout:** `BaseLayout.astro` is used by all three layouts above and handles `<head>`, nav, footer, and language-switching script
- **Navigation:** defined in `src/content/nav.ts`. Links with `switchToLang` get `data-switch-to-lang` attribute; `BaseLayout.astro` inline script rewrites those hrefs on page load by replacing the locale prefix in `window.location.pathname`
- **Blog index page:** renders `<FrontPageExcerptList>` which feeds into `ExcerptList` → `allMdxPosts`
- **Category/tag pages:** `src/pages/{lang}/category/[tag].astro` — `getStaticPaths` from `tags.ts`, renders `ExcerptList` filtered by tag
- **404 page:** `src/pages/404.astro` — contains `window.__postIndex` lookup table for client-side wrong-slug redirect
- **Dependencies:** all pages depend on `BaseLayout.astro`; blog index and category pages depend on `allMdxPosts`; nav language switch depends on locale prefix conventions

### Frontmatter schema (MDX pages)
```yaml
layout: '../../../layouts/PageLayout.astro'   # or FrontPageLayout, path relative to file
lang: 'fi'                                    # required: fi | sv | en
title: 'Page title'                           # required
description: 'Short description'              # required, used in meta tags
slug: 'fi/about'                              # required, used for canonical URL and nav active state
type: 'WebPage'                               # required for JSON-LD: WebPage | Person | Blog | etc.
heroImage: cloudinary-filename-no-extension   # required for pages with a hero banner
alt: 'Descriptive alt text'                   # required when heroImage is set
```

Home page additionally uses:
```yaml
heroBanner: true
secondaryTitle: 'Subtitle text'
backgroundImage: cloudinary-filename-no-extension
```

### Anti-Patterns
- Do not use `FrontPageLayout` or `PostLayout` for anything other than their designated page types — layout prop modes are incompatible
- Do not add nav links directly in `.astro` files — always update `src/content/nav.ts` so the language-switch script can manage them
- Do not hardcode locale strings in category or 404 pages — derive from `tags.ts` or `allMdxPosts` so all locales stay in sync
- Do not use TypeScript syntax inside `<script>` blocks in `.astro` files — Prettier parses them as plain JS
- Do not add a new locale without creating the full set of pages (`index.mdx`, `about`, `contact`, `blog` index, `[id]/index.astro` redirect, `category/[tag].astro`)

---

## Contract

### Definition of Done
- [ ] Page file exists at the correct path for each required locale
- [ ] All required frontmatter fields are present and valid
- [ ] Page renders in all three locales without build errors
- [ ] Nav language-switch links work: clicking a `data-switch-to-lang` link lands on the equivalent page in the target locale
- [ ] Active nav link has `aria-current="page"`
- [ ] E2E tests pass for the page: `npm run test:e2e`
- [ ] Accessibility scan passes (no axe violations)
- [ ] `npm run build` passes (lint and type-check are enforced by pre-commit hooks and CI)
- [ ] If DOM structure changed: snapshots updated before commit (`npm run test:e2e -- --update-snapshots`)

### Regression Guardrails
- `PageLayout` dual-mode prop resolution (`frontmatter ?? Astro.props`) must not be simplified — removing either branch breaks either MDX pages or `.astro` pages
- The nav language-switch script in `BaseLayout.astro` must only do a prefix swap — it must not attempt to resolve translated slugs or it will break for pages whose path differs across locales
- Category pages must only use tag ids from `src/content/tags.ts` — `getStaticPaths` is derived from `tags`, so an id mismatch causes a missing page at build time
- The 404 page's `window.__postIndex` must be regenerated on every build — it must not be a static file

### Scenarios

**Scenario: Home page renders with hero and nav**
- Given: The visitor navigates to `/fi/`
- When: The page loads
- Then: The hero banner is visible, nav links to about/blog/contact are present, the home nav link has `aria-current="page"`, footer social links are visible

**Scenario: Language switch from Finnish to Swedish**
- Given: The visitor is on `/fi/about/`
- When: They click the Swedish language nav link
- Then: They land on `/sv/about/` (the Swedish home page, since the script only swaps the locale prefix and `/fi/about/` becomes `/sv/about/` — which exists)

**Scenario: Category page shows only tagged posts**
- Given: The tag `kirkkonummi` exists in `tags.ts` and several posts have it in their `tags[]`
- When: A visitor navigates to `/fi/category/kirkkonummi`
- Then: Only posts tagged `kirkkonummi` appear in the excerpt list; the page title reflects the Finnish tag name

**Scenario: 404 wrong-slug redirect**
- Given: A post exists at `/fi/blog/10/sote-on-hyvinvointiyhteiskunnan-kulmakivi/`
- When: A visitor lands on `/fi/blog/10/old-wrong-slug/`
- Then: The 404 page loads and client-side JS immediately redirects to `/fi/blog/10/sote-on-hyvinvointiyhteiskunnan-kulmakivi/`

**Scenario: New locale added**
- Given: A new locale `de` is to be added
- When: Implementation begins
- Then: Files required before the locale is usable: `src/pages/de/index.mdx`, `src/pages/de/about/index.mdx`, `src/pages/de/contact/index.mdx`, `src/pages/de/blog/index.mdx`, `src/pages/de/blog/[id]/index.astro`, `src/pages/de/category/[tag].astro`; nav entries added to `src/content/nav.ts`; `lang` type union in `src/lib/mdxPosts.ts` extended to include `'de'`
