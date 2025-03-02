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
        createRedirect({
            fromPath: '/lahjoita',
            isPermanent: true,
            toPath: 'https://vaalit.vihreat.fi/embed/ehdokas/?kieli=fi&vaali=kuntavaalit-2025&kunta=k257&ehdokas=lavanti-lauri-7479&valilehti=donate',
        })

        data.redirects.nodes.forEach((post) =>
            post.oldSlugs.forEach((from) =>
                createRedirect({
                    fromPath: `/${from}`,
                    isPermanent: true,
                    redirectInBrowser: true,
                    toPath: `blogi/${post.slug}`,
                })
            )
        )

        console.log(`created redirects`)
    }

    data.pages.nodes.forEach(({ slug }) => {
        actions.createPage({
            component:
                slug === 'index'
                    ? require.resolve('./src/components/FrontPage.tsx')
                    : require.resolve('./src/components/Page.tsx'),
            context: { slug },
            path: slug === 'index' ? '/' : slug,
        })
    })

    data.posts.nodes.forEach(({ slug }) => {
        actions.createPage({
            component: require.resolve('./src/components/Post.tsx'),
            context: { slug },
            path: `/blogi/${slug}`,
        })
    })

    data.tagsGroup.nodes.forEach(({ contentful_id }) => {
        actions.createPage({
            component: require.resolve('./src/components/Tag.tsx'),
            context: { tag: contentful_id },
            path: `/kategoria/${contentful_id}`,
        })
    })
}
