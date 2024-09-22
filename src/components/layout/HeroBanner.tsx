import type { ImageDataLike } from 'gatsby-plugin-image'

import { getSrc } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components'

import { breakpoints, colors, fontFamilies, fontSizes, fontWeights, HEADER_SIZE, sizes } from '../../lib/styles'

const SecondaryTitle = styled.h2({
    ...fontSizes['4xl'],
    fontWeight: fontWeights.bold,
})

const Titles = styled.div({
    color: colors.peach,
    display: 'flex',
    flexDirection: 'column',
    gap: sizes[3],
    margin: sizes[1.75],

    [breakpoints[1200].min]: {
        flex: 1,
        margin: sizes[3.75],
        alignItems: 'flex-start',
        justifyContent: 'center',
        [SecondaryTitle]: {
            marginTop: sizes[3],
        },
    },
})

const Title = styled.h1({
    fontFamily: fontFamilies.heading,
    ...fontSizes['6xl'],
    [breakpoints[1200].min]: {
        ...fontSizes['8xl'],
    },
})

const Subtitle = styled.h3({
    ...fontSizes['2xl'],
    fontWeight: fontWeights.bold,
})

const ImageContainer = styled.div<{ $backgroundSrc?: string }>(
    {
        [breakpoints[1200].min]: {
            flex: 1,
        },
    },
    ({ $backgroundSrc }) =>
        $backgroundSrc && {
            backgroundImage: `url(${$backgroundSrc})`,
        }
)

interface Props {
    className?: string
    title: string
    subtitle?: string
    secondaryTitle?: string
    backgroundImage?: ImageDataLike
}

const HeroBannerComponent = ({ className, title, subtitle, secondaryTitle, backgroundImage }: Props): JSX.Element => {
    const backgroundSrc = backgroundImage ? getSrc(backgroundImage) : undefined
    console.log('backgroundSrc', backgroundSrc)
    return (
        <div className={className}>
            <Titles>
                <Title>{title}</Title>
                <Subtitle>{subtitle}</Subtitle>
                <SecondaryTitle>{secondaryTitle}</SecondaryTitle>
            </Titles>
            <ImageContainer $backgroundSrc={backgroundSrc}></ImageContainer>
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

    [breakpoints[1200].min]: {
        height: sizes[45],
        flexDirection: 'row-reverse',
    },
})

export default HeroBanner
