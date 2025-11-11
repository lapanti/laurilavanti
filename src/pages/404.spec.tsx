import { render, screen } from '@testing-library/react'

import FourZeroFour from './404'

describe('<404 />', () => {
    it('should render', () => {
        const { container } = render(<FourZeroFour />)

        expect(screen.getByRole('heading', { name: /Etsimääsi sivua ei valitettavasti löytynyt/i })).toBeInTheDocument()

        // 8 excerpts plus the main "article" itself
        expect(screen.getAllByRole('article')).toHaveLength(9)

        expect(container).toMatchSnapshot()
    })
})
