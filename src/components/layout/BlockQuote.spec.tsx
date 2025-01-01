import { render, screen } from '@testing-library/react'

import BlockQuote from './BlockQuote'

describe('<BlockQuote />', () => {
    it('should render', () => {
        const testText = 'Test text'
        const { container } = render(<BlockQuote>{testText}</BlockQuote>)

        expect(screen.getByRole('blockquote', { name: '' })).toHaveTextContent(testText)

        expect(container.firstChild).toMatchSnapshot()
    })
})
