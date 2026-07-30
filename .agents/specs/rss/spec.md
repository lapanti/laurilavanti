# Feature: RSS Feeds

## Blueprint

### Context
Each locale has a dedicated RSS feed for blog post subscribers. Feeds are generated at build time from the posts content collection and served as static XML. They are a public API surface — subscribers break if the feed URL or item structure changes.

### Architecture
- **Feed endpoint:** single dynamic route `src/pages/[lang]/rss.xml.ts` — `getStaticPaths()` returns one path per locale (`fi`, `sv`, `en`), replacing what used to be three separate per-locale files.

- **Pattern:**
  ```ts
  export function getStaticPaths() {
      const langs: Lang[] = ['fi', 'sv', 'en']
      return langs.map((lang) => ({ params: { lang } }))
  }

  export async function GET(context: APIContext) {
      const lang = context.params.lang as Lang
      const posts = (await getAllPosts()).filter((p) => p.lang === lang)
      const items = await Promise.all(posts.map(async (post) => ({
          content: (await getPostHtml(post)) + `<p><a href="...">${t.permalinkLabel}</a></p>`,
          description: post.description,
          link: post.url,
          pubDate: new Date(post.publishDate),
          title: post.title,
          // ... enclosure/customData for the hero image
      })))
      return rss({ description: t.description, items, site: context.site!, title: t.title })
  }
  ```

- **Feed titles and descriptions by locale** — held in an `i18n: Record<Lang, {...}>` map in the same file:
  | Locale | Title | Description |
  |---|---|---|
  | `fi` | `Lauri Lavanti – blogi` | `Lauri Lavantin blogikirjoitukset` |
  | `en` | `Lauri Lavanti – blog` | `Blog posts by Lauri Lavanti` |
  | `sv` | `Lauri Lavanti – blogg` | `Lauri Lavantis blogginlägg` |

- **Item fields used:** `description`, `link` (from `post.url`), `pubDate` (from `new Date(post.publishDate)`), `title`, `content` (rendered via `getPostHtml`)

- **`post.url`** is the canonical slug URL derived by `src/lib/posts.ts`: `/{lang}/blog/{id}/{slug}/`

- **`context.site`** must be configured in `astro.config.mjs` — the `!` assertion means it throws at build time if missing

- **Dependencies:** RSS feeds → `getAllPosts()`/`getPostHtml()` → `src/lib/posts.ts` → the `posts` content collection (`src/content.config.ts`). Feed generation is pure build-time; no client-side logic. `getPostHtml` deliberately uses a plain markdown-to-HTML render (unified/remark/rehype on the raw MDX body), not the real Astro/MDX component render — RSS never rendered actual Astro components, even under the old per-locale-file setup.

### Anti-Patterns
- Do not add image/enclosure fields to the RSS items without verifying subscriber compatibility — many feed readers handle enclosures differently
- Do not filter by `updatedDate` for `pubDate` — use `publishDate` only; changing this would reorder items in subscribers' readers
- Do not change the feed URL paths (`/fi/rss.xml`) — they are the public API and subscribers have bookmarked them
- Do not assert `context.site!` as optional — the site URL is required for valid RSS; the build should fail if it's missing

---

## Contract

### Definition of Done
- [ ] Feed at `/{lang}/rss.xml` returns valid RSS XML for each locale
- [ ] Items include `title`, `description`, `link`, and `pubDate`
- [ ] `link` is a fully-qualified URL using `context.site` as base
- [ ] Posts are filtered to the correct locale (no cross-locale bleed)
- [ ] Items are ordered newest-first (inherited from `getAllPosts()` sort order)
- [ ] `npm run build` generates all three feed paths from the single `[lang]/rss.xml.ts` route

### Regression Guardrails
- `getAllPosts()` is sorted newest-first by `id` — do not re-sort by `pubDate` in the feed; this would desync from the post list order
- `new Date(post.publishDate)` requires `publishDate` to be a valid ISO 8601 string — enforced by the content collection schema
- Adding a new locale requires adding it to the `langs` array in `getStaticPaths()` and the `i18n` map — not a new file, since routing is unified

### Scenarios

**Scenario: Finnish feed contains only Finnish posts**
- Given: 50 Finnish posts and 3 English posts exist in the collection
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
- Then: `de` is added to the `langs` array in `[lang]/rss.xml.ts`'s `getStaticPaths()` plus the `i18n` title/description map — the feed does not appear automatically
