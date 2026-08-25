import { getAllByRole, getByRole, queryAllByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../tests/helpers'
import Credentials from './Credentials.astro'

describe('<Credentials />', () => {
    const items = [
        'Diplomi-insinööri, Aalto-yliopisto',
        'Johtava ohjelmistokehittäjä',
        'Kunnanvaltuutettu',
        'Neljän lapsen isä',
    ]

    it('should render', async () => {
        const result = await renderAstroComponent(Credentials, {
            props: {
                items,
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render every credential as a list item', async () => {
        const result = await renderAstroComponent(Credentials, {
            props: {
                items,
            },
        })
        const credentials = getByRole(result, 'list')

        expect(credentials).toHaveClass('creds')
        expect(getAllByRole(credentials, 'listitem')).toHaveLength(items.length)
        expect(credentials).toHaveTextContent(items[0])
        expect(credentials).toHaveTextContent(items[3])
    })

    it('should render an empty credentials list', async () => {
        const result = await renderAstroComponent(Credentials, {
            props: {
                items: [],
            },
        })

        expect(queryAllByRole(result, 'listitem')).toHaveLength(0)
    })
})
