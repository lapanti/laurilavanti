import type { Block, Inline, Text } from '@contentful/rich-text-types'
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
        grid grid-cols-article
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

const TableContainer = tw.div`
    col-span-full overflow-x-auto max-w-[100vw]
`

const Table = tw.table`
    my-4 mx-auto table-auto border-separate
`

const TableHeaderCell = tw.th`
    bg-gray px-4 border border-black border-solid whitespace-nowrap
`

const TableCell = tw.td`
    px-4 border border-black border-solid whitespace-nowrap
`

const BlockQuote = tw.div`
    border-l-4 pl-2 py-2 border-l-sand col-start-3 font-mono font-normal italic text-2xl
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
        [BLOCKS.TABLE]: (_: Block | Inline, children: ReactNode) => (
            <TableContainer>
                <Table>
                    <tbody>{children}</tbody>
                </Table>
            </TableContainer>
        ),
        [BLOCKS.TABLE_HEADER_CELL]: (_: Block | Inline, children: ReactNode) => (
            <TableHeaderCell>{children}</TableHeaderCell>
        ),
        [BLOCKS.TABLE_CELL]: (_: Block | Inline, children: ReactNode) => <TableCell>{children}</TableCell>,
        [BLOCKS.QUOTE]: (block: Block | Inline) => (
            <BlockQuote>{((block.content[0] as Block | Inline).content[0] as Text).value}</BlockQuote>
        ),
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
    isFrontPage?: boolean
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
    isFrontPage,
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
                <Header isFrontPage={isFrontPage} />

                <Main>
                    <Article>
                        {isFrontPage && heroImage && (
                            <DesktopBigHeroImage imageData={heroImage} alt={title || hiddenTitle || ''} />
                        )}
                        {isFrontPage && mobileHeroImage && (
                            <MobileBigHeroImage imageData={mobileHeroImage} alt={title || hiddenTitle || ''} />
                        )}

                        {!isFrontPage && heroImage && (
                            <DesktopHeroImage imageData={heroImage} alt={title || hiddenTitle || ''} />
                        )}
                        {!isFrontPage && mobileHeroImage && (
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
    grid grid-areas-layout grid-rows-layout grid-cols-1 gap-4.5 min-h-screen relative
`

export default Layout
