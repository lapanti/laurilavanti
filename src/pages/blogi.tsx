import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import Page from '../components/Page'

const MINUTE_IN_MS = 60000 // 60 seconds * 1000 ms

const Blog = (): JSX.Element => {
    const data = useStaticQuery<{
        allMdx: {
            nodes: {
                frontmatter: { title: string; date: string; excerpt: string; categories: string[] }
                fields: { readingTime: { time: number } }
            }[]
        }
    }>(graphql`
        {
            allMdx(sort: { fields: frontmatter___date, order: DESC }) {
                nodes {
                    frontmatter {
                        title
                        date(formatString: "L", locale: "fi")
                        excerpt
                        categories
                    }
                    fields {
                        readingTime {
                            time
                        }
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
                        {node.frontmatter.title}
                        <br />
                        {node.frontmatter.date} {node.fields.readingTime.time % MINUTE_IN_MS === 0 ? '' : 'Noin '}{' '}
                        {Math.max(1, Math.floor(node.fields.readingTime.time / MINUTE_IN_MS))} minuutti
                        {Math.floor(node.fields.readingTime.time / MINUTE_IN_MS) === 1 ? '' : 'a'}
                        <br />
                        {node.frontmatter.categories.map((category) => (
                            <span key={category}>#{category}</span>
                        ))}
                        <br />
                        {node.frontmatter.excerpt}
                    </li>
                ))}
            </ul>
        </Page>
    )
}

export default Blog
