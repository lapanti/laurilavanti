import { render, screen } from '@testing-library/react'

import { inFrontOfWoodsImage, inFrontOfWoodsImageDescription, smilingImage } from '../../tests/images.mock'
import { excerptList } from '../../tests/posts.mock'
import Tag from './Tag'

describe('<Tag />', () => {
    const tag = 'varhaiskasvatus'

    it('should render', () => {
        const { container } = render(
            <Tag
                data={{
                    contentfulPage: {
                        backgroundImage: { gatsbyImageData: smilingImage },
                        image: { description: inFrontOfWoodsImageDescription, gatsbyImageData: inFrontOfWoodsImage },
                        leftAlignedTitle: false,
                        socialImage: { gatsbyImageData: inFrontOfWoodsImage },
                    },
                }}
                pageContext={{ tag }}
            />
        )

        expect(screen.getAllByRole('article')).toHaveLength(
            excerptList.filter((excerpt) =>
                excerpt.metadata.tags.map(({ contentful_id }) => contentful_id).includes(tag)
            ).length + 1
        )

        expect(screen.getByRole('heading', { name: tag.replace(/^\w/, (c) => c.toUpperCase()) })).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })
})
