/* eslint-disable jest/expect-expect */

import { shouldHaveFooter, shouldHaveMainNavigation } from '../helpers/generic'

describe('Tag Page', () => {
    it('should render', () => {
        cy.visit('/kategoria/kirkkonummi')
        shouldHaveMainNavigation(cy)

        cy.findByRole('heading', { name: 'Kirkkonummi' }).should('be.visible')

        cy.findAllByRole('article').should('have.length.at.least', 2)

        shouldHaveFooter(cy)
    })
})
