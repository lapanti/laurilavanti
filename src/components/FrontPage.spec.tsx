import { render, screen } from '@testing-library/react'

import { inFrontOfWoodsImage, inFrontOfWoodsImageDescription } from '../../tests/images.mock'
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
                        description: 'Kotisivuni',
                        image: { description: inFrontOfWoodsImageDescription, gatsbyImageData: inFrontOfWoodsImage },
                        jsonLdType: 'WebSite',
                        leftAlignedTitle: true,
                        secondaryTitle: null,
                        slug: 'index',
                        socialImage: null,
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
