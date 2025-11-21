import type { IGatsbyImageData } from 'gatsby-plugin-image'
import type { Tag } from '../../types/contentful'

import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

import { breakpoints, colors, CONTENT_PADDING, HEADER_SIZE, sizes, typographics } from '../../lib/styles'
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

const TitleContainer = styled.div({
    backgroundColor: colors.white,
    paddingBottom: sizes[1],
    paddingLeft: CONTENT_PADDING,
    paddingRight: CONTENT_PADDING,
    paddingTop: sizes[1],
    [breakpoints[1200].min]: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: sizes[37.5],
        paddingBottom: 0,
        paddingLeft: sizes[0.5],
        paddingRight: sizes[5],
        paddingTop: 0,
    },
})

const Title = styled.h1({
    ...typographics.h1,
})

const BiggerMeta = styled(PostMeta)({
    ...typographics.ingress,
})

const Content = styled.div({
    backgroundColor: colors.white,
    [breakpoints[1200].min]: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        justifyContent: 'flex-end',
        margin: 'auto',
        [`> ${ImageContainer}, > ${TitleContainer}`]: {
            width: '50%',
        },
    },
})

interface Props {
    className?: string
    backgroundImage?: IGatsbyImageData
    imageData?: IGatsbyImageData
    imageAlt?: string
    title: string
    showMeta?: boolean
    tags?: Tag[]
    publishDate?: string
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
}: Props): JSX.Element => {
    const image = imageData ? getImage(imageData) : undefined
    const backgroundImg = backgroundImage ? getImage(backgroundImage) : undefined

    return (
        <div className={className}>
            <Content>
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
                <ImageContainer>
                    {backgroundImg && (
                        <BackgroundContainer>
                            <BackgroundImage alt="" image={backgroundImg} loading="eager" objectFit="cover" />
                        </BackgroundContainer>
                    )}
                    {image && <Image alt={imageAlt ?? ''} image={image} loading="eager" objectFit="contain" />}
                </ImageContainer>
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
