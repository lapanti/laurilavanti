interface MdxPost {
    description: string
    faq?: Array<{ a: string; q: string }>
    id: number
    lang: 'en' | 'fi' | 'sv'
    alt: string
    heroImage: string
    publishDate: string
    slug: string
    tags: string[]
    title: string
    updatedDate?: string
}

type GlobResult = { frontmatter: MdxPost }

const rawGlob = import.meta.glob<GlobResult>('../pages/*/blog/*/*/index.mdx', { eager: true })

export const allMdxPosts: (MdxPost & { url: string })[] = Object.entries(rawGlob)
    .map(([filePath, mod]) => {
        /* '../pages/fi/blog/1/kotihoidon-tuen-kuntalisa/index.mdx' → '/fi/blog/1/kotihoidon-tuen-kuntalisa/' */
        const url = filePath.replace('../pages', '').replace('index.mdx', '')

        return { ...mod.frontmatter, url }
    })
    .sort((a, b) => b.id - a.id)

export function getPostAlternates(id: number): Record<MdxPost['lang'], string> {
    const result = {} as Record<MdxPost['lang'], string>
    for (const post of allMdxPosts.filter((p) => p.id === id)) {
        result[post.lang] = post.url
    }
    return result
}
