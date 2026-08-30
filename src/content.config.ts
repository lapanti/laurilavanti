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

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'must be an ISO date (YYYY-MM-DD)')

const externalPublication = z.object({
    date: z.string(),
    lang: z.enum(['fi', 'sv', 'en']).default('fi'),
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
        heroImage: z.string(),
        id: z.number().int().positive(),
        lang: z.enum(['fi', 'sv', 'en']),
        ogEmphasis: z.string().optional(),
        ogTitle: z.string().optional(),
        pageTitle: z.string(),
        publishDate: isoDate,
        slug: z.string(),
        tags: z.array(z.string()).min(1),
        title: z.string(),
        updatedDate: isoDate,
    }),
})

export const collections = { posts }
