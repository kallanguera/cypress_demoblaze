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
Cypress.Commands.add('fillSignIn', (userName, password) => { 
    cy.get('#signin2').click({force: true})
    cy.get('#sign-username').type(userName, {force: true});
    cy.get('#sign-password').type(password, {force: true});    
 })


 Cypress.Commands.add('signUp', (userName, password) => {
    cy.get('#signin2').click()
    cy.get('#sign-username').type(userName);
    cy.get('#sign-password').type(password);

    cy.get('button').contains('Sign up').click();
 })


Cypress.Commands.add('login', (userName, password) => {
    cy.get('#login2').click()
    cy.get('#loginusername').type(userName, {force: true});
    cy.get('#loginpassword').type(password, {force: true});

    cy.get('button').contains('Log in').click({force: true});
})

Cypress.Commands.add('navigateToPhones', ()=>{
    cy.get('a').contains('Home').click()
    cy.get('.list-group-item').contains('Phones').click()
})

Cypress.Commands.add('locatePhoneAndAddToCart', (phoneText)=>{
    const stub = cy.stub()
    cy.on('window:alert', stub)

    cy.get('.card-title').contains(phoneText).click()
    cy.get('.btn').contains('Add to cart').click().should(()=>{
      expect(stub.getCall(0)).to.be.calledWith(`Product added.`)
    })
})


Cypress.Commands.add('placeOrderAndFillModal',({orderInfo})=>{
    cy.get('button').contains('Place Order').click({force:true})

    cy.get('#name').type(orderInfo.name, {force:true});
    cy.get('#country').type(orderInfo.country, {force:true})
    cy.get('#city').type(orderInfo.city, {force:true})
    cy.get('#card').type(orderInfo.creditCardNumber)
    cy.get('#month').type(orderInfo.month, {force:true})
    cy.get('#year').type(orderInfo.year, {force:true})
})

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