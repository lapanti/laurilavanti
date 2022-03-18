import { render } from '@testing-library/react'
import React from 'react'

import HR from './HR'

describe('<HR />', () => {
    it('should render', () => {
        expect(render(<HR />).container.firstChild).toMatchSnapshot()
    })
})
