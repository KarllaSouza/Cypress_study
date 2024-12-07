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
                console.log('create: ' + response.body);
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
                }).then(response => {
                    console.log('create: ' + JSON.stringify(response.body));
                    expect(201).to.eq(response.status);
                    expect('Cadastro realizado com sucesso').to.eq(response.body.message);
                    expect(undefined).to.not.eq(response.body._id);
                    const productId = response.body._id;
                    Cypress.env('productId', response.body._id);
                })
            });
        });

        it('Case 9.3: Find product - after create', () => {
            cy.request({
                url: `https://serverest.dev/produtos/${Cypress.env('productId')}`,
                method: 'GET'
            }).then(response => {
                console.log('find: ' + JSON.stringify(response.body));
                expect(200).to.eq(response.status);
                expect(undefined).to.not.eq(response.body.nome);
                expect(undefined).to.not.eq(response.body._id);
                expect(undefined).to.not.eq(response.body.preco);
                expect(undefined).to.not.eq(response.body.descricao);
                expect(undefined).to.not.eq(response.body.quantidade);
            })
        });

        it('Case 9.4: Update product', () => {
            cy.get('@token').then((token) => {
                cy.request({
                    url: `https://serverest.dev/produtos/${Cypress.env('productId')}`,
                    method: 'PUT',
                    body: {
                        "nome": "Mouse kds - editado",
                        "preco": 65,
                        "descricao": "Produto teste 1 - editado",
                        "quantidade": 150
                    },
                    headers: {
                        Authorization: token.token,
                    }
                }).then(response => {
                    expect(200).to.eq(response.status);
                    expect('Registro alterado com sucesso').to.eq(response.body.message);
                })
            });
        });

        it('Case 9.5: Find product - after update', () => {
            cy.request({
                url: `https://serverest.dev/produtos/${Cypress.env('productId')}`,
                method: 'GET'
            }).then(response => {
                console.log('find: ' + JSON.stringify(response.body));
                expect(200).to.eq(response.status);
                expect('Mouse kds - editado').to.eq(response.body.nome);
                expect(`${Cypress.env('productId')}`).to.eq(response.body._id);
                expect(65).to.eq(response.body.preco);
                expect('Produto teste 1 - editado').to.eq(response.body.descricao);
                expect(150).to.eq(response.body.quantidade);
            })
        });

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
                }).then(response => {
                    console.log('delete: ' + JSON.stringify(response.body));
                    expect(200).to.eq(response.status);
                    expect('Registro excluído com sucesso').to.eq(response.body.message);
                })
            });
        });

        it('Case 9.7: Delete product - second delete', () => {
            cy.get('@token').then((token) => {
                cy.request({
                    url: `https://serverest.dev/produtos/${Cypress.env('productId')}`,
                    method: 'DELETE',
                    headers: {
                        Authorization: token.token,
                    }
                }).then(response => {
                    expect(200).to.eq(response.status);
                    expect('Nenhum registro excluído').to.eq(response.body.message);
                })
            });
        });

        it('Case 9.8: Find product - after delete', () => {
            cy.request({
                url: `https://serverest.dev/produtos/${Cypress.env('productId')}`,
                method: 'GET',
                failOnStatusCode: false
            }).then(response => {
                console.log('find after delete: ' + JSON.stringify(response.body));
                expect(400).to.eq(response.status);
                expect('Produto não encontrado').to.eq(response.body.message);
            })
        });

    });

    context('Scenario 10 (success): Create product through PUT', () => {
        it('Case 10.1: Update product', () => {
            cy.get('@token').then((token) => {
                cy.request({
                    url: `https://serverest.dev/produtos/000000000001`,
                    method: 'PUT',
                    body: {
                        "nome": "teclado kds",
                        "preco": 40,
                        "descricao": "Produto teste cadastrado no PUT",
                        "quantidade": 20
                    },
                    headers: {
                        Authorization: token.token,
                    }
                }).then(response => {
                    expect(201).to.eq(response.status);
                    expect('Cadastro realizado com sucesso').to.eq(response.body.message);
                    expect(undefined).to.not.eq(response.body._id);
                    const productId2 = response.body._id;
                    Cypress.env('productId2', response.body._id)
                })
            });
        });

        it('Case 10.2: Find product - after create throught put', () => {
            cy.request({
                url: `https://serverest.dev/produtos/${Cypress.env('productId2')}`,
                method: 'GET'
            }).then(response => {
                console.log('find: ' + JSON.stringify(response.body));
                expect(200).to.eq(response.status);
                expect(undefined).to.not.eq(response.body.nome);
                expect(undefined).to.not.eq(response.body._id);
                expect(undefined).to.not.eq(response.body.preco);
                expect(undefined).to.not.eq(response.body.descricao);
                expect(undefined).to.not.eq(response.body.quantidade);
            })
        });

        it('Case 10.3: Delete product - created throught put', () => {
            cy.get('@token').then((token) => {
                cy.request({
                    url: `https://serverest.dev/produtos/${Cypress.env('productId2')}`,
                    method: 'DELETE',
                    headers: {
                        Authorization: token.token,
                    }
                }).then(response => {
                    expect(200).to.eq(response.status);
                    expect('Registro excluído com sucesso');
                })
            });
        });

        it('Case 10.4: Find product - after delete', () => {
            cy.request({
                url: `https://serverest.dev/produtos/${Cypress.env('productId2')}`,
                method: 'GET',
                failOnStatusCode: false
            }).then(response => {
                console.log('find after delete: ' + JSON.stringify(response.body));
                expect(400).to.eq(response.status);
                expect('Produto não encontrado').to.eq(response.body.message);
            })
        });

    })

    context('Scenario 11 (fail): Create product', () => {

        it('Case 11.1: Without Token', () => {
            cy.request({
                url: 'https://serverest.dev/produtos/',
                method: 'POST',
                body: {
                    "nome": "Mouse k",
                    "preco": 50,
                    "descricao": "Produto teste 1",
                    "quantidade": 100
                },
                failOnStatusCode: false
            }).then(response => {
                expect(401).to.eq(response.status);
                expect('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais').to.eq(response.body.message);
                expect(undefined).to.eq(response.body._id);
            })
        });

        it('Case 11.2: Duplicated name', () => {
            cy.get('@token').then((token) => {
                  /**
                 * product with duplicated name should return an error
                 */
                cy.request({
                    url: 'https://serverest.dev/produtos/',
                    method: 'POST',
                    body: {
                        "nome": "Notebook Gamer ACER",
                        "preco": 50,
                        "descricao": "Produto teste 1",
                        "quantidade": 100
                    },
                    headers: {
                        Authorization: token.token,
                    },
                    failOnStatusCode: false
                }).then(response => {
                    expect(400).to.eq(response.status);
                    expect('Já existe produto com esse nome').to.eq(response.body.message);
                    expect(undefined).to.eq(response.body._id);
                    console.log(response);
                });
            })
        });

        it('Case 11.3: Without body', () => {
            cy.get('@token').then((token) => {
                cy.request({
                    url: 'https://serverest.dev/produtos/',
                    method: 'POST',
                    headers: {
                        Authorization: token.token,
                    },
                    failOnStatusCode: false
                }).then(response => {
                    expect(400).to.eq(response.status);
                    expect(undefined).to.eq(response.body._id);
                    expect('nome é obrigatório').to.eq(response.body.nome);
                    expect('preco é obrigatório').to.eq(response.body.preco);
                    expect('descricao é obrigatório').to.eq(response.body.descricao);
                    expect('quantidade é obrigatório').to.eq(response.body.quantidade);
                })
            });
        });

        it('Case 11.4: Without data', () => {
            cy.get('@token').then((token) => {
                cy.request({
                    url: 'https://serverest.dev/produtos/',
                    method: 'POST',
                     body: {
                        "nome": "",
                        "preco": "",
                        "descricao": "",
                        "quantidade": ""
                     },
                    headers: {
                        Authorization: token.token,
                    },
                    failOnStatusCode: false
                }).then(response => {
                    expect(400).to.eq(response.status);
                    expect(undefined).to.eq(response.body._id);
                    expect('nome não pode ficar em branco').to.eq(response.body.nome);
                    expect('preco deve ser um número').to.eq(response.body.preco);
                    expect('descricao não pode ficar em branco').to.eq(response.body.descricao);
                    expect('quantidade deve ser um número').to.eq(response.body.quantidade);
                })
            });
        });

    })

    context('Scenario xxx (fail): Find product', () => {
        it('Case xx.x: ---', () => {});
    })

    context('Scenario xxx (fail): Update product', () => {
        it('Case xx.x: ---', () => {});
    })

    context('Scenario xxx (fail): Delete product', () => {
        it('Case 11.1: Without token', () => {

        });

        it('Case 11.2: Product Id Null', () => {

        });
    })


    afterEach(() => {
        cy.deleteUserFunction();
    });
})


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