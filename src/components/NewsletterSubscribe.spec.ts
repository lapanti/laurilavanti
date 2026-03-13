import { getAllByRole, getByPlaceholderText, getByText } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../tests/helpers'
import NewsletterSubscribe from './NewsletterSubscribe.astro'

describe('<NewsletterSubscribe lang="fi" />', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(NewsletterSubscribe, {
            props: { lang: 'fi' },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render the heading', async () => {
        const result = await renderAstroComponent(NewsletterSubscribe, {
            props: { lang: 'fi' },
        })

        const [heading] = getAllByRole(result, 'heading', { level: 2 })

        expect(heading).toHaveTextContent('Uutiskirje')
    })

    it('should render the email input', async () => {
        const result = await renderAstroComponent(NewsletterSubscribe, {
            props: { lang: 'fi' },
        })

        const input = getByPlaceholderText(result, 'Sähköposti')

        expect(input).toBeDefined()
    })

    it('should render the submit button', async () => {
        const result = await renderAstroComponent(NewsletterSubscribe, {
            props: { lang: 'fi' },
        })

        const [button] = getAllByRole(result, 'button', { name: 'Tilaa' })

        expect(button).toBeDefined()
    })

    it('should render the privacy policy link', async () => {
        const result = await renderAstroComponent(NewsletterSubscribe, {
            props: { lang: 'fi' },
        })

        const link = getAllByRole(result, 'link', { name: /tietosuojaseloste/ })[0]

        expect(link).toBeDefined()
    })
})

describe('<NewsletterSubscribe lang="en" />', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(NewsletterSubscribe, {
            props: { lang: 'en' },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render the heading', async () => {
        const result = await renderAstroComponent(NewsletterSubscribe, {
            props: { lang: 'en' },
        })

        const [heading] = getAllByRole(result, 'heading', { level: 2 })

        expect(heading).toHaveTextContent('Newsletter')
    })

    it('should render the email input', async () => {
        const result = await renderAstroComponent(NewsletterSubscribe, {
            props: { lang: 'en' },
        })

        const input = getByPlaceholderText(result, 'Email')

        expect(input).toBeDefined()
    })

    it('should render the submit button', async () => {
        const result = await renderAstroComponent(NewsletterSubscribe, {
            props: { lang: 'en' },
        })

        const [button] = getAllByRole(result, 'button', { name: 'Subscribe' })

        expect(button).toBeDefined()
    })

    it('should render the privacy policy link', async () => {
        const result = await renderAstroComponent(NewsletterSubscribe, {
            props: { lang: 'en' },
        })

        const link = getAllByRole(result, 'link', { name: /privacy policy/ })[0]

        expect(link).toBeDefined()
    })
})

describe('<NewsletterSubscribe lang="sv" />', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(NewsletterSubscribe, {
            props: { lang: 'sv' },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render the heading', async () => {
        const result = await renderAstroComponent(NewsletterSubscribe, {
            props: { lang: 'sv' },
        })

        const [heading] = getAllByRole(result, 'heading', { level: 2 })

        expect(heading).toHaveTextContent('Nyhetsbrev')
    })

    it('should render the email input', async () => {
        const result = await renderAstroComponent(NewsletterSubscribe, {
            props: { lang: 'sv' },
        })

        const input = getByPlaceholderText(result, 'E-post')

        expect(input).toBeDefined()
    })

    it('should render the submit button', async () => {
        const result = await renderAstroComponent(NewsletterSubscribe, {
            props: { lang: 'sv' },
        })

        const [button] = getAllByRole(result, 'button', { name: 'Prenumerera' })

        expect(button).toBeDefined()
    })

    it('should render the privacy policy link', async () => {
        const result = await renderAstroComponent(NewsletterSubscribe, {
            props: { lang: 'sv' },
        })

        const link = getAllByRole(result, 'link', { name: /integritetspolicy/ })[0]

        expect(link).toBeDefined()
    })

    it('should link to the correct locale privacy policy', async () => {
        const result = await renderAstroComponent(NewsletterSubscribe, {
            props: { lang: 'sv' },
        })

        const link = getByText(result, 'integritetspolicy')

        expect(link.getAttribute('href')).toBe('/sv/privacy-policy/')
    })
})
