import { render, screen } from '@testing-library/react'
import React from 'react'

import PostMeta from './PostMeta'

const MINUTE_IN_MS = 1000 * 60

describe('<PostMeta />', () => {
    const tags = ['kirkkonummi', 'aluevaalit', 'sote', 'kuntavaalit']
    const date = '16.3.2022'
    const dateAsDateTime = '2022-3-16'

    it('should render less than a minute', () => {
        const readingTime = MINUTE_IN_MS - 50

        const { container } = render(<PostMeta readingTime={readingTime} tags={tags} date={date} />)

        expect(screen.getByText('alle minuutti')).toBeInTheDocument()
        expect(screen.getByText(date)).toHaveAttribute('datetime', dateAsDateTime)
        tags.forEach((tag) =>
            expect(screen.getByRole('link', { name: `#${tag}` })).toHaveAttribute('href', `/blogi/${tag}`)
        )

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render exactly one minute', () => {
        const readingTime = MINUTE_IN_MS

        const { container } = render(<PostMeta readingTime={readingTime} tags={tags} date={date} />)

        expect(screen.getByText('1 minuutti')).toBeInTheDocument()
        expect(screen.getByText(date)).toHaveAttribute('datetime', dateAsDateTime)
        tags.forEach((tag) =>
            expect(screen.getByRole('link', { name: `#${tag}` })).toHaveAttribute('href', `/blogi/${tag}`)
        )

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render multiple minutes', () => {
        const minutes = 15
        const readingTime = MINUTE_IN_MS * minutes

        const { container } = render(<PostMeta readingTime={readingTime} tags={tags} date={date} />)

        expect(screen.getByText(`${minutes} minuuttia`)).toBeInTheDocument()
        expect(screen.getByText(date)).toHaveAttribute('datetime', dateAsDateTime)
        tags.forEach((tag) =>
            expect(screen.getByRole('link', { name: `#${tag}` })).toHaveAttribute('href', `/blogi/${tag}`)
        )

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render approximately multiple minutes', () => {
        const minutes = 15
        const readingTime = MINUTE_IN_MS * minutes + 10

        const { container } = render(<PostMeta readingTime={readingTime} tags={tags} date={date} />)

        expect(screen.getByText(`noin ${minutes} minuuttia`)).toBeInTheDocument()
        expect(screen.getByText(date)).toHaveAttribute('datetime', dateAsDateTime)
        tags.forEach((tag) =>
            expect(screen.getByRole('link', { name: `#${tag}` })).toHaveAttribute('href', `/blogi/${tag}`)
        )

        expect(container.firstChild).toMatchSnapshot()
    })
})
