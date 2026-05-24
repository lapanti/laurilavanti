# Feature: Images (local Sharp)

## Blueprint

### Context
All images are stored locally in `src/images/`. Originals live in `src/images/originals/`; pre-cropped variants per aspect ratio live in `src/images/processed/{slug}/`. Astro Sharp handles format conversion (WebP/AVIF) and responsive `srcset` (1x/2x/3x) at build time. No external image CDN.

### Architecture

**Image resolution:** `src/lib/images.ts` exports `getImage(slug, variant): Promise<ImageMetadata>`. Uses `import.meta.glob` over `src/images/processed/**/*.jpg`. Called with `await` in Astro component frontmatter.

**Crop variants per slug:**

| Variant key | Aspect ratio | Source size | Used by |
|---|---|---|---|
| `1x1` | 1:1 | up to 1680×1680 | Hero portraits, recommendation portraits |
| `191x100` | 191:100 | up to 1680×881 | Excerpt card thumbnails |
| `background` | 1920:660 | 1920×660 | Decorative full-bleed background |
| `og` | 1200:630 | 1200×630 | Open Graph / og:image (all layouts + person JSON-LD) |
| `body` | 4:3 | up to 2400×1800 | Inline post images |

Not every slug needs every variant — blog posts need `1x1`, `191x100`, `og`, `body`. Index pages also need `background`.

**Image usage sites:**

| Component | Variant | `widths` / `sizes` | Notes |
|---|---|---|---|
| `BackgroundImage.astro` | `background` | `[960,1920]` / `100vw` | Decorative — `alt=""`. Desktop-only (hidden < 1200px). |
| `titleBanner/Image.astro` | `1x1` | `[560,1120,1680]` / `(max-width:1199px) 100vw, 50vw` | Hero portrait — descriptive `alt` required. |
| `heroBanner/Images.astro` | `1x1` (hero + mobile) | `[560,1120,1680]` / responsive | Same for both hero + mobile variants. |
| `excerptList/excerpt/Banner.astro` | `191x100` | `[560,1120]` / `560px` | Post card thumbnail. |
| `body/ImageWithCaption.astro` | `body` | `[400,800,1200]` / `(max-width:640px) 100vw, 800px` | Inline image with `<figcaption>`. `aria-label` from `caption` prop. |
| `recommendations/Recommendation.astro` | `1x1` | `[448,896]` / `448px` | Circular portrait via CSS `border-radius:50%`. |
| Layouts (og:image) | `og` | — | `(await getImage(heroImage, 'og')).src` — URL string passed to `Head.astro`. |
| `person.ts` (JSON-LD) | `og` | — | `getPersonImageUrl()` async function — called with `await` in `Head.astro`. |

**Frontmatter fields (unchanged from prior convention):**
- `heroImage` — image slug without extension (e.g. `Lauri-Lavanti-nojaamassa-kasiin`)
- `backgroundImage` — same convention, index pages only
- `mobileHeroImage` — same convention, index pages only
- `alt` — descriptive alt text; required for non-decorative images

**Alt text rules:**
- Background images (decorative, behind a colour overlay): `alt=""`
- Hero/portrait images: descriptive `alt` from frontmatter — must not be empty
- Excerpt thumbnails: `alt` from post frontmatter (falls back to `""` if absent)
- Inline body images (`ImageWithCaption`): `alt` prop + visible `figcaption`

**`fetchpriority="high"`** on above-the-fold images (`BackgroundImage`, `heroBanner/Images`, `titleBanner/Image`).

**Adding a new image:**
1. Drop original JPEG into `src/images/originals/{slug}.jpg`
2. Run `npx tsx scripts/process-image.mts src/images/originals/{slug}.jpg`
3. Review all crop variants in browser at `http://localhost:4322`
4. Press Enter to approve (or enter `x% y%` focal point to re-crop)
5. Commit originals + processed crops

**Dependencies:** `src/lib/images.ts` (glob resolver), `smartcrop-sharp` (dev dep, used only in processing scripts), Astro `<Image>` from `astro:assets`.

### Anti-Patterns
- Do not include file extensions in `heroImage` / `backgroundImage` / `mobileHeroImage` frontmatter
- Do not use `getImage` inside `Head.astro` directly — layouts compute `ogImage` as a URL string; `Head` only receives the pre-computed string
- Do not set `alt=""` on hero or portrait images — they are not decorative
- Do not set a non-empty `alt` on `BackgroundImage` — it is decorative
- Do not reference `src/images/processed/` paths directly in components — always go through `getImage()`
- Do not add Cloudinary or other external image CDN imports — images are local only

---

## Contract

### Definition of Done
- [ ] `heroImage` frontmatter field is a slug that has a matching directory under `src/images/processed/`
- [ ] `alt` is descriptive and non-empty for all hero/portrait images
- [ ] Background images have `alt=""`
- [ ] `og` variant exists for every slug used as `heroImage`
- [ ] `ogImage` URL string computed in layouts via `(await getImage(heroImage, 'og')).src`, not in `Head.astro`
- [ ] Above-the-fold images have `fetchpriority="high"`
- [ ] Accessibility scan passes (no alt-text violations)

### Regression Guardrails
- `BackgroundImage` is only shown at ≥ 1200px — do not remove the media query
- The excerpt Banner variant is `191x100` — changing this breaks visual consistency of the post list
- `getPersonImageUrl()` is async — always call with `await` in Astro frontmatter

### Scenarios

**Scenario: Blog post hero image**
- Given: A post has `heroImage: Kirkkonummen-juna--ja-bussiasema` and `alt: 'Kirkkonummen asema'`
- When: The post page renders
- Then: `getImage('Kirkkonummen-juna--ja-bussiasema', '1x1')` resolves to `ImageMetadata`; Astro `<Image>` renders a responsive `<img>` with `srcset` in WebP/AVIF; the og:image URL resolves the `og` variant

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
- Then: No image is rendered (conditional `heroImage ? await getImage(...) : undefined`); no broken image tag appears

**Scenario: Unknown slug**
- Given: `getImage('nonexistent-slug', '1x1')` is called
- When: It runs
- Then: Throws `Error: Processed image not found: /src/images/processed/nonexistent-slug/1x1.jpg` — build fails with a clear message
