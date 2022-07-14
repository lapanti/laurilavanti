const openButton = /Open navigation menu/i
const closeButton = /Close navigation menu/i

const aboutMe = /Minusta/i
const blog = /Blogi/i
const contactInfo = /Ota yhteyttä/i

export const shouldHaveMainNavigation = (cy: Cypress.cy & CyEventEmitter) => {
    cy.findByRole('button', { name: openButton }).should('be.visible').click().should('be.hidden')

    // cy.findByRole('link', { name: /Lauri Lavanti/i }).should('have.attr', 'href', '/')

    cy.findByRole('link', { name: aboutMe }).should('have.attr', 'href', '/minusta/')

    cy.findByRole('link', { name: blog }).invoke('attr', 'href').should('eq', '/blogi/')

    cy.findByRole('link', { name: contactInfo }).should('have.attr', 'href', '/ota-yhteytta/')

    cy.findByRole('button', { name: closeButton }).should('be.visible').click().should('be.hidden')
}

export const goToAboutPage = (cy: Cypress.cy & CyEventEmitter) => {
    shouldHaveMainNavigation(cy)

    cy.findByRole('button', { name: openButton }).click()

    cy.findByRole('link', { name: aboutMe }).click()
}

export const goToBlogPage = (cy: Cypress.cy & CyEventEmitter) => {
    shouldHaveMainNavigation(cy)

    cy.findByRole('button', { name: openButton }).click()

    cy.findByRole('link', { name: blog }).click()
}

export const goToContactPage = (cy: Cypress.cy & CyEventEmitter) => {
    shouldHaveMainNavigation(cy)

    cy.findByRole('button', { name: openButton }).click()

    cy.findByRole('link', { name: contactInfo }).click()
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
