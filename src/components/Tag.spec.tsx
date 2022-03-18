import { render, screen } from '@testing-library/react'
import React from 'react'

import { excerptList } from '../../tests/posts.mock'
import Tag from './Tag'

describe('<Tag />', () => {
    const tag = 'varhaiskasvatus'

    it('should render', () => {
        const { container } = render(<Tag pageContext={{ tag }} />)

        expect(screen.getAllByRole('article')).toHaveLength(
            excerptList.filter((excerpt) => excerpt.frontmatter.tags.includes(tag)).length + 1
        )

        expect(screen.getByRole('heading', { name: tag.replace(/^\w/, (c) => c.toUpperCase()) })).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })
})
