import type { APIContext } from 'astro'

import rss from '@astrojs/rss'

import { getImage } from '../../lib/images'
import { allMdxPosts, mdxContentByPath } from '../../lib/mdxPosts'

export async function GET(context: APIContext) {
    const posts = allMdxPosts.filter((p) => p.lang === 'sv')

    const items = await Promise.all(
        posts.map(async (post) => {
            const absoluteUrl = new URL(post.url, context.site!).href
            const html = (await mdxContentByPath[`../pages${post.url}index.mdx`]?.()) ?? ''
            const content =
                html +
                `<p>Inlägget <a href="${absoluteUrl}">${post.title}</a> publicerades först på Lauri Lavantis blogg.</p>`
            const img = getImage(post.heroImage, 'og')

            return {
                content,
                customData: `<media:content url="${img.src}" medium="image" width="${img.width}" height="${img.height}"/>`,
                description: post.description,
                enclosure: { length: 0, type: 'image/jpeg', url: img.src },
                link: post.url,
                pubDate: new Date(post.publishDate),
                title: post.title,
            }
        })
    )

    return rss({
        description: 'Lauri Lavantis blogginlägg',
        items,
        site: context.site!,
        title: 'Lauri Lavanti – blogg',
        xmlns: { media: 'http://search.yahoo.com/mrss/' },
    })
}
