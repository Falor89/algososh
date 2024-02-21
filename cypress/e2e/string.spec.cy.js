const string = 'hello'
const length = string.length

describe('Страница строки', function () {
    beforeEach(() => {
        cy.visit('/recursion')
    });

    it('Проверка инактивности кнопки', () => {
        cy.get('input').clear();
        cy.get('button').should('be.disabled')
    });

    it('Проверка разворота строки', () => {
        cy.get("input").type(string).should('have.value', string)
        cy.get('button').contains('Развернуть').click()
        cy.get('div[id="solution"] > div').as('circles')
        cy.get('@circles').should('have.length', '5')
        cy.wait(1000)
        cy.get('@circles')
            .each((item, index) => {
                cy.get(item).should('have.text', string[index])
                if (index === 0 || index === 4) {
                    cy.get(item).find('div[class*="circle_changing"]')
                } else {
                    cy.get(item).find('div[class*="circle_default"]')
                }
            })
        cy.wait(3000)
        cy.get('@circles')
            .each((item, index) => {
                cy.get(item).should('have.text', string[string.length - index - 1])
            })

    })
})