import type { AuthorEntry } from '../content/person'

import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

interface MdxPost {
    alt: string
    authors?: AuthorEntry[]
    description: string
    faq?: Array<{ a: string; q: string }>
    heroImage: string
    id: number
    lang: 'en' | 'fi' | 'sv'
    pageTitle: string
    publishDate: string
    slug: string
    tags: string[]
    title: string
    updatedDate: string
}

type MdxPostWithUrl = MdxPost & { url: string }

type GlobResult = { frontmatter: MdxPost }

const rawGlob = import.meta.glob<GlobResult>('../pages/*/blog/*/*/index.mdx', { eager: true })

export const allMdxPosts: MdxPostWithUrl[] = Object.entries(rawGlob)
    .map(([filePath, mod]) => {
        /* '../pages/fi/blog/1/kotihoidon-tuen-kuntalisa/index.mdx' → '/fi/blog/1/kotihoidon-tuen-kuntalisa/' */
        const url = filePath.replace('../pages', '').replace('index.mdx', '')

        return { ...mod.frontmatter, url }
    })
    .sort((a, b) => b.id - a.id)

const rawMdxGlob = import.meta.glob<string>('../pages/*/blog/*/*/index.mdx', {
    eager: true,
    import: 'default',
    query: '?raw',
})

const processor = unified().use(remarkParse).use(remarkRehype, { allowDangerousHtml: true }).use(rehypeStringify)

const stripFrontmatter = (raw: string): string =>
    raw.replace(/^---[\s\S]*?---\n?/, '').replace(/^(import\s+.+|export\s+const\s+components\s*=.+)$/gm, '')

export const mdxContentByPath: Record<string, () => Promise<string>> = Object.fromEntries(
    Object.entries(rawMdxGlob).map(([filePath, raw]) => [
        filePath,
        async () => {
            const body = stripFrontmatter(raw)
            const result = await processor.process(body)

            return String(result)
        },
    ])
)

export const getPostAlternates = (id: number): Record<MdxPost['lang'], string> => {
    const result = {} as Record<MdxPost['lang'], string>
    for (const post of allMdxPosts.filter((p) => p.id === id)) {
        result[post.lang] = post.url
    }
    return result
}

interface ExcerptQuery {
    currentSlug?: string
    excludeIds?: number[]
    lang: 'en' | 'fi' | 'sv'
    limit?: number
    onlyIds?: number[]
    relatedTags?: string[]
    tag?: string
}

const sortByRelatedTags = (posts: MdxPostWithUrl[], relatedTags: string[]): MdxPostWithUrl[] =>
    posts
        .map<[MdxPostWithUrl, number]>((p) => [
            p,
            relatedTags.reduce((sum, t) => sum + (p.tags.includes(t) ? 1 : 0), 0),
        ])
        .toSorted(([a, aPoints], [b, bPoints]) => (aPoints === bPoints ? b.id - a.id : bPoints - aPoints))
        .map(([p]) => p)

export const getExcerptPosts = ({
    currentSlug,
    excludeIds,
    lang,
    limit,
    onlyIds,
    relatedTags,
    tag,
}: ExcerptQuery): MdxPostWithUrl[] => {
    const filtered = allMdxPosts
        .filter((p) => p.lang === lang)
        .filter((p) => !currentSlug || p.slug !== currentSlug)
        .filter((p) => !tag || p.tags.includes(tag))
        .filter((p) => !onlyIds || onlyIds.includes(p.id))
        .filter((p) => !excludeIds || !excludeIds.includes(p.id))

    const sorted = relatedTags ? sortByRelatedTags(filtered, relatedTags) : filtered

    return limit ? sorted.slice(0, limit) : sorted
}
