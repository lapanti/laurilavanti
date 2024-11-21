import type { MainNav } from '../../../types/contentful'

import { render, screen } from '@testing-library/react'
import React from 'react'

import NavLink from './NavLink'

describe('<NavLink />', () => {
    const slug = 'my-slug-is-here'
    const navigationTitle = 'This is my title'
    const title = 'Title'
    const nav: MainNav['links'][number] = { contentful_id: 'contentful_id', navigationTitle, slug, title }

    it('should render', () => {
        const { container } = render(<NavLink {...nav} title={navigationTitle} />)

        expect(screen.getByRole('link', { name: navigationTitle })).toHaveAttribute('href', `/${slug}/`)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render link to front page', () => {
        const frontPageNav = { contentful_id: nav.contentful_id, slug: 'index', title: 'Lauri Lavanti' }

        const { container } = render(<NavLink {...frontPageNav} isFrontPage />)

        expect(screen.getByRole('link', { name: frontPageNav.title })).toHaveAttribute('href', `/`)

        expect(container.firstChild).toMatchSnapshot()
    })
})
