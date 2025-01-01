import type { Block, Inline, Text } from '@contentful/rich-text-types'
import type { IGatsbyImageData } from 'gatsby-plugin-image'
import type { ReactNode } from 'react'
import type { RichBody } from '../types/contentful'
import type { SeoProps } from './layout/Seo'

import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import styled from 'styled-components' /* eslint-disable-line import/no-named-as-default */

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
    gridTemplateRowsLayoutMobile,
    sizes,
} from '../lib/styles'
import ExcerptList from './ExcerptList'
import ExternalLink from './ExternalLink'
import H2 from './H2'
import Hr from './Hr'
import InternalLink from './InternalLink'
import BlockQuote from './layout/BlockQuote'
import ContactInfoLink from './layout/ContactInfoLink'
import CurriculumVitae from './layout/CurriculumVitae'
import Footer from './layout/Footer'
import GlobalStyle from './layout/GlobalStyle'
import Header from './layout/Header'
import HeroBanner from './layout/HeroBanner'
import Image from './layout/Image'
import Seo from './layout/Seo'
import Svgs from './layout/Svgs'
import TitleBanner from './layout/TitleBanner'
import YearsFrom from './layout/YearsFrom'
import Paragraph from './Paragraph'

const Main = styled.main({
    backgroundColor: colors.white,
    gridArea: gridAreas.main,
})

const Article = styled.article({
    display: 'grid',
    gridTemplateColumns: gridTemplateColumnsArticle,
})

const PositionedP = styled(Paragraph)({
    gridColumnStart: 3,
})

const TableContainer = styled.div({
    gridColumn: '1 / -1',
    maxWidth: '100vw',
    overflowX: 'auto',
})

const Table = styled.table({
    borderCollapse: 'separate',
    marginBottom: sizes[1],
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: sizes[1],
    tableLayout: 'auto',
})

const TableHeaderCell = styled.th({
    backgroundColor: colors.gray,
    borderColor: colors.black,
    borderStyle: 'solid',
    borderWidth: '1px',
    paddingLeft: sizes[1],
    paddingRight: sizes[1],
    whiteSpace: 'nowrap',
})

const TableCell = styled.td({
    borderColor: colors.black,
    borderStyle: 'solid',
    borderWidth: '1px',
    paddingLeft: sizes[1],
    paddingRight: sizes[1],
    whiteSpace: 'nowrap',
})

const StyledImage = styled(GatsbyImage)({
    gridColumnStart: 3,
})

const options = {
    renderNode: {
        [BLOCKS.PARAGRAPH]: (_: Block | Inline, children: ReactNode) => <PositionedP>{children}</PositionedP>,
        [BLOCKS.HEADING_2]: (_: Block | Inline, children: ReactNode) => <H2>{children}</H2>,
        [BLOCKS.HR]: () => <Hr />,
        [BLOCKS.EMBEDDED_ENTRY]: (node: Block | Inline) => {
            switch (node?.data?.target?.__typename) {
                case 'ContentfulExcerptList':
                    return (
                        <ExcerptList
                            limit={node.data.target.limit}
                            pinned={(node.data.target.pinned as { slug: string }[] | undefined)?.map(
                                ({ slug }) => slug
                            )}
                        />
                    )
                case 'ContentfulImageWithCaption':
                    return (
                        <Image
                            alt={node.data.target.image.description}
                            caption={node.data.target.caption}
                            imageData={node.data.target.image}
                        />
                    )
                case 'ContentfulCurriculumVitae':
                    return (
                        <CurriculumVitae
                            degrees={node.data.target.degrees}
                            degreesTitle={node.data.target.degreesTitle}
                            fiduciaries={node.data.target.fiduciaries}
                            fiduciariesTitle={node.data.target.fiduciariesTitle}
                            jobExperiences={node.data.target.jobExperiences}
                            jobExperiencesTitle={node.data.target.jobExperiencesTitle}
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
            if (node?.data?.target?.__typename === 'ContentfulContactInfoLink') {
                return <ContactInfoLink link={node.data.target} />
            }
        },
        [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
            const image = getImage(node?.data?.target)
            return image ? <StyledImage alt={node.data.target.description} image={image} objectFit="contain" /> : null
        },
    },
}

interface Props extends Omit<SeoProps, 'title' | 'image'> {
    className?: string
    title: string
    subtitle?: string
    secondaryTitle?: string
    heroImage?: IGatsbyImageData
    heroImageAlt?: string
    backgroundImage?: IGatsbyImageData
    socialImage?: IGatsbyImageData
    body?: RichBody
    isFrontPage?: boolean
    showMeta?: boolean
    publishDate?: string
    tags?: string[]
    leftAlignedTitle: boolean
}

const LayoutComponent = ({
    className,
    title,
    subtitle,
    secondaryTitle,
    heroImage,
    heroImageAlt,
    backgroundImage,
    socialImage,
    description,
    meta,
    pathname,
    type,
    published,
    modified,
    body,
    isFrontPage,
    showMeta,
    publishDate,
    tags,
    leftAlignedTitle,
    children,
}: React.PropsWithChildren<Props>): JSX.Element => {
    const image = heroImage
        ? {
              height: `${heroImage.height}`,
              src: heroImage.images?.fallback?.src ?? '',
              width: `${heroImage.width}`,
          }
        : undefined
    const socialImageObj = socialImage
        ? {
              height: `${socialImage.height}`,
              src: socialImage.images?.fallback?.src ?? '',
              width: `${socialImage.width}`,
          }
        : undefined

    return (
        <>
            <GlobalStyle />
            <Seo
                description={description}
                image={socialImageObj ?? image}
                meta={meta}
                modified={modified}
                pathname={pathname}
                published={published}
                title={title || ''}
                type={type}
            />
            <div className={className}>
                <Header />
                <Main>
                    <Article>
                        {isFrontPage && (
                            <HeroBanner
                                backgroundImage={backgroundImage}
                                imageAlt={heroImageAlt}
                                imageData={heroImage}
                                secondaryTitle={secondaryTitle}
                                subtitle={subtitle}
                                title={title}
                            />
                        )}
                        {!isFrontPage && (
                            <TitleBanner
                                backgroundImage={backgroundImage}
                                imageAlt={heroImageAlt}
                                imageData={heroImage}
                                leftAlignedTitle={leftAlignedTitle}
                                publishDate={publishDate}
                                showMeta={showMeta}
                                tags={tags}
                                title={title}
                            />
                        )}
                        {body && renderRichText(body, options)}
                        {children}
                    </Article>
                </Main>

                <Footer />
            </div>
            <Svgs />
        </>
    )
}

LayoutComponent.displayName = 'Layout'

const Layout = styled(LayoutComponent)({
    display: 'grid',
    gridTemplateAreas: gridTemplateAreasLayout,
    gridTemplateColumns: gridTemplateColumns,
    gridTemplateRows: gridTemplateRowsLayoutMobile,
    minHeight: '100vh',
    position: 'relative',
    [breakpoints[1200].min]: {
        gridTemplateRows: gridTemplateRowsLayout,
    },
})

export default Layout
