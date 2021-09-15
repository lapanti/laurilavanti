import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import Page from '../components/Page'

const Blog = (): JSX.Element => {
    const data = useStaticQuery<{ allMdx: { nodes: { frontmatter: { title: string; date: string } }[] } }>(graphql`
        {
            allMdx(sort: { fields: frontmatter___date, order: DESC }) {
                nodes {
                    frontmatter {
                        title
                        date(formatString: "YYYY-MM-DD")
                    }
                }
            }
        }
    `)
    return (
        <Page title="Blogi">
            <ul>
                {data.allMdx.nodes.map((node) => (
                    <li key={node.frontmatter.date}>
                        {node.frontmatter.title} {node.frontmatter.date}
                    </li>
                ))}
            </ul>
        </Page>
    )
}

export default Blog
