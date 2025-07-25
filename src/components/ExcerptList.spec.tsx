import { render, screen } from '@testing-library/react'

import {
    coopElectionsConcernUsAll,
    excerptList,
    healthBelongsToAll,
    ourNatureIsOurAceInTheHole,
    wellPlannedIsWellDoneBut,
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

    it('should render in related order', () => {
        const orderedExcerpts = [coopElectionsConcernUsAll, ourNatureIsOurAceInTheHole, wellPlannedIsWellDoneBut]
        const { container } = render(<ExcerptList limit={limit} relatedTags={['kaavoitus', 'opetus']} />)

        const articles = screen.getAllByRole('article')
        expect(articles).toHaveLength(limit)
        orderedExcerpts.forEach(({ title }, i) => expect(articles[i]).toHaveAttribute('aria-label', title))

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render in related order the other way around', () => {
        const orderedExcerpts = [wellPlannedIsWellDoneBut, coopElectionsConcernUsAll, ourNatureIsOurAceInTheHole]
        const { container } = render(<ExcerptList limit={limit} relatedTags={['opetus']} />)

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

    it('should not render those with same slug', () => {
        const currentSlug = healthBelongsToAll.slug
        const filteredExcerpts = excerptList.filter(({ slug }) => slug !== currentSlug)
        const { container } = render(<ExcerptList currentSlug={currentSlug} />)

        const articles = screen.getAllByRole('article')
        expect(articles).toHaveLength(filteredExcerpts.length)
        filteredExcerpts.forEach(({ title }, i) => expect(articles[i]).toHaveAttribute('aria-label', title))

        expect(container.firstChild).toMatchSnapshot()
    })
})
