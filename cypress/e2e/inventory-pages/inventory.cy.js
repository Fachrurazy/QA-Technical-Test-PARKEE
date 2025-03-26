/// <reference types="cypress" />

describe('Inventory Pages', () => {

    beforeEach(() => {
        // Visit URL
        cy.visit('/')

        // Clear Cookies and Local Storage
        cy.clearCookies()
        cy.clearLocalStorage()
    })

    it('Positive Case - Check Title Inventory Page and Title Inventory Detail', () => {
        cy.fixture('users').then((usersData) => {
            // Do Login with fixture Standart User
            cy.login(usersData.standardUser.username, usersData.standardUser.password)
                
            cy.get('[data-test="item-4-title-link"]')
            .should('be.visible')
            .invoke('text')
            .then((inventoryText) => {

                cy.get('[data-test="item-4-title-link"]').click()

                cy.get('[data-test="inventory-item-name"]')
                .should('be.visible')
                .invoke('text')
                .then((inventoryDetailText) => {
                    expect(inventoryDetailText).to.equal(inventoryText)
                })
        
            })
        })

    })

    it('Positive Case - Check Amount Inventory Item', () => {
        cy.fixture('users').then((usersData) => {
            // Do Login with fixture Standart User
            cy.login(usersData.standardUser.username, usersData.standardUser.password)
                
            cy.get('[data-test="inventory-list"]')
            .find('[data-test="inventory-item"]')
            .should('have.length', 6)
            
        })
    })
    
})