import type { ImageDataLike } from 'gatsby-plugin-image'

import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components'

import { breakpoints, colors, CONTENT_PADDING, fontFamilies, fontSizes, HEADER_SIZE, sizes } from '../../lib/styles'
import PostMeta from '../PostMeta'

const Image = styled(GatsbyImage)({})

const TitleContainer = styled.div({
    backgroundColor: colors.white,
    paddingLeft: CONTENT_PADDING,
    paddingRight: CONTENT_PADDING,
    paddingTop: sizes[1],
    [breakpoints[1200].min]: {
        paddingTop: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: sizes['37.5'],
    },
})

const Title = styled.h1({
    ...fontSizes[3],
    fontFamily: fontFamilies.heading,
    [breakpoints[1200].min]: {
        ...fontSizes[5],
    },
})

const BiggerMeta = styled(PostMeta)({
    ...fontSizes[1.25],
    [breakpoints[1200].min]: {
        ...fontSizes[1.5],
    },
})

const Content = styled.div({
    [breakpoints[1200].min]: {
        display: 'flex',
        flexDirection: 'row-reverse',
        margin: 'auto',
        [`> ${Image}, > ${TitleContainer}`]: {
            width: '50%',
        },
    },
})

interface Props {
    className?: string
    imageData?: ImageDataLike
    imageAlt?: string
    title: string
    showMeta?: boolean
    tags?: string[]
    publishDate?: string
}

const TitleBannerComponent = ({
    className,
    imageData,
    imageAlt,
    title,
    showMeta,
    tags,
    publishDate,
}: Props): JSX.Element => {
    const image = imageData ? getImage(imageData) : undefined

    return (
        <div className={className}>
            <Content>
                {image && <Image alt={imageAlt ?? ''} image={image} />}
                <TitleContainer>
                    <Title>{title}</Title>
                    {showMeta && (
                        <BiggerMeta
                            ariaLabel={`Kirjoituksen ${title} meta-tiedot`}
                            date={publishDate ?? ''}
                            tags={tags ?? []}
                        />
                    )}
                </TitleContainer>
            </Content>
        </div>
    )
}

TitleBannerComponent.displayName = 'TitleBanner'

const TitleBanner = styled(TitleBannerComponent)({
    gridColumn: '1 / -1',
    paddingTop: HEADER_SIZE,
})

export default TitleBanner
