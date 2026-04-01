# Feature: SEO & Metadata

## Blueprint

### Context
Every page emits structured metadata for search engines and social platforms: JSON-LD schema, Open Graph tags, hreflang alternate links, canonical URLs, and Twitter/X card tags. All of this is generated in `Head.astro` at build time.

### Architecture
- **Entry point:** `src/components/Head.astro` — consumes props from `BaseLayout`, generates all `<head>` content
- **JSON-LD types:** defined in `src/lib/jsonld.ts` as typed constants:
  ```ts
  BLOGPOSTING = 'BlogPosting'
  PERSON      = 'Person'
  WEBPAGE     = 'WebPage'
  WEBSITE     = 'WebSite'
  ```
  If `type` is missing or not in `JSON_LD_TYPES`, the schema falls back to `WebSite`.
- **Schema fields by type:**

  | Type | Extra fields |
  |---|---|
  | `BlogPosting` | `datePublished`, `dateModified`, `mainEntityOfPage` |
  | `WebSite` | `name`, `sameAs` (all social profiles) |
  | `Person` | `jobTitle` (locale-specific), `description` (locale-specific), `knowsAbout[]`, `memberOf` (PoliticalParty), `sameAs` |
  | `WebPage` | no extras (base fields only) |

- **Supplemental FAQPage schema:** When a `BlogPosting` page includes a `faq` prop with 2 or more `{q, a}` entries, a second `<script type="application/ld+json">` block is emitted with `@type: FAQPage`. This block coexists alongside the primary `BlogPosting` schema — it does not replace it. The `FAQPAGE` constant is exported from `src/lib/jsonld.ts` but is **not** added to `JSON_LD_TYPES` (which lists only primary page types). The `faq` prop flows from MDX frontmatter → `PostLayout` → `BaseLayout` → `Head`.

- **All schemas always include:** `@context`, `@type`, `author`, `description`, `headline`, `url`, and `image` (if `ogImage` provided)

- **Canonical URL derivation:**
  - `slug === 'index'` → `Astro.site` (site root)
  - `slug` present → `new URL(slug + '/', Astro.site)`
  - `slug` absent → no canonical tag

- **hreflang generation:** When `langAlternates` is provided (blog posts), uses the pre-computed per-locale URLs directly. Otherwise swaps the leading locale segment of `slug` for each language:
  ```ts
  // With langAlternates (PostLayout sets this for blog posts):
  new URL(langAlternates[l], Astro.site)
  // Fallback for non-post pages:
  slug.replace(/^(fi|sv|en)/, l) + '/'
  ```
  All three locales always get an `alternate` link, including the current page's own locale (x-default is not emitted separately).
- **`langAlternates` prop:** Optional `Record<Lang, string>` passed from `PostLayout` via `BaseLayout`. Contains the canonical path for each locale (e.g. `/sv/blog/10/sote-ar-valfardssallets-hordsten/`). When absent, the regex-swap fallback is used.

- **og:image:** Passed in as a pre-computed URL string from the layout. Layouts use `getCldImageUrl` from `astro-cloudinary/helpers` to generate a 1200×630 fill crop. `Head.astro` does not call Cloudinary — it only emits the URL it receives.

- **Title format:** `title === 'Lauri Lavanti' ? title : `${title} | Lauri Lavanti``
- **Title length:** The final rendered `<title>` must be 50–60 characters inclusive. Measured after stripping soft-hyphen characters (`\u00AD`) and applying the suffix rule. Enforced at build time by `scripts/validate-titles.mjs`.

- **og:type:** `'article'` for `BlogPosting`, `'website'` for everything else

- **Twitter card:** `summary_large_image` when `ogImage` is set, `summary` otherwise

- **Prop flow:** `MDX frontmatter` → layout (FrontPageLayout / PostLayout / PageLayout) → `BaseLayout` → `Head`

- **Dependencies:** `Head` depends on `src/lib/jsonld.ts` for type constants. Layouts depend on `getCldImageUrl` from `astro-cloudinary/helpers` for og:image URL generation.

### Anti-Patterns
- Do not call `getCldImageUrl` inside `Head.astro` — it must receive a pre-computed URL string; image URL generation is the layout's responsibility
- Do not add a new **primary** JSON-LD type (set via the `type` prop on `Head`) without: (1) adding the constant to `src/lib/jsonld.ts`, (2) adding it to `JSON_LD_TYPES`, (3) defining which extra fields it emits in `Head.astro`. Supplemental/secondary schema types (e.g. `FAQPage`) that coexist alongside the primary type are exported as constants from `jsonld.ts` but must **not** be added to `JSON_LD_TYPES` — they are emitted as separate `<script>` blocks via dedicated props, not via the `type` prop
- Do not hardcode social profile URLs in `Head.astro` outside the defined constants — keep them in the named variables so they're easy to update
- Do not set `slug` to a value that includes a trailing slash — the canonical URL builder appends one
- Do not emit `x-default` hreflang separately — the current locale is included in the three hreflang links already
- Do not use `type === undefined` to mean "no schema" — an undefined type renders a `WebSite` schema, which is correct for pages without an explicit type

---

## Contract

### Definition of Done
- [ ] Every page has `<title>`, `<meta name="description">`, `<link rel="canonical">`, and three `<link rel="alternate" hreflang>` tags
- [ ] `BlogPosting` pages have `datePublished` and `dateModified` in JSON-LD
- [ ] `Person` pages have locale-specific `jobTitle` and `description` in JSON-LD
- [ ] `WebSite` pages include `sameAs` with all social profile URLs
- [ ] Pages with `heroImage` emit `og:image` at 1200×630
- [ ] `og:type` is `article` for posts, `website` for all other pages
- [ ] Twitter card is `summary_large_image` when image present, `summary` otherwise
- [ ] `npm run test` passes (jsonld.spec.ts validates type constants)
- [ ] Every page `<title>` is 50–60 characters (soft hyphens stripped, suffix applied); confirmed by `npm run validate-titles`

### Regression Guardrails
- `JSON_LD_TYPES` must stay in sync with the constants exported from `jsonld.ts` — the spec test enforces this
- The hreflang regex `^(fi|sv|en)` must match all active locales — adding a fourth locale requires updating this regex
- `dateModified` falls back to `createdAt` when `updatedDate` is absent — do not change this fallback or past posts will lose their modification date

### Scenarios

**Scenario: Blog post page metadata**
- Given: A post with `heroImage`, `publishDate: '2024-01-01'`, `updatedDate: '2024-06-01'`, `lang: 'fi'`, `id: 10`
- When: The page is built
- Then: JSON-LD type is `BlogPosting`; `datePublished` is `2024-01-01`; `dateModified` is `2024-06-01`; `og:type` is `article`; `og:image` is a 1200×630 Cloudinary fill URL; Twitter card is `summary_large_image`; three hreflang links point to the correct translated slugs from `langAlternates` (not a prefix swap)

**Scenario: Home page (Person type) metadata**
- Given: `src/pages/fi/index.mdx` with `type: 'Person'`, `slug: 'fi'`
- When: The page is built
- Then: JSON-LD type is `Person`; `jobTitle` is the Finnish value `'Kansanedustajaehdokas'`; `memberOf` is `Vihreä liitto`; canonical URL is `https://laurilavanti.fi/fi/`; hreflang for `sv` points to `https://laurilavanti.fi/sv/`

**Scenario: Page without slug**
- Given: A page rendered without a `slug` prop
- When: The page is built
- Then: No `<link rel="canonical">` is emitted; no `og:url` is emitted; hreflang links are not emitted

**Scenario: Missing or unknown type**
- Given: A page passes `type: undefined` or an unknown string
- When: `Head.astro` processes it
- Then: JSON-LD `@type` falls back to `WebSite`; no type-specific extra fields are added

**Scenario: Title formatting**
- Given: A page with `title: 'Laurista'`
- When: The `<title>` tag is rendered
- Then: It reads `Laurista | Lauri Lavanti`; if `title` is `'Lauri Lavanti'`, it reads just `Lauri Lavanti`

**Scenario: Blog post with FAQPage schema**
- Given: A `BlogPosting` page with `faq: [{q: '...', a: '...'}, {q: '...', a: '...'}]`
- When: The page is built
- Then: Two `<script type="application/ld+json">` blocks are emitted — the first with `@type: BlogPosting`, the second with `@type: FAQPage`. The FAQPage block has `mainEntity` with one `Question` per entry, each with an `acceptedAnswer`.

**Scenario: Title length enforcement**
- Given: An MDX file whose rendered title is outside 50–60 chars
- When: `npm run validate-titles` or `npm run build` is run
- Then: Script exits 1 and prints `ERROR: title length N (expected 50–60): "…" — src/pages/…/index.mdx`

**Scenario: FAQPage not emitted with fewer than 2 entries**
- Given: A `BlogPosting` page with `faq: [{q: '...', a: '...'}]` (only one entry)
- When: The page is built
- Then: Only the primary `BlogPosting` JSON-LD block is emitted; no FAQPage block appears.

**Scenario: Person page with FAQPage schema and visible FAQ section**
- Given: A page with `type: 'Person'` and `faq` with 2+ entries (e.g. home or about page)
- When: The page is built
- Then: Two `<script type="application/ld+json">` blocks are emitted — the first with `@type: Person`, the second with `@type: FAQPage`. A visible `<FaqSection>` (localised `<h2>` heading + `<dl>`/`<dt>`/`<dd>` pairs) is also rendered at the bottom of the article, above the footer. The `faq` prop flows from MDX frontmatter → `FrontPageLayout` or `PageLayout` → `BaseLayout` → `Head` (JSON-LD) and `FaqSection` (HTML). Blog posts with `faq` frontmatter do NOT get a visible `FaqSection` (the `type !== BlogPosting` guard in `BaseLayout` prevents it) — their FAQ content is already present as H2 sections in the article body.
