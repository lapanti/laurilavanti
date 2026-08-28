# Spec: LCP Delivery (hero preload, HTML caching, font payload)

> **Pattern**: [The Spec](https://asdlc.io/patterns/the-spec) — Living document, permanent source of truth.
> **Status**: `Active`
> **Last updated**: 2026-08-28

---

## Intent

Post-page LCP is ~4.6 s on preview, of which the hero image accounts for ~3.3 s. Every hero already carries `fetchpriority="high"`, but the browser only discovers the image once the parser reaches the `<img>` — after ~53 KB of inlined CSS and the full head. A `<link rel="preload" as="image">` in the head starts the hero fetch alongside the fonts, directly attacking the largest LCP component. Top Google ranking is the site goal; LCP is the heaviest Core Web Vital lever this site has left.

Two smaller delivery gaps ride along: HTML documents have no explicit `Cache-Control` (inheriting Cloudflare Pages defaults), and seven `.ttf` fallback files ship in `public/fonts/` although every supported browser takes the woff2 source.

The preload must be generated from the **same srcset data as the `<img>` markup** — a drifted preload silently double-downloads instead of speeding anything up.

---

## Scope

### In scope
- Shared hero srcset configuration in `src/lib/images.ts` consumed by both the hero components and the preload links.
- `<slot name="head" />` in `BaseLayout.astro` as the injection point (leaves `Head.astro`'s API untouched).
- Preload links for every hero-bearing layout: `PostLayout`, `PageLayout` (both variants), `FrontPageLayout`.
- `Cache-Control: public, max-age=0, must-revalidate` for HTML via `public/_headers`.
- Removal of `.ttf` fallbacks from `@font-face` and `public/fonts/`.
- `scripts/checks/dist-head.ts` assertion that preload and `<img>` srcset stay byte-equal.

### Out of scope
- `Head.astro` props, JSON-LD, hreflang (unchanged).
- `getImageSrcset` URL format — live Cloudflare Images URLs; format change cold-caches every image.
- Lighthouse CI thresholds (#1382).
- CSS inlining strategy (`build.inlineStylesheets: 'always'` stays).

---

## Contract

```gherkin
Feature: LCP hero preload and delivery hardening

  Scenario: Post page preloads its hero
    Given a built post page with a heroImage
    When the head is inspected
    Then it contains exactly one link rel="preload" as="image" fetchpriority="high"
    And the link has no crossorigin and no href attribute
    And its imagesrcset equals the hero img's srcset byte-for-byte
    And its imagesizes equals "(max-width: 1223px) 100vw, 1224px"

  Scenario: Front page preloads the art-directed pair
    Given the built front page with heroImage and mobileHeroImage
    When the head is inspected
    Then it contains two image preloads with media "(max-width: 768px)" and "(min-width: 769px)"
    And the media conditions match the picture source boundary exactly
    And the mobile preload mirrors the img (heroLandscape srcset, imagesizes "100vw")
    And the desktop preload mirrors the source (heroPortrait srcset, imagesizes "470px")

  Scenario: Split page preloads the art-directed pair
    Given a built page using PageLayout variant="split" with both hero images
    Then the same media-gated pair as the front page is emitted

  Scenario: Page-variant page preloads its hero
    Given a built page using PageLayout variant="page" with a heroImage
    Then one preload mirrors titleBanner/Image.astro (hero srcset, imagesizes "(max-width: 1199px) 100vw, 50vw")

  Scenario: Hero without preload data emits nothing
    Given a page whose layout receives no heroImage
    When the head is inspected
    Then no image preload link is present

  Scenario: Single hero fetch per viewport
    Given any hero-bearing page loaded at 360, 768, 769, and 1440 px viewports
    When the network log is inspected
    Then each hero image URL is fetched exactly once
    And the fetch initiator is the preload link

  Scenario: HTML revalidates, assets stay immutable
    Given a deployed build
    When response headers are inspected
    Then HTML documents carry "public, max-age=0, must-revalidate"
    And /_astro/* and /fonts/* still carry "public, max-age=31536000, immutable"

  Scenario: No .ttf fallbacks
    Given the built site
    Then no @font-face src references .ttf
    And public/fonts/ contains no .ttf files
    And all pages render with the same fonts as before (woff2)

  Scenario: Drift guard
    Given a hero component's srcset widths or sizes change without the shared config
    When scripts/checks/dist-head.ts runs against dist
    Then the check fails on the preload/img mismatch
```

---

## Data Model

```typescript
// src/lib/images.ts — single source of truth for hero responsive configs
interface HeroSrcsetConfig {
    sizes: string          // the <img>/<source> sizes value, reused as imagesizes
    variant: string        // VARIANTS key
    widths: number[]       // srcset widths
}

export const HERO_CONFIGS = {
    // HeroMedia.astro (post) + titleBanner/Image.astro (page) share variant+widths, differ in sizes
    postHero:  { sizes: '(max-width: 1223px) 100vw, 1224px', variant: 'hero', widths: [864, 1080, 1296, 1728] },
    pageHero:  { sizes: '(max-width: 1199px) 100vw, 50vw',   variant: 'hero', widths: [864, 1080, 1296, 1728] },
    portrait:  { sizes: '470px',  variant: 'heroPortrait',  widths: [560, 720, 1120, 1680] },  // picture <source>
    landscape: { sizes: '100vw',  variant: 'heroLandscape', widths: [560, 750, 1120, 1680] },  // picture <img>
    single:    { sizes: '(max-width: 768px) 100vw, 470px', variant: 'heroPortrait', widths: [560, 720, 1120, 1680] }, // Images.astro fallback branch
} as const satisfies Record<string, HeroSrcsetConfig>

export function getHeroPreload(slug: string, config: HeroSrcsetConfig): { imagesizes: string; imagesrcset: string }
```

Preload link shape (all cases):

| Attribute | Value | Why |
|---|---|---|
| `rel` / `as` | `preload` / `image` | |
| `fetchpriority` | `high` | matches the `<img>` |
| `imagesrcset` / `imagesizes` | byte-equal to the `<img>`/`<source>` | drift = double download |
| `media` | only on the front-page/split pair; `(max-width: 768px)` / `(min-width: 769px)` | mutually exclusive, mirrors the `<source>` boundary |
| `crossorigin` | **absent** | image fetch is no-cors; mismatch double-downloads (fonts differ — they need it) |
| `href` | **absent** | browsers without `imagesrcset` support skip the preload instead of fetching the largest width |

---

## Dependencies

- [Images](./images/spec.md) — variant definitions and `getImageSrcset`; its usage table must be updated to the shared configs as part of this work.
- GitHub issue #1379 (directive), #1382 (consumes the resulting LCP headroom for tighter CI budgets).

---

## Anti-patterns

- **Do not** add `crossorigin` to an image preload — the `<img>` fetch is no-cors, and a credentials-mode mismatch makes the browser fetch the image twice.
- **Do not** give the preload an `href` fallback — legacy browsers would download the 1728w image on every viewport.
- **Do not** write srcset widths or sizes literals in a layout or hero component — always import from `HERO_CONFIGS`; the dist-head check exists to catch this.
- **Do not** reorder `public/_headers` — the `/*` HTML rule must precede `/_astro/*` and `/fonts/*`, or later matching rules lose `immutable`.
- **Do not** delete the `.ttf` files without removing their `url()` entries from `@font-face` in the same commit (`GlobalStyle.astro` L97–193).

---

## Open Questions

_None._

---

## Changelog

| Date | Change |
|------|--------|
| 2026-08-28 | Initial draft (issue #1379) |
| 2026-08-28 | Approved by author — status Active (PR #1384) |
