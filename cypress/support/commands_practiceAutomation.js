// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//const {constant} = require("cypress/types/lodash")

// Define o comando customizado para preencher um formulário
Cypress.Commands.add('fillOutForm', function(){
    const citacao = '"Uma vez rei ou rainha de Nárnia, sempre rei ou rainha de Nárnia." \n - Narnia"'

    cy.get('#name-input')
        .type('Karlla', {delay: 200})
        .should('have.value', 'Karlla')
        .wait(1000)

    cy.get('[type="checkbox"]')
        .should('be.visible')
        .check(['Water', 'Milk', 'Coffee', 'Wine', 'Ctrl-Alt-Delight'])
        .should('be.checked')
        .wait(1000)

    cy.get('[type="radio"]')
        .should('be.visible')
        .check(['Blue'])
        .should('be.checked')
        .wait(1000)

    cy.get('#automation')
        .should('be.visible').wait(300)
        .select('no').should('have.value', 'no')
        .wait(200)

    cy.get('#email')
        .type('karlla@email.com', {delay: 200})
        .should('have.value', 'karlla@email.com')
        .wait(1000)

    cy.get('#message')
        .type(citacao, {delay: 50})
        .should('have.value', citacao)
        .wait(1000)

    cy.get('#submit-btn').click().wait(150)
})



Cypress.Commands.add('fillOutForm2', (nome, password,listaBebida, cor, automacao, email, mensagem) => {
    // Verificar se os parâmetros têm valores válidos
    console.log(`Nome: ${nome}`);
    console.log(`Password: ${password}`);
    console.log(`Lista de Bebidas: ${listaBebida}`);
    console.log(`Cor: ${cor}`);
    console.log(`Automação: ${automacao}`);
    console.log(`Email: ${email}`);
    console.log(`Mensagem: ${mensagem}`);

    // Seleciona e preenche o campo de nome
    cy.get('#name-input').type(nome, { delay: 100 }).should('have.value', nome).wait(1000);
    cy.get('[type="password"]').type(password,{delay: 100}).should('have.value', password).wait(1000);

    // Seleciona e preenche o checkbox de bebida
    cy.get('[type="checkbox"]').should('be.visible').check(listaBebida).should('be.checked').wait(1000);
// Seleciona e preenche o radio de cor
    cy.get('[type="radio"]').should('be.visible').check(cor).should('be.checked').wait(400);
// Seleciona e preenche o select de automacao

    cy.get('#automation').should('be.visible').wait(300).select(automacao).should('have.value', automacao).wait(200);
// Seleciona e preenche o campo de email
    cy.get('#email').type(email, {delay: 100}).should('have.value', email).wait(1000);
// Seleciona e preenche o campo de mensagem
    cy.get('#message').type(mensagem, {delay: 50}).should('have.value', mensagem).wait(1000);

    cy.get('#submit-btn').click().wait(150);
})

