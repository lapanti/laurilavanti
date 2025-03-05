import { render, screen } from '@testing-library/react'

import H3 from './H3'

describe('<H3 />', () => {
    it('should render', () => {
        const children = 'Ääkköset ja Lapset Leikkivät'
        const { container } = render(<H3>{children}</H3>)

        expect(screen.getByRole('heading', { name: children })).toHaveAttribute('id', 'aakkoset-ja-lapset-leikkivat')

        expect(container.firstChild).toMatchSnapshot()
    })
})
