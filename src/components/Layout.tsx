import type { Block, Inline, Text } from '@contentful/rich-text-types'
import type { ImageDataLike } from 'gatsby-plugin-image'
import type { ReactNode } from 'react'
import type { RichBody } from '../types/contentful'
import type { SeoProps } from './layout/Seo'

import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import React from 'react'
import styled from 'styled-components'

import {
    breakpoints,
    colors,
    fontFamilies,
    fontSizes,
    fontWeights,
    gridAreas,
    gridTemplateAreasLayout,
    gridTemplateColumns,
    gridTemplateColumnsArticle,
    gridTemplateRowsLayout,
    sizes,
} from '../lib/styles'
import ExcerptList from './ExcerptList'
import ExternalLink from './ExternalLink'
import H2 from './H2'
import Hr from './Hr'
import InternalLink from './InternalLink'
import ContactInfo from './layout/ContactInfo'
import CurriculumVitae from './layout/CurriculumVitae'
import Footer from './layout/Footer'
import GlobalStyle from './layout/GlobalStyle'
import Header from './layout/Header'
import HeroBanner from './layout/HeroBanner'
import HeroImage from './layout/HeroImage'
import Image from './layout/Image'
import Seo from './layout/Seo'
import Svgs from './layout/Svgs'
import Title from './layout/Title'
import YearsFrom from './layout/YearsFrom'
import Paragraph from './Paragraph'

const Main = styled.main({
    gridArea: gridAreas.main,
})

const Article = styled.article({
    display: 'grid',
    gridTemplateColumns: gridTemplateColumnsArticle,
    [`${Title} + *`]: {
        marginTop: sizes[1],
    },
})

const MobileHeroImage = styled(HeroImage)({
    display: 'flex !important',
    [breakpoints.biggerThanPhone.min]: {
        display: 'none !important',
    },
})

const DesktopHeroImage = styled(HeroImage)({
    display: 'none !important',
    [breakpoints.biggerThanPhone.min]: {
        display: 'flex !important',
    },
})

const PositionedP = styled(Paragraph)({
    gridColumnStart: 3,
})

const TableContainer = styled.div({
    gridColumn: '1 / -1',
    overflowX: 'auto',
    maxWidth: '100vw',
})

const Table = styled.table({
    marginTop: sizes[1],
    marginBottom: sizes[1],
    marginLeft: 'auto',
    marginRight: 'auto',
    tableLayout: 'auto',
    borderCollapse: 'separate',
})

const TableHeaderCell = styled.th({
    backgroundColor: colors.gray,
    paddingLeft: sizes[1],
    paddingRight: sizes[1],
    borderWidth: '1px',
    borderColor: colors.black,
    borderStyle: 'solid',
    whiteSpace: 'nowrap',
})

const TableCell = styled.td({
    paddingLeft: sizes[1],
    paddingRight: sizes[1],
    borderWidth: '1px',
    borderColor: colors.black,
    borderStyle: 'solid',
    whiteSpace: 'nowrap',
})

const BlockQuote = styled.div({
    borderLeftWidth: '4px',
    paddingLeft: sizes[0.5],
    paddingTop: sizes[0.5],
    paddingBottom: sizes[0.5],
    borderLeftColor: colors.sand,
    gridColumnStart: 3,
    fontFamily: fontFamilies.mono,
    fontWeight: fontWeights.normal,
    fontStyle: 'italic',
    ...fontSizes['2xl'],
})

const options = {
    renderNode: {
        [BLOCKS.PARAGRAPH]: (_: Block | Inline, children: ReactNode) => <PositionedP>{children}</PositionedP>,
        [BLOCKS.HEADING_2]: (_: Block | Inline, children: ReactNode) => <H2>{children}</H2>,
        [BLOCKS.HR]: () => <Hr />,
        [BLOCKS.EMBEDDED_ENTRY]: (node: Block | Inline) => {
            switch (node?.data?.target?.__typename) {
                case 'ContentfulExcerptList':
                    return <ExcerptList limit={node.data.target.limit} />
                case 'ContentfulImageWithCaption':
                    return (
                        <Image
                            imageData={node.data.target.image.localFile}
                            alt={node.data.target.image.description}
                            caption={node.data.target.caption}
                        />
                    )
                case 'ContentfulContactInfo':
                    return <ContactInfo links={node.data.target.links} />
                case 'ContentfulCurriculumVitae':
                    return (
                        <CurriculumVitae
                            degreesTitle={node.data.target.degreesTitle}
                            degrees={node.data.target.degrees}
                            fiduciariesTitle={node.data.target.fiduciariesTitle}
                            fiduciaries={node.data.target.fiduciaries}
                            jobExperiencesTitle={node.data.target.jobExperiencesTitle}
                            jobExperiences={node.data.target.jobExperiences}
                        />
                    )
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
        [BLOCKS.QUOTE]: (block: Block | Inline) => {
            const firstContent = block.content[0]
            if ('content' in firstContent) {
                return <BlockQuote>{(firstContent.content[0] as Text).value}</BlockQuote>
            }
        },
        [INLINES.HYPERLINK]: (node: Block | Inline, children: ReactNode) => (
            <ExternalLink href={node.data.uri}>{children}</ExternalLink>
        ),
        [INLINES.ENTRY_HYPERLINK]: (node: Block | Inline, children: ReactNode) => {
            if (node.data.target.__typename === 'ContentfulPost') {
                return <InternalLink to={`/blogi/${node.data.target.slug}/`}>{children}</InternalLink>
            }
        },
        [INLINES.EMBEDDED_ENTRY]: (node: Block | Inline) => {
            if (node?.data?.target?.__typename === 'ContentfulYearsFrom') {
                return <YearsFrom dateToCountFrom={node.data.target.dateToCountFrom} />
            }
        },
    },
}

interface Props extends Omit<SeoProps, 'title' | 'image'> {
    className?: string
    title: string
    subtitle?: string
    secondaryTitle?: string
    heroImage?: ImageDataLike
    heroImageAlt?: string
    mobileHeroImage?: ImageDataLike
    mobileHeroImageAlt?: string
    backgroundImage?: ImageDataLike
    body?: RichBody
    preBody?: ReactNode
    isFrontPage?: boolean
}

const LayoutComponent = ({
    className,
    title,
    subtitle,
    secondaryTitle,
    heroImage,
    heroImageAlt,
    mobileHeroImage,
    mobileHeroImageAlt,
    backgroundImage,
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
            <GlobalStyle />
            <Seo
                title={title || ''}
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
                        {isFrontPage && (
                            <HeroBanner
                                title={title}
                                backgroundImage={backgroundImage}
                                subtitle={subtitle}
                                secondaryTitle={secondaryTitle}
                            />
                        )}
                        {!isFrontPage && heroImage && (
                            <DesktopHeroImage imageData={heroImage} alt={heroImageAlt || ''} />
                        )}
                        {!isFrontPage && mobileHeroImage && (
                            <MobileHeroImage imageData={mobileHeroImage} alt={mobileHeroImageAlt || ''} />
                        )}
                        {!isFrontPage && <Title title={title} />}
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

const Layout = styled(LayoutComponent)({
    display: 'grid',
    gridTemplateAreas: gridTemplateAreasLayout,
    gridTemplateRows: gridTemplateRowsLayout,
    gridTemplateColumns: gridTemplateColumns,
    gap: sizes[1.125],
    minHeight: '100vh',
    position: 'relative',
})

export default Layout
