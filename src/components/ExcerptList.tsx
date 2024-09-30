import type { ContentfulPostExcerpt } from '../types/contentful'

import { graphql, useStaticQuery } from 'gatsby'
import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'

import { breakpoints, sizes } from '../lib/styles'
import { isContentfulPostExcerpt } from '../lib/typeGuards'
import Excerpt from './excerptList/Excerpt'

interface Props {
    className?: string
    limit?: number
    pinned?: string[] // List of pinned posts slugs
    relatedTags?: string[]
    tag?: string
    currentSlug?: string
}

const ExcerptListComponent = ({ className, limit, pinned, relatedTags, tag, currentSlug }: Props): JSX.Element => {
    const data = useStaticQuery<{
        allContentfulPost: {
            nodes: ContentfulPostExcerpt[]
        }
    }>(graphql`
        {
            allContentfulPost(sort: { publishDate: DESC }) {
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
                        description
                    }
                    slug
                }
            }
        }
    `)

    const pinnedNodes = useMemo(() => {
        if (pinned?.length) {
            return pinned
                .map((slug) => data.allContentfulPost.nodes.find((post) => post.slug === slug))
                .filter(isContentfulPostExcerpt)
        }
    }, [pinned, data])

    const allNodes = useMemo(() => {
        const all = data.allContentfulPost.nodes.filter(
            (curr) => !pinned?.includes(curr.slug) && (!currentSlug || currentSlug !== curr.slug)
        )
        if (relatedTags?.length) {
            return all
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

    const nodeToExcerpt = useCallback(
        (node: ContentfulPostExcerpt) => (
            <Excerpt
                key={node.publishDate || node.createdAt}
                date={node.publishDate || node.createdAt}
                slug={node.slug}
                excerpt={node.excerpt}
                image={node.headerImage.localFile}
                imageAlt={node.headerImage.description}
                title={node.title}
                tags={node.metadata.tags.map(({ contentful_id }) => contentful_id)}
            />
        ),
        []
    )

    return (
        <ul className={className}>
            {pinnedNodes?.map(nodeToExcerpt)}
            {nodes.map(nodeToExcerpt)}
        </ul>
    )
}

ExcerptListComponent.displayName = 'ExcerptList'

const ExcerptList = styled(ExcerptListComponent)({
    gridColumn: '1 / -1',
    marginLeft: sizes[0.5],
    marginRight: sizes[0.5],
    display: 'grid',
    justifyItems: 'center',
    justifyContent: 'center',
    columnGap: sizes[4],
    rowGap: sizes[3.5],
    gridTemplateRows: 'auto',
    gridTemplateColumns: `minmax(100%, ${sizes[35]})`,
    marginTop: sizes[2],
    [breakpoints[1200].min]: {
        gridTemplateColumns: `repeat(2, ${sizes[35]})`,
        marginTop: sizes[3.5],
    },
})

export default ExcerptList
