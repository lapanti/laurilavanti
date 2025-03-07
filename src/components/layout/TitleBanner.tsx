import type { IGatsbyImageData } from 'gatsby-plugin-image'

import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { breakpoints, colors, CONTENT_PADDING, fontFamilies, fontSizes, HEADER_SIZE, sizes } from '../../lib/styles'
import PostMeta from '../PostMeta'

const Image = styled(GatsbyImage)({
    marginTop: 'auto',
})

const ImageContainer = styled.div({
    display: 'flex',
    position: 'relative',
})

const BackgroundContainer = styled.div({
    height: '100%',
    position: 'absolute',
    width: '100%',
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
    height: '100%',
    width: '100%',
})

const ElectionNumberRow = styled.div<{ $leftAlignedTitle?: boolean }>(
    {
        display: 'flex',
        flexDirection: 'column',
        gap: sizes[0.5],
        position: 'absolute',

        [breakpoints[1200].min]: {
            gap: sizes[2],
            top: sizes[5],
        },
    },
    ({ $leftAlignedTitle }) => ({
        left: $leftAlignedTitle ? sizes[0.5] : 'auto',
        right: $leftAlignedTitle ? 'auto' : sizes[0.5],

        [breakpoints[1200].min]: {
            left: $leftAlignedTitle ? sizes[2] : 'auto',
            right: $leftAlignedTitle ? 'auto' : sizes[2],
        },
    })
)

const CommunalElectionNumber = styled.span({
    ...fontSizes[3],
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: '50%',
    color: colors.darkGreenText,
    display: 'flex',
    fontFamily: fontFamilies.heading,
    height: sizes[9],
    justifyContent: 'center',
    width: sizes[9],

    [breakpoints[1200].min]: {
        ...fontSizes[5],
        height: sizes[14],
        width: sizes[14],
    },
})

const RegionalElectionNumber = styled(CommunalElectionNumber)({
    backgroundColor: colors.regionalPurple,
    color: colors.white,
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
            height: '100%',
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
    communalElectionNumber?: number | null
    imageData?: IGatsbyImageData
    imageAlt?: string
    regionalElectionNumber?: number | null
    title: string
    showMeta?: boolean
    tags?: string[]
    publishDate?: string
    leftAlignedTitle: boolean
}

const TitleBannerComponent = ({
    className,
    communalElectionNumber,
    imageData,
    imageAlt,
    regionalElectionNumber,
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
                        <BackgroundContainer>
                            <BackgroundImage alt="" image={backgroundImg} loading="eager" objectFit="cover" />
                        </BackgroundContainer>
                    )}
                    {image && <Image alt={imageAlt ?? ''} image={image} loading="eager" objectFit="contain" />}
                    {communalElectionNumber && regionalElectionNumber && (
                        <ElectionNumberRow $leftAlignedTitle={leftAlignedTitle}>
                            <CommunalElectionNumber>{communalElectionNumber}</CommunalElectionNumber>
                            <RegionalElectionNumber>{regionalElectionNumber}</RegionalElectionNumber>
                        </ElectionNumberRow>
                    )}
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
    [breakpoints[1200].min]: {
        height: sizes[45],
    },
})

export default TitleBanner
