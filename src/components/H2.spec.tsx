import { render, screen } from '@testing-library/react'

import H2 from './H2'

describe('<H2 />', () => {
    it('should render', () => {
        const children = 'Ääkköset ja Lapset Leikkivät'
        const { container } = render(<H2>{children}</H2>)

        expect(screen.getByRole('heading', { name: children })).toHaveAttribute('id', 'aakkoset-ja-lapset-leikkivat')

        expect(container.firstChild).toMatchSnapshot()
    })
})
