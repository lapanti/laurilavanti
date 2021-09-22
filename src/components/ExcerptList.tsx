import type { MdxPost } from '../types/mdx'

import { graphql, useStaticQuery } from 'gatsby'
import React, { useMemo } from 'react'
import tw from 'twin.macro'

import Excerpt from './excerptList/Excerpt'

interface Props {
    className?: string
    limit?: number
    relatedTags?: string[]
    tag?: string
}

const ExcerptListComponent = ({ className, limit, relatedTags, tag }: Props): JSX.Element => {
    const data = useStaticQuery<{
        allMdx: {
            nodes: MdxPost[]
        }
    }>(graphql`
        {
            allMdx(filter: { frontmatter: { tags: { ne: null } } }, sort: { fields: frontmatter___date, order: DESC }) {
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
            return all
                .filter((curr) => `/${curr.slug}` !== location.pathname)
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
        }
        if (tag) {
            return all.filter((post) => post.frontmatter.tags.includes(tag))
        }
        return all
    }, [data.allMdx.nodes, relatedTags, tag])

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
