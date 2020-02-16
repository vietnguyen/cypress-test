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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('login', () => {
    const username = Cypress.config('dhis2_username')
    const password = Cypress.config('dhis2_password')
    const loginUrl = Cypress.config('dhis2_login_url')
    const baseUrl = Cypress.config('dhis2_base_url');
    const loginAuth = `Basic ${btoa(`${username}:${password}`)}`

    return cy.request({
        url: `${baseUrl}/${loginUrl}`,
        method: 'POST',
        form:true,
        body: {
            j_username: username,
            j_password: password,
            '2fa_code': '',
        },
        headers: { Authorization: loginAuth },
    })
    
})