/// <reference types="cypress" />

import ('../../support/commands_practiceAutomation')

describe('System tests - Form fields', () => {

    beforeEach(() => {
        cy.visit('https://practice-automation.com/form-fields/')
    });

    context('fill out the form', () => {
        it('Test case 1 - Fill in the name field', () => {
            cy.get('#name-input').type('Karlla', {delay: 200})
        });
        it('Test case 2 - Select and deselect each of the "FAVORITE DRINK" checkboxes', () => {
            cy.get('#drink1').should('be.visible').check().wait(400)
            cy.get('[data-testid="drink1"]').should('be.checked')
            cy.get('#drink2').should('be.visible').check().wait(400)
            cy.get('[data-testid="drink2"]').should('be.checked')
            cy.get('#drink3').should('be.visible').check().wait(400)
            cy.get('[data-testid="drink3"]').should('be.checked')
            cy.get('#drink4').should('be.visible').check().wait(400)
            cy.get('[data-testid="drink4"]').should('be.checked')
            cy.get('#drink5').should('be.visible').check().wait(400)
            cy.get('[data-testid="drink5"]').should('be.checked')
            cy.get('#drink1').should('be.visible').uncheck().wait(400)
            cy.get('[data-testid="drink1"]').should('not.be.checked')
            cy.get('#drink2').should('be.visible').uncheck().wait(400)
            cy.get('[data-testid="drink2"]').should('not.be.checked')
            cy.get('#drink3').should('be.visible').uncheck().wait(400)
            cy.get('[data-testid="drink3"]').should('not.be.checked')
            cy.get('#drink4').should('be.visible').uncheck().wait(400)
            cy.get('[data-testid="drink4"]').should('not.be.checked')
            cy.get('#drink5').should('be.visible').uncheck().wait(400)
            cy.get('[data-testid="drink5"]').should('not.be.checked')
        });
        it('Test case 2.1 - Extra 1: Make selection using the element type in the "FAVORITE DRINK" checkbox', () => {
            cy.get('[type="checkbox"]').check(['Water', 'Milk'])
        });
        it('Test case 2.2 - Extra 2: Select first and last checkbox "FAVORITE DRINK"', () => {
            cy.get('[type="checkbox"]').first().check()
            cy.get('[type="checkbox"]').last().check()
        });
        it('Test case 3 - Select and deselect each of the “FAVORITE COLOR” radio buttons', () => {
            cy.get('#color1').should('be.visible').check().wait(400)
            cy.get('[data-testid="color1"]').should('be.checked')

            cy.get('#color2').should('be.visible').check().wait(400)
            cy.get('[data-testid="color2"]').should('be.checked')
            cy.get('[data-testid="color1"]').should('not.be.checked')

            cy.get('#color3').should('be.visible').check().wait(400)
            cy.get('[data-testid="color3"]').should('be.checked')
            cy.get('[data-testid="color1"]').should('not.be.checked')
            cy.get('[data-testid="color2"]').should('not.be.checked')

            cy.get('#color4').should('be.visible').check().wait(400)
            cy.get('[data-testid="color4"]').should('be.checked')
            cy.get('[data-testid="color1"]').should('not.be.checked')
            cy.get('[data-testid="color2"]').should('not.be.checked')
            cy.get('[data-testid="color3"]').should('not.be.checked')

            cy.get('#color5').should('be.visible').check().wait(400)
            cy.get('[data-testid="color5"]').should('be.checked')
            cy.get('[data-testid="color1"]').should('not.be.checked')
            cy.get('[data-testid="color2"]').should('not.be.checked')
            cy.get('[data-testid="color3"]').should('not.be.checked')
            cy.get('[data-testid="color4"]').should('not.be.checked')
        });
        it('Test case 3.1 - Extra 1: Make selection using the element type in the “FAVORITE COLOR" radio button', () => {
            cy.get('[type="radio"]')
                .should('be.visible')
                .check(['Blue'])
                .should('be.checked')
                .wait(1000)
        });
        it('Test case 3.2 - Extra 2: Select first and last “FAVORITE COLOR" radio button', () => {
            cy.get('#color1').should('be.visible')
            cy.get('[type="radio"]')
                .first()
                .check()
            cy.get('[data-testid="color1"]').should('be.checked')

            cy.get('#color5').should('be.visible')
            cy.get('[type="radio"]')
                .last()
                .check()
            cy.get('[data-testid="color5"]').should('be.checked')
            cy.get('[data-testid="color1"]').should('not.be.checked')
        });
        it('Test case 4: Select options from a dropdown', () => {
            cy.get('#automation').should('be.visible').wait(1000)
            cy.get('#automation').select('yes').should('have.value', 'yes').wait(1000)
            cy.get('#automation').select('no').should('have.value', 'no').wait(1000)
            cy.get('#automation').select('undecided').should('have.value', 'undecided').wait(1000)
        });
        it('Test case 4.1: Extra 1: Select options from a dropdown using locator select', () => {
            cy.get('select[name=automation]')
                .select('no')
                .should('have.value', 'no')
        });
        it('Test case 4.2: Extra 2: Select options from a dropdown using position', () => {
            cy.get('select').select(3)
        });
        it('Test case 5 - Reading texts from the screen', () => {
            //    cy.contains('Selenium').wait(400)
            //    cy.contains('Playwright').wait(400)
            //    cy.contains('Cypress').wait(400)
            //    cy.contains('Appium').wait(400)
            //    cy.contains('Katalon Studio').wait(400)
            cy.contains('label', 'Automation tools').click()
            cy.contains('li', 'Cypress').click()
        });
        it('Test case 6 - Fill in the email field', () => {
            cy.get('#email')
                .type('karlla@email.com', {delay: 200})
        });
        it('Test case 7 - Fill in the message field', () => {
            const textoCurto = "Teste realizado com sucesso."
            const citacaoLonga = "'Uma vez rei ou rainha de Nárnia, sempre rei ou rainha de Nárnia. Mas não se esqueça de que o seu futuro é uma questão de sua própria escolha. É o seu destino que você está fazendo, não o nosso.' \n - Narnia"
            const citacaoResumida = "'Uma vez rei ou rainha de Nárnia, sempre rei ou rainha de Nárnia. Mas não se esqueça de que o seu futuro é uma questão de sua própria escolha. É o seu destino que você está fazendo, não o nosso.' \n - Narnia"

            cy.get('#message').type(textoCurto, {delay: 200})
                .should('have.value', textoCurto)
                .clear()
                .should('have.value', '')

            //Teste 7 - Extra 1 - Prencher campo message com texto longo
            cy.get('#message').type(citacaoLonga, {delay: 150})
                .should('have.value', citacaoLonga)
                .clear()
                .should('have.value', '')

            //Teste 7 - Extra 2 - Prencher campo message com texto longo diminuindo delay
            cy.get('#message').type(citacaoResumida, {delay: 25})
                .should('have.value', citacaoResumida)
        });
        it('Test case 8 - Fill in the message field and clear it later', () => {
            cy.get('#message')
                .type('Teste realizado com sucesso.', {delay: 60})
                .should('have.value', 'Teste realizado com sucesso.')
                .clear()
                .should('have.value', '')
        });
    })

    context('fill out  and send the form - complete flow ', () => {
        it('Test case 9 - FILL OUT THE FORM COMPLETELY WITH ASSERTIONS AND SEND', () => {
            cy.get('#name-input').type('Karlla', {delay: 200})
            cy.get('#drink1').should('be.visible').check().wait(400)
            cy.get('[data-testid="drink1"]').should('be.checked')
            cy.get('#drink5').should('be.visible').check().wait(400)
            cy.get('[data-testid="drink5"]').should('be.checked')
            cy.get('#color3').should('be.visible').check().wait(400)
            cy.get('[data-testid="color3"]').should('be.checked')
            cy.get('#automation').should('be.visible').wait(1000)
            cy.get('#automation').select('no').should('have.value', 'no').wait(1000)
            cy.get('#email').type('karlla@email.com', {delay: 200})
            cy.get('#message').type('"Uma vez rei ou rainha de Nárnia, sempre rei ou rainha de Nárnia." \n - Narnia', {delay: 50})
            cy.get('#submit-btn').click().wait(150)
            // cy.get('#submit-btn').submit()
        });
    })

    context('study test - customized', () => {
        it('Test case 10 - customized - data in command file', () => {
            // TESTE 10 – CRIE UM COMANDO CUSTOMIZADO PARA PREENCHER O FORMULÁRIO
            cy.fillOutForm();
        });

        it('Test case 11 - customized - sending the data', () => {
            //TESTE 11 – CRIE UM COMANDO CUSTOMIZADO PARAMETRIZADO PARA PREENCHER O FORMULÁRIO
            cy.fillOutForm2('Karlla Souza', '123456', ['Water', 'Milk', 'Wine'], 'Yellow', 'yes', 'karllasouza@email.com', 'teste 11');
        });
    })

    afterEach(() => {
        cy.visit('https://practice-automation.com/');
    });
})

