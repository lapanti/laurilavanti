---
name: seo-check
description: Audit SEO quality of an MDX page or blog post against current best practices (2025/2026). Checks title/description, Open Graph, JSON-LD structured data, hreflang, headings, image alt text, URL slugs, internal links, and E-E-A-T signals.
argument-hint: [file-path or glob pattern]
---

Perform a comprehensive SEO audit on the MDX file(s) at `$ARGUMENTS`.
If no argument is given, check the file most recently mentioned or opened in the conversation.
If `$ARGUMENTS` is a directory or glob, use Glob to find all matching `.mdx` files and audit each one.

> **Pre-commit automation note:** The following checks from this skill are now
> enforced automatically at pre-commit via `scripts/mdx-validate.sh` and
> `scripts/checks/mdx-deep.mjs`. Focus your skill audit on the **judgment-call
> checks** listed at the bottom.
>
> *Automated (no need to re-report if pre-commit passed):*
> - Required frontmatter fields (title, description, lang, slug, publishDate, layout)
> - `lang` field matches path locale
> - Slug format: lowercase, no underscores, no soft hyphens, no 4-digit years
> - Slug matches containing folder name
> - No H1 in body
> - Title length (50–60 chars incl. " | Lauri Lavanti" suffix)
> - Description length (120–160 chars for blog posts)
> - Heading hierarchy (no H3 without preceding H2)
> - Hero `alt` text present, ≥3 words, not a filename
> - Internal link count (3–5 for blog posts)
> - Tag validity (all IDs exist in src/content/tags.ts)
> - Passage length ≤150 words
> - Freshness (publishDate ≥90 days → updatedDate required)
>
> *Judgment-call checks — still run these:*
> - Title and description uniqueness and CTR quality
> - OG image and JSON-LD richness
> - Content quality, intent satisfaction, E-E-A-T signals
> - External link quality and authority
> - Body word count (thin/bloated content signal)

---

## Data to collect before running checks

1. **Read the target MDX file(s).**
2. **Read `src/content/tags.ts`** to get valid tag IDs.
3. **Count internal links** in the MDX body — links whose `href` starts with `/` or is a relative path.
4. **Identify the layout type** from the `layout` frontmatter field:
   - `PostLayout.astro` → blog post
   - `FrontPageLayout.astro` → home page
   - `PageLayout.astro` → regular page (about, contact, blog index, etc.)
5. **Detect the locale** from the file path (`/fi/`, `/en/`, `/sv/`).

---

## Checks

Run every applicable check. Mark each as **Error**, **Warning**, or **Pass**.

### 1. Required frontmatter fields

| Field | Applies to | Rule |
|---|---|---|
| `title` | all | Must be present and non-empty |
| `description` | all | Must be present and non-empty |
| `lang` | all | Must be `fi`, `sv`, or `en` |
| `slug` | all | Must be present |
| `publishDate` | blog posts | Must be present in ISO format (`YYYY-MM-DD` or `YYYY-MM-DDTHH:mm:ssZ`) |

Missing required field = **Error**.

---

### 2. Title tag

Best practice: 50–60 characters, primary keyword near the front, unique.

| Condition | Severity |
|---|---|
| Length < 20 chars | Error |
| Length 20–49 chars | Warning — too short, may be rewritten by Google |
| Length 50–60 chars | Pass |
| Length 61–70 chars | Warning — acceptable but risks truncation |
| Length > 70 chars | Error — will be truncated/rewritten by Google (~100% rewrite rate above 70) |
| Title ends with site name suffix " \| Lauri Lavanti" | Note: suffix is auto-appended by `Head.astro`; measure the raw frontmatter title, not the final rendered title |

---

### 3. Meta description

Best practice: 120–160 characters, unique, written for CTR, primary keyword early.

| Condition | Severity |
|---|---|
| Length < 50 chars | Error |
| Length 50–119 chars | Warning — too short, Google may replace it |
| Length 120–160 chars | Pass |
| Length 161–165 chars | Warning — borderline, may be truncated on mobile |
| Length > 165 chars | Error — will be truncated by Google |

---

### 4. Open Graph / social sharing

The project's `Head.astro` auto-generates OG tags from frontmatter. Verify the inputs are present:

| Check | Severity |
|---|---|
| `heroImage` present (used for `og:image`) | Warning if absent on blog posts or regular pages (og:image drives social CTR) |
| `alt` present when `heroImage` is set (used for `og:image:alt`) | Error — accessibility + social metadata requirement |
| `alt` is NOT an empty string or just the filename | Error |
| `alt` text is descriptive (more than 3 words) | Warning if too short |

Note: `og:title`, `og:description`, `og:url`, `og:type`, `og:locale`, `og:image:width` (1200), `og:image:height` (630), and `twitter:card` are generated automatically; no frontmatter action needed for those.

---

### 5. JSON-LD structured data (E-E-A-T signals)

The project generates structured data from frontmatter. Verify:

**For blog posts (`PostLayout.astro`):**
| Check | Severity |
|---|---|
| `publishDate` set → `datePublished` will be populated | Pass / Error if missing |
| `updatedDate` absent even though post appears revised | Warning — `dateModified` won't be emitted; suggest adding `updatedDate` if content changed |
| No `heroImage` → JSON-LD `image` will be absent | Warning — reduces rich result eligibility |

**For all pages:**
| Check | Severity |
|---|---|
| `description` present → populates JSON-LD `description` field | Pass / Error if missing |
| `slug` present → canonical URL will resolve correctly in JSON-LD | Pass / Error if missing |

---

### 6. Canonical URL & hreflang

| Check | Severity |
|---|---|
| `slug` present and URL-safe: only lowercase letters, digits, hyphens | Error if contains uppercase, spaces, or special characters |
| `slug` matches the directory name segment in the file path (`src/pages/{lang}/blog/{id}/{slug}/index.mdx`) | Error if mismatch |
| `lang` matches the locale in the file path (`/fi/` → `fi`, `/en/` → `en`, `/sv/` → `sv`) | Error if mismatch — hreflang will be wrong |

Note: The project generates `<link rel="alternate" hreflang="…">` for all three locales. Mismatched `lang` breaks that for the other two versions.

---

### 7. URL slug quality

Best practice: 3–5 meaningful words, 20–60 characters, no dates, no keyword stuffing.

| Condition | Severity |
|---|---|
| Slug contains uppercase letters | Error |
| Slug contains underscores | Warning — use hyphens instead |
| Slug contains numbers only (no words) | Warning |
| Slug < 10 chars | Warning — likely too short to be descriptive |
| Slug > 75 chars | Warning — overly long slug hurts readability |
| Slug contains a 4-digit year (e.g. `2024-`) | Warning — dates make content appear stale and limit repurposing |

---

### 8. Heading structure

Scan the MDX body (below the frontmatter `---` block):

| Check | Severity |
|---|---|
| No headings found at all | Error — thin content signal, poor document structure |
| Only one heading and it duplicates the `title` exactly | Warning — missed opportunity to add more structure |
| An H3 (`###`) appears without a preceding H2 (`##`) in the section | Warning — skipped heading level harms accessibility and SEO |
| H1 (`#`) used in the body | Warning — the page `<title>` and `<h1>` are rendered by the layout; a second H1 in body creates duplicate H1 |
| First heading is not near the top of the body content | Warning — users and crawlers expect the lead heading early |

---

### 9. Image alt text (body images)

For every `<img>` or `![alt](src)` in the MDX body:

| Check | Severity |
|---|---|
| `alt` is missing | Error |
| `alt=""` on a non-decorative image (image appears to carry meaning) | Warning |
| `alt` text is just a filename or URL fragment | Error |
| `alt` text is fewer than 3 words on a meaningful image | Warning — likely not descriptive enough |

---

### 10. Internal linking

Best practice: 3–5 internal links per page to support crawl efficiency and topical authority.

| Check | Severity |
|---|---|
| 0 internal links in body | Warning — missed crawl efficiency and topical authority signal |
| 1–2 internal links | Warning — below recommended minimum |
| 3–5 internal links | Pass |
| > 10 internal links on a single page | Warning — potential link equity dilution |

Count only links in the MDX body (not navigation, not layout). Links whose `href` starts with `/` or is a relative path count as internal.

---

### 11. Tag validity (blog posts only)

| Check | Severity |
|---|---|
| `tags` field absent or empty array | Warning — reduces category/topic discoverability |
| A tag ID that does not exist in `src/content/tags.ts` | Error — broken tag reference |

---

### 12. Content quality signals

| Check | Severity |
|---|---|
| Body word count < 300 words | Warning — thin content; may not satisfy search intent |
| Body word count > 4000 words | Warning — diminishing engagement returns; consider splitting |
| No paragraphs of prose (body is mostly code blocks or lists only) | Info — make sure the page still satisfies user intent textually |

Count words in the MDX body, excluding frontmatter, code blocks (``` … ```), and HTML comments.

---

## Output format

Produce a structured report for each file:

```
## SEO Report: src/pages/en/blog/51/digital-independence-is-a-necessity/index.mdx

### Errors (2)
- [Open Graph] `alt` is missing but `heroImage` is set — required for og:image:alt
- [Title] 78 chars — exceeds 70-char limit, will be rewritten by Google
  Current: "Digital independence is a necessity for modern democracies everywhere"

### Warnings (3)
- [Internal links] Only 1 internal link found — recommended minimum is 3
- [Description] 112 chars — below 120-char ideal; consider expanding
  Current: "As Russia's neighbor, Finland..."
- [Tags] `tags` array is empty — add relevant tags to improve discoverability

### Passed (9)
- title ✓ (55 chars)
- description present ✓
- lang matches file path ✓ (en)
- slug URL-safe ✓
- slug matches directory name ✓
- publishDate present ✓ (2026-03-05)
- heroImage present ✓
- headings found ✓ (4 headings)
- word count ✓ (~820 words)

---
Score: 9/14 checks passed (2 errors, 3 warnings)
```

If all checks pass: print "All SEO checks passed." followed by the pass list.

**Do NOT auto-fix any issues** unless the user explicitly asks you to fix them after seeing the report.
