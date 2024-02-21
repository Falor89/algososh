describe('Страница фибоначи', () => {
    beforeEach(() => {
        cy.visit('/fibonacci')
    })
    it('Проверка инактивности кнопки', () => {
        cy.get('input').clear()
        cy.get('button[id="submit"]').should('be.disabled')
    })
    it('Числа генерируются корректно', () => {
        cy.get('input').type(4)
        cy.get('button[id="submit"]').click()
        cy.wait(3000)
        cy.get('div[id="solution"] .text_type_circle').first().should('have.text', 1);
        cy.get('div[id="solution"] .text_type_circle').last().should('have.text', 5)
    })
})