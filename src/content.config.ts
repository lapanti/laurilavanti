import { defineCollection, z } from 'astro:content'

import { postsLoader } from './content/lib/postsLoader'

const authorEntry = z.union([
    z.literal('lauri'),
    z.object({
        name: z.string(),
        role: z.string().optional(),
        sameAs: z.array(z.string()).optional(),
        url: z.string().optional(),
    }),
])

const externalPublication = z.object({
    date: z.string(),
    name: z.string(),
    url: z.string().optional(),
})

const posts = defineCollection({
    loader: postsLoader(),
    schema: z.object({
        alt: z.string(),
        authors: z.array(authorEntry).optional(),
        description: z.string(),
        externalPublications: z.array(externalPublication).optional(),
        faq: z.array(z.object({ a: z.string(), q: z.string() })).optional(),
        heroImage: z.string(),
        id: z.number().int().positive(),
        lang: z.enum(['fi', 'sv', 'en']),
        pageTitle: z.string(),
        publishDate: z.string(),
        slug: z.string(),
        tags: z.array(z.string()).min(1),
        title: z.string(),
        updatedDate: z.string(),
    }),
})

export const collections = { posts }
