# Spec: Generated Site Hardening

> **Pattern**: [The Spec](https://asdlc.io/patterns/the-spec) — Living document, permanent source of truth.
> **Status**: `Active`
> **Last updated**: 2026-08-24

---

## Intent

The generated site and its production delivery must form one verifiable contract. Visitors must receive canonical, accessible routes; search and answer engines must receive metadata derived from visible page content; and maintainers must be able to reproduce locally what CI validates and deploys.

Production may contain only the exact static artifact that passed dependency, build-output, browser, accessibility, and performance checks on its Cloudflare preview. Technical hardening must not change visible prose, hierarchy, imagery, dimensions, colors, or layout.

---

## Scope

### In scope

- Exact, aligned Node 24, npm 12, and Node 24 type versions in local and CI environments
- Strict engine and peer dependency enforcement without install bypasses
- An ESLint 10-compatible import rule graph and scoped Astro component boundaries
- Generated-output contracts for routes, redirects, links, metadata, JSON-LD, sitemaps, and crawler resources
- Permanent locale-less aliases for canonical Finnish pages, except the language-detecting root
- Type-specific JSON-LD and visible-source-only FAQPage data
- Removal of inert synthetic FAQ metadata from source content
- Canonical internal and crawler-facing URLs
- Accessible navigation landmarks, lists, and mobile disclosure behavior without visual regression
- Cloudflare candidate-preview validation and same-artifact production promotion
- Compatible direct dependency updates and constrained Renovate automation
- Reconciliation of affected architecture documentation and living Specs

### Out of scope

- Changes to visible prose, heading hierarchy, imagery, colors, dimensions, or layout
- Server-side rendering, external content services, or runtime dependencies
- Major Astro, TypeScript, ESLint, Node, or npm migrations
- Removal of valid historical inbound redirects
- A visible FAQ component or new FAQ copy
- Branch-protection changes without explicit human approval

---

## Contract

```gherkin
Feature: Generated site hardening

  Scenario: Strict reproducible installation
    Given the repository is checked out without node_modules
    When dependencies are installed locally or in CI
    Then Node, npm, and Node types use the supported version set
    And npm rejects incompatible engines and peer dependencies
    And no legacy peer-dependency bypass is active
    And npm ls reports no invalid or extraneous packages

  Scenario: ESLint 10 uses compatible import rules
    Given the repository uses ESLint 10
    When lint runs
    Then import rules are provided by eslint-plugin-import-x
    And no eslint-plugin-import or unsupported eslint-plugin-jsx-a11y peer is installed
    And Astro lint rules remain enabled

  Scenario: Astro component boundaries are scoped
    Given an Astro file under src/components
    When the file imports another project module
    Then fractal/component-imports allows shared components and same-component child modules
    And imports from pages or layouts fail lint
    And React-only Fractal rules remain disabled

  Scenario: Staged source files run both checks
    Given a staged JavaScript, TypeScript, or Astro file
    When the pre-commit hook runs
    Then ESLint runs for that file set
    And related Vitest tests run for that same file set
    And neither command replaces the other through duplicate lint-staged keys

  Scenario: Canonical generated output
    Given an indexable HTML page in dist
    When the output contract runs
    Then the page has exactly one absolute self-referencing canonical URL
    And it has fi, sv, en, and x-default alternate links
    And x-default points to the Finnish canonical equivalent
    And every local rendered link resolves to a generated canonical route or asset
    And no local rendered link uses localhost, a redirect source, or a non-canonical slash form

  Scenario: Hidden page output
    Given a page marked noindex
    When the page is built
    Then it emits exactly one robots directive with content noindex
    And it emits no canonical link, hreflang link, og:url, or JSON-LD script
    And it is absent from the sitemap

  Scenario: Type-specific primary JSON-LD
    Given an indexable page with a supported primary schema type
    When its JSON-LD is built
    Then exactly one primary schema object conforms to the schema field matrix
    And no field belonging only to another primary type is emitted
    And every URL is an absolute non-empty string
    And no null, undefined, or empty value is serialized

  Scenario: Unknown primary JSON-LD type
    Given an indexable page with no primary type or an unsupported primary type
    When its JSON-LD is built
    Then the primary type is WebSite
    And only WebSite fields are emitted

  Scenario: Visible FAQPage extraction
    Given a post contains at least two H2 headings whose visible text ends in a question mark
    And each question heading is followed by non-empty visible answer content before the next H2 or end of document
    When the post is built
    Then a supplemental FAQPage script is emitted after the primary BlogPosting script
    And each Question name equals normalized visible heading text
    And each acceptedAnswer text equals normalized visible answer text from that section

  Scenario: Insufficient visible FAQ content
    Given a post contains fewer than two complete visible question-and-answer sections
    When the post is built
    Then no FAQPage script is emitted

  Scenario: Hidden FAQ metadata cannot produce schema
    Given source content contains no visible question-and-answer sections
    When metadata and pages are built
    Then no FAQPage script is emitted
    And post metadata, page frontmatter, and tag data do not define synthetic faq fields
    And content validation rejects newly added synthetic faq fields

  Scenario: Locale-less Finnish page aliases
    Given /fi/about/ is a generated canonical Finnish page
    When a visitor requests /about or /about/
    Then Cloudflare returns a single-hop 301 redirect to /fi/about/
    And no intermediate slash-normalization redirect occurs

  Scenario: Locale-less alias preserves a query string
    Given /fi/about/ is a generated canonical Finnish page
    When a visitor requests /about?source=test
    Then Cloudflare returns a 301 redirect to /fi/about/?source=test
    And candidate-preview E2E asserts the status and Location header

  Scenario: Locale-less aliases follow generated Finnish routes
    Given any generated canonical route matching /fi/{path}/ other than /fi/
    When redirects are generated
    Then both /{path} and /{path}/ redirect directly to /fi/{path}/
    And aliases are derived from generated output rather than a manual route allowlist

  Scenario: Root keeps browser-language detection
    Given a visitor requests /
    When the root page loads
    Then it is not handled by a static redirect rule
    And the existing browser-language selection behavior remains available

  Scenario: Unknown locale-less path remains missing
    Given /fi/not-a-real-page/ is not a generated canonical Finnish page
    When a visitor requests /not-a-real-page or /not-a-real-page/
    Then no Finnish-default catch-all redirect matches
    And the response is the normal not-found response

  Scenario: Redirect integrity
    Given the generated route set and redirect rules
    When redirect contracts run
    Then sources and targets are normalized and deterministic
    And no duplicate, conflicting, cyclic, or chained rule exists
    And every target terminates at a generated canonical route or real asset
    And invalid or redundant rules fail validation
    And valid historical inbound routes remain supported

  Scenario: Canonical crawler resources
    Given a completed static build
    When robots.txt, llms.txt, and the sitemap index are validated
    Then robots.txt references the generated sitemap index
    And every llms.txt URL is generated, indexable, canonical, and not a redirect source
    And the Finnish pillar URLs include /fi/, /fi/blog/, and /fi/about/

  Scenario: Complete sitemap output
    Given a completed static build
    When sitemap entries are validated
    Then every location resolves to an indexable canonical generated route
    And no location is a redirect source
    And every URL entry contains lastmod

  Scenario: Semantic desktop navigation
    Given a desktop viewport
    When the header renders
    Then navigation links are inside a localized nav landmark and list
    And the active link has aria-current page
    And the existing visible labels and layout are unchanged

  Scenario: Semantic mobile disclosure
    Given a mobile viewport and a closed menu
    When the header renders
    Then a localized button controls the menu with aria-controls
    And aria-expanded is false
    And closed menu content is hidden from interaction and assistive technology
    When the visitor activates the button
    Then aria-expanded is true
    And the menu becomes interactive

  Scenario: Mobile disclosure keyboard behavior
    Given the mobile menu is open
    When the visitor presses Escape
    Then the menu closes
    And focus returns to the disclosure button
    When the visitor activates a navigation link by pointer or keyboard
    Then the menu closes before navigation

  Scenario: Navigation has no visual regression
    Given existing desktop and mobile screenshot baselines
    When semantic navigation changes are rendered at the tested viewports
    Then screenshot comparison remains pixel-equivalent
    And horizontal-overflow checks remain clean

  Scenario: Remote Playwright uses the deployed candidate
    Given E2E_URL is an absolute HTTPS base URL for a Cloudflare preview
    When Playwright starts
    Then no local build or preview web server starts
    And every browser suite uses E2E_URL
    Given E2E_URL is absent
    When Playwright starts locally
    Then the existing local build-and-preview behavior remains available

  Scenario: Candidate preview gates production
    Given a pull request or main workflow run
    When the static artifact is built
    Then its checksum is recorded
    And that artifact is deployed to a unique Cloudflare preview
    And snapshots, screenshots, accessibility, horizontal-scroll, remaining E2E, Lighthouse, and Sonar checks target the candidate
    And a stable Required checks job succeeds only when every mandatory dependency succeeds

  Scenario: Failed candidate check blocks production
    Given any mandatory static, preview, browser, accessibility, Lighthouse, or Sonar check fails or is cancelled
    When Required checks evaluates its dependencies
    Then Required checks fails
    And production deployment does not run

  Scenario: Production promotes the tested artifact
    Given a successful main candidate and Required checks result
    When production deployment runs
    Then it downloads the candidate build artifact
    And its checksum matches the preview-tested checksum
    And no production rebuild occurs
    And deployment concurrency prevents an older main run from overtaking a newer run
    And a focused production smoke check verifies the deployed result

  Scenario: External workflow actions are immutable
    Given an external GitHub Action used by a workflow
    When workflow source is validated
    Then the action reference is an immutable commit SHA
    And a nearby comment identifies the human-readable release
    And Renovate can update its digest

  Scenario: Compatible dependency automation
    Given a non-security npm patch or minor update within the supported ecosystem lines
    When it is at least seven days old and all required checks pass
    Then Renovate may automerge it in its focused compatibility group
    And unrelated ecosystem groups are not combined

  Scenario: Major and security dependency updates
    Given a major ecosystem update
    When Renovate proposes it
    Then it requires manual review and never automerges
    Given a security update
    When Renovate proposes it
    Then grouping and release aging do not delay visibility or remediation

  Scenario: Compatible direct dependencies are current
    Given the supported Node 24, npm 12, Astro 7, TypeScript 6, and ESLint 10 lines
    When direct dependencies are audited
    Then each direct dependency uses the latest mutually compatible release
    And TypeScript remains below 6.1 until typescript-eslint supports a later line
    And Node types remain on major 24

  Scenario: Living documentation matches behavior
    Given implementation is complete
    When README, ARCHITECTURE, and dependent Specs are reviewed
    Then they describe local images, the actual Vitest environment, current content locations, visible-source-only FAQ schema, explicit Finnish x-default, locale-less aliases, exact runtime setup, output contracts, and preview-before-production delivery
    And stale contradictory statements are removed
```

---

## Data Model

### Supported version set

The initial implementation uses this exact tuple. Renovate may advance patch or minor releases only within the same supported major lines and must keep all declarations synchronized.

```typescript
interface SupportedVersionSet {
  node: "24.19.0";
  npm: "12.0.2";
  nodeTypes: "24.13.3";
  astroMajor: 7;
  typescriptRange: ">=6.0.0 <6.1.0";
  eslintMajor: 10;
}
```

The Node value is exact in `.nvmrc` and engine metadata. The npm value is exact in `packageManager`, engine metadata, local development enforcement, and CI bootstrap. Node types track the Node 24 declaration line.

### Visible FAQ entry

```typescript
interface VisibleFaqEntry {
  question: string;
  answer: string;
}
```

A candidate question is an H2 whose normalized visible text ends with `?`. Its answer is the normalized visible text from subsequent Markdown AST nodes through the node before the next H2, or through the end of the document. Paragraphs, lists, blockquotes, tables, code labels, and nested headings contribute their visible text; imports, exports, scripts, styles, and comments do not. A candidate with an empty question or answer is discarded. FAQPage requires at least two retained entries.

### Primary JSON-LD field matrix

All types include `@context` and `@type`. Fields not listed for that type are forbidden.

| Primary type     | Required fields                                                                                                          | Optional fields                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| `BlogPosting`    | `headline`, `description`, `url`, `author`, `datePublished`, `dateModified`, `inLanguage`, `mainEntityOfPage`, `license` | `image`, `primaryImageOfPage`, `keywords`, `wordCount`  |
| `ProfilePage`    | `name`, `description`, `url`, `inLanguage`, `mainEntity`                                                                 | `dateModified`, `image`                                 |
| `Person`         | `@id`, `name`, `url`, `jobTitle`, `description`, `sameAs`                                                                | `email`, `telephone`, `image`, `knowsAbout`, `memberOf` |
| `CollectionPage` | `name`, `description`, `url`, `inLanguage`                                                                               | `image`                                                 |
| `WebPage`        | `name`, `description`, `url`, `inLanguage`                                                                               | `image`, `dateModified`                                 |
| `WebSite`        | `name`, `description`, `url`, `inLanguage`, `sameAs`                                                                     | `image`                                                 |

`BlogPosting.image` and `BlogPosting.primaryImageOfPage` use the ImageObject contract. `ProfilePage.mainEntity` is the canonical Person entity. `BlogPosting.author` contains canonical Person references. `FAQPage` is supplemental and never a primary type.

### Redirect rule

```typescript
interface RedirectRule {
  source: string;
  destination: string;
  status: 301;
  origin: "manual" | "generated-post-id" | "generated-finnish-alias";
}
```

Generated Finnish aliases are created from canonical built routes matching `/fi/{path}/`, excluding `/fi/`. Each destination has both slashless and trailing-slash sources. A generated alias must not silently override a manual rule or generated asset; a destination conflict is a contract failure. Cloudflare preserves incoming query strings.

Query preservation is a deployed-platform contract, not only a source assertion. Candidate-preview E2E must request an alias with a query string and inspect the direct `301` response before following it.

### Built route contract

```typescript
interface BuiltRoute {
  pathname: string;
  file: string;
  redirectSource: boolean;
  indexable: boolean;
  canonical?: string;
  alternates: Partial<Record<"fi" | "sv" | "en" | "x-default", string>>;
  jsonLd: unknown[];
  visibleText: string;
}
```

Route discovery comes from `dist`, not a source-maintained route allowlist. Redirect-source stubs are not canonical routes.

### Candidate artifact

```typescript
interface CandidateArtifact {
  name: string;
  sha256: string;
  previewUrl: string;
  runId: string;
  runAttempt: string;
}
```

Preview and production deployments consume the same named artifact and verify the same SHA-256 manifest.

`E2E_URL` is normalized as an absolute HTTPS base URL ending in `/`. Test route paths are resolved relative to that base URL.

---

## Dependencies

- [SEO & Metadata](../seo/spec.md) — canonical, hreflang, primary metadata, sitemap, and title contracts
- [SEO Redirect Audit](../seo/redirect-audit.md) — source-level redirect normalization, chains, and cycles
- [llms.txt](../seo/llms-txt.md) — crawler resource structure and ordering
- [ImageObject](../seo/imageobject.md) — BlogPosting image schema
- [JSON-LD Person](../seo/jsonld-person.md) — canonical Person identity and author references
- [Navigation](../navigation/spec.md) — localized link data, active states, language switching, and responsive variants
- [Posts](../posts/spec.md) — post routes, translated slugs, and language alternates
- [Pages](../pages/spec.md) — static page frontmatter and layout behavior
- [Tags](../tags/spec.md) — generated category routes and localized tag data
- [Recommendations](../recommendations/spec.md) — noindex page behavior
- [Cloudflare Pages redirects](https://developers.cloudflare.com/pages/configuration/redirects/) — `_redirects` rule syntax, ordering, status codes, and limits

Where an older dependency describes frontmatter-driven FAQ schema, `noindex, nofollow`, omission of explicit `x-default`, checkbox-only disclosure, manual route enumeration, or production-first browser testing, this Spec takes precedence until that dependency is reconciled in the same feature.

---

## Anti-patterns

- **Do not** rebuild after candidate validation — production must promote the tested bytes.
- **Do not** deploy production before the stable aggregate gate succeeds.
- **Do not** maintain a hand-written list of valid generated routes — discover them from `dist`.
- **Do not** implement a locale-less catch-all — only aliases derived from real Finnish routes may redirect.
- **Do not** route `/` through the generated Finnish aliases — root retains browser-language detection.
- **Do not** emit schema from hidden metadata — FAQPage must be reproducible from visible body text.
- **Do not** serialize generic JSON-LD fields across every primary type.
- **Do not** retain valid internal links that rely on redirects.
- **Do not** bypass peer dependency checks.
- **Do not** use the global Fractal recommended preset — only the approved Astro boundary rule is in scope.
- **Do not** replace browser accessibility gates with an ESLint plugin that does not support the lint runtime.
- **Do not** combine all patch and minor dependencies into one automerge group.
- **Do not** update screenshot baselines merely to make semantic navigation changes pass.

---

## Open Questions

- None.

---

## Changelog

| Date       | Change                                                                                       |
| ---------- | -------------------------------------------------------------------------------------------- |
| 2026-08-24 | Initial draft for issue #1362                                                                |
| 2026-08-24 | Clarified deployed query preservation, E2E URL shape, and navigation activation after review |
