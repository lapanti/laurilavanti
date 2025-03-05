import { render, screen } from '@testing-library/react'

import LI from './LI'

describe('<LI />', () => {
    it('should render', () => {
        const { container } = render(
            <ul>
                <LI>item</LI>
            </ul>
        )

        expect(screen.getByRole('listitem')).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })
})
