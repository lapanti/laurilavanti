# CLAUDE.md — Project guide for AI assistants

## Project overview

Personal homepage of Lauri Lavanti (https://laurilavanti.fi). Built with Astro + TypeScript + MDX. All content is local — no CMS or external content API. Hosted on Cloudflare Pages.

## Commands

```bash
npm run dev          # dev server
npm run build        # production build
npm run preview      # preview build locally
npm run test         # Vitest unit tests
npm run test:e2e     # Playwright e2e tests
npm run lint         # ESLint + Prettier check
npm run check        # Astro TypeScript type check
```

## Key architecture decisions

### Content

- All content lives as MDX files in `src/pages/` under locale subdirectories (`fi/`, `sv/`, `en/`).
- Blog posts: `src/pages/{lang}/blog/{id}/{slug}/index.mdx`
- Other pages: `src/pages/{lang}/{page}/index.mdx`
- Home pages: `src/pages/{lang}/index.mdx`

### Layouts (MDX layout: frontmatter)

| Layout | Used by | Props pattern |
|---|---|---|
| `FrontPageLayout.astro` | `{lang}/index.mdx` | `MDXLayoutProps<Frontmatter>` only |
| `PostLayout.astro` | All blog post MDX | `MDXLayoutProps<Frontmatter>` only |
| `PageLayout.astro` | About/contact/blog-index MDX + `.astro` files (404, category pages) | Dual-mode: `(Astro.props.frontmatter as Props \| undefined) ?? Astro.props` |
| `BaseLayout.astro` | Used by all three layouts above | Direct `.astro` props |

### Images

- Local images in `src/images/` (hero portraits) and `src/images/backgroundImages/` (post hero images).
- Resolved at build time via `import.meta.glob` — **no dynamic imports at runtime**.
- Referenced in MDX frontmatter as filenames: `localHeroImage`, `localCroppedHeroImage`, `localBackgroundImage`.
- Background images use `alt=""` (decorative). Hero/portrait images need descriptive `localAlt`.

### Tags

Defined locally in `src/content/tags.ts` as `LocalTag[]` with `id` and `names: { fi, sv, en }`.
`buildTagCollection(lang)` builds a `TagCollection`-compatible object for components that expect it.

### MDX posts helper

`src/lib/mdxPosts.ts` — uses `import.meta.glob` (eager) to collect all blog post frontmatter at build time. Exports `allMdxPosts` sorted newest-first.

### i18n / language switching

- Three locales: `fi`, `sv`, `en`.
- Nav links with `switchToLang` in `src/content/nav.ts` get `data-switch-to-lang` attribute.
- An inline script in `BaseLayout.astro` rewrites those link hrefs by replacing the locale prefix in `window.location.pathname` on page load.

### Blog post URL redirects

- `/{lang}/blog/{id}/` → 301 to canonical slug URL via `src/pages/{lang}/blog/[id]/index.astro` (one per locale).
- `/{lang}/blog/{id}/{wrong-slug}/` → client-side redirect on 404 page via `window.__postIndex` lookup table.

### ExcerptList

`src/components/ExcerptList.astro` — merges MDX posts (from `allMdxPosts`) with any Contentful entries. Filters by `lang`, `tag`, and `currentSlug`. Accepts `limit` prop.

## Code style conventions

- **ESLint + Prettier** — always run `npm run lint` before committing.
- **Import order**: managed by `simple-import-sort`. Run `npx eslint --fix` when order is wrong.
- **`<script>` blocks in `.astro`**: Prettier parses them as plain JS — no TypeScript syntax. Use `is:inline` + `set:html` with template literal strings for scripts that need TS-incompatible syntax.
- **Blank line before `return`** required by `@stylistic/padding-line-between-statements`.
- **Attribute order in Astro components**: enforced by `astro/sort-attributes`.

## Testing

- **Unit tests**: Vitest in `src/` (`.spec.ts` files alongside source).
- **E2E tests**: Playwright in `tests/e2e/`. Uses Page Object Model — base class `AnyPage`, extended per page. `isMobile` flag selects nth(0) vs nth(1) nav elements.
- **Snapshots**: aria snapshots and screenshot snapshots — update with `--update-snapshots` flag when UI changes intentionally.

## No environment variables needed

All content is local. No `.env` file required for development.
