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
                expect(201).to.eq(response.status);
                const userId = response.body._id;
                Cypress.env('userId', response.body._id);
                expect('Cadastro realizado com sucesso').to.eq(response.body.message);
            })
        });

        it('Case 1.2: Find user - after create', () => {
            cy.request({
                url: `https://serverest.dev/usuarios/${Cypress.env('userId')}`,
                method: 'GET',
            }).then(response => {
                expect(200).to.eq(response.status);
                expect(undefined).to.not.eq(response.body.nome);
                expect(undefined).to.not.eq(response.body.email);
                expect(undefined).to.not.eq(response.body.password);
                expect(undefined).to.not.eq(response.body._id);

                expect('QA Teste').to.eq(response.body.nome);
                expect('teste_1@qa.com').to.eq(response.body.email);
                expect('123').to.eq(response.body.password);
                expect('true').to.eq(response.body.administrador);

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
                expect(200).to.eq(response.status);
                expect('Registro alterado com sucesso').to.eq(response.body.message);
            })
        });

        it('Case 1.4: Find user - after update', () => {
            cy.request({
                url: `https://serverest.dev/usuarios/${Cypress.env('userId')}`,
                method: 'GET',
            }).then(response => {
                expect(200).to.eq(response.status);

                expect('QA Teste_editado').to.eq(response.body.nome);
                expect('teste_1_editado@qa.com').to.eq(response.body.email);
                expect('123_edicao').to.eq(response.body.password);
                expect('false').to.eq(response.body.administrador);

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
                expect(200).to.eq(response.status);
                expect('Registro excluído com sucesso').to.eq(response.body.message);
            })
        });

        it('Case 1.6: Find user - after delete', () => {
            cy.request({
                url: `https://serverest.dev/usuarios/${Cypress.env('userId')}`,
                method: 'GET',
                failOnStatusCode: false  // Evita que o Cypress falhe automaticamente em caso de status de erro
            }).then(response => {
                expect(400).to.eq(response.status);
                expect('Usuário não encontrado').to.eq(response.body.message);

                expect(undefined).to.eq(response.body.nome);
                expect(undefined).to.eq(response.body.email);
                expect(undefined).to.eq(response.body.password);
                expect(undefined).to.eq(response.body._id);
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
                expect(201).to.eq(response.status);
                expect('Cadastro realizado com sucesso').to.eq(response.body.message);
                expect(undefined).to.not.equal(response.body._id);
                const userId = response.body._id;
                Cypress.env('userId', response.body._id)
            })
        });

        it('Case 2.2: Find user - after create through PUT', () => {
            cy.request({
                url: `https://serverest.dev/usuarios/${Cypress.env('userId')}`,
                method: 'GET',
            }).then(response => {
                expect(200).to.eq(response.status);
                expect('QA Teste - criado no put').to.eq(response.body.nome);
                expect('teste_1_editado-no-put@qa.com').to.eq(response.body.email);
                expect('teste123-put').to.eq(response.body.password);
                expect('true').to.eq(response.body.administrador);
            })
        });

        it('Case 2.3: Delete user', () => {
            cy.request({
                url: `https://serverest.dev/usuarios/${Cypress.env('userId')}`,
                method: 'DELETE',
                body: {}
            }).then(response => {
                expect(200).to.eq(response.status);
                expect('Registro excluído com sucesso').to.eq(response.body.message);
            })
        });

        it('Case 2.4: Find user - after delete', () => {
            cy.request({
                url: `https://serverest.dev/usuarios/${Cypress.env('userId')}`,
                method: 'GET',
                failOnStatusCode: false
            }).then(response => {
                expect(400).to.eq(response.status);
                expect('Usuário não encontrado').to.eq(response.body.message);

                expect(undefined).to.eq(response.body.nome);
                expect(undefined).to.eq(response.body.email);
                expect(undefined).to.eq(response.body.password);
                expect(undefined).to.eq(response.body._id);
            })
        });
    })

    context('Scenario 3 (fail): Duplicated record', () => {
        beforeEach(() => {
            cy.createUserFunction();
        });

        it('Case 3.1: Duplicated email - POST', () => {
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
                    expect(400).to.eq(response.status);
                    expect('Este email já está sendo usado').to.eq(response.body.message);
                });
            });
        });

        it('Case 3.2: Duplicated email - PUT', () => {
            cy.get('@user').then((user) => {
                cy.request({
                    url: `https://serverest.dev/usuarios/`,
                    method: 'POST',
                    body: {
                        "nome": "QA Teste 2 - User 2",
                        "email": "teste_2@qa.com",
                        "password": "1234",
                        "administrador": "true"
                    },
                }).then(response => {
                    expect(201).to.eq(response.status);
                    // console.log(`${JSON.stringify(response.body)}`);
                    cy.wrap(response.body._id).as('user_id_2');
                    expect(Cypress.env('user_id_2')).not.null;
                });

                cy.request({
                    url: `https://serverest.dev/usuarios/${user.id}`,
                    method: 'PUT',
                    body: {
                        "nome": "QA Teste 2 - editado",
                        "email": "teste_2@qa.com",
                        "password": "1234",
                        "administrador": "true"
                    },
                    failOnStatusCode: false
                }).then(response => {
                    expect(400).to.eq(response.status);
                    expect('Este email já está sendo usado').to.eq(response.body.message);
                });

                cy.get('@user_id_2').then(id => {
                    cy.request({
                        url: `https://serverest.dev/usuarios/${id}`,
                        method: 'DELETE',
                        body: {},
                    }).then(response => {
                        expect(200).to.eq(response.status);
                        expect('Registro excluído com sucesso').to.eq(response.body.message);
                    });
                })

            });
        });

        afterEach(() => {
            cy.deleteUserFunction();
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
                expect(400).to.eq(response.status);
                expect('nome não pode ficar em branco').to.eq(response.body.nome);
                expect('email não pode ficar em branco').to.eq(response.body.email);
                expect('password não pode ficar em branco').to.eq(response.body.password);
                expect('administrador deve ser \'true\' ou \'false\'').to.eq(response.body.administrador);
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
                expect(400).to.eq(response.status);
                expect('nome é obrigatório').to.eq(response.body.nome);
                expect('email deve ser um email válido').to.eq(response.body.email);
                expect('password é obrigatório').to.eq(response.body.password);
                expect('administrador deve ser \'true\' ou \'false\'').to.eq(response.body.administrador);
            })
        });

        it('Case 4.3: Without data on body', () => {
            cy.request({
                url: 'https://serverest.dev/usuarios/',
                method: 'POST',
                body: {},
                failOnStatusCode: false
            }).then(response => {
                expect(400).to.eq(response.status);
                expect('nome é obrigatório').to.eq(response.body.nome);
                expect('email é obrigatório').to.eq(response.body.email);
                expect('password é obrigatório').to.eq(response.body.password);
                expect('administrador é obrigatório').to.eq(response.body.administrador);
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
                expect(400).to.eq(response.status);
                expect('email deve ser um email válido').to.eq(response.body.email);
            })
        });

        it('Case 5.2: ID null', () => {
            cy.request({
                url: 'https://serverest.dev/usuarios/null',
                method: 'GET',
                failOnStatusCode: false
            }).then(response => {
                expect(400).to.eq(response.status);
                expect('Usuário não encontrado').to.eq(response.body.message);
            })
        });
    });

    context('Scenario 6 (fail): Delete user', () => {
        it('Case 6.1: User ID null', () => {
            cy.request({
                url: `https://serverest.dev/usuarios/null`,
                method: 'DELETE',
                body: {}
            }).then(response => {
                expect(200).to.eq(response.status);
                expect('Nenhum registro excluído').to.eq(response.body.message);
            })
        });
    });

});
