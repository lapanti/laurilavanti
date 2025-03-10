import type { JsonLdType } from '../../types/jsonld'

import { graphql, useStaticQuery } from 'gatsby'
import { Helmet } from 'react-helmet'

import { getValueOrDefault } from '../../lib/string'
import { BLOGPOSTING, JSON_LD_TYPES, WEBPAGE, WEBSITE } from '../../types/jsonld'

export interface SeoProps {
    description?: string
    meta?: JSX.IntrinsicElements['meta'][]
    title: string
    image?: { src: string; height: string; width: string }
    pathname?: string
    type?: JsonLdType
    published?: string
    modified?: string
}

const Seo = ({
    description,
    meta,
    title,
    image: metaImage,
    pathname,
    type = WEBSITE,
    published,
    modified,
}: SeoProps): JSX.Element => {
    const { site } = useStaticQuery<{
        site: {
            siteMetadata: {
                title: string
                description: string
                author: string
                keywords: string[]
                siteUrl: string
                locale: string
                facebook: string
                instagram: string
                linkedIn: string
                bluesky: string
                threads: string
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
                    facebook
                    instagram
                    linkedIn
                    bluesky
                    threads
                }
            }
        }
    `)

    const metaDescription = getValueOrDefault(description, site?.siteMetadata?.description)
    const cardMeta = metaImage?.src
        ? [
              {
                  content: metaImage.src.replace(/&amp;/g, '&'),
                  property: 'og:image',
              },
              {
                  content: metaImage.width,
                  property: 'og:image:width',
              },
              {
                  content: metaImage.height,
                  property: 'og:image:height',
              },
              {
                  content: 'summary_large_image',
                  name: 'twitter:card',
              },
          ]
        : [
              {
                  content: 'summary',
                  name: 'twitter:card',
              },
          ]
    const canonical = pathname ? `${site?.siteMetadata?.siteUrl}${pathname}` : null

    const jsonLD = {
        '@context': 'https://schema.org',
        '@type': JSON_LD_TYPES.includes(type) ? type : WEBSITE,
        author: {
            '@type': 'Person',
            name: site?.siteMetadata?.author,
        },
        description: metaDescription,
        headline: title,
        url: canonical,
        ...(metaImage
            ? {
                  image: metaImage.src.replace(/&amp;/g, '&'),
              }
            : {}),
        ...(type === BLOGPOSTING
            ? {
                  dateModified: modified ?? published,
                  datePublished: published,
                  mainEntityOfPage: {
                      '@id': canonical,
                      '@type': WEBPAGE,
                  },
              }
            : {}),
        ...(type === WEBSITE
            ? {
                  name: site?.siteMetadata?.title,
                  sameAs: [
                      site?.siteMetadata?.facebook,
                      site?.siteMetadata?.instagram,
                      site?.siteMetadata?.linkedIn,
                      site?.siteMetadata?.bluesky,
                      site?.siteMetadata?.threads,
                  ],
              }
            : {}),
    }

    return (
        <Helmet
            htmlAttributes={{ lang: 'fi' }}
            link={canonical ? [{ href: canonical, rel: 'canonical' }] : []}
            meta={[
                {
                    content: site?.siteMetadata?.keywords.join(', '),
                    name: 'keywords',
                },
                {
                    content: title,
                    property: 'og:title',
                },
                {
                    content: site?.siteMetadata?.author,
                    name: 'author',
                },
                {
                    content: site?.siteMetadata?.locale,
                    name: 'og:locale',
                },
                {
                    content: metaDescription,
                    name: 'description',
                },
                {
                    content: metaDescription,
                    property: 'og:description',
                },
                {
                    content: canonical ?? site?.siteMetadata?.siteUrl,
                    name: 'og:url',
                },
                {
                    content: site?.siteMetadata?.title,
                    name: 'og:site_name',
                },
                {
                    content: title,
                    name: 'twitter:title',
                },
                {
                    content: site?.siteMetadata?.facebook,
                    name: 'article:publisher',
                },
                {
                    content: 'website',
                    property: 'og:type',
                },
                {
                    content: metaDescription,
                    name: 'twitter:description',
                },
                ...cardMeta,
                ...(meta ?? []),
            ]}
            title={title}
            titleTemplate={title === site?.siteMetadata?.title ? '%s' : `%s | ${site?.siteMetadata?.title}`}
        >
            <script type="application/ld+json">{JSON.stringify(jsonLD)}</script>
        </Helmet>
    )
}

export default Seo
