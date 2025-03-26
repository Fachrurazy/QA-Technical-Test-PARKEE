// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
    cy.get('[data-test="username"]').should('be.visible').as('username-input')
    cy.get('[data-test="password"]').should('be.visible').as('password-input')
    cy.get('[data-test="login-button"]').should('be.visible').as('login-button')

    if(username){
        cy.get('@username-input').type(username)
    }
    if(password){
        cy.get('@password-input').type(password, {log: false})
    }
    
    cy.get('@login-button').click()
})

Cypress.Commands.add('addCart', (productName, titleName) => {
    if(productName){
        cy.get(productName).should('be.visible').click()
        cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1')
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="inventory-item"]').should('be.visible').find(titleName).should('be.visible')
    }
    else{
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="inventory-item"]').should('not.exist')
        cy.log('Cart is empty')
    }
})