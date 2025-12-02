import { render, screen } from '@testing-library/react'

import BlockQuote from './BlockQuote'

describe('<BlockQuote />', () => {
    const testText = 'Test text'
    const renderHelper = () => render(<BlockQuote>{testText}</BlockQuote>)

    it('should render', () => {
        const { container } = renderHelper()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render the block', () => {
        renderHelper()

        expect(screen.getByRole('blockquote', { name: '' })).toHaveTextContent(testText)
    })
})
