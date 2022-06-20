import type { Block, Inline } from '@contentful/rich-text-types'
import type { ImageDataLike } from 'gatsby-plugin-image'
import type { ReactNode } from 'react'
import type { RichBody } from '../types/contentful'
import type { SEOProps } from './layout/SEO'

import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import React from 'react'
import tw, { GlobalStyles } from 'twin.macro'

import ContactInfo from './ContactInfo'
import ExcerptList from './ExcerptList'
import ExternalLink from './ExternalLink'
import H2 from './H2'
import HomeTitle from './HomeTitle'
import HR from './HR'
import Image from './Image'
import InternalLink from './InternalLink'
import Footer from './layout/Footer'
import Header from './layout/Header'
import HeroImage from './layout/HeroImage'
import SEO from './layout/SEO'
import Svgs from './layout/Svgs'
import Paragraph from './Paragraph'

const Main = tw.main`
    grid-in-main
`

const Article = tw.article`
    grid grid-cols-article 700:grid-cols-article700 750:grid-cols-article750
`

const H1 = tw.h1`
    col-start-3 text-3xl font-bold mb-1 mt-4.5
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
                            imageData={node.data.target.image}
                            alt={node.data.target.altText}
                            caption={node.data.target.caption}
                        />
                    )
                case 'ContentfulContactInfo':
                    return <ContactInfo />
            }
        },
        [INLINES.HYPERLINK]: (node: Block | Inline, children: ReactNode) => (
            <ExternalLink href={node.data.uri}>{children}</ExternalLink>
        ),
        [INLINES.ENTRY_HYPERLINK]: (node: Block | Inline, children: ReactNode) => {
            switch (node.data.target.__typename) {
                case 'ContentfulPost':
                    return <InternalLink to={`/blogi/${node.data.target.slug}`}>{children}</InternalLink>
            }
        },
    },
}

interface Props extends Omit<SEOProps, 'title' | 'image'> {
    className?: string
    title?: string
    hiddenTitle?: string
    heroImage?: ImageDataLike
    metaImage?: ImageDataLike
    image?: { src: string; height: string; width: string }
    body?: RichBody
    preBody?: ReactNode
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
    preBody,
    body,
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
