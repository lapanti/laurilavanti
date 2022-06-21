/* eslint-disable jest/expect-expect */

import { goToAboutPage, shouldHaveFooter } from '../helpers/generic'

describe('About Page', () => {
    it('should render', () => {
        cy.visit('/')
        goToAboutPage(cy)

        cy.findByRole('heading', { name: /Minusta/i }).should('be.visible')
        cy.findByRole('heading', { name: /Luottamustoimet/i }).should('be.visible')

        shouldHaveFooter(cy)
    })
})
