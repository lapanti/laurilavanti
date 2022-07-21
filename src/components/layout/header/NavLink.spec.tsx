import type { MainNav } from '../../../types/contentful'

import { render, screen } from '@testing-library/react'
import React from 'react'

import NavLink from './NavLink'

describe('<NavLink />', () => {
    const slug = 'my-slug-is-here'
    const title = 'This is my title'
    const nav: MainNav['links'][number] = { slug, title, contentful_id: 'contentful_id' }

    it('should render', () => {
        const { container } = render(<NavLink {...nav} />)

        expect(screen.getByRole('link', { name: title })).toHaveAttribute('href', `/${slug}/`)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render link to index', () => {
        const indexNav = { ...nav, title: 'Lauri Lavanti', slug: 'index' }

        const { container } = render(<NavLink {...indexNav} />)

        expect(screen.getByRole('link', { name: /Etusivu/i })).toHaveAttribute('href', `/`)

        expect(container.firstChild).toMatchSnapshot()
    })
})
