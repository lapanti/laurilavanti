import type { APIContext } from 'astro'

import rss from '@astrojs/rss'

import { allMdxPosts } from '../../lib/mdxPosts'

export async function GET(context: APIContext) {
    const posts = allMdxPosts.filter((p) => p.lang === 'sv')

    return rss({
        description: 'Lauri Lavantis blogginlägg',
        items: posts.map((post) => ({
            description: post.description,
            link: post.url,
            pubDate: new Date(post.publishDate),
            title: post.title,
        })),
        site: context.site!,
        title: 'Lauri Lavanti – blogg',
    })
}
