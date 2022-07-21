import { shouldHaveFooter, shouldHaveMainNavigation } from '../helpers/generic'

describe('Home Page', () => {
    it('should render', () => {
        cy.visit('/')
        shouldHaveMainNavigation(cy)

        cy.findByRole('heading', { name: /Lauri Lavanti/i }).should('be.visible')

        cy.findByRole('heading', { name: /Uusimmat kirjoitukset/i }).should('be.visible')

        shouldHaveFooter(cy)
    })
})
