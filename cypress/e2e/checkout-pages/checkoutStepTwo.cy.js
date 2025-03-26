/// <reference types="cypress" />

describe('Check Out Step Two', () => {

    beforeEach(() => {
        // Visit URL
        cy.visit('/')

        // Clear Cookies and Local Storage
        cy.clearCookies()
        cy.clearLocalStorage()
    })

    it('Positive Case - Checkout Overview With 1 Cart Item', () => {
        cy.fixture('users').then((usersData) => {
            // Do Login with fixture Standart User
            cy.login(usersData.standardUser.username, usersData.standardUser.password)           
        })

        cy.addCart('#add-to-cart-sauce-labs-backpack', '[data-test="inventory-item-name"]')
        .invoke('text')
        .then((checkoutText) => {
            cy.get('[data-test="checkout"]').click()
            cy.fixture('checkout').then((checkoutData) => {
                cy.get('[data-test="firstName"]').should('be.visible').type(checkoutData.dataValid.firstName)
                cy.get('[data-test="lastName"]').should('be.visible').type(checkoutData.dataValid.lastName)
                cy.get('[data-test="postalCode"]').should('be.visible').type(checkoutData.dataValid.postalCode)
            })
            cy.get('[data-test="continue"]').should('be.visible').click()
            
            cy.get('[data-test="inventory-item"]').should('be.visible')
            .find('[data-test="inventory-item-name"]').should('be.visible')
            .invoke('text')
            .then((checkoutOverviewText) => {
                expect(checkoutOverviewText).to.equal(checkoutText)
            })
            
            cy.get('[data-test="finish"]').should('be.visible')
        })
        
    })

    it('Negative Case - Checkout Overview Without Cart Item', () => {
        cy.fixture('users').then((usersData) => {
            // Do Login with fixture Standart User
            cy.login(usersData.standardUser.username, usersData.standardUser.password)           
        })

        cy.addCart('','')
        cy.get('[data-test="checkout"]').click()
            cy.fixture('checkout').then((checkoutData) => {
                cy.get('[data-test="firstName"]').should('be.visible').type(checkoutData.dataValid.firstName)
                cy.get('[data-test="lastName"]').should('be.visible').type(checkoutData.dataValid.lastName)
                cy.get('[data-test="postalCode"]').should('be.visible').type(checkoutData.dataValid.postalCode)
            })
            cy.get('[data-test="continue"]').should('be.visible').click()
            cy.get('[data-test="inventory-item"]').should('not.exist')     
        
    })
    
})