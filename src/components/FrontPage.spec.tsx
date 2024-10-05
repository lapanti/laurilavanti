import { render, screen } from '@testing-library/react'
import React from 'react'

import { inFrontOfWoodsImage } from '../../tests/images.mock'
import { frontPage } from '../../tests/pages.mock'
import FrontPage from './FrontPage'

describe('<FrontPage />', () => {
    it('should render', () => {
        const { container } = render(<FrontPage data={{ contentfulPage: frontPage }} pageContext={{ slug: 'index' }} />)

        expect(screen.getByRole('heading', { name: frontPage.title })).toBeInTheDocument()

        expect(container).toMatchSnapshot()
    })

    it('should render with minimal', () => {
        const { container } = render(
            <FrontPage
                data={{
                    contentfulPage: {
                        backgroundImage: null,
                        body: {},
                        description: null,
                        image: { description: '', localFile: inFrontOfWoodsImage },
                        jsonLdType: 'WebSite',
                        leftAlignedTitle: true,
                        secondaryTitle: null,
                        socialImage: null,
                        subtitle: null,
                        title: '',
                        updatedAt: '',
                    },
                }}
                pageContext={{ slug: 'index' }}
            />
        )

        expect(screen.getByRole('heading', { name: '' })).toBeInTheDocument()

        expect(container).toMatchSnapshot()
    })
})
