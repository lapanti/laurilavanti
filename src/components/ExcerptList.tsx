import type { ImageDataLike } from 'gatsby-plugin-image'

import { graphql, useStaticQuery } from 'gatsby'
import React, { useMemo } from 'react'
import tw from 'twin.macro'

import Excerpt from './excerptList/Excerpt'

interface Props {
    className?: string
    limit?: number
}

const ExcerptListComponent = ({ className, limit }: Props): JSX.Element => {
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

    const nodes = useMemo(
        () => (limit ? data.allMdx.nodes.slice(0, limit) : data.allMdx.nodes),
        [data.allMdx.nodes, limit]
    )

    return (
        <ul className={className}>
            {nodes.map((node) => (
                <li key={node.frontmatter.date}>
                    <Excerpt {...node.frontmatter} slug={node.slug} readingTime={node.fields.readingTime.time} />
                </li>
            ))}
        </ul>
    )
}

ExcerptListComponent.displayName = 'ExcerptList'

const ExcerptList = tw(ExcerptListComponent)`
    col-start-3
`
export default ExcerptList
