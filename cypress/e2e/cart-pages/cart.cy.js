/// <reference types="cypress" />

describe('Cart Pages', () => {

    beforeEach(() => {
        // Visit URL
        cy.visit('/')

        // Clear Cookies and Local Storage
        cy.clearCookies()
        cy.clearLocalStorage()
    })

    it('Positive Case - Make 1 Cart Item', () => {
        cy.fixture('users').then((usersData) => {
            // Do Login with fixture Standart User
            cy.login(usersData.standardUser.username, usersData.standardUser.password)
                
            cy.get('#add-to-cart-sauce-labs-backpack').should('be.visible').click()

            cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible')

            cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1')

            cy.get('[data-test="shopping-cart-link"]').click()

            cy.get('[data-test="inventory-item"]').should('be.visible')
        })

    })

    it('Negative Case - Cart Item is Empty', () => {
        cy.fixture('users').then((usersData) => {
            // Do Login with fixture Standart User
            cy.login(usersData.standardUser.username, usersData.standardUser.password)
            
            cy.get('[data-test="shopping-cart-link"]').should('be.visible').click()

            cy.get('[data-test="inventory-item"]').should('not.exist')
        })

    })
    
})