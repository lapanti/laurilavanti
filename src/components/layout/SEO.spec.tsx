import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { Helmet } from 'react-helmet'

/** @ts-expect-error untyped code */
import gatsbyConfig from '../../../gatsby-config'
import { mainImage } from '../../../tests/images.mock'
import SEO from './SEO'

interface ImageSeoData {
    childImageSharp: {
        gatsbyImageData: { images: { fallback: { src: string } }; height: number; width: number }
    }
}

describe('<SEO />', () => {
    const { title, keywords, author, locale, description, siteUrl, twSite, twCreator, facebook, twitter } =
        gatsbyConfig.siteMetadata

    const expectHelmetToHaveCorrectValues = (
        pageTitle = title,
        canonical = '',
        imgData?: { src: string; width: string; height: string },
        pageDescription = description,
        pageType = 'WebSite',
        modified?: string,
        published?: string
    ) => {
        const helmet = Helmet.peek()

        expect(helmet.htmlAttributes).toEqual({ lang: 'fi' })
        expect(helmet.title).toEqual(pageTitle === title ? title : `${pageTitle} | ${title}`)
        expect(helmet.linkTags).toEqual(canonical ? [{ href: canonical, rel: 'canonical' }] : [])
        expect(helmet.metaTags).toEqual([
            {
                content: keywords.join(', '),
                name: 'keywords',
            },
            { content: pageTitle, property: 'og:title' },
            { content: author, name: 'author' },
            { content: locale, name: 'og:locale' },
            { content: pageDescription, name: 'description' },
            { content: pageDescription, property: 'og:description' },
            { content: canonical ? canonical : siteUrl, name: 'og:url' },
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
        ])
        expect(helmet.scriptTags[0].type).toEqual('application/ld+json')
        expect(JSON.parse(helmet.scriptTags[0].innerHTML)).toEqual({
            description: pageDescription,
            url: canonical || null,
            '@type': pageType,
            headline: pageTitle,
            image: imgData ? `${siteUrl}${imgData.src}` : undefined,
            author: { '@type': 'Person', name: author },
            dateModified: pageType === 'WebSite' ? undefined : modified,
            datePublished: pageType === 'WebSite' ? undefined : published,
            '@context': 'https://schema.org',
            mainEntityOfPage: pageType === 'WebSite' ? undefined : { '@id': canonical, '@type': 'WebPage' },
            name: pageType === 'WebSite' ? title : undefined,
            ...(pageType === 'WebSite' ? { sameAs: [facebook, twitter] } : {}),
        })
    }

    it('should render minimal SEO', async () => {
        render(<SEO title={title} />)

        expectHelmetToHaveCorrectValues()

        await waitFor(() => expect(document.title).toEqual(title))
    })

    it('should render home page SEO', async () => {
        const {
            images: {
                fallback: { src },
            },
            height,
            width,
        } = (mainImage as ImageSeoData).childImageSharp.gatsbyImageData
        const imgData = { src, height: `${height}`, width: `${width}` }
        render(<SEO description="" title={title} image={imgData} pathname="/" modified="2021-09-22" />)

        expectHelmetToHaveCorrectValues(title, `${siteUrl}/`, imgData)

        await waitFor(() => expect(document.title).toEqual(title))
    })

    it('should render blog post SEO', async () => {
        const description =
            'Mitä jos Jorvin ensiapu olisi koko läntisen Uudenmaan ainoa päivystys? Mitä jos Jorvissa pitäisi aina jonottaa monta tuntia?'
        const blogTitle = 'Mitä jos terveyskeskusta ei olisikaan?'
        const pathname = '/blogi/2021/11/15/mita-jos-terveyskeskusta-ei-olisikaan'
        const type = 'BlogPosting'
        const published = '2021-11-15'
        const modified = '2021-12-15'

        const {
            images: {
                fallback: { src },
            },
            height,
            width,
        } = (mainImage as ImageSeoData).childImageSharp.gatsbyImageData
        const imgData = { src, height: `${height}`, width: `${width}` }

        render(
            <SEO
                description={description}
                title={blogTitle}
                image={imgData}
                pathname={pathname}
                modified={modified}
                published={published}
                type={type}
            />
        )

        expectHelmetToHaveCorrectValues(
            blogTitle,
            `${siteUrl}${pathname}`,
            imgData,
            description,
            type,
            modified,
            published
        )

        await waitFor(() => expect(document.title).toEqual(`${blogTitle} | ${title}`))
    })
})
