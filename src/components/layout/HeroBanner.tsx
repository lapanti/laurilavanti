import type { IGatsbyImageData } from 'gatsby-plugin-image'

import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { breakpoints, colors, fontFamilies, fontSizes, fontWeights, HEADER_SIZE, sizes } from '../../lib/styles'

const Title = styled.h1({
    ...fontSizes[3],
    color: colors.peach,
    fontFamily: fontFamilies.heading,
    position: 'relative',
    top: sizes[0.5],
    [breakpoints[1200].min]: {
        ...fontSizes[6],
    },
})

const SecondaryTitle = styled.h2({
    ...fontSizes[2.25],
    color: colors.white,
    fontWeight: fontWeights.bold,
})

const Titles = styled.div({
    display: 'flex',
    flexDirection: 'column',
    gap: sizes[1.5],
    padding: sizes[0.875],

    [breakpoints[1200].min]: {
        alignItems: 'flex-end',
        gap: sizes[3],
        justifyContent: 'flex-start',
        padding: sizes[3.75],
        width: '50%',
    },
})

const ElectionNumberRow = styled.div({
    display: 'flex',
    flexDirection: 'column',
    gap: sizes[0.5],
    position: 'absolute',
    right: sizes[0.875],
    top: sizes[14],

    [breakpoints[1200].min]: {
        flexDirection: 'row',
        gap: sizes[3],
        justifyContent: 'flex-end',
        position: 'relative',
        right: 'auto',
        top: 'auto',
    },
})

const CommunalElectionNumber = styled.span({
    ...fontSizes[3],
    alignContent: 'center',
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

// @ts-expect-error for some reason the typing does not include 'absolute !important', although it's valid CSS
const Image = styled(GatsbyImage)({
    bottom: 0,
    marginLeft: `-${sizes[5]}`,
    marginTop: 'auto',
    [breakpoints[1200].min]: {
        position: 'absolute !important', // Otherwise gatsby image wrapper overrides it in production
        right: `-${sizes[5]}`,
    },
})

const ImageContainer = styled.div({
    [Image]: {
        width: '560px',
    },
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
    [breakpoints[1200].min]: {
        overflow: 'visible',
        width: '50%',
    },
})

const BackgroundContainer = styled.div({
    /** Only show background image in desktop */
    display: 'none',
    [breakpoints[1200].min]: {
        display: 'flex',
        height: '100%',
        position: 'absolute',
        width: '100%',
    },
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

interface Props {
    className?: string
    communalElectionNumber?: number
    imageData?: IGatsbyImageData
    imageAlt?: string
    regionalElectionNumber?: number
    title: string
    secondaryTitle?: string
    backgroundImage?: IGatsbyImageData
}

const HeroBannerComponent = ({
    className,
    communalElectionNumber,
    imageData,
    imageAlt,
    regionalElectionNumber,
    title,
    secondaryTitle,
    backgroundImage,
}: Props): JSX.Element => {
    const image = imageData ? getImage(imageData) : undefined
    const backgroundImg = backgroundImage ? getImage(backgroundImage) : undefined

    return (
        <div className={className}>
            <Titles>
                <Title>{title}</Title>
                {secondaryTitle && <SecondaryTitle>{secondaryTitle}</SecondaryTitle>}
                {communalElectionNumber && regionalElectionNumber && (
                    <ElectionNumberRow>
                        <CommunalElectionNumber>
                            <span>{communalElectionNumber}</span>
                        </CommunalElectionNumber>
                        <RegionalElectionNumber>
                            <span>{regionalElectionNumber}</span>
                        </RegionalElectionNumber>
                    </ElectionNumberRow>
                )}
            </Titles>
            <ImageContainer>
                {backgroundImg && (
                    <BackgroundContainer>
                        <BackgroundImage alt="" image={backgroundImg} loading="eager" objectFit="cover" />
                    </BackgroundContainer>
                )}
                {image && <Image alt={imageAlt ?? ''} image={image} loading="eager" objectFit="contain" />}
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
