---
name: seo-check
description: Check SEO quality of an MDX page or blog post in this Astro project. Validates frontmatter fields, title/description lengths, image alt text, slug consistency, tag validity, and language consistency.
argument-hint: [file-path or glob pattern]
---

Perform an SEO audit on the MDX file(s) at `$ARGUMENTS` (or the currently open file if no argument given).

## Steps

1. **Read the target file(s).** If `$ARGUMENTS` is a glob pattern or directory, use Glob to find all matching `.mdx` files. If no argument, check the conversation for any recently opened file path.

2. **Parse frontmatter fields** and run these checks:

### Required fields
- `title` — must be present and non-empty
- `description` — must be present and non-empty
- `lang` — must be one of `fi`, `sv`, `en`
- `slug` — must be present and URL-safe (only lowercase letters, digits, hyphens)

### Length checks
- `title` — ideal 50–60 chars; warn if shorter than 20 or longer than 70
- `description` — ideal 120–160 chars; warn if shorter than 50 or longer than 165

### Image checks
- If `heroImage` is present → `alt` must also be present and non-empty
- If `heroImage` is absent on a blog post → suggest adding one
- `alt` text should NOT just be the filename or empty string

### Date checks (blog posts only — files under `{lang}/blog/`)
- `publishDate` must be present in ISO format (`YYYY-MM-DD` or `YYYY-MM-DDTHH:mm:ssZ`)
- If the post has been revised, suggest adding `updatedDate`

### Language consistency
- Files under `fi/` should have `lang: 'fi'`
- Files under `en/` should have `lang: 'en'`
- Files under `sv/` should have `lang: 'sv'`
- Mismatch is an error

### Slug vs file path consistency (blog posts)
- The `slug` in frontmatter should match the directory name in the file path:
  `src/pages/{lang}/blog/{id}/{slug}/index.mdx`
- Mismatch is an error

### Tag validity (blog posts only)
- Read `src/content/tags.ts` to get the list of valid tag IDs
- Every tag in the `tags` array must appear as an `id` in that file
- Warn if `tags` is absent or empty for a blog post

### Content checks
- Scan the MDX body for at least one heading (`## ` or `# `)
- Warn if there are no headings (thin content signal)

3. **Output a structured report** for each file checked:

```
## SEO Report: <file path>

### Errors (must fix)
- ...

### Warnings (should fix)
- ...

### Passed
- title ✓ (52 chars)
- description ✓ (143 chars)
- ...
```

If everything passes, say "All SEO checks passed." If there are errors or warnings, list them clearly with the specific issue and the current value where relevant.

Do NOT attempt to auto-fix the files unless the user explicitly asks you to fix the issues found.
