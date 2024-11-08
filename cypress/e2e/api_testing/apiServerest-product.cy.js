/// <reference types="cypress" />
import ('../../support/commands.js')

describe('API Tests - Product', () => {
    beforeEach(() => {
        cy.createUserFunction();
        cy.findUserFunction();
        cy.loginFunction();
    })

    context('Scenario 9 (success): Execute CRUD of Product API', () => {
        it('Case 9.1: List od products', () => {
            cy.request({
                url: 'https://serverest.dev/produtos/',
                method: 'GET',
                failOnStatusCode: false
            }).then(response => {
                console.log(response.body);
                console.log('token - no arquivo de produto: ' + JSON.stringify(response.body));
                expect(200).to.eq(response.status);
                expect(undefined).to.not.eq(response.body.quantidade);
                expect(undefined).to.not.eq(response.body.produtos);
            });
        });
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
    });

    afterEach(() => {
        cy.deleteUserFunction();
        console.log('deletado');
    });
})