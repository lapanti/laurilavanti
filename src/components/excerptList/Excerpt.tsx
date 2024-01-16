import type { ImageDataLike } from 'gatsby-plugin-image'
import type { PostMetaProps } from '../PostMeta'

import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components'

import { breakpoints, colors, gradients, sizes, zIndices } from '../../lib/styles'
import H2 from '../H2'
import InternalLink from '../InternalLink'
import Paragraph from '../Paragraph'
import PostMeta from '../PostMeta'

const Link = styled(InternalLink)({
    color: colors.gray,
})

const Image = styled(GatsbyImage)({
    width: '100%',
    display: 'flex',
    height: sizes[64],
    objectFit: 'cover',
})

const MobileImage = styled(Image)({
    display: 'flex !important',
    [breakpoints.biggerThanPhone.min]: {
        display: 'none !important',
    },
})

const DesktopImage = styled(Image)({
    display: 'none !important',
    [breakpoints.biggerThanPhone.min]: {
        display: 'flex !important',
    },
})

const H2Container = styled.div({
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: sizes[4],
    paddingBottom: sizes[2],
    paddingLeft: sizes[2],
    marginTop: `-${sizes[32]}`,
    height: sizes[32],
    width: '100%',
    backgroundImage: gradients.fromBlackToTop,
    zIndex: zIndices[40],
    position: 'relative',
})

const StyledH2 = styled(H2)({
    gridColumnStart: 'auto',
})

const RemarginP = styled(Paragraph)({
    marginTop: sizes[1],
})

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
        <li className={className}>
            <article aria-label={title} itemScope itemType="https://schema.org/CreativeWork">
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
        </li>
    )
}

ExcerptComponent.displayName = 'Excerpt'

const Excerpt = styled(ExcerptComponent)({})

export default Excerpt
