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
    const redirectResults = await graphql(`
        {
            allMdx(filter: { frontmatter: { redirect_from: { ne: null } } }) {
                nodes {
                    slug
                    frontmatter {
                        redirect_from
                    }
                }
            }
        }
    `)
    if (redirectResults.errors) {
        console.log(redirectResults.errors)
    } else {
        redirectResults.data.allMdx.nodes.forEach((post) =>
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

    const { data } = await graphql(`
        query {
            allMdx {
                nodes {
                    slug
                }
            }
        }
    `)
    data.allMdx.nodes.forEach(({ slug }) => {
        actions.createPage({
            path: slug,
            component: require.resolve('./src/components/Post.tsx'),
            context: { slug },
        })
    })
}
