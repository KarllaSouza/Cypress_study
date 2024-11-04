Cypress.Commands.add('createUserFunction', () => {
    // it('Cadastrar usuário', () => {
    //console.log('setup');
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
        /**
         * const userId = response.body._id; // Armazena o ID do usuário criado, que é retornado no corpo da resposta da API.
         * //        console.log(`user ID: ${userId}`) // Exibe o ID do usuário criado no console, o que pode ser útil para depuração.
         *         Cypress.env('userId', userId) //Armazena o ID do usuário em uma variável de ambiente do Cypress (userId). Isso permite que outras partes do teste acessem este valor.
         * //        console.log(response.body); // Exibe o body resultado da requisição feita
         */
        const userId = response.body._id;
        Cypress.env('userId', userId);
        expect(Cypress.env('userId'), userId);
        // '${Cypress.env(userId)}',
        //    expect(response.body.usuarios[0].nome).to.equal('QA Teste')

        cy.request({
            url: `https://serverest.dev/usuarios/${Cypress.env('userId')}`,
            method: 'GET',
        });
    }).then(response => {
        expect (200).to.eq(response.status);
        const userEmail = response.body.email;
        const userPassword = response.body.password;
        const userId = response.body._id;

        expect(undefined).to.not.eq(response.body.nome);
        expect(undefined).to.not.eq(userEmail);
        expect(undefined).to.not.eq(userPassword);
        expect(undefined).to.not.eq(userId);

        expect('QA Teste').to.eq(response.body.nome);
        expect ('teste_1@qa.com').to.eq(userEmail);
        expect ('123').to.eq(userPassword);
        expect ('true').to.eq(response.body.administrador);

        Cypress.env('userEmail', userEmail);
        Cypress.env('userPassword', userPassword);
        Cypress.env('userId', userId);

        expect(Cypress.env('userEmail')).to.eq(userEmail);
        expect(Cypress.env('userPassword')).to.eq(userPassword);
        expect(Cypress.env('userId')).to.eq(userId);

        cy.wrap({
                id: userId,
                email: userEmail,
                password: userPassword
            }
        ).as('user');
    });
})

// it('Consultar usuário - após cadastro', () => {
// cy.request({
//     url: `https://serverest.dev/usuarios/${Cypress.env('userId')}`,
//     method: 'GET',
// }).then(response => {
//     expect(response.status).to.eq(200);
//     console.log(response);
//     const userEmail = response.body.email;
//     const userPassword = response.body.password;
//
//     expect(response.body.nome).to.not.eq(undefined);
//     expect(userEmail).to.not.eq(undefined);
//     expect(userPassword).to.not.eq(undefined);
//     expect(response.body._id).to.not.eq(undefined);
//
//     expect(response.body.nome).to.eq('QA Teste');
//     expect(userEmail).to.eq('teste_1@qa.com');
//     expect(userPassword).to.eq('123');
//     expect(response.body.administrador).to.eq('true');
//
//     Cypress.env('userEmail', userEmail);
//     Cypress.env('userPassword', userPassword);
//
//     expect(userEmail).to.eq(Cypress.env('userEmail'));
//     expect(userPassword).to.eq(Cypress.env('userPassword'));
// })
// });

/**
 * function to delete user
 */
Cypress.Commands.add('deleteUserFunction', () => {
    // console.log('teardown user');
    // console.log(`id: ${Cypress.env('userId')}`);
    cy.request({
        url: `https://serverest.dev/usuarios/${Cypress.env('userId')}`,
        method: 'DELETE',
        body: {},
        // headers: `${Cypress.env('tokenAuthorization')}`
    }).then(response => {
        // console.log('delete');
        expect(200).to.eq(response.status);
        // console.log(response);
        expect('Registro excluído com sucesso').to.eq(response.body.message);
    });

    cy.request({
        url: `https://serverest.dev/usuarios/${Cypress.env('userId')}`,
        method: 'GET',
        failOnStatusCode: false  // Evita que o Cypress falhe automaticamente em caso de status de erro
    }).then(response => {
        // console.log('deletado');
        expect(400).to.eq(response.status);
        // console.log(response);
        expect('Usuário não encontrado').to.eq(response.body.message);

        expect(undefined).to.eq(response.body.nome);
        expect(undefined).to.eq(response.body.email);
        expect(undefined).to.eq(response.body.password);
        expect(undefined).to.eq(response.body._id);
    });
})