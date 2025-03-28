import { render, screen } from '@testing-library/react'

import Paragraph from './Paragraph'

describe('<Paragraph />', () => {
    it('should render', () => {
        const children = 'Children'

        const { container } = render(<Paragraph>{children}</Paragraph>)

        expect(screen.getByText(children)).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })
})
