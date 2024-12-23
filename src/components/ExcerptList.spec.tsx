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

    it('should render pinned first', () => {
        const pinnedExcerpts = [healthBelongsToAll, ourNatureIsOurAceInTheHole]
        const pinned = pinnedExcerpts.map(({ slug }) => slug)
        const pinnedAndUnpinned = pinnedExcerpts.concat(
            excerptList.filter(({ slug }) => !pinned.find((s) => s === slug))
        )
        const { container } = render(<ExcerptList pinned={pinned} />)

        const articles = screen.getAllByRole('article')
        expect(articles).toHaveLength(pinnedAndUnpinned.length)
        articles.forEach((article, i) => {
            expect(article).toHaveAttribute('aria-label', pinnedAndUnpinned[i].title)
        })

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render with limit', () => {
        const { container } = render(<ExcerptList limit={limit} />)

        const articles = screen.getAllByRole('article')
        expect(articles).toHaveLength(limit)
        articles.forEach((article, i) => expect(article).toHaveAttribute('aria-label', excerptList[i].title))

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render pinned first with limit', () => {
        const pinnedExcerpts = [healthBelongsToAll, ourNatureIsOurAceInTheHole]
        const pinned = pinnedExcerpts.map(({ slug }) => slug)
        const pinnedAndUnpinned = pinnedExcerpts.concat(
            excerptList.filter(({ slug }) => !pinned.find((s) => s === slug)).slice(0, limit)
        )
        const { container } = render(<ExcerptList limit={limit} pinned={pinned} />)

        const articles = screen.getAllByRole('article')
        expect(articles).toHaveLength(pinnedAndUnpinned.length)
        expect(articles).toHaveLength(limit + pinnedExcerpts.length)
        articles.forEach((article, i) => {
            expect(article).toHaveAttribute('aria-label', pinnedAndUnpinned[i].title)
        })

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

    it('should render in related order the otherway around', () => {
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
