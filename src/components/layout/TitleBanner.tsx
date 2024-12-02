import type { IGatsbyImageData } from 'gatsby-plugin-image'

import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { breakpoints, colors, CONTENT_PADDING, fontFamilies, fontSizes, HEADER_SIZE, sizes } from '../../lib/styles'
import PostMeta from '../PostMeta'

const Image = styled(GatsbyImage)({
    alignSelf: 'flex-bottom',
})

const ImageContainer = styled.div({
    display: 'flex',
    position: 'relative',
})

const BackgroundImage = styled(GatsbyImage)({
    '&:after': {
        backgroundImage: `linear-gradient(${colors.evening70}, ${colors.evening70})`,
        bottom: 0,
        content: '""',
        height: '100%',
        position: 'absolute',
        top: 0,
        width: '100%',
    },
    display: 'flex',
    height: '100%',
    position: 'absolute',
    width: '100%',
})

const TitleContainer = styled.div<{ $leftAlignedTitle: boolean }>(
    {
        backgroundColor: colors.white,
        paddingLeft: CONTENT_PADDING,
        paddingRight: CONTENT_PADDING,
        paddingTop: sizes[1],
        [breakpoints[1200].min]: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth: sizes[37.5],
            paddingTop: 0,
        },
    },
    ({ $leftAlignedTitle }) => ({
        [breakpoints[1200].min]: {
            paddingLeft: $leftAlignedTitle ? sizes[0.5] : sizes[5],
            paddingRight: $leftAlignedTitle ? sizes[5] : sizes[0.5],
        },
    })
)

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

const Content = styled.div<{ $leftAlignedTitle: boolean }>(
    {
        backgroundColor: colors.white,
        [breakpoints[1200].min]: {
            display: 'flex',
            margin: 'auto',
            [`> ${ImageContainer}, > ${TitleContainer}`]: {
                width: '50%',
            },
        },
    },
    ({ $leftAlignedTitle }) => ({
        [breakpoints[1200].min]: {
            flexDirection: $leftAlignedTitle ? 'row-reverse' : 'row',
        },
    })
)

interface Props {
    className?: string
    backgroundImage?: IGatsbyImageData
    imageData?: IGatsbyImageData
    imageAlt?: string
    title: string
    showMeta?: boolean
    tags?: string[]
    publishDate?: string
    leftAlignedTitle: boolean
}

const TitleBannerComponent = ({
    className,
    imageData,
    imageAlt,
    title,
    showMeta,
    tags,
    backgroundImage,
    publishDate,
    leftAlignedTitle,
}: Props): JSX.Element => {
    const image = imageData ? getImage(imageData) : undefined
    const backgroundImg = backgroundImage ? getImage(backgroundImage) : undefined

    return (
        <div className={className}>
            <Content $leftAlignedTitle={leftAlignedTitle}>
                <ImageContainer>
                    {backgroundImg && (
                        <BackgroundImage alt="" image={backgroundImg} loading="eager" objectFit="cover" />
                    )}
                    {image && <Image alt={imageAlt ?? ''} image={image} loading="eager" />}
                </ImageContainer>
                <TitleContainer $leftAlignedTitle={leftAlignedTitle}>
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
    backgroundColor: colors.evening,
    gridColumn: '1 / -1',
    paddingTop: HEADER_SIZE,
})

export default TitleBanner
