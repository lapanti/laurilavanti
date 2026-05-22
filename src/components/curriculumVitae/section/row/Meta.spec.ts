import { getByText, queryByText } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../../../tests/helpers'
import Meta from './Meta.astro'

describe('<Meta />', () => {
    it('should render organization with location and year range', async () => {
        const result = await renderAstroComponent(Meta, {
            props: { endYear: 2023, location: 'Helsinki', organization: 'OP', startYear: 2020 },
        })

        expect(getByText(result, 'OP (Helsinki) 2020–2023')).toBeDefined()
    })

    it('should render company when provided', async () => {
        const result = await renderAstroComponent(Meta, {
            props: { company: 'Verkkokauppa.com', endYear: 2024, startYear: 2022 },
        })

        expect(getByText(result, 'Verkkokauppa.com 2022–2024')).toBeDefined()
    })

    it('should render school when provided', async () => {
        const result = await renderAstroComponent(Meta, {
            props: { endYear: 2018, school: 'Aalto University', startYear: 2012 },
        })

        expect(getByText(result, 'Aalto University 2012–2018')).toBeDefined()
    })

    it('should display single year when startYear equals endYear', async () => {
        const result = await renderAstroComponent(Meta, {
            props: { company: 'StartUp', endYear: 2022, startYear: 2022 },
        })

        expect(getByText(result, 'StartUp 2022')).toBeDefined()
        expect(queryByText(result, '2022–')).toBeNull()
    })

    it('should display open-ended year range when endYear absent', async () => {
        const result = await renderAstroComponent(Meta, {
            props: { company: 'OP', startYear: 2024 },
        })

        expect(getByText(result, 'OP 2024–')).toBeDefined()
    })

    it('should render location without entity', async () => {
        const result = await renderAstroComponent(Meta, {
            props: { endYear: 2023, location: 'Remote', startYear: 2020 },
        })

        expect(getByText(result, '(Remote) 2020–2023')).toBeDefined()
    })

    it('should prefer organization over company over school', async () => {
        const result = await renderAstroComponent(Meta, {
            props: { company: 'Company', organization: 'Org', school: 'School', startYear: 2020 },
        })

        expect(getByText(result, 'Org 2020–')).toBeDefined()
    })
})
