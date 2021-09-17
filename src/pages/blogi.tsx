import type { PageProps } from 'gatsby'
import type { ImageDataLike } from 'gatsby-plugin-image'

import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import tw from 'twin.macro'

import Excerpt from '../components/Excerpt'
import Page from '../components/Page'

const ExcerptList = tw.ul`
    col-start-3
`

const Blog = ({ location }: PageProps): JSX.Element => {
    const data = useStaticQuery<{
        allMdx: {
            nodes: {
                frontmatter: {
                    title: string
                    date: string
                    excerpt: string
                    categories: string[]
                    image: ImageDataLike
                }
                fields: { readingTime: { time: number } }
                slug: string
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
                        image {
                            childImageSharp {
                                gatsbyImageData(placeholder: BLURRED)
                            }
                        }
                    }
                    fields {
                        readingTime {
                            time
                        }
                    }
                    slug
                }
            }
        }
    `)

    return (
        <Page title="Blogi" location={location}>
            <ExcerptList>
                {data.allMdx.nodes.map((node) => (
                    <li key={node.frontmatter.date}>
                        <Excerpt {...node.frontmatter} slug={node.slug} readingTime={node.fields.readingTime.time} />
                    </li>
                ))}
            </ExcerptList>
        </Page>
    )
}

export default Blog
