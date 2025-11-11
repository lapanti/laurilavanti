import { render, screen } from '@testing-library/react'

import {
    inFrontOfWoodsImage,
    inFrontOfWoodsImageDescription,
    smilingImage,
    smilingImageDescription,
} from '../../tests/images.mock'
import { excerptList } from '../../tests/posts.mock'
import Tag from './Tag'

describe('<Tag />', () => {
    const name = 'tekoäly'
    const tag = 'tekoaly'

    it('should render', () => {
        const { container } = render(
            <Tag
                data={{
                    contentfulPage: {
                        backgroundImage: { description: smilingImageDescription, gatsbyImageData: smilingImage },
                        image: { description: inFrontOfWoodsImageDescription, gatsbyImageData: inFrontOfWoodsImage },
                        socialImage: { gatsbyImageData: inFrontOfWoodsImage },
                    },
                }}
                pageContext={{ name, tag }}
            />
        )

        expect(screen.getAllByRole('article')).toHaveLength(
            excerptList.filter((excerpt) =>
                excerpt.metadata.tags.map(({ contentful_id }) => contentful_id).includes(tag)
            ).length + 1
        )

        expect(screen.getByRole('heading', { name: name.replace(/^\w/, (c) => c.toUpperCase()) })).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })
})
