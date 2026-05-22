import { getByText } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../../../tests/helpers'
import Label from './Label.astro'

describe('<Label />', () => {
    it('should render duty when provided', async () => {
        const result = await renderAstroComponent(Label, {
            props: { duty: 'Kunnanvaltuutettu' },
        })

        expect(getByText(result, 'Kunnanvaltuutettu')).toBeDefined()
    })

    it('should render title when provided', async () => {
        const result = await renderAstroComponent(Label, {
            props: { title: 'Lead developer' },
        })

        expect(getByText(result, 'Lead developer')).toBeDefined()
    })

    it('should render degree when provided', async () => {
        const result = await renderAstroComponent(Label, {
            props: { degree: 'Master of Science' },
        })

        expect(getByText(result, 'Master of Science')).toBeDefined()
    })

    it('should prefer duty over title and degree', async () => {
        const result = await renderAstroComponent(Label, {
            props: { degree: 'MSc', duty: 'Chair', title: 'Lead' },
        })

        expect(getByText(result, 'Chair')).toBeDefined()
    })

    it('should prefer title over degree when duty absent', async () => {
        const result = await renderAstroComponent(Label, {
            props: { degree: 'MSc', title: 'Lead' },
        })

        expect(getByText(result, 'Lead')).toBeDefined()
    })

    it('should render empty span when no props provided', async () => {
        const result = await renderAstroComponent(Label, { props: {} })

        expect(result.querySelector('span')).toBeDefined()
    })
})
