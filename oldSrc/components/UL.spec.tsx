import { render, screen } from '@testing-library/react'

import UL from './UL'

describe('<UL />', () => {
    it('should render', () => {
        const { container } = render(
            <UL>
                <li>Lista</li>
            </UL>
        )

        expect(screen.getByRole('list')).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })
})
