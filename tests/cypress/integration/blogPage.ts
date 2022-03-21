/* eslint-disable jest/expect-expect */

import { goToBlogPage, shouldHaveFooter } from '../helpers/generic'

describe('Contact Page', () => {
    it('should render', () => {
        cy.visit('/')
        goToBlogPage(cy)

        cy.findByRole('heading', { name: /Blogi/i }).should('be.visible')

        cy.findAllByRole('article').should('have.length.at.least', 2)

        cy.get('a[href*="/blogi/"]').should('have.length.at.least', 2)

        shouldHaveFooter(cy)
    })
})
