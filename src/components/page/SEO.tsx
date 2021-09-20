import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { Helmet } from 'react-helmet'

interface Props {
    description?: string
    meta?: JSX.IntrinsicElements['meta'][]
    title: string
    image?: { src: string; height: string; width: string }
    pathname?: string
}

const SEO = ({ description, meta, title, image: metaImage, pathname }: Props): JSX.Element => {
    const { site } = useStaticQuery<{
        site: {
            siteMetadata: {
                title: string
                description: string
                author: string
                keywords: string[]
                siteUrl: string
                locale: string
                twSite: string
                twCreator: string
                publisher: string
            }
        }
    }>(graphql`
        query {
            site {
                siteMetadata {
                    title
                    description
                    author
                    keywords
                    siteUrl
                    locale
                    twSite
                    twCreator
                    publisher
                }
            }
        }
    `)

    const metaDescription = description || site.siteMetadata.description
    const cardMeta =
        metaImage && metaImage.src
            ? [
                  {
                      property: 'og:image',
                      content: `${site.siteMetadata.siteUrl}${metaImage.src}`,
                  },
                  {
                      property: 'og:image:width',
                      content: metaImage.width,
                  },
                  {
                      property: 'og:image:height',
                      content: metaImage.height,
                  },
                  {
                      name: 'twitter:card',
                      content: 'summary_large_image',
                  },
              ]
            : [
                  {
                      name: 'twitter:card',
                      content: 'summary',
                  },
              ]
    const canonical = pathname ? `${site.siteMetadata.siteUrl}${pathname}` : null

    return (
        <Helmet
            htmlAttributes={{ lang: 'fi' }}
            title={title}
            titleTemplate={title === site.siteMetadata.title ? '%s' : `%s | ${site.siteMetadata.title}`}
            link={canonical ? [{ rel: 'canonical', href: canonical }] : []}
            meta={[
                {
                    name: 'keywords',
                    content: site.siteMetadata.keywords.join(', '),
                },
                {
                    property: 'og:title',
                    content: title,
                },
                {
                    name: 'author',
                    content: site.siteMetadata.author,
                },
                {
                    name: 'og:locale',
                    content: site.siteMetadata.locale,
                },
                {
                    name: 'description',
                    content: metaDescription,
                },
                {
                    property: 'og:description',
                    content: metaDescription,
                },
                {
                    name: 'og:url',
                    content: canonical || site.siteMetadata.siteUrl,
                },
                {
                    name: 'og:site_name',
                    content: site.siteMetadata.title,
                },
                {
                    name: 'twitter:title',
                    content: title,
                },
                {
                    name: 'twitter:site',
                    content: site.siteMetadata.twSite,
                },
                {
                    name: 'twitter:creator',
                    content: site.siteMetadata.twCreator,
                },
                {
                    name: 'article:publisher',
                    content: site.siteMetadata.publisher,
                },
                {
                    property: 'og:type',
                    content: 'website',
                },
                {
                    name: 'twitter:description',
                    content: metaDescription,
                },
                ...cardMeta,
                ...(meta ? meta : []),
            ]}
        />
    )
}

export default SEO
