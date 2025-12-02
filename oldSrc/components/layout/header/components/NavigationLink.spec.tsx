import type { MainNav } from '../../../../types/contentful'

import { render, screen } from '@testing-library/react'

import NavigationLink from './NavigationLink'

describe('<NavigationLink />', () => {
    const slug = 'my-slug-is-here'
    const navigationTitle = 'This is my title'
    const title = 'Title'
    const nav: MainNav['links'][number] = { contentful_id: 'contentful_id', navigationTitle, slug, title }

    it('should render', () => {
        const { container } = render(<NavigationLink {...nav} title={navigationTitle} />)

        expect(screen.getByRole('link', { name: navigationTitle })).toHaveAttribute('href', `/${slug}/`)

        expect(container.firstChild).toMatchSnapshot()
    })
})
