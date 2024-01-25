import type { JsonLdType } from '../../types/jsonld'

import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
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
                twSite: string
                twCreator: string
                facebook: string
                twitter: string
                instagram: string
                linkedIn: string
                mastodon: string
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
                    facebook
                    twitter
                    instagram
                    linkedIn
                    mastodon
                }
            }
        }
    `)

    const metaDescription = getValueOrDefault(description, site?.siteMetadata?.description)
    const cardMeta = metaImage?.src
        ? [
              {
                  property: 'og:image',
                  content: `${site?.siteMetadata?.siteUrl}${metaImage.src}`,
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
    const canonical = pathname ? `${site?.siteMetadata?.siteUrl}${pathname}` : null

    const jsonLD = {
        description: metaDescription,
        url: canonical,
        '@type': JSON_LD_TYPES.includes(type) ? type : WEBSITE,
        headline: title,
        author: {
            '@type': 'Person',
            name: site?.siteMetadata?.author,
        },
        '@context': 'https://schema.org',
        ...(metaImage
            ? {
                  image: `${site?.siteMetadata?.siteUrl}${metaImage.src}`,
              }
            : {}),
        ...(type === BLOGPOSTING
            ? {
                  datePublished: published,
                  dateModified: modified ?? published,
                  mainEntityOfPage: {
                      '@type': WEBPAGE,
                      '@id': canonical,
                  },
              }
            : {}),
        ...(type === WEBSITE
            ? {
                  sameAs: [
                      site?.siteMetadata?.facebook,
                      site?.siteMetadata?.twitter,
                      site?.siteMetadata?.instagram,
                      site?.siteMetadata?.linkedIn,
                      site?.siteMetadata?.mastodon,
                  ],
                  name: site?.siteMetadata?.title,
              }
            : {}),
    }

    return (
        <Helmet
            htmlAttributes={{ lang: 'fi' }}
            title={title}
            titleTemplate={title === site?.siteMetadata?.title ? '%s' : `%s | ${site?.siteMetadata?.title}`}
            link={canonical ? [{ rel: 'canonical', href: canonical }] : []}
            meta={[
                {
                    name: 'keywords',
                    content: site?.siteMetadata?.keywords.join(', '),
                },
                {
                    property: 'og:title',
                    content: title,
                },
                {
                    name: 'author',
                    content: site?.siteMetadata?.author,
                },
                {
                    name: 'og:locale',
                    content: site?.siteMetadata?.locale,
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
                    content: canonical ?? site?.siteMetadata?.siteUrl,
                },
                {
                    name: 'og:site_name',
                    content: site?.siteMetadata?.title,
                },
                {
                    name: 'twitter:title',
                    content: title,
                },
                {
                    name: 'twitter:site',
                    content: site?.siteMetadata?.twSite,
                },
                {
                    name: 'twitter:creator',
                    content: site?.siteMetadata?.twCreator,
                },
                {
                    name: 'article:publisher',
                    content: site?.siteMetadata?.facebook,
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
                ...(meta ?? []),
            ]}
        >
            <script type="application/ld+json">{JSON.stringify(jsonLD)}</script>
        </Helmet>
    )
}

export default Seo
