/// <reference types="cypress" />
import ('../../support/commands.js')

describe('Testes API - Usuário', () => {
    //   const urlApi = 'https://serverest.dev/usuarios/';

    context('Cenário 1 (Sucesso): fazer CRUD da API de usuário (Requests em testes separados)', () => {
        it('Cadastrar usuário', () => {
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
                const userId = response.body._id; // Armazena o ID do usuário criado, que é retornado no corpo da resposta da API.
                console.log('user ID: ' + response.body._id) // Exibe o ID do usuário criado no console, o que pode ser útil para depuração.
                Cypress.env('userId', response.body._id) //Armazena o ID do usuário em uma variável de ambiente do Cypress (userId). Isso permite que outras partes do teste acessem este valor.
                // '${Cypress.env(userId)}',
                //    expect(response.body.usuarios[0].nome).to.equal('QA Teste')
                expect(response.body.message).to.eq('Cadastro realizado com sucesso')
            })
        });

        it('Consultar usuário - após cadastro', () => {
            cy.request({
                url: `https://serverest.dev/usuarios/${Cypress.env('userId')}`,
                method: 'GET',
            }).then(response => {
                expect(response.status).to.eq(200);
                console.log(response);

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

        it('Editar usuário', () => {
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

        it('Consultar usuário - após edição', () => {
            cy.request({
                url: `https://serverest.dev/usuarios/${Cypress.env('userId')}`,
                method: 'GET',
            }).then(response => {
                expect(response.status).to.eq(200);
                console.log(response);

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

        it('Deletar usuário', () => {
            cy.request({
                url: `https://serverest.dev/usuarios/${Cypress.env('userId')}`,
                method: 'DELETE',
                body: {}
            }).then(response => {
                expect(response.status).to.eq(200);
                console.log(response);
                expect(response.body.message).to.eq('Registro excluído com sucesso');
            })
        });

        it('Consultar usuário - após exclusão', () => {
            cy.request({
                url: `https://serverest.dev/usuarios/${Cypress.env('userId')}`,
                method: 'GET',
                failOnStatusCode: false  // Evita que o Cypress falhe automaticamente em caso de status de erro
            }).then(response => {
                expect(response.status).to.eq(400);
                console.log(response);
                expect(response.body.message).to.eq('Usuário não encontrado');

                expect(response.body.nome).to.eq(undefined);
                expect(response.body.email).to.eq(undefined);
                expect(response.body.password).to.eq(undefined);
                expect(response.body._id).to.eq(undefined);
            })
        });
    });

    context('Cenário 2 (sucesso): Cadastro através do PUT', () => {
        it('Editar usuário', () => {
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

                const userId = response.body._id; // Armazena o ID do usuário criado
                console.log('user ID: ' + response.body._id) // Exibe o ID do usuário criado no console
                Cypress.env('userId', response.body._id) //Armazena o ID do usuário em uma variável de ambiente (userId).
            })
        });

        it('Consultar usuário - após cadastro no put', () => {
            cy.request({
                url: `https://serverest.dev/usuarios/${Cypress.env('userId')}`,
                method: 'GET',
            }).then(response => {
                expect(response.status).to.eq(200);
                console.log(response);

                expect(response.body.nome).to.eq('QA Teste - criado no put');
                expect(response.body.email).to.eq('teste_1_editado-no-put@qa.com');
                expect(response.body.password).to.eq('teste123-put');
                expect(response.body.administrador).to.eq('true');
            })
        });

        it('Deletar usuário', () => {
            cy.request({
                url: `https://serverest.dev/usuarios/${Cypress.env('userId')}`,
                method: 'DELETE',
                body: {}
            }).then(response => {
                expect(response.status).to.eq(200);
                console.log(response);
                expect(response.body.message).to.eq('Registro excluído com sucesso');
            })
        });

        it('Consultar usuário - após exclusão', () => {
            cy.request({
                url: `https://serverest.dev/usuarios/${Cypress.env('userId')}`,
                method: 'GET',
                failOnStatusCode: false  // Evita que o Cypress falhe automaticamente em caso de status de erro
            }).then(response => {
                expect(response.status).to.eq(400);
                console.log(response);
                expect(response.body.message).to.eq('Usuário não encontrado');

                expect(response.body.nome).to.eq(undefined);
                expect(response.body.email).to.eq(undefined);
                expect(response.body.password).to.eq(undefined);
                expect(response.body._id).to.eq(undefined);
            })
        });
    })

    context('Cenário 3 (falha): cadastro de usuário com e-mail já utilizado', () => {
        console.log('teste - cenário 3');
        beforeEach(() => {
            cy.setupUser();
        });

        it('cadastro com falha - e-mail já cadastrado', () => {
            console.log('teste com e-mail duplicado');

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
            console.log('after - teardown !!!!!!!!!!!');
            cy.teardownUser();
        });
    });

    context.only('Cenário 4 (falha): cadastro de usuário sem dados', () => {
        console.log('teste 4');

        it('Dados em branco', () => {
            console.log('dentro do it')
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
                console.log('validações - em branco');
                console.log(response.body);

                expect(response.status).to.eq(400);
                console.log('status: ' + response.status);

                expect(response.body.nome).to.eq('nome não pode ficar em branco');
                expect(response.body.email).to.eq('email não pode ficar em branco');
                expect(response.body.password).to.eq('password não pode ficar em branco');
                expect(response.body.administrador).to.eq('administrador deve ser \'true\' ou \'false\'');
            })
        });

        it('Dados inválidos', () => {
            cy.request({
                url: 'https://serverest.dev/usuarios/',
                method: 'POST',
                body: {
                    "email": " ",
                    "administrador": " "
                },
                failOnStatusCode: false
            }).then(response => {
                console.log('validações - Dados inválidos');
                console.log(response.body);

                expect(response.status).to.eq(400);
                console.log('status: ' + response.status);

                expect(response.body.nome).to.eq('nome é obrigatório');
                expect(response.body.email).to.eq('email deve ser um email válido');
                expect(response.body.password).to.eq('password é obrigatório');
                expect(response.body.administrador).to.eq('administrador deve ser \'true\' ou \'false\'');
            })
        });

        it('Sem dados no body', () => {
            cy.request({
                url: 'https://serverest.dev/usuarios/',
                method: 'POST',
                body: {},
                failOnStatusCode: false
            }).then(response => {
                console.log('validações - Dados inválidos');
                console.log(response.body);

                expect(response.status).to.eq(400);
                console.log('status: ' + response.status);

                expect(response.body.nome).to.eq('nome é obrigatório');
                expect(response.body.email).to.eq('email é obrigatório');
                expect(response.body.password).to.eq('password é obrigatório');
                expect(response.body.administrador).to.eq('administrador é obrigatório');
            })
        });

    })
});


describe('Teste API - Login', () => {
    context('Cenário 3: fazer Login)', () => {
        console.log('context');
        beforeEach(() => {
            console.log('before');
            cy.setupUser();
        })

        it('Login com sucesso', () => {
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
                console.log(response);
                expect(response.body.message).to.eq('Login realizado com sucesso');
                expect(response.body.authorization).to.not.eq(undefined);
                const tokenAuthorization = response.body.authorization;
                Cypress.env('tokenAuthorization', tokenAuthorization);
                //    const authorization = `Bearer ${Cypress.env('ACCESS_TOKEN')}`
            });
        });

        afterEach(() => {
            console.log('tear down');
            cy.teardownUser();
        });
    });

})


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




