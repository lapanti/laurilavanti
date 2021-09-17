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
    const result = await graphql(`
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
    if (result.errors) {
        console.log(result.errors)
    } else {
        result.data.allMdx.nodes.forEach((post) =>
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
}
