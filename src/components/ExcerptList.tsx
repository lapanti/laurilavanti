import type { ContentfulPostExcerpt } from '../types/contentful'

import { graphql, useStaticQuery } from 'gatsby'
import React, { useMemo } from 'react'
import tw from 'twin.macro'

import Excerpt from './excerptList/Excerpt'

const Item = tw.li`
    mt-8 first-of-type:mt-0
`

interface Props {
    className?: string
    limit?: number
    relatedTags?: string[]
    tag?: string
    currentSlug?: string
}

const ExcerptListComponent = ({ className, limit, relatedTags, tag, currentSlug }: Props): JSX.Element => {
    const data = useStaticQuery<{
        allContentfulPost: {
            nodes: ContentfulPostExcerpt[]
        }
    }>(graphql`
        {
            allContentfulPost(sort: { fields: publishDate, order: DESC }) {
                nodes {
                    title
                    createdAt(formatString: "L", locale: "fi")
                    publishDate(formatString: "L", locale: "fi")
                    excerpt
                    metadata {
                        tags {
                            contentful_id
                        }
                    }
                    headerImage {
                        localFile {
                            childImageSharp {
                                gatsbyImageData(placeholder: BLURRED)
                            }
                        }
                    }
                    slug
                }
            }
        }
    `)

    const allNodes = useMemo(() => {
        const all = data.allContentfulPost.nodes
        if (relatedTags?.length) {
            return all
                .filter((curr) => !currentSlug || currentSlug !== curr.slug)
                .reduce<[ContentfulPostExcerpt, number][]>(
                    (acc, curr) => [
                        ...acc,
                        [
                            curr,
                            // 1 point per matching tag
                            relatedTags.reduce<number>(
                                (pointsAcc, pointsCurr) =>
                                    pointsAcc +
                                    (curr.metadata.tags.map(({ contentful_id }) => contentful_id).includes(pointsCurr)
                                        ? 1
                                        : 0),
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
                        const [aDay, aMonth, aYear] = a[0].createdAt.split('.').map((s) => parseInt(s, 10))
                        const [bDay, bMonth, bYear] = b[0].createdAt.split('.').map((s) => parseInt(s, 10))
                        return new Date(bYear, bMonth - 1, bDay).getTime() - new Date(aYear, aMonth - 1, aDay).getTime()
                    }
                    // Higher points first
                    return a[1] < b[1] ? 1 : -1
                })
                .map((postWithPoints) => postWithPoints[0])
        }
        if (tag) {
            return all.filter((post) => post.metadata.tags.map(({ contentful_id }) => contentful_id).includes(tag))
        }
        return all
    }, [data.allContentfulPost.nodes, relatedTags, currentSlug, tag])

    const nodes = useMemo(() => (limit ? allNodes.slice(0, limit) : allNodes), [allNodes, limit])

    return (
        <ul className={className}>
            {nodes.map((node) => (
                <Item key={node.publishDate || node.createdAt}>
                    <Excerpt
                        date={node.publishDate || node.createdAt}
                        slug={node.slug}
                        excerpt={node.excerpt}
                        image={node.headerImage.localFile}
                        title={node.title}
                        tags={node.metadata.tags.map(({ contentful_id }) => contentful_id)}
                    />
                </Item>
            ))}
        </ul>
    )
}

ExcerptListComponent.displayName = 'ExcerptList'

const ExcerptList = tw(ExcerptListComponent)`
    col-start-3
`
export default ExcerptList
