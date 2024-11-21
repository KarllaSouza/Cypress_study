/// <reference types="cypress" />
import ('../../support/commands.js')

describe('API Tests - Product', () => {
    beforeEach(() => {
        cy.createUserFunction();
        cy.findUserFunction();
        cy.loginFunction();
    })

    context('Scenario 9 (success): Execute CRUD of Product API', () => {
        it('Case 9.1: List of products', () => {
            cy.request({
                url: 'https://serverest.dev/produtos/',
                method: 'GET',
                failOnStatusCode: false
            }).then(response => {
                console.log('create: '+response.body);
                console.log('token - no arquivo de produto: ' + JSON.stringify(response.body));
                expect(200).to.eq(response.status);
                expect(undefined).to.not.eq(response.body.quantidade);
                expect(undefined).to.not.eq(response.body.produtos);
            });
        });

        it('Case 9.2: Create product', () => {
            cy.get('@token').then((token) => {
                cy.request({
                    url: 'https://serverest.dev/produtos/',
                    method: 'POST',
                    body: {
                        "nome": "Mouse k",
                        "preco": 50,
                        "descricao": "Produto teste 1",
                        "quantidade": 100
                    },
                    headers: {
                        Authorization: token.token,
                    }
                //    failOnStatusCode: false
                }).then(response => {
                    console.log('create: '+ JSON.stringify(response.body));
                    expect(201).to.eq(response.status);
                    expect('Cadastro realizado com sucesso').to.eq(response.body.message);
                    expect(undefined).to.not.eq(response.body._id);
                    const productId = response.body._id;
                    Cypress.env('productId', response.body._id);
                })
            });
        });

        it('Case 9.3: Find product - after create', ()=>{
            cy.request({
                url: `https://serverest.dev/produtos/${Cypress.env('productId')}`,
                method: 'GET'
          //      failOnStatusCode: false
            }).then(response => {
                console.log('find: '+ JSON.stringify(response.body));
                expect(200).to.eq(response.status);
                expect(undefined).to.not.eq(response.body.nome);
                expect(undefined).to.not.eq(response.body._id);
                expect(undefined).to.not.eq(response.body.preco);
                expect(undefined).to.not.eq(response.body.descricao);
                expect(undefined).to.not.eq(response.body.quantidade);
            })
        });

    //    it('Case 9.4: Update product', ()=>{
            // cy.request({
            //     url: 'https://serverest.dev/produtos/',
            //     method: '',
            //     body: {}
            // }).then(response => {
            //     expect(response.status).to.eq()
            // })
    //    });

    //    it('Case 9.5: Find product - after update', ()=>{
            // cy.request({
            //     url: 'https://serverest.dev/produtos/',
            //     method: '',
            //     body: {}
            // }).then(response => {
            //     expect(response.status).to.eq()
            // })
    //    });

        it('Case 9.6: Delete product', () => {
            console.log('case: delete')
            cy.get('@token').then((token) => {
                console.log('case: delete 1')
                cy.request({
                    url: `https://serverest.dev/produtos/${Cypress.env('productId')}`,
                    method: 'DELETE',
                    headers: {
                        Authorization: token.token,
                    }
                //    failOnStatusCode: false
                }).then(response => {
                    console.log('delete: '+ JSON.stringify(response.body));
                    expect(200).to.eq(response.status);
                    expect('Registro excluído com sucesso').to.eq(response.body.message);
                })
            });
    });

        it('Case 9.7: Find product - after delete', ()=>{
            cy.request({
                url: `https://serverest.dev/produtos/${Cypress.env('productId')}`,
                method: 'GET',
                failOnStatusCode: false
            }).then(response => {
                console.log('find after delete: '+ JSON.stringify(response.body));
                expect(400).to.eq(response.status);
                expect('Produto não encontrado').to.eq(response.body.message);
            })
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