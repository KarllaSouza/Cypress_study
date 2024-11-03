/// <reference types="cypress" />
import ('../../support/commands.js')

describe('API Tests - Login', () => {
    context('Scenario 7: Execute Login', () => {
        beforeEach(() => {
            cy.createUserFunction();
        })

        it('Case 7.1: Success login', () => {
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
            cy.deleteUserFunction();
        });
    });

    // context('Scenario 8 (Fail):', () => {
    //     it('', () => {
    //         cy.request({
    //             url: '',
    //             method: '',
    //             body: {}
    //         }).then(response => {
    //             expect(response.status).to.eq()
    //             console.log('user ID: ' + response.body._id)
    //             Cypress.env('user_id', response._id)
    //         })
    //     });
    // });
})
