import { getByRole } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../tests/helpers'
import SummaryBox from './SummaryBox.astro'

describe('SummaryBox', () => {
    const ariaLabel = 'Testing aria labels'
    const summaryRows = ['Testing', 'More testing', 'Lauri on testaamassa']
    const title = 'Testing summary box'

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

        expect(getByRole(result, 'heading', { name: title })).toBeInTheDocument()
    })

    it('displays the correct summary text', async () => {
        const result = await renderAstroComponent(SummaryBox, {
            props: {
                ariaLabel,
                summaryRows,
                title,
            },
        })

        summaryRows.forEach((row) => {
            expect(getByRole(result, 'listitem', { name: row })).toBeInTheDocument()
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

        expect(getByRole(result, 'complementary', { name: ariaLabel })).toBeInTheDocument()
    })
})
