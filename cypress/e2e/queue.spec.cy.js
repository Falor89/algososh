const arr = [5, 2, 1, 6, 7, 8, 9]

describe('Страница очереди', () => {
    beforeEach(() => {
        cy.visit('/queue')
    })
    it('Проверка инактивности кнопок', () => {
        cy.get('input').clear()
        cy.get('button[id="submit"]').should('be.disabled')
        cy.get('button[id="delete"]').should('be.disabled')
        cy.get('button[id="clear"]').should('be.disabled')
    })
    it('Проверка функции добавления в очередь', () => {
        cy.get('ul[id="solution"] > div').as('circles')
        arr.map((num, index) => {
            cy.get('input').type(num)
            cy.get('button[id="submit"]').click()
            cy.get('@circles').eq(index).find('div[class*="circle_changing"]')
            cy.wait(500)
            cy.get('@circles').eq(index).find('div[class*="circle_default"]')
        })
        cy.get('button[id="submit"]').should('be.disabled')
        cy.get('@circles')
            .each((item, index) => {
                cy.get(item).find('.text_type_circle').should('have.text', arr[index]);

                if (index === 0) {
                    cy.get(item).find('.text_type_input').eq(0).should('have.text', 'head');
                } else if (index === 7) {
                    cy.get(item).find('.text_type_input').eq(2).should('have.text', 'tail');
                }
            })
        cy.get('button[id="clear"]').click()
    })
    it('Проверка функции удаления из очереди', () => {
        cy.get('ul[id="solution"] > div').as('circles')
        arr.map((num, index) => {
            cy.get('input').type(num)
            cy.get('button[id="submit"]').click()
            cy.wait(500)
        })
        cy.get('button[id="delete"]').click()
        cy.wait(500)
        cy.get('@circles')
            .each((item, index) => {
                if (index < 1) {
                    cy.get(item).find('.text_type_circle').should('have.text', '')

                }
                else if (index === 1) {
                    cy.get(item).find('.text_type_circle').should('have.text', arr[index])
                    cy.get(item).find('.text_type_input').eq(0).should('have.text', 'head');
                }
            })
    })
    it('Проверка функции очистки очереди', () => {
        cy.get('ul[id="solution"] > div').as('circles')
        arr.map((num, index) => {
            cy.get('input').type(num)
            cy.get('button[id="submit"]').click()
            cy.wait(500)
        })
        cy.get('button[id="clear"]').click()
        cy.wait(300)
        cy.get('@circles').each(item => {
            cy.get(item).find('.text_type_circle').should('have.text', '')
        })
    })
})