const chalk = require('chalk')
const readingTime = require('reading-time')

exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `Mdx`) {
        createNodeField({
            node,
            name: `readingTime`,
            value: readingTime(node.rawBody),
        })
    }
}

exports.createPages = async ({ graphql, actions }) => {
    const { createRedirect } = actions
    const { errors, data } = await graphql(`
        {
            redirects: allMdx(filter: { frontmatter: { redirect_from: { ne: null } } }) {
                nodes {
                    slug
                    frontmatter {
                        redirect_from
                    }
                }
            }
            pages: allMdx(filter: { frontmatter: { tags: { eq: null } } }) {
                nodes {
                    slug
                }
            }
            posts: allMdx(filter: { frontmatter: { tags: { ne: null } } }) {
                nodes {
                    slug
                }
            }
            tagsGroup: allMdx {
                group(field: frontmatter___tags) {
                    fieldValue
                }
            }
        }
    `)
    if (errors) {
        console.log(errors)
    } else {
        data.redirects.nodes.forEach((post) =>
            post.frontmatter.redirect_from.forEach((from) =>
                createRedirect({
                    fromPath: from,
                    toPath: post.slug,
                    isPermanent: true,
                    redirectInBrowser: true,
                })
            )
        )

        console.log(`${chalk.green('success')} created redirects`)
    }

    data.pages.nodes.forEach(({ slug }) => {
        actions.createPage({
            path: slug === '' ? '/' : slug,
            component: require.resolve('./src/components/Page.tsx'),
            context: { slug },
        })
    })

    data.posts.nodes.forEach(({ slug }) => {
        actions.createPage({
            path: slug,
            component: require.resolve('./src/components/Post.tsx'),
            context: { slug },
        })
    })

    data.tagsGroup.group.forEach(({ fieldValue }) => {
        actions.createPage({
            path: `/blogi/${fieldValue}`,
            component: require.resolve('./src/components/Tag.tsx'),
            context: { tag: fieldValue },
        })
    })
}
