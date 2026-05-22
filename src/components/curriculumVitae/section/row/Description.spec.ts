import { getAllByRole, getByRole, getByText } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../../../tests/helpers'
import Description from './Description.astro'

describe('<Description />', () => {
    it('should render a list', async () => {
        const result = await renderAstroComponent(Description, {
            props: { items: ['First item'] },
        })

        expect(getByRole(result, 'list')).toBeDefined()
    })

    it('should render each item as a list item', async () => {
        const result = await renderAstroComponent(Description, {
            props: { items: ['First item', 'Second item', 'Third item'] },
        })

        expect(getAllByRole(result, 'listitem')).toHaveLength(3)
    })

    it('should render item text', async () => {
        const result = await renderAstroComponent(Description, {
            props: { items: ['Own the technical roadmap'] },
        })

        expect(getByText(result, 'Own the technical roadmap')).toBeDefined()
    })

    it('should render all item texts', async () => {
        const result = await renderAstroComponent(Description, {
            props: { items: ['First bullet', 'Second bullet'] },
        })

        expect(getByText(result, 'First bullet')).toBeDefined()
        expect(getByText(result, 'Second bullet')).toBeDefined()
    })
})
