import { type CollectionEntry, getCollection } from 'astro:content'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

const stripImportsExports = (raw: string): string =>
    raw.replace(/^(import\s+.+|export\s+const\s+components\s*=.+)$/gm, '')

export type Post = CollectionEntry<'posts'>['data'] & {
    entry: CollectionEntry<'posts'>
    readingTime: number
    url: string
    wordCount: number
}

let cache: Promise<Post[]> | undefined

async function loadAllPosts(): Promise<Post[]> {
    const entries = await getCollection('posts')

    return entries
        .map((entry) => {
            const body = stripImportsExports(entry.body ?? '')
            const wordCount = body.trim().split(/\s+/).filter(Boolean).length

            return {
                ...entry.data,
                entry,
                readingTime: Math.ceil(wordCount / 200),
                url: `/${entry.data.lang}/blog/${entry.data.id}/${entry.data.slug}/`,
                wordCount,
            }
        })
        .toSorted((a, b) => b.id - a.id)
}

export const getAllPosts = (): Promise<Post[]> => (cache ??= loadAllPosts())

export const buildAlternatesMap = (posts: Post[], id: number): Record<Post['lang'], string> => {
    const result = {} as Record<Post['lang'], string>
    for (const p of posts.filter((p) => p.id === id)) {
        result[p.lang] = p.url
    }
    return result
}

export const getPostAlternates = async (id: number): Promise<Record<Post['lang'], string>> =>
    buildAlternatesMap(await getAllPosts(), id)

export interface ExcerptQuery {
    currentSlug?: string
    excludeIds?: number[]
    lang: Post['lang']
    limit?: number
    onlyIds?: number[]
    relatedTags?: string[]
    tag?: string
}

export const sortByRelatedTags = (posts: Post[], relatedTags: string[]): Post[] =>
    posts
        .map<[Post, number]>((p) => [p, relatedTags.reduce((sum, t) => sum + (p.tags.includes(t) ? 1 : 0), 0)])
        .toSorted(([a, aPoints], [b, bPoints]) => (aPoints === bPoints ? b.id - a.id : bPoints - aPoints))
        .map(([p]) => p)

export const filterExcerptPosts = (posts: Post[], q: ExcerptQuery): Post[] => {
    const filtered = posts
        .filter((p) => p.lang === q.lang)
        .filter((p) => !q.currentSlug || p.slug !== q.currentSlug)
        .filter((p) => !q.tag || p.tags.includes(q.tag))
        .filter((p) => !q.onlyIds || q.onlyIds.includes(p.id))
        .filter((p) => !q.excludeIds || !q.excludeIds.includes(p.id))

    const sorted = q.relatedTags ? sortByRelatedTags(filtered, q.relatedTags) : filtered

    return q.limit ? sorted.slice(0, q.limit) : sorted
}

export const getExcerptPosts = async (q: ExcerptQuery): Promise<Post[]> => filterExcerptPosts(await getAllPosts(), q)

const processor = unified().use(remarkParse).use(remarkRehype, { allowDangerousHtml: true }).use(rehypeStringify)

/**
 * Plain markdown-to-HTML render for RSS — deliberately not the real Astro/MDX render
 *  path (astro:content's render()), since RSS never rendered actual Astro components
 *  even under the old page-routed setup; this preserves that same behavior.
 */
export const getPostHtml = async (post: Post): Promise<string> => {
    const body = stripImportsExports(post.entry.body ?? '')

    return String(await processor.process(body))
}
