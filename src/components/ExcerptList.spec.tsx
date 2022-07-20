import { render, screen } from '@testing-library/react'
import React from 'react'

import {
    daycareCannotBeCompromised,
    daycareNeedsTeachers,
    excerptList,
    preschoolClubChildBenefit,
} from '../../tests/posts.mock'
import ExcerptList from './ExcerptList'

describe('<ExcerptList />', () => {
    const limit = 3

    it('should render', () => {
        const { container } = render(<ExcerptList />)

        const articles = screen.getAllByRole('article')
        expect(articles).toHaveLength(excerptList.length)
        articles.forEach((article, i) => expect(article).toHaveAttribute('aria-label', excerptList[i].title))

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render with limit', () => {
        const { container } = render(<ExcerptList limit={limit} />)

        const articles = screen.getAllByRole('article')
        expect(articles).toHaveLength(limit)
        articles.forEach((article, i) => expect(article).toHaveAttribute('aria-label', excerptList[i].title))

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render as first element', () => {
        const { container } = render(<ExcerptList isFirstElement />)

        const articles = screen.getAllByRole('article')
        expect(articles).toHaveLength(excerptList.length)
        articles.forEach((article, i) => expect(article).toHaveAttribute('aria-label', excerptList[i].title))

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render in related order', () => {
        const orderedExcerpts = [daycareNeedsTeachers, daycareCannotBeCompromised, preschoolClubChildBenefit]
        const { container } = render(<ExcerptList relatedTags={['kirkkonummi', 'varhaiskasvatus']} limit={limit} />)

        const articles = screen.getAllByRole('article')
        expect(articles).toHaveLength(limit)
        orderedExcerpts.forEach(({ title }, i) => expect(articles[i]).toHaveAttribute('aria-label', title))

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should only render those with given tag', () => {
        const tag = 'varhaiskasvatus'
        const filteredExcerpts = excerptList.filter(({ metadata: { tags } }) =>
            tags.map(({ contentful_id }) => contentful_id).includes(tag)
        )
        const { container } = render(<ExcerptList tag={tag} />)

        const articles = screen.getAllByRole('article')
        expect(articles).toHaveLength(filteredExcerpts.length)
        filteredExcerpts.forEach(({ title }, i) => expect(articles[i]).toHaveAttribute('aria-label', title))

        expect(container.firstChild).toMatchSnapshot()
    })
})
