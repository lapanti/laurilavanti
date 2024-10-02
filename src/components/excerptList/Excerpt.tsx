import type { ImageDataLike } from 'gatsby-plugin-image'
import type { PostMetaProps } from '../PostMeta'

import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components'

import { colors, fontSizes, sizes, zIndices } from '../../lib/styles'
import H2 from '../H2'
import InternalLink from '../InternalLink'
import Paragraph from '../Paragraph'
import PostMeta from '../PostMeta'

const StyledH2 = styled(H2)({
    gridColumnStart: 'auto',
})

const Link = styled(InternalLink)({
    color: colors.black,
    '&:hover': {
        [StyledH2]: {
            textDecoration: 'underline',
        },
    },
})

const Image = styled(GatsbyImage)({
    width: '100%',
    display: 'flex',
    aspectRatio: '16 / 9',
})

const H2Container = styled.div({
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: sizes[0.25],
    width: '100%',
    zIndex: zIndices[40],
    position: 'relative',
})

const StyledParagraph = styled(Paragraph)({
    ...fontSizes.l,
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
