import { render } from '@testing-library/react'
import React from 'react'

import { contactInfoLinks } from '../../../tests/contactInfo.mock'
import ContactInfo from './ContactInfo'

describe('<ContactInfo />', () => {
    it('should render', () => {
        const { container } = render(<ContactInfo links={contactInfoLinks} />)

        expect(container.firstChild).toMatchSnapshot()
    })
})
