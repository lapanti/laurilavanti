import { render, screen } from '@testing-library/react'
import React from 'react'

import config from '../../gatsby-config'
import { healthBelongsToAll, homecareMunicipalityExtra, soteIsBedrock } from '../../tests/posts.mock'
import Post from './Post'

describe('<Post />', () => {
    it('should render basic post', () => {
        const { container } = render(
            <Post
                data={{
                    contentfulPost: healthBelongsToAll,
                    site: { siteMetadata: { siteUrl: config?.siteMetadata?.siteUrl as string } },
                }}
                pageContext={{ slug: healthBelongsToAll.slug }}
            />
        )

        expect(screen.getByRole('heading', { name: healthBelongsToAll.title })).toBeInTheDocument()
        expect(screen.getAllByRole('img', { name: healthBelongsToAll.headerImage.description })).not.toBeNull()

        expect(
            screen.getByRole('complementary', { name: `Kirjoituksen ${healthBelongsToAll.title} meta-tiedot` })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('complementary', {
                name: `Kirjoituksen ${healthBelongsToAll.title} sosiaalisen median jakolinkit`,
            })
        ).toBeInTheDocument()

        expect(screen.getByRole('heading', { name: /Muita kirjoituksia/i })).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render oldest post', () => {
        const { container } = render(
            <Post
                data={{
                    contentfulPost: homecareMunicipalityExtra,
                    site: { siteMetadata: { siteUrl: config?.siteMetadata?.siteUrl as string } },
                }}
                pageContext={{ slug: homecareMunicipalityExtra.slug }}
            />
        )

        expect(screen.getByRole('heading', { name: homecareMunicipalityExtra.title })).toBeInTheDocument()
        expect(screen.getAllByRole('img', { name: homecareMunicipalityExtra.headerImage.description })).not.toBeNull()

        expect(
            screen.getByRole('complementary', { name: `Kirjoituksen ${homecareMunicipalityExtra.title} meta-tiedot` })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('complementary', {
                name: `Kirjoituksen ${homecareMunicipalityExtra.title} sosiaalisen median jakolinkit`,
            })
        ).toBeInTheDocument()

        expect(screen.getByRole('heading', { name: /Muita kirjoituksia/i })).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render updated post', () => {
        const { container } = render(
            <Post
                data={{
                    contentfulPost: soteIsBedrock,
                    site: { siteMetadata: { siteUrl: config?.siteMetadata?.siteUrl as string } },
                }}
                pageContext={{ slug: soteIsBedrock.slug }}
            />
        )

        expect(screen.getByRole('heading', { name: soteIsBedrock.title })).toBeInTheDocument()
        expect(screen.getAllByRole('img', { name: soteIsBedrock.headerImage.description })).not.toBeNull()

        expect(
            screen.getByRole('complementary', { name: `Kirjoituksen ${soteIsBedrock.title} meta-tiedot` })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('complementary', {
                name: `Kirjoituksen ${soteIsBedrock.title} sosiaalisen median jakolinkit`,
            })
        ).toBeInTheDocument()

        expect(screen.getByRole('heading', { name: /Muita kirjoituksia/i })).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })
})
