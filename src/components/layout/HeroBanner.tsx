import type { ImageDataLike } from 'gatsby-plugin-image'

import { GatsbyImage, getImage, getSrc } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { breakpoints, colors, fontFamilies, fontSizes, fontWeights, HEADER_SIZE, sizes } from '../../lib/styles'

const Title = styled.h1({
    fontFamily: fontFamilies.heading,
    ...fontSizes[3.75],
    [breakpoints[1200].min]: {
        ...fontSizes[6],
    },
})

const Subtitle = styled.p({
    ...fontSizes[1.5],
    fontWeight: fontWeights.bold,
})

const SecondaryTitle = styled.h2({
    ...fontSizes[2.25],
    fontWeight: fontWeights.bold,
})

const Titles = styled.div({
    color: colors.peach,
    display: 'flex',
    flexDirection: 'column',
    gap: sizes[1.5],
    padding: sizes[0.875],

    [breakpoints[1200].min]: {
        [SecondaryTitle]: {
            marginTop: sizes[3],
        },
        alignItems: 'flex-start',
        gap: sizes[3],
        justifyContent: 'center',
        padding: sizes[3.75],
        width: '50%',
    },
})

const ImageContainer = styled.div<{ $backgroundSrc?: string }>(
    {
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
        position: 'relative',
        [breakpoints[1200].min]: {
            overflow: 'visible',
            width: '50%',
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

// @ts-expect-error for some reason the typing does not include 'absolute !important', although it's valid CSS
const Image = styled(GatsbyImage)({
    bottom: 0,
    marginTop: 'auto',
    right: `-${sizes[5]}`,
    [breakpoints[1200].min]: {
        position: 'absolute !important', // Otherwise gatsby image wrapper overrides it in production
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
                {image && <Image alt={imageAlt ?? ''} image={image} objectFit="contain" />}
            </ImageContainer>
        </div>
    )
}

HeroBannerComponent.displayName = 'HeroBanner'

const HeroBanner = styled(HeroBannerComponent)({
    alignItems: 'stretch',
    background: colors.evening,
    display: 'flex',
    flexDirection: 'column',
    gridColumn: '1 / -1',
    height: '100vh',
    paddingTop: HEADER_SIZE,
    [breakpoints[1200].min]: {
        flexDirection: 'row-reverse',
        height: sizes[45],
    },
})

export default HeroBanner
