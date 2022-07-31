import type { Block, Inline } from '@contentful/rich-text-types'
import type { ImageDataLike } from 'gatsby-plugin-image'
import type { ReactNode } from 'react'
import type { RichBody } from '../types/contentful'
import type { SEOProps } from './layout/SEO'

import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import React from 'react'
/* @ts-expect-error twin.macro typings are incomplete :/ */
import tw, { GlobalStyles, styled } from 'twin.macro'

import ExcerptList from './ExcerptList'
import ExternalLink from './ExternalLink'
import H2 from './H2'
import HR from './HR'
import InternalLink from './InternalLink'
import BigHeroImage from './layout/BigHeroImage'
import ContactInfo from './layout/ContactInfo'
import Footer from './layout/Footer'
import Header from './layout/Header'
import HeroImage from './layout/HeroImage'
import HomeTitle from './layout/HomeTitle'
import Image from './layout/Image'
import SEO from './layout/SEO'
import Svgs from './layout/Svgs'
import Title from './layout/Title'
import Paragraph from './Paragraph'

const Main = tw.main`
    grid-in-main
`

const Article = styled.article(() => [
    {
        [`${HomeTitle} + *, ${Title} + *`]: {
            marginTop: '1rem',
        },
    },
    tw`
        grid grid-cols-article 700:grid-cols-article700 750:grid-cols-article750
    `,
])

const MobileBigHeroImage = tw(BigHeroImage)`
    flex biggerthenphone:hidden
`

const DesktopBigHeroImage = tw(BigHeroImage)`
    hidden biggerthenphone:flex
`

const MobileHeroImage = tw(HeroImage)`
    flex biggerthenphone:hidden
`

const DesktopHeroImage = tw(HeroImage)`
    hidden biggerthenphone:flex
`

const PositionedP = tw(Paragraph)`
    col-start-3
`

const options = {
    renderNode: {
        [BLOCKS.PARAGRAPH]: (_: Block | Inline, children: ReactNode) => <PositionedP>{children}</PositionedP>,
        [BLOCKS.HEADING_2]: (_: Block | Inline, children: ReactNode) => <H2>{children}</H2>,
        [BLOCKS.HR]: () => <HR />,
        [BLOCKS.EMBEDDED_ENTRY]: (node: Block | Inline) => {
            switch (node.data.target.__typename) {
                case 'ContentfulHomeTitle':
                    return <HomeTitle />
                case 'ContentfulExcerptList':
                    return <ExcerptList limit={node.data.target.limit} />
                case 'ContentfulImageWithCaption':
                    return (
                        <Image
                            imageData={node.data.target.image.localFile}
                            alt={node.data.target.altText}
                            caption={node.data.target.caption}
                        />
                    )
                case 'ContentfulContactInfo':
                    return <ContactInfo links={node.data.target.links} />
            }
        },
        [INLINES.HYPERLINK]: (node: Block | Inline, children: ReactNode) => (
            <ExternalLink href={node.data.uri}>{children}</ExternalLink>
        ),
        [INLINES.ENTRY_HYPERLINK]: (node: Block | Inline, children: ReactNode) => {
            switch (node.data.target.__typename) {
                case 'ContentfulPost':
                    return <InternalLink to={`/blogi/${node.data.target.slug}/`}>{children}</InternalLink>
            }
        },
    },
}

interface Props extends Omit<SEOProps, 'title' | 'image'> {
    className?: string
    title?: string
    hiddenTitle?: string
    heroImage?: ImageDataLike
    mobileHeroImage?: ImageDataLike
    image?: { src: string; height: string; width: string }
    body?: RichBody
    preBody?: ReactNode
}

const LayoutComponent = ({
    className,
    title,
    heroImage,
    mobileHeroImage,
    hiddenTitle,
    description,
    meta,
    pathname,
    type,
    published,
    modified,
    preBody,
    body,
    children,
}: React.PropsWithChildren<Props>): JSX.Element => {
    const imageToUse = heroImage as
        | {
              childImageSharp: {
                  gatsbyImageData: { images: { fallback: { src: string } }; height: number; width: number }
              }
          }
        | undefined
    const image = imageToUse
        ? {
              src: imageToUse.childImageSharp.gatsbyImageData.images.fallback.src,
              height: `${imageToUse?.childImageSharp.gatsbyImageData.height}`,
              width: `${imageToUse?.childImageSharp.gatsbyImageData.width}`,
          }
        : undefined

    return (
        <>
            <GlobalStyles />
            <SEO
                title={title || hiddenTitle || ''}
                description={description}
                meta={meta}
                pathname={pathname}
                image={image}
                type={type}
                published={published}
                modified={modified}
            />
            <div className={className}>
                <Header />

                <Main>
                    <Article>
                        {pathname === '/index/' && heroImage && (
                            <DesktopBigHeroImage imageData={heroImage} alt={title || hiddenTitle || ''} />
                        )}
                        {pathname === '/index/' && mobileHeroImage && (
                            <MobileBigHeroImage imageData={mobileHeroImage} alt={title || hiddenTitle || ''} />
                        )}

                        {pathname !== '/index/' && heroImage && (
                            <DesktopHeroImage imageData={heroImage} alt={title || hiddenTitle || ''} />
                        )}
                        {pathname !== '/index/' && mobileHeroImage && (
                            <MobileHeroImage imageData={mobileHeroImage} alt={title || hiddenTitle || ''} />
                        )}
                        {title && <Title title={title} />}
                        {preBody}
                        {body && renderRichText(body, options)}
                        {children}
                    </Article>
                </Main>

                <Footer />

                <Svgs />
            </div>
        </>
    )
}

LayoutComponent.displayName = 'Layout'

const Layout = tw(LayoutComponent)`
    grid grid-areas-layout grid-rows-layout grid-cols-1 gap-4.5 min-h-screen relative font-sans
`

export default Layout
