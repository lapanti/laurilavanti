import { render } from '@testing-library/react'

import TikTok from './TikTok'

describe('<TikTok />', () => {
    it('should render', () => {
        const { container } = render(<TikTok />)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render noHover', () => {
        const { container } = render(<TikTok noHover />)

        expect(container.firstChild).toMatchSnapshot()
    })
})
