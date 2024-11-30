import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { Helmet } from 'react-helmet'

import gatsbyConfig from '../../../gatsby-config'
import { inFrontOfWoodsImage } from '../../../tests/images.mock'
import { BLOGPOSTING, JSON_LD_TYPES, WEBSITE } from '../../types/jsonld'
import Seo from './Seo'

interface SiteMetadata {
    title: string
    keywords: string[]
    author: string
    locale: string
    description: string
    siteUrl: string
    twSite: string
    twCreator: string
    facebook: string
    twitter: string
    instagram: string
    linkedIn: string
    mastodon: string
    bluesky: string
}

describe('<Seo />', () => {
    const {
        title,
        keywords,
        author,
        locale,
        description,
        siteUrl,
        twSite,
        twCreator,
        facebook,
        twitter,
        instagram,
        linkedIn,
        mastodon,
        bluesky,
    } = gatsbyConfig.siteMetadata as unknown as SiteMetadata

    const expectHelmetToHaveCorrectValues = ({
        pageType,
        pageTitle = title,
        canonical = '',
        imgData,
        pageDescription = description,
        modified,
        published,
        meta = [],
    }: {
        pageType: (typeof JSON_LD_TYPES)[number]
        pageTitle?: string
        canonical?: string
        imgData?: { src: string; width: string; height: string }
        pageDescription?: string
        modified?: string
        published?: string
        meta?: { name: string; content: string }[]
    }) => {
        const helmet = Helmet.peek()

        expect(helmet.htmlAttributes).toEqual({ lang: 'fi' })
        expect(helmet.title).toEqual(pageTitle === title ? title : `${pageTitle} | ${title}`)
        expect(helmet.linkTags).toEqual(canonical ? [{ href: canonical, rel: 'canonical' }] : [])
        expect(helmet.metaTags).toEqual(
            [
                {
                    content: keywords.join(', '),
                    name: 'keywords',
                },
                { content: pageTitle, property: 'og:title' },
                { content: author, name: 'author' },
                { content: locale, name: 'og:locale' },
                { content: pageDescription, name: 'description' },
                { content: pageDescription, property: 'og:description' },
                { content: canonical || siteUrl, name: 'og:url' },
                { content: title, name: 'og:site_name' },
                { content: pageTitle, name: 'twitter:title' },
                { content: twSite, name: 'twitter:site' },
                { content: twCreator, name: 'twitter:creator' },
                { content: facebook, name: 'article:publisher' },
                { content: 'website', property: 'og:type' },
                { content: pageDescription, name: 'twitter:description' },
                ...(imgData
                    ? [
                          { content: `${siteUrl}${imgData.src}`, property: 'og:image' },
                          { content: imgData.width, property: 'og:image:width' },
                          { content: imgData.height, property: 'og:image:height' },
                          { content: 'summary_large_image', name: 'twitter:card' },
                      ]
                    : [{ content: 'summary', name: 'twitter:card' }]),
            ].concat(meta)
        )
        expect(helmet.scriptTags[0].type).toEqual('application/ld+json')
        expect(JSON.parse(helmet.scriptTags[0].innerHTML)).toEqual({
            '@context': 'https://schema.org',
            '@type': JSON_LD_TYPES.includes(pageType) ? pageType : WEBSITE,
            author: { '@type': 'Person', name: author },
            dateModified: pageType === BLOGPOSTING ? modified : undefined,
            datePublished: pageType === BLOGPOSTING ? published : undefined,
            description: pageDescription,
            headline: pageTitle,
            image: imgData ? `${siteUrl}${imgData.src}` : undefined,
            mainEntityOfPage: pageType === BLOGPOSTING ? { '@id': canonical, '@type': 'WebPage' } : undefined,
            name: pageType === WEBSITE ? title : undefined,
            url: canonical || null,
            ...(pageType === WEBSITE ? { sameAs: [facebook, twitter, instagram, linkedIn, mastodon, bluesky] } : {}),
        })

        expect(helmet).toMatchSnapshot()
    }

    it('should render minimal SEO', async () => {
        render(<Seo title={title} />)

        expectHelmetToHaveCorrectValues({ pageType: WEBSITE })

        await waitFor(() => expect(document.title).toEqual(title))
    })

    it('should render home page SEO', async () => {
        const {
            images: { fallback },
            height,
            width,
        } = inFrontOfWoodsImage
        const imgData = { height: `${height}`, src: fallback?.src ?? '', width: `${width}` }
        render(<Seo description="" image={imgData} modified="2021-09-22" pathname="/" title={title} />)

        expectHelmetToHaveCorrectValues({ canonical: `${siteUrl}/`, imgData, pageTitle: title, pageType: WEBSITE })

        await waitFor(() => expect(document.title).toEqual(title))
    })

    it('should render borken home page SEO', async () => {
        const {
            images: { fallback },
            height,
            width,
        } = inFrontOfWoodsImage
        const imgData = { height: `${height}`, src: fallback?.src ?? '', width: `${width}` }
        const type = 'KikkaKokkare' as unknown as (typeof JSON_LD_TYPES)[number]
        render(<Seo description="" image={imgData} pathname="/" title={title} type={type} />)

        expectHelmetToHaveCorrectValues({ canonical: `${siteUrl}/`, imgData, pageTitle: title, pageType: type })

        await waitFor(() => expect(document.title).toEqual(title))
    })

    it('should render blog post SEO', async () => {
        const description =
            'Mitä jos Jorvin ensiapu olisi koko läntisen Uudenmaan ainoa päivystys? Mitä jos Jorvissa pitäisi aina jonottaa monta tuntia?'
        const blogTitle = 'Mitä jos terveyskeskusta ei olisikaan?'
        const pathname = '/blogi/2021/11/15/mita-jos-terveyskeskusta-ei-olisikaan/'
        const type = 'BlogPosting'
        const published = '2021-11-15'

        const {
            images: { fallback },
            height,
            width,
        } = inFrontOfWoodsImage
        const imgData = { height: `${height}`, src: fallback?.src ?? '', width: `${width}` }

        render(
            <Seo
                description={description}
                image={imgData}
                pathname={pathname}
                published={published}
                title={blogTitle}
                type={type}
            />
        )

        expectHelmetToHaveCorrectValues({
            canonical: `${siteUrl}${pathname}`,
            imgData,
            modified: published,
            pageDescription: description,
            pageTitle: blogTitle,
            pageType: type,
            published,
        })

        await waitFor(() => expect(document.title).toEqual(`${blogTitle} | ${title}`))
    })

    it('should render edited blog post SEO', async () => {
        const description =
            'Mitä jos Jorvin ensiapu olisi koko läntisen Uudenmaan ainoa päivystys? Mitä jos Jorvissa pitäisi aina jonottaa monta tuntia?'
        const blogTitle = 'Mitä jos terveyskeskusta ei olisikaan?'
        const pathname = '/blogi/2021/11/15/mita-jos-terveyskeskusta-ei-olisikaan/'
        const type = 'BlogPosting'
        const published = '2021-11-15'
        const modified = '2021-12-15'
        const meta = [{ content: 'koira', name: 'kissa' }]

        const {
            images: { fallback },
            height,
            width,
        } = inFrontOfWoodsImage
        const imgData = { height: `${height}`, src: fallback?.src ?? '', width: `${width}` }

        render(
            <Seo
                description={description}
                image={imgData}
                meta={meta}
                modified={modified}
                pathname={pathname}
                published={published}
                title={blogTitle}
                type={type}
            />
        )

        expectHelmetToHaveCorrectValues({
            canonical: `${siteUrl}${pathname}`,
            imgData,
            meta,
            modified,
            pageDescription: description,
            pageTitle: blogTitle,
            pageType: type,
            published,
        })

        await waitFor(() => expect(document.title).toEqual(`${blogTitle} | ${title}`))
    })
})
