import type { ImageDataLike } from 'gatsby-plugin-image'

export interface MdxFrontmatter {
    title: string
    image?: ImageDataLike
}

export interface Mdx {
    frontmatter: MdxFrontmatter
    body: string
}

export interface MdxPostFrontmatter extends MdxFrontmatter {
    tags: string[]
    date: string
    image: ImageDataLike
    description: string
}

export interface MdxPost extends Mdx {
    frontmatter: MdxPostFrontmatter
    fields: {
        readingTime: {
            time: number
        }
    }
    body: string
}
