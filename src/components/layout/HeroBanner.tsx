import type { ImageDataLike } from 'gatsby-plugin-image'

import { GatsbyImage, getImage, getSrc } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components'

import { breakpoints, colors, fontFamilies, fontSizes, fontWeights, HEADER_SIZE, sizes } from '../../lib/styles'

const Title = styled.h1({
    fontFamily: fontFamilies.heading,
    ...fontSizes['6xl'],
    [breakpoints[1200].min]: {
        ...fontSizes['8xl'],
    },
})

const Subtitle = styled.p({
    ...fontSizes['2xl'],
    fontWeight: fontWeights.bold,
})

const SecondaryTitle = styled.h2({
    ...fontSizes['4xl'],
    fontWeight: fontWeights.bold,
})

const Titles = styled.div({
    color: colors.peach,
    display: 'flex',
    flexDirection: 'column',
    gap: sizes[1.5],
    padding: sizes[0.875],

    [breakpoints[1200].min]: {
        width: '50%',
        gap: sizes[3],
        padding: sizes[3.75],
        alignItems: 'flex-start',
        justifyContent: 'center',
        [SecondaryTitle]: {
            marginTop: sizes[3],
        },
    },
})

const ImageContainer = styled.div<{ $backgroundSrc?: string }>(
    {
        flex: 1,
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        [breakpoints[1200].min]: {
            width: '50%',
            overflow: 'visible',
        },
    },
    ({ $backgroundSrc }) =>
        $backgroundSrc && {
            [breakpoints[1200].min]: {
                backgroundImage: `linear-gradient(${colors.evening70}, ${colors.evening70}), url(${$backgroundSrc})`,
                backgroundSize: 'cover',
            },
        }
)

const Image = styled(GatsbyImage)({
    position: 'absolute',
    right: `-${sizes[5]}`,
    bottom: 0,
    [breakpoints[1200].max]: {
        // We absolutely do not want these unless on mobile
        height: '100% !important',
        width: '100% !important',
    },
})

interface Props {
    className?: string
    imageData?: ImageDataLike
    imageAlt?: string
    title: string
    subtitle?: string
    secondaryTitle?: string
    backgroundImage?: ImageDataLike
}

const HeroBannerComponent = ({
    className,
    imageData,
    imageAlt,
    title,
    subtitle,
    secondaryTitle,
    backgroundImage,
}: Props): JSX.Element => {
    const image = imageData ? getImage(imageData) : undefined
    const backgroundSrc = backgroundImage ? getSrc(backgroundImage) : undefined

    return (
        <div className={className}>
            <Titles>
                <Title>{title}</Title>
                {subtitle && <Subtitle>{subtitle}</Subtitle>}
                {secondaryTitle && <SecondaryTitle>{secondaryTitle}</SecondaryTitle>}
            </Titles>
            <ImageContainer $backgroundSrc={backgroundSrc}>
                {image && <Image image={image} alt={imageAlt ?? ''} />}
            </ImageContainer>
        </div>
    )
}

HeroBannerComponent.displayName = 'HeroBanner'

const HeroBanner = styled(HeroBannerComponent)({
    background: colors.evening,
    height: '100vh',
    gridColumn: '1 / -1',
    paddingTop: HEADER_SIZE,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',

    [breakpoints[1200].min]: {
        height: sizes[45],
        flexDirection: 'row-reverse',
    },
})

export default HeroBanner
