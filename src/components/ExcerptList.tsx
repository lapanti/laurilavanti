import type { ContentfulPinnedPage, ContentfulPostExcerpt } from '../types/contentful'

import { graphql, useStaticQuery } from 'gatsby'
import { useMemo } from 'react'
import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { breakpoints, CONTENT_PADDING, sizes } from '../lib/styles'
import Excerpt from './excerptList/Excerpt'

interface Props {
    className?: string
    limit?: number
    pinned?: ContentfulPinnedPage[] // List of pinned pages
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
            allContentfulPost(sort: { createdAt: DESC }) {
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
                        gatsbyImageData(layout: CONSTRAINED, width: 560, sizes: "(min-width: 560px) 560px, 100vw")
                        description
                    }
                    backgroundImage {
                        gatsbyImageData(layout: CONSTRAINED, width: 560, sizes: "(min-width: 560px) 560px, 100vw")
                        description
                    }
                    slug
                }
            }
        }
    `)

    const allNodes = useMemo(() => {
        const all = data.allContentfulPost.nodes.filter((curr) => !currentSlug || currentSlug !== curr.slug)
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

    return (
        <ul className={className}>
            {pinned?.map((node: ContentfulPinnedPage) => (
                <Excerpt
                    key={node.slug}
                    excerpt={node.description}
                    image={node.backgroundImage?.gatsbyImageData ?? node.image.gatsbyImageData}
                    imageAlt={node.backgroundImage?.description ?? node.image.description}
                    slug={node.slug}
                    title={node.title}
                />
            ))}
            {nodes.map((node: ContentfulPostExcerpt) => (
                <Excerpt
                    key={`blogi/${node.slug}`}
                    date={node.publishDate || node.createdAt}
                    excerpt={node.excerpt}
                    image={node.backgroundImage?.gatsbyImageData ?? node.headerImage.gatsbyImageData}
                    imageAlt={node.backgroundImage?.description ?? node.headerImage.description}
                    slug={`blogi/${node.slug}`}
                    tags={node.metadata.tags.map(({ contentful_id }) => contentful_id)}
                    title={node.title}
                />
            ))}
        </ul>
    )
}

ExcerptListComponent.displayName = 'ExcerptList'

const ExcerptList = styled(ExcerptListComponent)({
    columnGap: sizes[4],
    display: 'grid',
    gridColumnStart: 3,
    gridTemplateColumns: `minmax(100%, ${sizes[35]})`,
    gridTemplateRows: 'auto',
    justifyContent: 'center',
    justifyItems: 'center',
    marginLeft: CONTENT_PADDING,
    marginRight: CONTENT_PADDING,
    marginTop: sizes[2],
    rowGap: sizes[3.5],
    [breakpoints[1200].min]: {
        gridTemplateColumns: `repeat(2, ${sizes[35]})`,
        marginTop: sizes[3.5],
    },
})

export default ExcerptList
