# Feature: Images (Cloudflare Images)

## Blueprint

### Context
Images are stored in Cloudflare Images, uploaded via `scripts/upload-to-cf-images.mts` using the image slug as the CF image ID. Served through a Cloudflare rewrite rule: `images/* → cdn-cgi/imagedelivery/iOe5UJ6bvcdboiEsn9unNQ/${1}`. Flexible resizing parameters (`w`, `h`, `fit`, `gravity`) are appended to the URL path after the slug. No local image processing or external image CDN library.

### Architecture

**Image resolution:** `src/lib/images.ts` exports two functions:
- `getImage(slug, variant): CFImageResult` — returns `{ src, width, height }` for a single size
- `getImageSrcset(slug, variant, widths[]): { src, srcset, width, height }` — returns responsive srcset entries

URL format: `https://laurilavanti.fi/images/{slug}/w={w},h={h},fit={fit},gravity={gravity},format=auto`

`format=auto` is always appended — CF Images returns WebP or AVIF for browsers that support it, falling back to JPEG. Never omit it.

**Valid `fit` values:** `crop`, `cover`, `contain`, `pad`, `scale-down` — note: `scale-crop` is NOT valid and will cause CF to return the unresized original.

**Variants defined in `src/lib/images.ts`:**

| Variant key | Dimensions | Fit | Gravity | Used by |
|---|---|---|---|---|
| `1x1` | 1680×1680 | crop | face | Excerpt thumbnails, recommendation portraits |
| `hero` | 1728×1320 | crop | face | TitleBanner profile images (about/topics/contact/newsletter/blog) |
| `background` | 1920×660 | crop | auto | Decorative full-bleed background |
| `body` | 2400×1800 | crop | auto | Inline post images |
| `og` | 1200×630 | crop | face | Open Graph / og:image (all layouts + person JSON-LD) |

**Image usage sites:**

| Component | Variant | `widths` / `sizes` | Notes |
|---|---|---|---|
| `heroBanner/images/BackgroundImage.astro` | `background` | `[960,1920]` / `100vw` | Decorative — `alt=""`. Desktop-only (hidden < 1200px). No `fetchpriority`. |
| `titleBanner/Image.astro` | `hero` | `[864,1728]` / `(max-width:1199px) 100vw, 50vw` | Fills `50vw × 45rem` box via `object-fit: cover`. |
| `heroBanner/Images.astro` | `1x1` (hero + mobile) | `[560,720,1120,1680]` / `(max-width:1199px) 100vw, min(50vw, 600px)` (desktop) | Transparent cutout — must stay 1:1 to preserve full figure. |
| `excerptList/excerpt/Banner.astro` | `1x1` | `[560,750,1120]` / `(max-width:1199px) 100vw, min(33vw, 380px)` | Square thumbnail; 3-column grid on desktop. `loading="lazy"`. |
| `body/ImageWithCaption.astro` | `body` | `[400,800,1200]` / `(max-width:640px) 100vw, 800px` | Inline image with `<figcaption>`. `aria-label` from `caption` prop. `loading="lazy"`. |
| `recommendations/Recommendation.astro` | `1x1` | `[448,896]` / `448px` | Circular portrait via CSS `border-radius:50%`. `loading="lazy"`. |
| Layouts (og:image) | `og` | — | `getImage(heroImage, 'og').src` — URL string passed to `Head.astro`. |
| `person.ts` (JSON-LD) | `og` | — | `getPersonImageUrl()` sync function called in `Head.astro`. |

**Frontmatter fields (unchanged from prior convention):**
- `heroImage` — image slug (e.g. `Lauri-Lavanti-nojaamassa-kasiin`)
- `backgroundImage` — same convention, index pages only
- `mobileHeroImage` — same convention, frontpage only
- `alt` — descriptive alt text; required for non-decorative images

**Alt text rules:**
- Background images (decorative, behind a colour overlay): `alt=""`
- Hero/portrait images: descriptive `alt` from frontmatter — must not be empty
- Excerpt thumbnails: `alt` from post frontmatter (falls back to `""` if absent)
- Inline body images (`ImageWithCaption`): `alt` prop + visible `figcaption`

**`fetchpriority="high"`** on above-the-fold images that are visible immediately (`heroBanner/Images`, `titleBanner/Image`). Not on `BackgroundImage` — it is `display:none` on mobile, so a high-priority fetch wastes bandwidth.

**`loading="lazy"`** on all below-the-fold images: excerpt thumbnails, inline body images, recommendation portraits.

**Adding a new image:**
1. Drop original JPEG/PNG into `src/images/originals/{slug}.jpg`
2. Run `CF_ACCOUNT_ID=xxx CF_API_TOKEN=xxx npx tsx scripts/upload-to-cf-images.mts`
3. Reference slug in MDX frontmatter — CF handles all resizing at request time

**Dependencies:** `src/lib/images.ts` (URL builder only — no image processing libraries).

### Anti-Patterns
- Do not include file extensions in `heroImage` / `backgroundImage` / `mobileHeroImage` frontmatter
- Do not use `fit=scale-crop` — it is not a valid CF Images parameter; use `fit=crop`
- Do not import `astro-cloudinary` or `CldImage` — removed from this project
- Do not set `alt=""` on hero or portrait images — they are not decorative
- Do not set a non-empty `alt` on `BackgroundImage` — it is decorative
- Do not use Astro `<Image>` from `astro:assets` for CF Images — use plain `<img>` with `getImageSrcset()`
- Do not use `gravity=face` with `fit` other than `crop` — face detection only works with crop
- Do not omit `format=auto` from CF Images URLs — without it browsers always receive JPEG
- Do not set `fetchpriority="high"` on `BackgroundImage` — it is `display:none` on mobile
- Do not add `loading="lazy"` to above-the-fold images (`heroBanner/Images`, `titleBanner/Image`)
- When choosing srcset widths, avoid large gaps: a gap from Xw to 2Xw means high-DPR mobile picks 2Xw for a slot that only needs ~1.75Xw. Add an intermediate entry.

---

## Contract

### Definition of Done
- [ ] `heroImage` frontmatter field is a slug that has been uploaded to CF Images
- [ ] `alt` is descriptive and non-empty for all hero/portrait images
- [ ] Background images have `alt=""`
- [ ] `og` variant URL resolves correctly for every slug used as `heroImage`
- [ ] `ogImage` URL string computed in layouts via `getImage(heroImage, 'og').src`, not in `Head.astro`
- [ ] Above-the-fold images have `fetchpriority="high"`
- [ ] Accessibility scan passes (no alt-text violations)

### Regression Guardrails
- `BackgroundImage` is only shown at ≥ 1200px — do not remove the media query
- Excerpt thumbnails use `1x1` variant with `aspect-ratio: 1` CSS — changing variant breaks visual consistency
- Frontpage `heroBanner` hero image must stay `1x1` — it is a transparent cutout, not a cropped photo
- `TitleBanner` uses `hero` variant (1728×1320) to match the actual `50vw × 45rem` display area

### Scenarios

**Scenario: Blog post hero image**
- Given: A post has `heroImage: Kirkkonummen-juna--ja-bussiasema` and `alt: 'Kirkkonummen asema'`
- When: The post page renders
- Then: `getImageSrcset('Kirkkonummen-juna--ja-bussiasema', '1x1', [...])` returns a valid CF Images URL with `fit=crop,gravity=face`; the og:image URL resolves the `og` variant

**Scenario: Front page background image**
- Given: `src/pages/fi/index.mdx` has `backgroundImage: 'Kirkkonummen-keskusta'`
- When: The page renders on a desktop viewport (≥ 1200px)
- Then: Background image is visible behind a `rgba(0,98,114,0.7)` overlay; `alt=""` is set; hidden on mobile

**Scenario: Image with caption in post body**
- Given: An MDX post uses `<ImageWithCaption image="kuva-nimesta" caption="Kuvateksti" alt="Kuvaus" />`
- When: The post renders
- Then: A `<figure>` with `aria-label="Kuvateksti"` contains the image and a visible `<figcaption>Kuvateksti</figcaption>`

**Scenario: Missing heroImage**
- Given: A component receives `heroImage={undefined}`
- When: It renders
- Then: No image is rendered (conditional `heroImage ? getImageSrcset(...) : undefined`); no broken image tag appears

**Scenario: Unknown variant**
- Given: `getImage('some-slug', 'nonexistent-variant')` is called
- When: It runs
- Then: Throws `Error: Unknown image variant: nonexistent-variant` — build fails with a clear message
