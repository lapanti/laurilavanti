import type { ImageDataLike } from 'gatsby-plugin-image'
import type { PostMetaProps } from '../PostMeta'

import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import tw from 'twin.macro'

import InternalLink from '../InternalLink'
import Paragraph from '../Paragraph'
import PostMeta from '../PostMeta'

const Image = tw(GatsbyImage)`
    w-full flex h-64 object-cover
`

const H2 = tw.h2`
    font-bold text-accent text-xl
`

const RemarginP = tw(Paragraph)`
    mt-1
`

interface Props extends PostMetaProps {
    className?: string
    title: string
    excerpt: string
    image: ImageDataLike
    slug: string
}

const ExcerptComponent = ({ className, title, date, excerpt, tags, image: imageData, slug }: Props): JSX.Element => {
    const image = getImage(imageData)

    return (
        <article className={className} aria-label={title} itemScope itemType="https://schema.org/CreativeWork">
            <InternalLink to={`/blogi/${slug}/`} rel="permalink">
                {image && <Image image={image} alt={title} />}
                <H2 itemProp="headline">{title}</H2>
            </InternalLink>
            <PostMeta date={date} tags={tags} />
            <RemarginP itemProp="description">{excerpt}</RemarginP>
        </article>
    )
}

ExcerptComponent.displayName = 'Excerpt'

const Excerpt = tw(ExcerptComponent)``

export default Excerpt
