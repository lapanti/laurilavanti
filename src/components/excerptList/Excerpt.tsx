import type { ImageDataLike } from 'gatsby-plugin-image'
import type { PostMetaProps } from '../PostMeta'

import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { colors, fontSizes, sizes, zIndices } from '../../lib/styles'
import H2 from '../H2'
import InternalLink from '../InternalLink'
import Paragraph from '../Paragraph'
import PostMeta from '../PostMeta'

const StyledH2 = styled(H2)({
    gridColumnStart: 'auto',
})

const Link = styled(InternalLink).attrs({ $noHover: true })({
    '&:hover': {
        [StyledH2]: {
            textDecoration: 'underline',
        },
    },
    color: colors.black,
})

const Image = styled(GatsbyImage)({
    aspectRatio: '16 / 9',
    display: 'flex',
    width: '100%',
})

const H2Container = styled.div({
    alignItems: 'flex-end',
    display: 'flex',
    marginTop: sizes[0.25],
    position: 'relative',
    width: '100%',
    zIndex: zIndices[40],
})

const StyledParagraph = styled(Paragraph)({
    ...fontSizes[1.125],
    marginTop: sizes[0.25],
})

const ReadMoreLink = styled(InternalLink)({
    whiteSpace: 'nowrap',
})

interface Props extends Omit<PostMetaProps, 'ariaLabel'> {
    className?: string
    title: string
    excerpt: string
    image: ImageDataLike
    imageAlt: string
    slug: string
}

const ExcerptComponent = ({
    className,
    title,
    date,
    excerpt,
    tags,
    image: imageData,
    imageAlt,
    slug,
}: Props): JSX.Element => {
    const image = getImage(imageData)

    return (
        <li className={className}>
            <article aria-label={title} itemType="https://schema.org/CreativeWork" itemScope>
                <Link rel="permalink" to={`/blogi/${slug}/`}>
                    {image && <Image alt={imageAlt} image={image} />}
                    <H2Container>
                        <StyledH2 itemProp="headline">{title}</StyledH2>
                    </H2Container>
                </Link>
                <PostMeta ariaLabel={`Kirjoituksen ${title} meta-tiedot`} date={date} tags={tags} />
                <StyledParagraph itemProp="description">
                    {excerpt}{' '}
                    <ReadMoreLink rel="permalink" to={`/blogi/${slug}/`}>
                        Lue lisää »
                    </ReadMoreLink>
                </StyledParagraph>
            </article>
        </li>
    )
}

ExcerptComponent.displayName = 'Excerpt'

const Excerpt = styled(ExcerptComponent)({
    maxWidth: sizes[35],
})

export default Excerpt
