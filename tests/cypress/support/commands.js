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

let path = 'tests/cypress/support'

Cypress.Commands.add('executeDatabaseJs', (command) =>
  cy.exec(`mongo mongodb://127.0.0.1:3001/meteor --eval "${command}"`)
);

Cypress.Commands.add('executeDatabaseScript', (filePath) =>
  cy.exec(`mongo mongodb://127.0.0.1:3001/meteor ${path}/${filePath}`)
);
