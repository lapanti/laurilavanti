/* eslint-disable jest/expect-expect */

import { goToContactPage, shouldHaveFooter } from '../helpers/generic'

describe('Contact Page', () => {
    it('should render', () => {
        cy.visit('/')
        goToContactPage(cy)

        cy.findByText('lauri.lavanti@kirkkonummi.fi').should('be.visible')

        cy.findAllByRole('link', { name: /Facebook/i })
            .invoke('attr', 'href')
            .should('eq', 'https://www.facebook.com/laurilavanti')

        cy.findAllByRole('link', { name: /Twitter/i })
            .invoke('attr', 'href')
            .should('eq', 'https://twitter.com/laurilavanti')

        shouldHaveFooter(cy)
    })
})
