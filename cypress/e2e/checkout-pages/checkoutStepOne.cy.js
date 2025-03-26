/// <reference types="cypress" />

describe('Check Out Step One', () => {

    beforeEach(() => {
        // Visit URL
        cy.visit('/')

        // Clear Cookies and Local Storage
        cy.clearCookies()
        cy.clearLocalStorage()
    })

    it('Positive Case - Fill Information with Valid Data', () => {
        cy.fixture('users').then((usersData) => {
            // Do Login with fixture Standart User
            cy.login(usersData.standardUser.username, usersData.standardUser.password)           
        })

        cy.addCart('#add-to-cart-sauce-labs-backpack', '[data-test="inventory-item-name"]')

        cy.get('[data-test="checkout"]').should('be.visible').click()

            cy.fixture('checkout').then((checkoutData) => {
                cy.get('[data-test="firstName"]').should('be.visible').type(checkoutData.dataValid.firstName)
                cy.get('[data-test="lastName"]').should('be.visible').type(checkoutData.dataValid.lastName)
                cy.get('[data-test="postalCode"]').should('be.visible').type(checkoutData.dataValid.postalCode)
            })
            cy.get('[data-test="continue"]').should('be.visible')
        

    })

    it('Negative Case - Fill Information with Invalid Data', () => {
        cy.fixture('users').then((usersData) => {
            // Do Login with fixture Standart User
            cy.login(usersData.standardUser.username, usersData.standardUser.password)           
        })

        cy.addCart('#add-to-cart-sauce-labs-backpack','[data-test="inventory-item-name"]')

        cy.get('[data-test="checkout"]').should('be.visible').click()

            cy.fixture('checkout').then((checkoutData) => {
                cy.get('[data-test="firstName"]').should('be.visible').type(checkoutData.dataInvalid.firstName)
                cy.get('[data-test="lastName"]').should('be.visible').type(checkoutData.dataInvalid.lastName)
                cy.get('[data-test="postalCode"]').should('be.visible').type(checkoutData.dataInvalid.postalCode)
            })
            cy.get('[data-test="continue"]').should('be.visible')

    })
    
})