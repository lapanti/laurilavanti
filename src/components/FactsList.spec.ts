import { getAllByRole, getByRole, queryAllByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../tests/helpers'
import FactsList from './FactsList.astro'

describe('<FactsList />', () => {
    const items = ['Johtava ohjelmistokehittäjä', 'Kunnanvaltuutettu']

    it('should render', async () => {
        const result = await renderAstroComponent(FactsList, {
            props: {
                items,
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render every fact as a list item', async () => {
        const result = await renderAstroComponent(FactsList, {
            props: {
                items,
            },
        })
        const facts = getByRole(result, 'list')

        expect(facts).toHaveClass('facts')
        expect(getAllByRole(facts, 'listitem')).toHaveLength(items.length)
        expect(facts).toHaveTextContent(items[0])
        expect(facts).toHaveTextContent(items[1])
    })

    it('should render an empty facts list', async () => {
        const result = await renderAstroComponent(FactsList, {
            props: {
                items: [],
            },
        })

        expect(queryAllByRole(result, 'listitem')).toHaveLength(0)
    })
})
