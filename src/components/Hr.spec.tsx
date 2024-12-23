import { render } from '@testing-library/react'

import Hr from './Hr'

describe('<Hr />', () => {
    it('should render', () => {
        expect(render(<Hr />).container.firstChild).toMatchSnapshot()
    })
})
