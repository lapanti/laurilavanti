import { getByText } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../tests/helpers'
import Paragraph from './Paragraph.astro'

// filepath: /home/lapanti/code/laurilavanti/src/components/Paragraph.spec.ts

describe('<Paragraph />', () => {
    const itemProp = 'description'
    const content = 'Test content for the paragraph.'

    it('should render', async () => {
        const result = await renderAstroComponent(Paragraph, {
            props: {},
            slots: {
                default: content,
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render in grid', async () => {
        const result = await renderAstroComponent(Paragraph, {
            props: {
                inGrid: true,
            },
            slots: {
                default: content,
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render paragraph element', async () => {
        const result = await renderAstroComponent(Paragraph, {
            props: {},
            slots: {
                default: content,
            },
        })

        expect(getByText(result, content)).toBeDefined()
    })

    it('should have correct itemProp attribute', async () => {
        const result = await renderAstroComponent(Paragraph, {
            props: {
                itemProp,
            },
            slots: {
                default: content,
            },
        })

        expect(getByText(result, content)).toHaveAttribute('itemProp', itemProp)
    })
})
