/// <reference types="cypress" />

describe('Login Pages', () => {

    beforeEach(() => {
        // Visit URL
        cy.visit('/')

        // Clear Cookies and Local Storage
        cy.clearCookies()
        cy.clearLocalStorage()
    })

    it('Positive Case - Login with Valid User', () => {
        cy.fixture('users').then((usersData) => {
            // Login with fixture Standart User
            cy.login(usersData.standardUser.username, usersData.standardUser.password)
                
            // Assertion for URL 
            cy.url().should('include', 'www.saucedemo.com/inventory.html')
            
            // Assertion for Logo Swag Labs in inventory page
            cy.xpath("//div[@class='app_logo']").should('be.visible').and('have.text', 'Swag Labs')

            // Assertion for Title Product in inventory page
            cy.get('[data-test="title"]').should('be.visible').and('have.text', 'Products')
            
            // Screenshot for Inventory Page
            //cy.screenshot('Login with Valid User', {capture: 'fullPage'})
        })

    })

    it('Negative Case - Login with Invalid User', () => {
        cy.fixture('users').then((usersData) => {
            // Login with fixture Invalid User
            cy.login(usersData.invalidUser.username, usersData.invalidUser.password)
                
            // Assertion for URL
            cy.url().should('include', 'www.saucedemo.com/')
            
            // Assertion for Icon Error Message in Input Username 
            cy.xpath("//div[@class='login-box']//div[1]//*[name()='svg']").should('be.visible')
            
            // Assertion for Icon Error Message in Input Password
            cy.xpath("//div[@class='login-box']//div[2]//*[name()='svg']").should('be.visible')
            
            // Assertion for Error Message form Login
            cy.get('[data-test="error"]').should('be.visible')
            .and('have.text', 'Epic sadface: Username and password do not match any user in this service')
            
            // Screenshot for Login Page
            //cy.screenshot('Login with Invalid User', {capture: 'fullPage'})
            
        })
    })
    
})