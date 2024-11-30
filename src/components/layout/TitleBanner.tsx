import type { ImageDataLike } from 'gatsby-plugin-image'

import { GatsbyImage, getImage, getSrc } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { breakpoints, colors, CONTENT_PADDING, fontFamilies, fontSizes, HEADER_SIZE, sizes } from '../../lib/styles'
import PostMeta from '../PostMeta'

const Image = styled(GatsbyImage)<{ $backgroundSrc?: string }>(
    ({ $backgroundSrc }) =>
        $backgroundSrc && {
            backgroundImage: `linear-gradient(${colors.evening70}, ${colors.evening70}), url(${$backgroundSrc})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
        }
)

const TitleContainer = styled.div({
    backgroundColor: colors.white,
    paddingLeft: CONTENT_PADDING,
    paddingRight: CONTENT_PADDING,
    paddingTop: sizes[1],
    [breakpoints[1200].min]: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: sizes[37.5],
        paddingLeft: sizes[5],
        paddingRight: sizes[5],
        paddingTop: 0,
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

const Content = styled.div<{ $leftAlignedTitle: boolean }>(
    {
        backgroundColor: colors.white,
        [breakpoints[1200].min]: {
            display: 'flex',
            margin: 'auto',
            [`> ${Image}, > ${TitleContainer}`]: {
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
    backgroundImage?: ImageDataLike
    imageData?: ImageDataLike
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
    const backgroundSrc = backgroundImage ? getSrc(backgroundImage) : undefined

    return (
        <div className={className}>
            <Content $leftAlignedTitle={leftAlignedTitle}>
                {image && <Image $backgroundSrc={backgroundSrc} alt={imageAlt ?? ''} image={image} loading="eager" />}
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
    backgroundColor: colors.evening,
    gridColumn: '1 / -1',
    paddingTop: HEADER_SIZE,
})

export default TitleBanner
