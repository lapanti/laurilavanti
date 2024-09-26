import { render, screen } from '@testing-library/react'
import React from 'react'

import { mainImage, mainImageDescription } from '../../tests/images.mock'
import { excerptList } from '../../tests/posts.mock'
import Tag from './Tag'

describe('<Tag />', () => {
    const tag = 'varhaiskasvatus'

    it('should render', () => {
        const { container } = render(
            <Tag
                data={{
                    contentfulPage: {
                        image: { localFile: mainImage, description: mainImageDescription },
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
