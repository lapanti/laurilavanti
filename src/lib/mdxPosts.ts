interface MdxPost {
    description: string
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
