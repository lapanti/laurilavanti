import type { APIContext } from 'astro'

import rss from '@astrojs/rss'

import { allMdxPosts } from '../../lib/mdxPosts'

export async function GET(context: APIContext) {
    const posts = allMdxPosts.filter((p) => p.lang === 'fi')

    return rss({
        description: 'Lauri Lavantin blogikirjoitukset',
        items: posts.map((post) => ({
            description: post.description,
            link: post.url,
            pubDate: new Date(post.publishDate),
            title: post.title,
        })),
        site: context.site!,
        title: 'Lauri Lavanti – blogi',
    })
}
