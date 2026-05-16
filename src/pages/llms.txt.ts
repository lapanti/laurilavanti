import type { APIRoute } from 'astro'

import { getTagName, tags } from '../content/tags'
import { allMdxPosts } from '../lib/mdxPosts'

const AI_TAG = 'artificial-intelligence'

const PILLAR_LINKS = [
    { label: 'Etusivu', url: '/fi/' },
    { label: 'Aiheet', url: '/fi/topics' },
    { label: 'Laurista', url: '/fi/about' },
]

export const getLlmsTxt = (site: URL): string => {
    const fiPosts = allMdxPosts.filter((p) => p.lang === 'fi')

    const tagIds = [
        AI_TAG,
        ...tags
            .map((t) => t.id)
            .filter((id) => id !== AI_TAG)
            .sort(),
    ]

    const tagSections = tagIds
        .map((id) => {
            const posts = fiPosts.filter((p) => p.tags.includes(id))
            if (posts.length === 0) return ''
            const name = getTagName(id, 'fi') ?? id
            const links = posts.map((p) => `- [${p.title}](${new URL(p.url, site).href})`).join('\n')

            return `## ${name}\n\n${links}`
        })
        .filter(Boolean)
        .join('\n\n')

    const nonFiPosts = allMdxPosts.filter((p) => p.lang !== 'fi')
    const multilingualLinks = nonFiPosts.map((p) => `- [${p.title}](${new URL(p.url, site).href})`).join('\n')

    const pillarLinks = PILLAR_LINKS.map((l) => `- [${l.label}](${new URL(l.url, site).href})`).join('\n')

    return `\
# Lauri Lavanti

> Lauri Lavanti on kirkkonummelainen poliitikko ja lead developer, joka kirjoittaa teknologiasta, kunnallispolitiikasta ja yhteiskunnasta.

## Tärkeimmät sivut

${pillarLinks}

${tagSections}

## Muut kielet / Other languages / Andra språk

${multilingualLinks}
`
}

export const GET: APIRoute = ({ site }) => {
    return new Response(getLlmsTxt(site!))
}
