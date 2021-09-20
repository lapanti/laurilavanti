import type { ImageDataLike } from 'gatsby-plugin-image'

import React from 'react'
import { Helmet } from 'react-helmet'
import tw, { GlobalStyles } from 'twin.macro'

import Footer from './page/Footer'
import Header from './page/Header'
import HeroImage from './page/HeroImage'
import Svgs from './page/Svgs'

const Main = tw.main`
    grid-in-main
`

const Article = tw.article`
    grid grid-cols-article 700:grid-cols-article700 750:grid-cols-article750
`

const H1 = tw.h1`
    col-start-3 text-3xl font-bold mb-1 mt-4.5
`

interface Props {
    className?: string
    title?: string
    heroImage?: ImageDataLike
    hiddenTitle?: string
}

const PageComponent = ({
    className,
    title,
    heroImage,
    hiddenTitle,
    children,
}: React.PropsWithChildren<Props>): JSX.Element => (
    <>
        <GlobalStyles />
        <div className={className}>
            <Helmet>
                <title>{title || hiddenTitle}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Helmet>
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

PageComponent.displayName = 'Page'

const Page = tw(PageComponent)`
    grid grid-areas-layout grid-rows-layout grid-cols-1 gap-4.5 min-h-screen relative font-sans
`

export default Page
