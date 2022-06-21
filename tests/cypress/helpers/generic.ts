export const shouldHaveMainNavigation = (cy: Cypress.cy & CyEventEmitter) => {
    cy.findByRole('link', { name: /Lauri Lavanti/i }).should('have.attr', 'href', '/')

    cy.findByRole('link', { name: /Minusta/i }).should('have.attr', 'href', '/minusta')

    cy.findByRole('link', { name: /Blogi/i }).invoke('attr', 'href').should('eq', '/blogi')

    cy.findByRole('link', { name: /Ota yhteyttä/i }).should('have.attr', 'href', '/ota-yhteytta')
}

export const goToAboutPage = (cy: Cypress.cy & CyEventEmitter) => {
    shouldHaveMainNavigation(cy)

    cy.findByRole('link', { name: /Minusta/i }).click()
}

export const goToBlogPage = (cy: Cypress.cy & CyEventEmitter) => {
    shouldHaveMainNavigation(cy)

    cy.findByRole('link', { name: /Blogi/i }).click()
}

export const goToContactPage = (cy: Cypress.cy & CyEventEmitter) => {
    shouldHaveMainNavigation(cy)

    cy.findByRole('link', { name: /Ota yhteyttä/i }).click()
}

export const shouldHaveFooter = (cy: Cypress.cy & CyEventEmitter) => {
    cy.get('footer').then(($footer) => {
        cy.wrap($footer.find('a[title="Facebook"]')).should(
            'have.attr',
            'href',
            'https://www.facebook.com/laurilavanti'
        )

        cy.wrap($footer.find('a[title="Twitter"]')).should('have.attr', 'href', 'https://twitter.com/laurilavanti')

        cy.wrap($footer.find('a[title="LinkedIn"]')).should('have.attr', 'href', 'https://www.linkedin.com/in/lapanti')
    })
}
