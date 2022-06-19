import type { ImageDataLike } from 'gatsby-plugin-image'
import type { SEOProps } from './layout/SEO'

import React from 'react'
import tw, { GlobalStyles } from 'twin.macro'

import Footer from './layout/Footer'
import Header from './layout/Header'
import HeroImage from './layout/HeroImage'
import SEO from './layout/SEO'
import Svgs from './layout/Svgs'

const Main = tw.main`
    grid-in-main
`

const Article = tw.article`
    grid grid-cols-article 700:grid-cols-article700 750:grid-cols-article750
`

const H1 = tw.h1`
    col-start-3 text-3xl font-bold mb-1 mt-4.5
`

interface Props extends Omit<SEOProps, 'title' | 'image'> {
    className?: string
    title?: string
    hiddenTitle?: string
    heroImage?: ImageDataLike
    metaImage?: ImageDataLike
    image?: { src: string; height: string; width: string }
}

const LayoutComponent = ({
    className,
    title,
    heroImage,
    metaImage,
    hiddenTitle,
    description,
    meta,
    pathname,
    type,
    published,
    modified,
    children,
}: React.PropsWithChildren<Props>): JSX.Element => {
    const imageToUse = (heroImage || metaImage) as
        | {
              gatsbyImageData: { images: { fallback: { src: string } }; height: number; width: number }
          }
        | undefined
    const image = imageToUse
        ? {
              src: imageToUse.gatsbyImageData.images.fallback.src,
              height: `${imageToUse?.gatsbyImageData.height}`,
              width: `${imageToUse?.gatsbyImageData.width}`,
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
                        {heroImage && <HeroImage imageData={heroImage} alt={title || hiddenTitle || ''} />}
                        {title && <H1 itemProp="headline">{title}</H1>}
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
