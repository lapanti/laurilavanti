/* eslint-disable jest/expect-expect */

import { shouldHaveFooter, shouldHaveMainNavigation } from '../helpers/generic'

describe('Blog Post Page', () => {
    it('should render', () => {
        cy.visit('/blogi/sote-on-hyvinvointiyhteiskunnan-kulmakivi')
        shouldHaveMainNavigation(cy)

        cy.findByRole('heading', { name: /Sote on hyvinvointiyhteiskunnan kulmakivi/i }).should('be.visible')

        cy.findByText(/20.12.2021/i).should('be.visible')

        cy.findAllByText(/noin 1 minuutti/i).should('be.visible')

        cy.findAllByRole('link', { name: /#aluevaalit/i })
            .first()
            .should('have.attr', 'href', '/blogi/aluevaalit')
        cy.findAllByRole('link', { name: /#soteuudistus/i })
            .first()
            .should('have.attr', 'href', '/blogi/soteuudistus')
        cy.findAllByRole('link', { name: /#kirkkonummi/i })
            .first()
            .should('have.attr', 'href', '/blogi/kirkkonummi')

        cy.findByRole('link', { name: /Jaa Facebookissa/i }).should(
            'have.attr',
            'href',
            'https://www.facebook.com/sharer/sharer.php?u=https://laurilavanti.fi'
        )
        cy.findByRole('link', { name: /Jaa Twitterissä/i }).should(
            'have.attr',
            'href',
            'https://twitter.com/intent/tweet?text=Sote%20on%20hyvinvointiyhteiskunnan%20kulmakivi%20https://laurilavanti.fi'
        )
        cy.findByRole('link', { name: /Jaa LinkedInissä/i }).should(
            'have.attr',
            'href',
            'https://www.linkedin.com/sharing/share-offsite/?url=https://laurilavanti.fi'
        )

        cy.findByRole('heading', { name: /Muita kirjoituksia/i }).should('be.visible')

        shouldHaveFooter(cy)
    })
})
