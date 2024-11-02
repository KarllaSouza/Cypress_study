/// <reference types="cypress" />
import ('../../support/commands.js')

describe('API tests - User', () => {
    //   const urlApi = 'https://serverest.dev/usuarios/';

    context('Scenario 1 (success): Execute CRUD of user API', () => {
        it('Case 1.1: Create user', () => {
            cy.request({
                url: 'https://serverest.dev/usuarios/', //'${urlApi}',
                method: 'POST',
                body: {
                    "nome": "QA Teste",
                    "email": "teste_1@qa.com",
                    "password": "123",
                    "administrador": "true"
                }
            }).then(response => {
                expect(response.status).to.eq(201);
                const userId = response.body._id;
                Cypress.env('userId', response.body._id)
                expect(response.body.message).to.eq('Cadastro realizado com sucesso')
            })
        });

        it('Case 1.2: Find user - after create', () => {
            cy.request({
                url: `https://serverest.dev/usuarios/${Cypress.env('userId')}`,
                method: 'GET',
            }).then(response => {
                expect(response.status).to.eq(200);
                expect(response.body.nome).to.not.eq(undefined);
                expect(response.body.email).to.not.eq(undefined);
                expect(response.body.password).to.not.eq(undefined);
                expect(response.body._id).to.not.eq(undefined);

                expect(response.body.nome).to.eq('QA Teste');
                expect(response.body.email).to.eq('teste_1@qa.com');
                expect(response.body.password).to.eq('123');
                expect(response.body.administrador).to.eq('true');

                const userEmail = response.body.email;
                const userPassword = response.body.password;

                Cypress.env('userEmail', response.body.email);
                Cypress.env('userPassword', response.body.password);
            })
        });

        it('Case 1.3: Update user', () => {
            cy.request({
                url: `https://serverest.dev/usuarios/${Cypress.env('userId')}`,
                method: 'PUT',
                body: {
                    "nome": "QA Teste_editado",
                    "email": "teste_1_editado@qa.com",
                    "password": "123_edicao",
                    "administrador": "false"
                }
            }).then(response => {
                expect(response.status).to.eq(200);
                expect(response.body.message).to.eq('Registro alterado com sucesso')
            })
        });

        it('Case 1.4: Find user - after update', () => {
            cy.request({
                url: `https://serverest.dev/usuarios/${Cypress.env('userId')}`,
                method: 'GET',
            }).then(response => {
                expect(response.status).to.eq(200);
                expect(response.body.nome).to.eq('QA Teste_editado');
                expect(response.body.email).to.eq('teste_1_editado@qa.com');
                expect(response.body.password).to.eq('123_edicao');
                expect(response.body.administrador).to.eq('false');

                const userNameUpdated = response.body.nome;
                const userEmailUpdated = response.body.email;
                const userPasswordUpdated = response.body.password;
                const userAdmUpdated = response.body.administrador;

                Cypress.env('userNameUpdated', response.body.nome);
                Cypress.env('userEmailUpdated', response.body.email);
                Cypress.env('userPasswordUpdated', response.body.password);
                Cypress.env('userAdmUpdated', response.body.administrador);
            })
        });

        it('Case 1.5: Delete user', () => {
            cy.request({
                url: `https://serverest.dev/usuarios/${Cypress.env('userId')}`,
                method: 'DELETE',
                body: {}
            }).then(response => {
                expect(response.status).to.eq(200);
                expect(response.body.message).to.eq('Registro excluído com sucesso');
            })
        });

        it('Case 1.6: Find user - after delete', () => {
            cy.request({
                url: `https://serverest.dev/usuarios/${Cypress.env('userId')}`,
                method: 'GET',
                failOnStatusCode: false  // Evita que o Cypress falhe automaticamente em caso de status de erro
            }).then(response => {
                expect(response.status).to.eq(400);
                expect(response.body.message).to.eq('Usuário não encontrado');

                expect(response.body.nome).to.eq(undefined);
                expect(response.body.email).to.eq(undefined);
                expect(response.body.password).to.eq(undefined);
                expect(response.body._id).to.eq(undefined);
            })
        });
    });

    context('Scenario 2 (success): Create user through PUT', () => {
        it('Case 2.1: Update user', () => {
            cy.request({
                url: `https://serverest.dev/usuarios/123123123`,
                method: 'PUT',
                body: {
                    "nome": "QA Teste - criado no put",
                    "email": "teste_1_editado-no-put@qa.com",
                    "password": "teste123-put",
                    "administrador": "true"
                }
            }).then(response => {
                expect(response.status).to.eq(201);
                expect(response.body.message).to.eq('Cadastro realizado com sucesso')
                expect(response.body._id).to.not.equal(undefined)
                const userId = response.body._id;
                Cypress.env('userId', response.body._id)
            })
        });

        it('Case 2.2: Find user - after create through PUT', () => {
            cy.request({
                url: `https://serverest.dev/usuarios/${Cypress.env('userId')}`,
                method: 'GET',
            }).then(response => {
                expect(response.status).to.eq(200);
                expect(response.body.nome).to.eq('QA Teste - criado no put');
                expect(response.body.email).to.eq('teste_1_editado-no-put@qa.com');
                expect(response.body.password).to.eq('teste123-put');
                expect(response.body.administrador).to.eq('true');
            })
        });

        it('Case 2.3: Delete user', () => {
            cy.request({
                url: `https://serverest.dev/usuarios/${Cypress.env('userId')}`,
                method: 'DELETE',
                body: {}
            }).then(response => {
                expect(response.status).to.eq(200);
                expect(response.body.message).to.eq('Registro excluído com sucesso');
            })
        });

        it('Case 2.4: Find user - after delete', () => {
            cy.request({
                url: `https://serverest.dev/usuarios/${Cypress.env('userId')}`,
                method: 'GET',
                failOnStatusCode: false
            }).then(response => {
                expect(response.status).to.eq(400);
                expect(response.body.message).to.eq('Usuário não encontrado');
                expect(response.body.nome).to.eq(undefined);
                expect(response.body.email).to.eq(undefined);
                expect(response.body.password).to.eq(undefined);
                expect(response.body._id).to.eq(undefined);
            })
        });
    })

    context('Scenario 3 (fail): Duplicated record', () => {
        beforeEach(() => {
            cy.setupUser();
        });

        it('Case 3.1: Duplicated email', () => {
            cy.get('@user').then((user) => {
                cy.request({
                    url: 'https://serverest.dev/usuarios/',
                    method: 'POST',
                    body: {
                        "nome": "QA Teste 2",
                        "email": "teste_1@qa.com",
                        "password": "1234",
                        "administrador": "true"
                    },
                    failOnStatusCode: false
                }).then(response => {
                    expect(response.status).to.eq(400);
                    expect(response.body.message).to.eq('Este email já está sendo usado');
                });
            });
        });

        afterEach(() => {
            cy.teardownUser();
        });
    });

    context('Scenario 4 (fail): Create user without data', () => {
        it('Case 4.1: Blank data', () => {
            cy.request({
                url: 'https://serverest.dev/usuarios/',
                method: 'POST',
                body: {
                    "nome": "",
                    "email": "",
                    "password": "",
                    "administrador": ""
                },
                failOnStatusCode: false
            }).then(response => {
                expect(response.status).to.eq(400);
                expect(response.body.nome).to.eq('nome não pode ficar em branco');
                expect(response.body.email).to.eq('email não pode ficar em branco');
                expect(response.body.password).to.eq('password não pode ficar em branco');
                expect(response.body.administrador).to.eq('administrador deve ser \'true\' ou \'false\'');
            })
        });

        it('Case 4.2: Invalid data', () => {
            cy.request({
                url: 'https://serverest.dev/usuarios/',
                method: 'POST',
                body: {
                    "email": " ",
                    "administrador": " "
                },
                failOnStatusCode: false
            }).then(response => {
                expect(response.status).to.eq(400);
                expect(response.body.nome).to.eq('nome é obrigatório');
                expect(response.body.email).to.eq('email deve ser um email válido');
                expect(response.body.password).to.eq('password é obrigatório');
                expect(response.body.administrador).to.eq('administrador deve ser \'true\' ou \'false\'');
            })
        });

        it('Case 4.3: Without data on body', () => {
            cy.request({
                url: 'https://serverest.dev/usuarios/',
                method: 'POST',
                body: {},
                failOnStatusCode: false
            }).then(response => {
                expect(response.status).to.eq(400);
                expect(response.body.nome).to.eq('nome é obrigatório');
                expect(response.body.email).to.eq('email é obrigatório');
                expect(response.body.password).to.eq('password é obrigatório');
                expect(response.body.administrador).to.eq('administrador é obrigatório');
            })
        });
    })

    context('Scenario 5 (fail): User\'s list', () => {
        it('Case 5.1: E-mail null', () => {
            cy.request({
                url: 'https://serverest.dev/usuarios?email=null',
                method: 'GET',
                failOnStatusCode: false
            }).then(response => {
                expect(response.status).to.eq(400);
                expect(response.body.email).to.equal('email deve ser um email válido');
            })
        });

        it('Case 5.2: ID null', () => {
            cy.request({
                url: 'https://serverest.dev/usuarios/null',
                method: 'GET',
                failOnStatusCode: false
            }).then(response => {
                expect(response.status).to.eq(400);
                expect(response.body.message).to.equal('Usuário não encontrado');
            })
        });
    });

//    context('', () => {});

});


//       it('', () =>{
//           cy.request({
//               url: '',
//               method: '',
//               body: {}
//           }).then(response => {
//    expect(response.status).to.eq()
//    console.log('user ID: '+response.body._id)
//    Cypress.env('user_id', response._id)
//           })
//       });




