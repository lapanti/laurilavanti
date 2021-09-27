import type { ImageDataLike } from 'gatsby-plugin-image'
import type { PostMetaProps } from '../PostMeta'

import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import tw from 'twin.macro'

import InternalLink from '../InternalLink'
import Paragraph from '../Paragraph'
import PostMeta from '../PostMeta'

const Image = tw(GatsbyImage)`
    w-full flex h-32 object-cover
`

const H2 = tw.h2`
    font-bold text-accent text-xl
`

interface Props extends PostMetaProps {
    className?: string
    title: string
    excerpt: string
    image: ImageDataLike
    slug: string
}

const ExcerptComponent = ({
    className,
    title,
    date,
    excerpt,
    tags,
    image: imageData,
    readingTime,
    slug,
}: Props): JSX.Element => {
    const image = getImage(imageData)

    return (
        <article className={className} itemScope itemType="https://schema.org/CreativeWork">
            <InternalLink to={`/${slug}`} rel="permalink">
                {image && <Image image={image} alt={title} />}
                <H2 itemProp="headline">{title}</H2>
            </InternalLink>
            <PostMeta date={date} readingTime={readingTime} tags={tags} />
            <Paragraph itemProp="description">{excerpt}</Paragraph>
        </article>
    )
}

ExcerptComponent.displayName = 'Excerpt'

const Excerpt = tw(ExcerptComponent)``

export default Excerpt
