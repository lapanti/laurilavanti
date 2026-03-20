# Feature: Images (Cloudinary)

## Blueprint

### Context
All images are hosted on Cloudinary — there are no local image files in the repository. Images are referenced by filename (without extension) in MDX frontmatter or component props, and `astro-cloudinary` resolves, transforms, and optimises them at build time.

### Architecture

**Two usage modes:**

1. **`<CldImage>` component** — renders an `<img>` with Cloudinary transformations. Used everywhere that an image appears in the page body.
2. **`getCldImageUrl()` helper** — generates a Cloudinary URL string without rendering markup. Used only in layouts to produce `ogImage` strings passed to `Head.astro`.

**Image usage sites and their transformations:**

| Component | Transformation | Dimensions | Notes |
|---|---|---|---|
| `BackgroundImage.astro` | `fill`, `source:true` | 1920×660 | Decorative — `alt=""`. Desktop-only (hidden < 1200px). Dark overlay via CSS `::after`. |
| `titleBanner/Image.astro` | `fill`, `aspectRatio: '1:1'`, `gravity: face` | full-width | Hero portrait — requires descriptive `alt`. Square crop centred on face. |
| `excerptList/excerpt/Banner.astro` | `fill`, `aspectRatio: '191:100'`, `gravity: face` | 560×293 | Post card thumbnail — `alt` from frontmatter. Face-centred landscape crop. |
| `body/ImageWithCaption.astro` | `limit`, `source:true` | 800×600 | Inline post image with `<figcaption>`. `aria-label` from `caption` prop. |
| `FrontPageLayout` (og:image) | `fill`, `source:true` | 1200×630 | URL only via `getCldImageUrl`. Not rendered in DOM. |
| `PostLayout` (og:image) | `fill`, `source:true` | 1200×630 | URL only via `getCldImageUrl`. Not rendered in DOM. |

**Frontmatter fields:**
- `heroImage` — Cloudinary filename without extension (e.g. `Lauri-Lavanti-nojaamassa-kasiin`)
- `backgroundImage` — same convention, used only in `FrontPageLayout`
- `alt` — descriptive alt text for hero images; must not be empty for non-decorative images

**Alt text rules:**
- Background images (purely decorative, behind a colour overlay): `alt=""`
- Hero/portrait images: must have descriptive `alt` text passed from frontmatter
- Excerpt thumbnails: use `alt` from post frontmatter (falls back to `""` if absent)
- Inline body images (`ImageWithCaption`): `alt` prop + visible `figcaption`

**`fetchpriority="high"`** is set on above-the-fold images (`BackgroundImage`, `titleBanner/Image`) to trigger LCP optimisation.

**Dependencies:** All image components → `astro-cloudinary`. Layouts → `astro-cloudinary/helpers`. No local image files exist.

### Anti-Patterns
- Do not include file extensions in `heroImage` / `backgroundImage` frontmatter — Cloudinary infers format automatically
- Do not use `getCldImageUrl` inside `Head.astro` — that's the layout's job; `Head` only receives a pre-computed URL string
- Do not set `alt=""` on hero or portrait images — they are not decorative
- Do not set a non-empty `alt` on `BackgroundImage` — it is a decorative overlay image
- Do not use local `<img>` tags with static paths — there are no local image files to reference
- Do not change crop aspect ratios without also updating the `height`/`width` props to match — mismatched dimensions cause incorrect Cloudinary transformations

---

## Contract

### Definition of Done
- [ ] `heroImage` frontmatter field is a valid Cloudinary filename (no extension, no leading slash)
- [ ] `alt` is descriptive and non-empty for all hero/portrait images
- [ ] Background images have `alt=""`
- [ ] og:image is generated via `getCldImageUrl` at 1200×630 in layouts, not in `Head.astro`
- [ ] Above-the-fold images have `fetchpriority="high"`
- [ ] Accessibility scan passes (no alt-text violations)

### Regression Guardrails
- The `getCldImageUrl` import uses `astro-cloudinary/helpers` with an ESLint exception (`// eslint-disable-line import/namespace`) — do not change this import path or the linter exception will fail
- `BackgroundImage` is only shown at ≥ 1200px — do not remove the media query or it will appear on mobile
- The excerpt Banner crop is `191:100` (≈ 560×293) — changing this breaks the visual consistency of the post list

### Scenarios

**Scenario: Blog post hero image**
- Given: A post has `heroImage: Kirkkonummen-juna--ja-bussiasema` and `alt: 'Kirkkonummen asema'`
- When: The post page renders
- Then: `<CldImage>` resolves the Cloudinary asset, applies `fill` crop at 1:1 centred on face, renders with the provided alt text; the og:image URL is a 1200×630 fill crop of the same asset

**Scenario: Front page background image**
- Given: `src/pages/fi/index.mdx` has `backgroundImage: 'Kirkkonummen-keskusta'`
- When: The page renders on a desktop viewport (≥ 1200px)
- Then: The background image is visible behind a `rgba(0, 98, 114, 0.7)` overlay; `alt=""` is set; it is not visible on mobile

**Scenario: Image with caption in post body**
- Given: An MDX post uses `<ImageWithCaption image="kuva-nimesta" caption="Kuvateksti" alt="Kuvaus" />`
- When: The post renders
- Then: A `<figure>` with `aria-label="Kuvateksti"` contains the Cloudinary image and a visible `<figcaption>Kuvateksti</figcaption>`

**Scenario: Missing heroImage**
- Given: A component receives `heroImage={undefined}`
- When: It renders
- Then: No `<CldImage>` is rendered (conditional `{heroImage && <CldImage ... />}`); no broken image tag appears
