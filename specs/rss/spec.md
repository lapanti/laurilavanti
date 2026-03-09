# Feature: RSS Feeds

## Blueprint

### Context
Each locale has a dedicated RSS feed for blog post subscribers. Feeds are generated at build time from `allMdxPosts` and served as static XML. They are a public API surface — subscribers break if the feed URL or item structure changes.

### Architecture
- **Feed endpoints:**
  - `src/pages/fi/rss.xml.ts` → `/fi/rss.xml`
  - `src/pages/en/rss.xml.ts` → `/en/rss.xml`
  - `src/pages/sv/rss.xml.ts` → `/sv/rss.xml`

- **Pattern** (identical across all three, only `lang` and strings differ):
  ```ts
  export async function GET(context: APIContext) {
      const posts = allMdxPosts.filter((p) => p.lang === 'fi')
      return rss({
          description: '...',
          items: posts.map((post) => ({
              description: post.description,
              link: post.url,
              pubDate: new Date(post.publishDate),
              title: post.title,
          })),
          site: context.site!,
          title: 'Lauri Lavanti – blogi',
      })
  }
  ```

- **Feed titles and descriptions by locale:**
  | Locale | Title | Description |
  |---|---|---|
  | `fi` | `Lauri Lavanti – blogi` | `Lauri Lavantin blogikirjoitukset` |
  | `en` | `Lauri Lavanti – blog` | `Blog posts by Lauri Lavanti` |
  | `sv` | `Lauri Lavanti – blogg` | `Lauri Lavantis blogginlägg` |

- **Item fields used:** `description`, `link` (from `post.url`), `pubDate` (from `new Date(post.publishDate)`), `title`

- **`post.url`** is the canonical slug URL derived by `mdxPosts.ts`: `/{lang}/blog/{id}/{slug}/`

- **`context.site`** must be configured in `astro.config.mjs` — the `!` assertion means it throws at build time if missing

- **Dependencies:** RSS feeds → `allMdxPosts` → `src/lib/mdxPosts.ts`. Feed generation is pure build-time; no client-side logic.

### Anti-Patterns
- Do not add image/enclosure fields to the RSS items without verifying subscriber compatibility — many feed readers handle enclosures differently
- Do not filter by `updatedDate` for `pubDate` — use `publishDate` only; changing this would reorder items in subscribers' readers
- Do not change the feed URL paths (`/fi/rss.xml`) — they are the public API and subscribers have bookmarked them
- Do not make the three feed files diverge in structure — they must remain parallel; copy-paste changes across all three
- Do not assert `context.site!` as optional — the site URL is required for valid RSS; the build should fail if it's missing

---

## Contract

### Definition of Done
- [ ] Feed at `/{lang}/rss.xml` returns valid RSS XML for each locale
- [ ] Items include `title`, `description`, `link`, and `pubDate`
- [ ] `link` is a fully-qualified URL using `context.site` as base
- [ ] Posts are filtered to the correct locale (no cross-locale bleed)
- [ ] Items are ordered newest-first (inherited from `allMdxPosts` sort order)
- [ ] `npm run build` generates all three feed files

### Regression Guardrails
- `allMdxPosts` is sorted newest-first by `id` — do not re-sort by `pubDate` in the feed; this would desync from the post list order
- `new Date(post.publishDate)` requires `publishDate` to be a valid ISO 8601 string — enforced by post frontmatter schema
- Adding a new locale requires creating a new feed file — it is not generated automatically

### Scenarios

**Scenario: Finnish feed contains only Finnish posts**
- Given: 50 Finnish posts and 3 English posts exist in `allMdxPosts`
- When: `/fi/rss.xml` is fetched
- Then: The feed contains exactly 50 items; no English or Swedish posts appear

**Scenario: New post appears in feed**
- Given: A new Finnish post with `publishDate: '2025-01-15'` and `id: 51` is added
- When: The site is built
- Then: The new post appears as the first item in `/fi/rss.xml` (newest-first order)

**Scenario: Feed item link format**
- Given: A post has `url: '/fi/blog/10/sote-on-hyvinvointiyhteiskunnan-kulmakivi/'`
- When: The RSS item is generated
- Then: The `<link>` element is `https://laurilavanti.fi/fi/blog/10/sote-on-hyvinvointiyhteiskunnan-kulmakivi/` (full URL using `context.site`)

**Scenario: New locale added**
- Given: A new locale `de` is added to the site with German blog posts
- When: Implementation begins
- Then: A new file `src/pages/de/rss.xml.ts` must be manually created following the same pattern; the feed does not appear automatically
