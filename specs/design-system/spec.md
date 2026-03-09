# Feature: Design System

## Blueprint

### Context
All visual design tokens — spacing, colours, typography, and layout grid constants — are centralised in `src/lib/styles.ts`. Components consume these via Astro's `define:vars` CSS variable injection. This prevents magic numbers from spreading across component stylesheets.

### Architecture
- **File:** `src/lib/styles.ts` — exports typed TypeScript constants, no CSS files

- **Token categories:**

  **Spacing (`sizes`)** — numeric keys map to rem values:
  ```ts
  sizes[0.25] = '0.25rem'  // 4px
  sizes[0.5]  = '0.5rem'   // 8px
  sizes[1]    = '1rem'     // 16px
  sizes[1.5]  = '1.5rem'   // 24px
  sizes[2.5]  = '2.5rem'   // 40px
  sizes[3.75] = '3.75rem'  // 60px — header height
  sizes[75]   = '75rem'    // 1200px — max content width
  // ... and more
  ```

  **Z-indices (`zIndices`):** `50` (header), `100` (skip links)

  **Named layout constants:**
  ```ts
  HEADER_SIZE     = sizes[3.75]   // 60px
  CONTENT_SIZE    = sizes[75]     // 1200px
  CONTENT_PADDING = sizes[0.5]    // 8px
  ```

  **Grid constants:**
  ```ts
  gridTemplateColumnsArticle  // 5-column grid: 1fr padding content padding 1fr
  gridTemplateRowsLayout      // desktop: 1fr 6rem (footer)
  gridTemplateRowsLayoutMobile// mobile: 1fr 9rem (taller footer)
  gridTemplateColumns         // outer: repeat(1, minmax(0, 1fr))
  gridAreas                   // { main: 'main', footer: 'footer' }
  ```

  **Colours (`colors`):**
  - Brand: `evening` (teal `rgb(0,98,114)`), `peach` (`rgb(248,207,169)`), `sand`, `moss`
  - UI: `white`, `black`, `gray`, `transparent`, `darkGreenText`
  - Social platform brand colours: `bluesky`, `facebook`, `linkedin`, `mastodon`, `threads`, `instagramGradient`, `regionalPurple`
  - Overlay: `evening70` (70% opacity teal)

  **Typography (`typographics`)** — pre-composed font stacks:
  ```ts
  typographics.h1         = { fontFamily, fontSize, fontWeight, lineHeight }
  typographics.body       = { fontFamily, fontSize, fontWeight, lineHeight }
  typographics.additionalInfo = { ... }
  // etc.
  ```

  **Font sizes (`fontSizes`)** — keyed by rem value with pre-computed `fontSize` and `lineHeight`:
  ```ts
  fontSizes[1.5]  = { fontSize: '1.5rem', lineHeight: '...' }
  fontSizes[1.75] = { fontSize: '1.75rem', lineHeight: '...' }
  ```

- **Usage pattern in components:**
  ```astro
  <style define:vars={{ colorsEvening: colors.evening, sizes1: sizes[1] }}>
      div { background: var(--colorsEvening); padding: var(--sizes1); }
  </style>
  ```
  The variable name in `define:vars` becomes the CSS custom property name. Convention: `camelCase(exportName) + key`.

- **Breakpoint:** `1200px` is the single breakpoint used throughout. It corresponds to `CONTENT_SIZE` (`sizes[75]`). Not exported as a constant — hardcoded in each component's media query.

- **Dependencies:** Almost all components import from `styles.ts`. Changes here propagate everywhere.

### Anti-Patterns
- Do not hardcode pixel or rem values in component `<style>` blocks — always pull from `styles.ts` via `define:vars`
- Do not add new colours without including a semantic name that describes the use case, not just the value
- Do not add a spacing value that isn't a multiple of 0.125rem (2px) — the scale is intentionally aligned to the 2px grid
- Do not add a second breakpoint — the design is intentionally single-breakpoint at 1200px
- Do not export CSS strings directly from `styles.ts` — only export TypeScript constants that get injected via `define:vars`
- Do not duplicate `typographics` values inline in a component — if a typographic style is needed, it should exist in `styles.ts`

---

## Contract

### Definition of Done
- [ ] New token is added to `styles.ts` with a typed `as const` assertion
- [ ] New token is consumed via `define:vars` in the component, not as a hardcoded value
- [ ] If a new colour is added for a social platform, it is named after the platform (e.g. `bluesky`, `mastodon`)
- [ ] `npm run check` passes (TypeScript validates all token usages)
- [ ] `npm run lint` passes

### Regression Guardrails
- `HEADER_SIZE = sizes[3.75]` is used for both the `<header>` height and the mobile menu top offset — changing this value changes both simultaneously; test both on mobile and desktop
- `gridTemplateColumnsArticle` uses `CONTENT_SIZE` and `CONTENT_PADDING` inline — changing any of those three values changes the article column layout for every page
- Social platform colour tokens (`colors.bluesky`, `colors.facebook`, etc.) are consumed by Footer and SocialShare — changing a colour value changes every appearance of that platform's branding

### Scenarios

**Scenario: New spacing value needed**
- Given: A new component needs `2.75rem` spacing not currently in `sizes`
- When: The value is added: `sizes[2.75] = '2.75rem' as const`
- Then: The component consumes it via `define:vars={{ sizes275: sizes[2.75] }}`; the CSS uses `var(--sizes275)`

**Scenario: New social platform colour added**
- Given: A new social platform `Threads` needs its brand colour
- When: `threads: 'rgb(0, 0, 0)' as const` is added to `colors`
- Then: The Footer and any social share component reference `colors.threads` via `define:vars`; no hardcoded hex values appear in component CSS

**Scenario: Header height change**
- Given: `HEADER_SIZE` is changed from `sizes[3.75]` to `sizes[4]`
- When: The site is built
- Then: The `<header>` height changes; the mobile menu's `top` offset changes to match; the `gridTemplateRowsLayout` and `gridTemplateRowsLayoutMobile` may need updating if they depended on the header height

**Scenario: Component needs typographic style**
- Given: A new component needs the same font style as `typographics.additionalInfo`
- When: The component is written
- Then: It imports `typographics` and uses `define:vars={{ additionalInfoFontFamily: typographics.additionalInfo.fontFamily, ... }}`; it does not copy-paste the font values
