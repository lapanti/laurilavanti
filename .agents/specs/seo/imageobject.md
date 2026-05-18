# Spec: BlogPosting ImageObject in JSON-LD

> **Pattern**: [The Spec](https://asdlc.io/patterns/the-spec) — Living document, permanent source of truth.
> **Status**: `Active`
> **Last updated**: 2026-05-18
> **Issue**: [#1224](https://github.com/lapanti/laurilavanti/issues/1224)

---

## Intent

Google's structured data guidelines for `Article`/`BlogPosting` require the `image` field to be an `ImageObject` — not a bare URL string — so that the page is eligible for Google Images rich results and image carousels. Without the `@type: 'ImageObject'` wrapper and explicit dimensions, Google's Rich Results Test flags the field as suboptimal and may not surface the post image in image search.

Adding `primaryImageOfPage` alongside `image` signals which image is the canonical representative of the page. Google uses this hint for image indexing and featured-snippet selection. Both fields carry the same `ImageObject` shape and the same 1200×630 dimensions already used for `og:image`.

The change is narrowly scoped to `BlogPosting` type only and only when `ogImageUrl` is present. No other schema type is affected, and no image generation logic is touched.

---

## Scope

### In scope
- Replace `image: ogImageUrl` (bare string) with `image: { '@type': 'ImageObject', url: ogImageUrl, width: 1200, height: 630 }` for `BlogPosting` type
- Add `primaryImageOfPage: { '@type': 'ImageObject', url: ogImageUrl, width: 1200, height: 630 }` to the `BlogPosting` spread
- Only when `ogImageUrl` is present — no change when image is absent
- Update `Head.spec.ts` with assertions for `ImageObject` shape

### Out of scope
- Changing image generation or Cloudinary URLs
- Adding `primaryImageOfPage` or `ImageObject` to non-`BlogPosting` types
- Changing `ogImageAlt` handling
- Adding `contentUrl`, `encodingFormat`, or other `ImageObject` properties beyond `@type`, `url`, `width`, `height`

---

## Contract

```gherkin
Feature: BlogPosting ImageObject in JSON-LD

  Scenario: BlogPosting with image emits ImageObject for both image and primaryImageOfPage
    Given Head is rendered with type "BlogPosting"
    And ogImage is a valid URL string
    And createdAt is set
    When the primary JSON-LD script tag is parsed
    Then jsonLd["@type"] equals "BlogPosting"
    And jsonLd.image["@type"] equals "ImageObject"
    And jsonLd.image.url equals the ogImage URL
    And jsonLd.image.width equals 1200
    And jsonLd.image.height equals 630
    And jsonLd.primaryImageOfPage["@type"] equals "ImageObject"
    And jsonLd.primaryImageOfPage.url equals the ogImage URL
    And jsonLd.primaryImageOfPage.width equals 1200
    And jsonLd.primaryImageOfPage.height equals 630

  Scenario: BlogPosting without image emits neither image nor primaryImageOfPage
    Given Head is rendered with type "BlogPosting"
    And ogImage is undefined
    And createdAt is set
    When the primary JSON-LD script tag is parsed
    Then jsonLd["@type"] equals "BlogPosting"
    And jsonLd.image is undefined
    And jsonLd.primaryImageOfPage is undefined

  Scenario: Non-BlogPosting type with image emits bare string image, no primaryImageOfPage
    Given Head is rendered with type "WebSite"
    And ogImage is a valid URL string
    When the primary JSON-LD script tag is parsed
    Then jsonLd["@type"] equals "WebSite"
    And jsonLd.image equals the ogImage URL string
    And typeof jsonLd.image equals "string"
    And jsonLd.primaryImageOfPage is undefined

  Scenario: Non-BlogPosting type without image emits no image field
    Given Head is rendered with type "WebSite"
    And ogImage is undefined
    When the primary JSON-LD script tag is parsed
    Then jsonLd["@type"] equals "WebSite"
    And jsonLd.image is undefined

  Scenario: BlogPosting ImageObject does not affect other BlogPosting fields
    Given Head is rendered with type "BlogPosting"
    And ogImage is a valid URL string
    And createdAt is "2024-03-01"
    And updatedAt is "2024-06-01"
    When the primary JSON-LD script tag is parsed
    Then jsonLd.datePublished equals "2024-03-01"
    And jsonLd.dateModified equals "2024-06-01"
    And jsonLd.mainEntityOfPage["@type"] equals "WebPage"
```

---

## Data Model

```typescript
interface ImageObject {
  '@type': 'ImageObject'
  url: string       // ogImageUrl value, unchanged
  width: 1200       // hard-coded — og:image is always 1200px wide
  height: 630       // hard-coded — og:image is always 630px tall
}
```

The `ImageObject` shape is identical for both `image` and `primaryImageOfPage`. Dimensions are compile-time constants, not derived at runtime.

**Spread ordering in `Head.astro`** (last-write-wins):

```typescript
// Outer spread — bare string for non-BlogPosting types (keep as-is)
...(ogImageUrl ? { image: ogImageUrl } : {}),
// BlogPosting spread — overwrites image with ImageObject, adds primaryImageOfPage
...(type === BLOGPOSTING
    ? {
          ...(ogImageUrl
              ? {
                    image: { '@type': 'ImageObject', url: ogImageUrl, width: 1200, height: 630 },
                    primaryImageOfPage: { '@type': 'ImageObject', url: ogImageUrl, width: 1200, height: 630 },
                }
              : {}),
          dateModified: updatedAt ?? createdAt,
          datePublished: createdAt,
          mainEntityOfPage: { '@id': canonical, '@type': WEBPAGE },
      }
    : {}),
```

For `BlogPosting` + `ogImageUrl`: inner spread overwrites `image` (bare string → `ImageObject`) and adds `primaryImageOfPage`.
For non-`BlogPosting`: inner spread absent; outer bare-string `image` survives.

---

## Dependencies

- [seo/spec.md](./spec.md) — parent SEO spec; defines the BlogPosting schema structure and states `image` is included when `ogImage` is provided
- [images/spec.md](../images/spec.md) — confirms 1200×630 as the og:image dimension standard and that `Head.astro` must not call Cloudinary

---

## Anti-patterns

- **Do not apply `ImageObject` to non-`BlogPosting` types** — only `BlogPosting` is in scope; other types retain bare URL strings for `image`
- **Do not derive `width`/`height` at runtime** — dimensions are a build-time constant (1200×630) set by `getCldImageUrl` in the layouts; computing them in `Head.astro` would require calling Cloudinary, violating the no-Cloudinary-in-Head constraint in the images spec
- **Do not introduce a helper or type alias for `ImageObject`** — the object literal appears exactly twice in the same expression; abstraction adds indirection for no gain
- **Do not remove the outer bare-string `image` spread** — non-`BlogPosting` types depend on it; its removal would silently omit `image` from all non-BlogPosting schemas
- **Do not emit `primaryImageOfPage` when `ogImageUrl` is absent** — the conditional must guard both fields together

---

## Open Questions

*(none)*

---

## Changelog

| Date | Change |
|------|--------|
| 2026-05-18 | Initial draft |
