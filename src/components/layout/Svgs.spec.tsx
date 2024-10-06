import { render } from '@testing-library/react'
import React from 'react'

import Svgs from './Svgs'

describe('<Svgs />', () => {
    it('should render', () => {
        const { container } = render(<Svgs />)

        expect(container.firstChild).toMatchSnapshot()
    })
})
