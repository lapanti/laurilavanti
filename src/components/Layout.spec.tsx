import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'

/** @ts-expect-error untyped code */
import gatsbyConfig from '../../gatsby-config'
import { mainImage } from '../../tests/images.mock'
import Layout from './Layout'

describe('<Layout />', () => {
    const title = 'Title'
    const children = 'Children'
    const { title: siteTitle } = gatsbyConfig.siteMetadata

    it('should render minimal', () => {
        const { container } = render(<Layout>{children}</Layout>)

        expect(screen.getByText(children)).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render title', async () => {
        const { container } = render(<Layout title={title}>{children}</Layout>)

        expect(screen.getByText(children)).toBeInTheDocument()

        expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
        await waitFor(() => expect(document.title).toEqual(`${title} | ${siteTitle}`))

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render hidden title', async () => {
        const { container } = render(<Layout hiddenTitle={title}>{children}</Layout>)

        expect(screen.getByText(children)).toBeInTheDocument()

        expect(screen.queryByRole('heading', { name: title })).toBeNull()
        await waitFor(() => expect(document.title).toEqual(`${title} | ${siteTitle}`))

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render hero image', () => {
        const { container } = render(
            <Layout heroImage={mainImage} title={title}>
                {children}
            </Layout>
        )

        expect(screen.getByText(children)).toBeInTheDocument()

        expect(screen.getByRole('img', { name: title })).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render hero image with hidden title as alt', () => {
        const { container } = render(
            <Layout heroImage={mainImage} hiddenTitle={title}>
                {children}
            </Layout>
        )

        expect(screen.getByText(children)).toBeInTheDocument()

        expect(screen.getByRole('img', { name: title })).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render meta image', () => {
        const { container } = render(
            <Layout metaImage={mainImage} title={title}>
                {children}
            </Layout>
        )

        expect(screen.getByText(children)).toBeInTheDocument()

        expect(screen.queryByRole('img', { name: title })).toBeNull()

        expect(container.firstChild).toMatchSnapshot()
    })
})
