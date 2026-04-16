# Feature: Newsletter

## Blueprint

### Context
A newsletter subscription form powered by MailerLite is embedded on home pages and on a dedicated landing page at `/{lang}/newsletter/`. The landing page is publicly indexed and serves as a shareable signup destination. The same component is reused in both contexts. Translations are centralised in `src/content/newsletter.ts`; all locale-specific strings are derived from that typed record rather than inlined as ternaries in the component.

### Architecture

- **Component:** `src/components/NewsletterSubscribe.astro`
  - Props: `{ lang: 'en' | 'fi' | 'sv' }`
  - Imports translations from `src/content/newsletter.ts`
  - Uses `define:vars` to inject design tokens from `src/lib/styles.ts`
  - Contains MailerLite webforms script loaded inline (not in `<head>`)

- **Translations file:** `src/content/newsletter.ts`
  ```ts
  export const newsletterContent: Record<'en' | 'fi' | 'sv', {
      heading: string
      description: string
      emailPlaceholder: string
      submitButton: string
      loadingLabel: string
      successHeading: string
      successMessage: string
      privacyText: string
      privacyLinkText: string
      privacyTextAfter?: string
  }>
  ```

- **Landing pages (one per locale):**
  - `src/pages/fi/newsletter/index.mdx`
  - `src/pages/sv/newsletter/index.mdx`
  - `src/pages/en/newsletter/index.mdx`
  All three use `PageLayout.astro` via `layout:` frontmatter and render `<NewsletterSubscribe lang={lang} />`.

- **Form IDs and action URLs per locale:**

  | Locale | Form ID | Action URL |
  |--------|---------|------------|
  | fi | `mlb2-38347721` | `https://assets.mailerlite.com/jsonp/2182645/forms/181706420545128273/subscribe` |
  | en | `mlb2-38366393` | `https://assets.mailerlite.com/jsonp/2182645/forms/181740004170532163/subscribe` |
  | sv | `mlb2-38379286` | `https://assets.mailerlite.com/jsonp/2182645/forms/181754147902588391/subscribe` |

- **Script loading strategy:**
  - `https://groot.mailerlite.com/js/w/webforms.min.js` loaded as a `<script>` tag inside the component (not in `<head>`)
  - Success callback `ml_webform_success_{id}()` defined via `<script is:inline set:html={...}>` — plain JavaScript only (no TypeScript)
  - Takel fetch also via `<script is:inline set:html={...}>`

- **CSS contract:**
  - All colours and sizes injected via `define:vars` from `src/lib/styles.ts` — no hardcoded values
  - Scoped using `.ml-form-embedContainer` class (present on root element) rather than per-ID repetition
  - Per-ID selectors are only used where MailerLite JavaScript looks up the specific element; the CSS does not need them
  - Single breakpoint at `1200px` (matches site-wide `CONTENT_SIZE`)
  - Mobile breakpoint at `400px` for mobile button toggle (MailerLite-specific behaviour)

- **Discovery:** The landing page is linked from the contact pages of all three locales. It is not added to the main nav.

- **Frontmatter schema (landing pages):**
  ```yaml
  layout: '../../../layouts/PageLayout.astro'
  lang: fi                        # or sv / en
  title: 'Uutiskirje'             # localised page title
  description: '...'              # localised meta description
  slug: 'fi/newsletter'           # locale-prefixed, no trailing slash
  type: 'WebPage'
  heroImage: cloudinary-filename  # without extension
  alt: '...'                      # descriptive alt text, localised
  ```

### Anti-Patterns
- Do not inline locale strings as ternaries (`lang === 'fi' && '...'`) in the component — all strings must come from `src/content/newsletter.ts`
- Do not load the MailerLite script in `<head>` or `BaseLayout.astro` — keep it scoped to the component
- Do not use TypeScript syntax inside `<script>` blocks — Prettier parses them as plain JavaScript
- Do not repeat CSS rules three times for each form ID — scope using `.ml-form-embedContainer` class
- Do not hardcode colours or sizes — use `define:vars` with tokens from `src/lib/styles.ts`
- Do not add a top-level nav entry for the newsletter page — link from contact pages instead

---

## Contract

### Definition of Done
- [ ] `src/content/newsletter.ts` exports `newsletterContent` typed record with all string fields for `fi`, `sv`, `en`
- [ ] `NewsletterSubscribe.astro` uses `newsletterContent[lang]` for all display strings — no inline ternaries
- [ ] CSS uses `.ml-form-embedContainer` class scoping — no three-way ID repetition per rule
- [ ] All `define:vars` tokens resolve to real values from `src/lib/styles.ts` — no undefined CSS variable references
- [ ] Landing pages exist at `src/pages/fi/newsletter/index.mdx`, `src/pages/sv/newsletter/index.mdx`, `src/pages/en/newsletter/index.mdx`
- [ ] All three landing pages render correctly in their respective locales
- [ ] Language switching between landing pages works via locale-prefix swap
- [ ] Newsletter link present in all three locale contact pages
- [ ] Unit tests pass: `npm run test`
- [ ] E2E tests pass: `npm run test:e2e`
- [ ] `npm run build` passes (lint and type-check are enforced by pre-commit hooks and CI)
- [ ] Accessibility scan passes for landing pages (no axe violations)

### Regression Guardrails
- `newsletterContent` must always have entries for all three locales — missing a locale causes a runtime undefined access
- The MailerLite form IDs in HTML and in the JavaScript success callback must match — a mismatch silently breaks the success state
- CSS variable names in `define:vars` must match exactly what is referenced in the `<style>` block — undefined variables render as empty strings without build errors
- The `<script is:inline set:html={...}>` pattern must be kept for the success callback — changing to a normal `<script>` block or TypeScript will break the build

### Scenarios

**Scenario: Form renders in Finnish**
- Given: `<NewsletterSubscribe lang="fi" />` is rendered
- When: The page loads
- Then: The heading "Uutiskirje", email input with placeholder "Sähköposti", and button "Tilaa" are visible; the privacy policy link points to `/fi/privacy-policy/`

**Scenario: Form renders in English**
- Given: `<NewsletterSubscribe lang="en" />` is rendered
- When: The page loads
- Then: The heading "Newsletter", email input with placeholder "Email", and button "Subscribe" are visible; the privacy policy link points to `/en/privacy-policy/`

**Scenario: Form renders in Swedish**
- Given: `<NewsletterSubscribe lang="sv" />` is rendered
- When: The page loads
- Then: The heading "Nyhetsbrev", email input with placeholder "E-post", and button "Prenumerera" are visible; the privacy policy link points to `/sv/privacy-policy/`

**Scenario: Success message shown after subscribe**
- Given: The form is visible
- When: MailerLite calls `ml_webform_success_{id}()`
- Then: `.row-form` is hidden and `.row-success` is shown with the success heading and message in the correct locale

**Scenario: Newsletter landing page renders**
- Given: A visitor navigates to `/fi/newsletter/`
- When: The page loads
- Then: The PageLayout renders with hero banner, the page title is "Uutiskirje", and the subscription form is visible

**Scenario: Language switch from Finnish newsletter page**
- Given: A visitor is on `/fi/newsletter/`
- When: They click the Swedish language-switch nav link
- Then: The inline script swaps `/fi/` → `/sv/` and lands on `/sv/newsletter/`, which exists

**Scenario: Newsletter linked from contact page**
- Given: A visitor is on the Finnish contact page
- When: They view the page
- Then: A link to `/fi/newsletter/` is present in the page content
