const chalk = require('chalk')

exports.createPages = async ({ graphql, actions }) => {
    const { createRedirect } = actions
    const { errors, data } = await graphql(`
        {
            redirects: allContentfulPost(filter: { oldSlugs: { ne: null } }) {
                nodes {
                    slug
                    oldSlugs
                }
            }
            pages: allContentfulPage {
                nodes {
                    slug
                }
            }
            posts: allContentfulPost {
                nodes {
                    slug
                }
            }
            tagsGroup: allContentfulTag {
                nodes {
                    contentful_id
                }
            }
        }
    `)
    if (errors) {
        console.log(errors)
    } else {
        data.redirects.nodes.forEach((post) =>
            post.oldSlugs.forEach((from) =>
                createRedirect({
                    fromPath: `/${from}`,
                    toPath: `blogi/${post.slug}`,
                    isPermanent: true,
                    redirectInBrowser: true,
                })
            )
        )

        console.log(`${chalk.green('success')} created redirects`)
    }

    data.pages.nodes.forEach(({ slug }) => {
        actions.createPage({
            path: slug === 'index' ? '/' : slug,
            component:
                slug === 'index'
                    ? require.resolve('./src/components/FrontPage.tsx')
                    : require.resolve('./src/components/Page.tsx'),
            context: { slug },
        })
    })

    data.posts.nodes.forEach(({ slug }) => {
        actions.createPage({
            path: `/blogi/${slug}`,
            component: require.resolve('./src/components/Post.tsx'),
            context: { slug },
        })
    })

    data.tagsGroup.nodes.forEach(({ contentful_id }) => {
        actions.createPage({
            path: `/kategoria/${contentful_id}`,
            component: require.resolve('./src/components/Tag.tsx'),
            context: { tag: contentful_id },
        })
    })
}
