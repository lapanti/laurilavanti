import type { MdxPost } from '../types/mdx'

import { graphql, useStaticQuery } from 'gatsby'
import React, { useMemo } from 'react'
import tw from 'twin.macro'

import Excerpt from './excerptList/Excerpt'

interface Props {
    className?: string
    limit?: number
    relatedTags?: string[]
}

const ExcerptListComponent = ({ className, limit, relatedTags }: Props): JSX.Element => {
    const data = useStaticQuery<{
        allMdx: {
            nodes: MdxPost[]
        }
    }>(graphql`
        {
            allMdx(sort: { fields: frontmatter___date, order: DESC }) {
                nodes {
                    frontmatter {
                        title
                        date(formatString: "L", locale: "fi")
                        excerpt
                        tags
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

    const allNodes = useMemo(() => {
        const all = data.allMdx.nodes
        if (relatedTags?.length) {
            const allSorted = all
                .reduce<[MdxPost, number][]>(
                    (acc, curr) => [
                        ...acc,
                        [
                            curr,
                            // 1 point per matching tag
                            relatedTags.reduce<number>(
                                (pointsAcc, pointsCurr) =>
                                    pointsAcc + (curr.frontmatter.tags.includes(pointsCurr) ? 1 : 0),
                                0
                            ),
                        ],
                    ],
                    []
                )
                .slice()
                .sort((a, b) => {
                    // Same points, sort by date
                    if (a[1] === b[1]) {
                        const [aDay, aMonth, aYear] = a[0].frontmatter.date.split('.').map((s) => parseInt(s, 10))
                        const [bDay, bMonth, bYear] = b[0].frontmatter.date.split('.').map((s) => parseInt(s, 10))
                        return new Date(bYear, bMonth - 1, bDay).getTime() - new Date(aYear, aMonth - 1, aDay).getTime()
                    }
                    // Higher points first
                    return a[1] < b[1] ? 1 : -1
                })
                .map((postWithPoints) => postWithPoints[0])
            return allSorted
        }
        return all
    }, [data.allMdx.nodes, relatedTags])

    const nodes = useMemo(() => (limit ? allNodes.slice(0, limit) : allNodes), [allNodes, limit])

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
