/// <reference types="cypress" />

describe('API Validataion - Character', () => {

    beforeEach(() => {
        cy.request(`${Cypress.env("apiBaseUrl")}/characters/en`).as("characterData");
      })


    it("Positive Case - Return status code 200", function () {
        cy.get("@characterData").then((response) => {
            expect(response.status).to.eq(200)
        }) 

    })

    it("Positive Case - Rerturn 'Gum-Gum Fruit' only for Monkey D. Luffy", function () {
        cy.get("@characterData").then((response) => {
        response.body.forEach((char) => {
            if (char.fruit?.name === "Gum-Gum Fruit") {
            expect(char.name).to.eq("Monkey D Luffy")
            }
        })
        })
    })
      
})