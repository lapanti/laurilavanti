import { getByRole, getByText } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import SummaryBox from './SummaryBox.astro'

describe('SummaryBox', () => {
    const ariaLabel = 'Faktoja Laurista'
    const summaryRows = ['Joku testailee', 'More testing', 'Lauri on testaamassa']
    const title = 'Lauri lyhyesti'

    it('should render', async () => {
        const result = await renderAstroComponent(SummaryBox, {
            props: {
                ariaLabel,
                summaryRows,
                title,
            },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('displays the correct title', async () => {
        const result = await renderAstroComponent(SummaryBox, {
            props: {
                ariaLabel,
                summaryRows,
                title,
            },
        })

        expect(getByRole(result, 'heading', { name: title })).toBeDefined()
    })

    it('displays the correct summary text', async () => {
        const summaryRows = ['Joku testailee', 'More testing', 'Lauri on testaamassa']
        const result = await renderAstroComponent(SummaryBox, {
            props: {
                ariaLabel,
                summaryRows,
                title,
            },
        })

        summaryRows.forEach((row) => {
            expect(getByText(result, row)).toBeDefined()
        })
    })

    it('render the aria label', async () => {
        const result = await renderAstroComponent(SummaryBox, {
            props: {
                ariaLabel,
                summaryRows,
                title,
            },
        })

        expect(getByRole(result, 'complementary', { name: ariaLabel })).toBeDefined()
    })
})
