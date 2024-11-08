/// <reference types="cypress" />
import ('../../support/commands.js')

describe('API Tests - Login', () => {

    before(() => {
        cy.createUserFunction();
    })

    context('Scenario 7: Success login', () => {
        it('Case 7.1: Execute Login', () => {
            cy.request({
                url: 'https://serverest.dev/login/',
                method: 'POST',
                body: {
                    "email": `${Cypress.env('userEmail')}`,
                    "password": `${Cypress.env('userPassword')}`
                },
                // headers: `${Cypress.env('tokenAuthorization')}`
            }).then(response => {
                expect(200).to.eq(response.status);
                expect('Login realizado com sucesso').to.eq(response.body.message);
                expect(undefined).to.not.eq(response.body.authorization);

                const tokenAuthorization = response.body.authorization;
                Cypress.env('tokenAuthorization', tokenAuthorization);

            });
        });

    });

    context('Scenario 8: Fail login', () => {
        it('Case 8.1: Login with invalid data - email and password', () => {
            cy.request({
                url: 'https://serverest.dev/login/',
                method: 'POST',
                body: {
                    "email": `emailll@email.com`,
                    "password": `000`
                },
                failOnStatusCode: false
            }).then(response => {
                expect(401).to.eq(response.status);
                expect('Email e/ou senha inválidos').to.eq(response.body.message);
                expect(undefined).to.eq(response.body.authorization);
            });
        });

        it('Case 8.2: Login with invalid email', () => {
            cy.request({
                url: 'https://serverest.dev/login/',
                method: 'POST',
                body: {
                    "email": `email`,
                    "password": `000`
                },
                failOnStatusCode: false
            }).then(response => {
                expect(400).to.eq(response.status);
                expect('email deve ser um email válido').to.eq(response.body.email);
                expect(undefined).to.eq(response.body.authorization);
            });
        });

        it('Case 8.3: Login with invalid password', () => {
            cy.request({
                url: 'https://serverest.dev/login/',
                method: 'POST',
                body: {
                    "email": `${Cypress.env('userEmail')}`,
                    "password": `000`
                },
                failOnStatusCode: false
            }).then(response => {
                expect(401).to.eq(response.status);
                expect('Email e/ou senha inválidos').to.eq(response.body.message);
                expect(undefined).to.eq(response.body.authorization);
            });
        });

        it('Case 8.4: Login with blank data', () => {
            cy.request({
                url: 'https://serverest.dev/login/',
                method: 'POST',
                body: {
                    "email": '',
                    "password": ''
                },
                failOnStatusCode: false
            }).then(response => {
                expect(400).to.eq(response.status);
                expect('email não pode ficar em branco').to.eq(response.body.email);
                expect('password não pode ficar em branco').to.eq(response.body.password);
                expect(undefined).to.eq(response.body.authorization);
            });
        });

        it('Case 8.5: Login with blank email', () => {
            cy.request({
                url: 'https://serverest.dev/login/',
                method: 'POST',
                body: {
                    "email": '',
                    "password": `000`
                },
                failOnStatusCode: false
            }).then(response => {
                expect(400).to.eq(response.status);
                expect('email não pode ficar em branco').to.eq(response.body.email);
                expect(undefined).to.eq(response.body.authorization);
            });
        });

        it('Case 8.6: Login with valid email and blank password', () => {
            cy.request({
                url: 'https://serverest.dev/login/',
                method: 'POST',
                body: {
                    "email": `${Cypress.env('userEmail')}`,
                    "password": ''
                },
                failOnStatusCode: false
            }).then(response => {
                console.log(response.body);
                expect(400).to.eq(response.status);
                expect('password não pode ficar em branco').to.eq(response.body.password);
                expect(undefined).to.eq(response.body.authorization);
            });
        });

    });

    after(() => {
        cy.deleteUserFunction();
    });
})
