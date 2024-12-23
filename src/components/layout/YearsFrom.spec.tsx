import { render, screen } from '@testing-library/react'
import { parse } from 'date-fns'

import YearsFrom from './YearsFrom'

describe('<YearsFrom />', () => {
    beforeAll(() => {
        jest.useFakeTimers()
        jest.setSystemTime(parse('2020-01-01', 'yyyy-MM-dd', new Date()))
    })

    afterAll(() => {
        jest.useRealTimers()
    })

    it('should render null when no date', () => {
        const { container } = render(<YearsFrom />)

        expect(container.firstChild).toBeNull()
    })

    it.each([
        ['5', '2015-01-01'],
        ['4', '2015-10-10'],
        ['20', '1999-07-30'],
    ])('should render %s when date to count from is %s', (expected, dateToCountFrom) => {
        const { container } = render(<YearsFrom dateToCountFrom={dateToCountFrom} />)

        expect(screen.getByText(expected)).toBeInTheDocument()
        expect(container.firstChild).toMatchSnapshot()
    })
})
