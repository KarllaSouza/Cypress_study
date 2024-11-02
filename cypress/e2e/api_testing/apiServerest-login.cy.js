/// <reference types="cypress" />
import ('../../support/commands.js')

describe('API Tests - Login', () => {
    context('Scenario 6: Execute Login', () => {
        beforeEach(() => {
            cy.setupUser();
        })

        it('Case 6.1: Success login', () => {
            cy.request({
                url: 'https://serverest.dev/login/',
                method: 'POST',
                body: {
                    "email": `${Cypress.env('userEmail')}`,
                    "password": `${Cypress.env('userPassword')}`
                },
                // headers: `${Cypress.env('tokenAuthorization')}`
            }).then(response => {
                expect(response.status).to.eq(200);
                expect(response.body.message).to.eq('Login realizado com sucesso');
                expect(response.body.authorization).to.not.eq(undefined);
                const tokenAuthorization = response.body.authorization;
                Cypress.env('tokenAuthorization', tokenAuthorization);
                //    const authorization = `Bearer ${Cypress.env('ACCESS_TOKEN')}`
            });
        });

        afterEach(() => {
            cy.teardownUser();
        });
    });

})
