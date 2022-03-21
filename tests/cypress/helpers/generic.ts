export const shouldHaveMainNavigation = (cy: Cypress.cy & EventEmitter) => {
    cy.findByRole('link', { name: /Lauri Lavanti/i })
        .invoke('attr', 'href')
        .should('eq', '/')

    cy.findByRole('link', { name: /Minusta/i })
        .invoke('attr', 'href')
        .should('eq', '/minusta')

    cy.findByRole('link', { name: /Blogi/i }).invoke('attr', 'href').should('eq', '/blogi')

    cy.findByRole('link', { name: /Ota yhteyttä/i })
        .invoke('attr', 'href')
        .should('eq', '/ota-yhteytta')
}

export const goToAboutPage = (cy: Cypress.cy & EventEmitter) => {
    shouldHaveMainNavigation(cy)

    cy.findByRole('link', { name: /Minusta/i }).click()
}

export const goToContactPage = (cy: Cypress.cy & EventEmitter) => {
    shouldHaveMainNavigation(cy)

    cy.findByRole('link', { name: /Ota yhteyttä/i }).click()
}

export const shouldHaveFooter = (cy: Cypress.cy & EventEmitter) => {
    cy.findAllByRole('link', { name: /Facebook/i })
        .invoke('attr', 'href')
        .should('eq', 'https://www.facebook.com/laurilavanti')

    cy.findAllByRole('link', { name: /Twitter/i })
        .invoke('attr', 'href')
        .should('eq', 'https://twitter.com/laurilavanti')

    cy.findByRole('link', { name: /LinkedIn/i })
        .invoke('attr', 'href')
        .should('eq', 'https://www.linkedin.com/in/lapanti')
}
