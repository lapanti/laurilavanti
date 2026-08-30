import type { Lang } from '../../content/nav'

import { sloganContent } from '../../content/slogan'
import { tags } from '../../content/tags'
import { getAllPosts } from '../posts'
import { ogId } from './id'

/**
 * One generated OG card. `title` is the headline; `emphasis`, when present, is rendered
 * after it in bright green (mirroring SplitHero's `{title} <em>{emphasis}</em>`).
 */
export interface OgCard {
    emphasis?: string
    id: string
    lang: Lang
    title: string
}

const LANGS: Lang[] = ['fi', 'sv', 'en']

/**
 * Strip soft hyphens (U+00AD — authored into titles for on-page hyphenation, e.g.
 * "Tieto­suoja­seloste") and collapse whitespace, so the card renders clean text.
 */
export const cleanCardText = (text: string): string => text.replace(/­/g, '').replace(/\s+/g, ' ').trim()

interface PageFrontmatter {
    emphasis?: string
    lang?: Lang
    noindex?: boolean
    ogEmphasis?: string
    ogTitle?: string
    slug?: string
    title?: string
}

/**
 * Frontmatter of every statically-routed MDX page (about, blog, contact, media,
 * newsletter, privacy-policy, recommendations, …). `import: 'frontmatter'` pulls only
 * the frontmatter export — not the page components — so importing this module into the
 * OG endpoint stays cheap and cycle-free.
 */
const pageFrontmatter = import.meta.glob<PageFrontmatter>('/src/pages/**/index.mdx', {
    eager: true,
    import: 'frontmatter',
})

let cache: Promise<OgCard[]> | undefined

/*
 * v8 ignore start -- build() calls getAllPosts()/getCollection(), which needs Astro's
 * content-layer store populated by a build/dev/sync; a plain vitest run can't trigger
 * that (see the same note in src/lib/posts.ts), so this is exercised by `npm run build`
 * and the dist-crawl guard instead.
 */
async function build(): Promise<OgCard[]> {
    const cards: OgCard[] = []

    /*
     * Front pages — headline is the campaign slogan (`title` is just "Lauri Lavanti",
     * which the wordmark already carries).
     */
    for (const lang of LANGS) {
        const { prefix, restingWord } = sloganContent[lang]
        cards.push({ emphasis: cleanCardText(restingWord), id: ogId(lang), lang, title: cleanCardText(prefix) })
    }

    /*
     * Static MDX pages. Front pages (slug === lang) are handled above; noindex pages
     * (e.g. the root language dispatcher) get no card.
     */
    for (const fm of Object.values(pageFrontmatter)) {
        if (!fm?.slug || !fm.lang || fm.noindex) continue
        if (LANGS.includes(fm.slug as Lang)) continue
        const title = cleanCardText(fm.ogTitle ?? fm.title ?? '')
        if (!title) continue
        const emphasis = fm.ogEmphasis ?? fm.emphasis
        cards.push({
            emphasis: emphasis ? cleanCardText(emphasis) : undefined,
            id: ogId(fm.slug),
            lang: fm.lang,
            title,
        })
    }

    // Blog posts — per-locale title, optional per-locale ogTitle/ogEmphasis overrides.
    for (const post of await getAllPosts()) {
        const slug = `${post.lang}/blog/${post.id}/${post.slug}`
        cards.push({
            emphasis: post.ogEmphasis ? cleanCardText(post.ogEmphasis) : undefined,
            id: ogId(slug),
            lang: post.lang,
            title: cleanCardText(post.ogTitle ?? post.title),
        })
    }

    // Category / tag pages.
    for (const lang of LANGS) {
        for (const tag of tags) {
            cards.push({ id: ogId(`${lang}/category/${tag.id}`), lang, title: cleanCardText(tag.pageTitle[lang]) })
        }
    }

    return cards
}

export const getOgCards = (): Promise<OgCard[]> => (cache ??= build())
/* v8 ignore stop */
