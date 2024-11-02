Cypress.Commands.add('setupUser', () => {
    // it('Cadastrar usuário', () => {
//    console.log('setup');
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
        expect(response.status).to.eq(200);
        const userEmail = response.body.email;
        const userPassword = response.body.password;
        const userId = response.body._id;

        expect(response.body.nome).to.not.eq(undefined);
        expect(userEmail).to.not.eq(undefined);
        expect(userPassword).to.not.eq(undefined);
        expect(userId).to.not.eq(undefined);

        expect(response.body.nome).to.eq('QA Teste');
        expect(userEmail).to.eq('teste_1@qa.com');
        expect(userPassword).to.eq('123');
        expect(response.body.administrador).to.eq('true');

        Cypress.env('userEmail', userEmail);
        Cypress.env('userPassword', userPassword);
        Cypress.env('userId', userId);

        expect(userEmail).to.eq(Cypress.env('userEmail'));
        expect(userPassword).to.eq(Cypress.env('userPassword'));
        expect(userId).to.eq(Cypress.env('userId'));

        cy.wrap({
                id: userId,
                email: userEmail,
                password: userPassword
            }
        ).as('user');
    });

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
})

/**
 * function to delete user
 */
Cypress.Commands.add('teardownUser', () => {
    // console.log('teardown user');
    // console.log(`id: ${Cypress.env('userId')}`);
    cy.request({
        url: `https://serverest.dev/usuarios/${Cypress.env('userId')}`,
        method: 'DELETE',
        body: {},
        // headers: `${Cypress.env('tokenAuthorization')}`
    }).then(response => {
        // console.log('delete');
        expect(response.status).to.eq(200);
        // console.log(response);
        expect(response.body.message).to.eq('Registro excluído com sucesso');
    });

    cy.request({
        url: `https://serverest.dev/usuarios/${Cypress.env('userId')}`,
        method: 'GET',
        failOnStatusCode: false  // Evita que o Cypress falhe automaticamente em caso de status de erro
    }).then(response => {
        // console.log('deletado');
        expect(response.status).to.eq(400);
        // console.log(response);
        expect(response.body.message).to.eq('Usuário não encontrado');

        expect(response.body.nome).to.eq(undefined);
        expect(response.body.email).to.eq(undefined);
        expect(response.body.password).to.eq(undefined);
        expect(response.body._id).to.eq(undefined);

    });
})