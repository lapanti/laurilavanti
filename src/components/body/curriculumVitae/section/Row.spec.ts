import { getByText, queryByText } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'

import { renderAstroComponent } from '../../../../../tests/helpers'
import Row from './Row.astro'

describe('<Row />', () => {
    it('should render', async () => {
        const result = await renderAstroComponent(Row, {
            props: { startYear: 2020 },
        })

        expect(result.firstChild).toMatchSnapshot()
    })

    it('should render duty when provided', async () => {
        const result = await renderAstroComponent(Row, {
            props: { duty: 'Software Engineer', startYear: 2020 },
        })

        expect(getByText(result, 'Software Engineer')).toBeDefined()
    })

    it('should render title when provided', async () => {
        const result = await renderAstroComponent(Row, {
            props: { startYear: 2020, title: 'Chair of the board' },
        })

        expect(getByText(result, 'Chair of the board')).toBeDefined()
    })

    it('should render degree when provided', async () => {
        const result = await renderAstroComponent(Row, {
            props: { degree: 'Master of Arts', startYear: 2020 },
        })

        expect(getByText(result, 'Master of Arts')).toBeDefined()
    })

    it('should render organization with location and year range', async () => {
        const result = await renderAstroComponent(Row, {
            props: {
                endYear: 2023,
                location: 'New York',
                organization: 'Tech Corp',
                startYear: 2020,
                title: 'Engineer',
            },
        })

        expect(getByText(result, 'Tech Corp (New York) 2020–2023')).toBeDefined()
    })

    it('should render company when provided', async () => {
        const result = await renderAstroComponent(Row, {
            props: { company: 'Acme Inc', endYear: 2024, startYear: 2021, title: 'Manager' },
        })

        expect(getByText(result, 'Acme Inc 2021–2024')).toBeDefined()
    })

    it('should render school when provided', async () => {
        const result = await renderAstroComponent(Row, {
            props: { degree: 'PhD', endYear: 2020, school: 'Harvard University', startYear: 2015 },
        })

        expect(getByText(result, 'Harvard University 2015–2020')).toBeDefined()
    })

    it('should display single year when startYear equals endYear', async () => {
        const result = await renderAstroComponent(Row, {
            props: { company: 'StartUp', endYear: 2022, startYear: 2022, title: 'Intern' },
        })

        expect(getByText(result, 'StartUp 2022')).toBeDefined()
        expect(queryByText(result, '2022–')).toBeNull()
    })

    it('should display year with empty endYear', async () => {
        const result = await renderAstroComponent(Row, {
            props: { company: 'Tech Corp', startYear: 2023, title: 'Current Role' },
        })

        expect(getByText(result, 'Tech Corp 2023–')).toBeDefined()
    })

    it('should render location without company', async () => {
        const result = await renderAstroComponent(Row, {
            props: { endYear: 2023, location: 'Remote', startYear: 2020, title: 'Consultant' },
        })

        expect(getByText(result, '(Remote) 2020–2023')).toBeDefined()
    })
})
