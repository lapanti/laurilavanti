import { render, screen } from '@testing-library/react'

import { aboutMe, blog, contactMe } from '../../tests/pages.mock'
import Page from './Page'

describe('<Page />', () => {
    it('should render about me page', () => {
        const { container } = render(<Page data={{ contentfulPage: aboutMe }} pageContext={{ slug: 'minusta' }} />)

        expect(screen.getByRole('heading', { name: aboutMe.title })).toBeInTheDocument()

        expect(container).toMatchSnapshot()
    })

    it('should render blog page', () => {
        const { container } = render(<Page data={{ contentfulPage: blog }} pageContext={{ slug: 'blogi' }} />)

        expect(screen.getByRole('heading', { name: blog.title })).toBeInTheDocument()

        expect(container).toMatchSnapshot()
    })

    it('should render contact me page', () => {
        const { container } = render(
            <Page data={{ contentfulPage: contactMe }} pageContext={{ slug: 'ota-yhteytta' }} />
        )

        expect(screen.getByRole('heading', { name: contactMe.title })).toBeInTheDocument()

        expect(container).toMatchSnapshot()
    })

    it('should redirect to donation page', async () => {
        window = Object.create(window) // eslint-disable-line no-global-assign
        Object.defineProperty(window, 'location', {
            value: {
                href: '',
            },
            writable: true,
        })
        render(<Page data={{ contentfulPage: aboutMe }} pageContext={{ slug: 'lahjoita' }} />)

        expect(window.location.href).toBe(
            'https://vaalit.vihreat.fi/embed/ehdokas/?kieli=fi&vaali=kuntavaalit-2025&kunta=k257&ehdokas=lavanti-lauri-7479&valilehti=donate'
        )
    })
})
