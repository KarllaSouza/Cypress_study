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
                //    const authorization = `Bearer ${Cypress.env('ACCESS_TOKEN')}`
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
                    "password": `000`,
                },
                failOnStatusCode: false
            }).then(response => {
                expect(401).to.eq(response.status);
                expect('Email e/ou senha inválidos').to.eq(response.body.message);
                expect(undefined).to.eq(response.body.authorization);
            });
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

    after(() => {
        cy.deleteUserFunction();
    });
})
