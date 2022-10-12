import type { ImageDataLike } from 'gatsby-plugin-image'
import type { PostMetaProps } from '../PostMeta'

import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import tw from 'twin.macro'

import H2 from '../H2'
import InternalLink from '../InternalLink'
import Paragraph from '../Paragraph'
import PostMeta from '../PostMeta'

const Link = tw(InternalLink)`
    text-lightGrey
`

const Image = tw(GatsbyImage)`
    w-full flex h-64 object-cover
`

const MobileImage = tw(Image)`
    flex biggerthenphone:hidden
`

const DesktopImage = tw(Image)`
    hidden biggerthenphone:flex
`

const H2Container = tw.div`
    flex items-end mb-4 pb-2 pl-2 -mt-32 h-32 w-full bg-gradient-to-t from-black z-40 relative
`

const StyledH2 = tw(H2)`
    col-start-auto
`

const RemarginP = tw(Paragraph)`
    mt-1
`

interface Props extends PostMetaProps {
    className?: string
    title: string
    excerpt: string
    image: ImageDataLike
    mobileImage: ImageDataLike
    slug: string
}

const ExcerptComponent = ({
    className,
    title,
    date,
    excerpt,
    tags,
    image: imageData,
    mobileImage: mobileImageData,
    slug,
}: Props): JSX.Element => {
    const image = getImage(imageData)
    const mobileImage = getImage(mobileImageData)

    return (
        <article className={className} aria-label={title} itemScope itemType="https://schema.org/CreativeWork">
            <Link to={`/blogi/${slug}/`} rel="permalink">
                {image && <DesktopImage image={image} alt={title} />}
                {mobileImage && <MobileImage image={mobileImage} alt={title} />}
                <H2Container>
                    <StyledH2 itemProp="headline">{title}</StyledH2>
                </H2Container>
            </Link>
            <PostMeta date={date} tags={tags} />
            <RemarginP itemProp="description">
                {excerpt}{' '}
                <InternalLink to={`/blogi/${slug}/`} rel="permalink">
                    Lue lisää »
                </InternalLink>
            </RemarginP>
        </article>
    )
}

ExcerptComponent.displayName = 'Excerpt'

const Excerpt = tw(ExcerptComponent)``

export default Excerpt
