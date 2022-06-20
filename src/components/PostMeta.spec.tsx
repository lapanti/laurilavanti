import { render, screen } from '@testing-library/react'
import React from 'react'

import PostMeta from './PostMeta'

const MINUTE_IN_MS = 1000 * 60

describe('<PostMeta />', () => {
    const tags = ['kirkkonummi', 'aluevaalit', 'sote', 'kuntavaalit']
    const date = '16.3.2022'
    const dateAsDateTime = '2022-3-16'

    it('should render', () => {
        const { container } = render(<PostMeta tags={tags} date={date} />)

        expect(screen.getByText('alle minuutti')).toBeInTheDocument()
        expect(screen.getByText(date)).toHaveAttribute('datetime', dateAsDateTime)
        tags.forEach((tag) =>
            expect(screen.getByRole('link', { name: `#${tag}` })).toHaveAttribute('href', `/blogi/${tag}`)
        )

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render multiple minutes', () => {
        const { container } = render(<PostMeta tags={tags} date={date} />)

        expect(screen.getByText(date)).toHaveAttribute('datetime', dateAsDateTime)
        tags.forEach((tag) =>
            expect(screen.getByRole('link', { name: `#${tag}` })).toHaveAttribute('href', `/blogi/${tag}`)
        )

        expect(container.firstChild).toMatchSnapshot()
    })
})
