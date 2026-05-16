# Spec: llms.txt — AI Crawler Entry-Point Map

> **Pattern**: [The Spec](https://asdlc.io/patterns/the-spec) — Living document, permanent source of truth.
> **Status**: `Active`
> **Last updated**: 2026-05-16

---

## Intent

AI crawlers (ChatGPT, Perplexity, Claude, Gemini) discover and index sites by fetching `/llms.txt` — a structured markdown file defined by the [llmstxt.org v0 spec](https://llmstxt.org/). Without it, AI agents have no curated entry point and may index low-priority pages or miss key content entirely.

This feature publishes `/llms.txt` at site root, generated at build time from the existing MDX post inventory. The file gives AI crawlers a prioritised, human-readable map of the site: pillar pages first, then all published posts grouped by tag (AI content first), then multilingual equivalents.

The file is generated automatically from frontmatter — no manual curation per post is required.

---

## Scope

### In scope
- New Astro API route `src/pages/llms.txt.ts` (static GET handler, mirrors `robots.txt.ts` pattern)
- llmstxt.org v0 format: H1 title → blockquote summary → sections with markdown link lists
- H1: `Lauri Lavanti`; blockquote: 1-sentence Finnish-language site description + author credential
- Pillar pages section: `/fi/` (home), `/fi/topics`, `/fi/about`
- All published Finnish posts grouped by tag, sorted newest-first within each tag
- `artificial-intelligence` tag section rendered first; remaining tags in alphabetical order by tag id
- Multilingual section ("Muut kielet / Other languages / Andra språk"): links to `/en/` and `/sv/` equivalents of each post (Swedish and English posts from `allMdxPosts`)
- Build-time generation via `allMdxPosts` from `src/lib/mdxPosts.ts` and `tags` from `src/content/tags.ts`
- Response `Content-Type: text/plain` (Astro default for `.txt.ts`)

### Out of scope
- `/llms-full.txt` expanded variant (full post body content)
- Manual per-post curation or overrides
- Dynamic/SSR generation (static only)
- Posts in draft/unpublished state (excluded by existing `allMdxPosts` filter)

---

## Contract

```gherkin
Feature: llms.txt AI crawler entry-point map

  Scenario: File is served at site root
    Given the site is built
    When a client requests GET /llms.txt
    Then the response status is 200
    And the Content-Type header starts with "text/plain"
    And the body begins with "# Lauri Lavanti"

  Scenario: Header block matches llmstxt.org v0 spec
    Given the built /llms.txt
    When the file is parsed
    Then the blockquote reads: "> Lauri Lavanti on kirkkonummelainen poliitikko ja lead developer, joka kirjoittaa teknologiasta, kunnallispolitiikasta ja yhteiskunnasta."

  Scenario: Pillar pages section is present
    Given the built /llms.txt
    When the sections are listed
    Then there is a section "## Tärkeimmät sivut"
    And it contains a markdown link to /fi/ with label "Etusivu"
    And it contains a markdown link to /fi/topics with label "Aiheet"
    And it contains a markdown link to /fi/about with label "Laurista"

  Scenario: AI tag section appears first among tag sections
    Given the built /llms.txt
    And there are Finnish posts tagged "artificial-intelligence"
    When the tag sections are listed
    Then the "artificial-intelligence" section appears before all other tag sections
    And it contains a markdown link for each Finnish post with that tag

  Scenario: All other tags appear in alphabetical order after AI section
    Given the built /llms.txt
    When the tag sections after "artificial-intelligence" are listed
    Then they appear in alphabetical order by tag id
    And tags with zero Finnish posts are omitted

  Scenario: All published Finnish posts appear exactly once per tag
    Given the built /llms.txt
    When all markdown links in tag sections are collected
    Then for each published Finnish post, its URL appears under every tag it belongs to
    And no post URL appears under a tag it does not belong to

  Scenario: Post count matches mdxPosts inventory
    Given the total number of published Finnish posts in allMdxPosts
    When all unique post URLs in /llms.txt tag sections are counted
    Then the count equals the number of published Finnish posts

  Scenario: Multilingual section lists non-Finnish post equivalents
    Given the built /llms.txt
    When the "Muut kielet / Other languages / Andra språk" section is read
    Then it contains markdown links to all published English posts (lang === 'en')
    And it contains markdown links to all published Swedish posts (lang === 'sv')
    And links use the post's url field as the href and title as the label

  Scenario: Posts within each tag section are sorted newest-first
    Given a tag with multiple Finnish posts at different ids
    When the links for that tag in /llms.txt are read in order
    Then they appear sorted by post id descending (newest first)

  Scenario: Tag with zero Finnish posts is omitted
    Given a tag that exists in the tags registry
    And that tag has no published Finnish posts
    When /llms.txt is read
    Then no section heading for that tag appears
```

---

## Data Model

```typescript
// Reused from src/lib/mdxPosts.ts — no new types required
// MdxPostWithUrl { id, lang, title, description, slug, tags, url, publishDate, ... }

// Section structure (internal, not exported)
interface LlmsTxtSection {
  heading: string       // display name only, e.g. "Tekoäly" (## prefix added at render time)
  links: Array<{ label: string; url: string }>
}

// Tag display name sourced via getTagName(tagId, 'fi') from src/content/tags.ts
// Tag ordering: 'artificial-intelligence' first, rest alphabetical by tag id
```

---

## Dependencies

- [`src/lib/mdxPosts.ts`](../../src/lib/mdxPosts.ts) — `allMdxPosts` array (source of all published posts)
- [`src/content/tags.ts`](../../src/content/tags.ts) — `tags` array, `getTagName` (tag metadata and Finnish names)
- [`src/pages/robots.txt.ts`](../../src/pages/robots.txt.ts) — reference pattern for static API route shape

---

## Anti-patterns

- **Do not** use `getStaticPaths` — this is a single static file route, not a dynamic route; use `export const GET: APIRoute` directly (same as `robots.txt.ts`)
- **Do not** filter `allMdxPosts` by anything beyond `lang === 'fi'` for Finnish sections — `allMdxPosts` already excludes drafts
- **Do not** hardcode tag names — always call `getTagName(id, 'fi')` so names stay in sync with `src/content/tags.ts`
- **Do not** deduplicate posts across tags — a post should appear under every tag it belongs to (this is intentional per llmstxt.org link-list format)
- **Do not** emit a tag section if `tagPosts.length === 0` — empty sections add noise for AI crawlers

---

## Changelog

| Date | Change |
|------|--------|
| 2026-05-16 | Initial draft — status set to Active, pillar heading and blockquote text confirmed |
| 2026-05-16 | Fix minor review findings: pinned Content-Type assertion, removed duplicate H1 check, moved empty-tag rule to Contract only, clarified LlmsTxtSection.heading type, pinned Finnish pillar labels, removed double separator |
