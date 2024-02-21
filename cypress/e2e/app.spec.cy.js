describe('Проверка работы', function () {
    beforeEach(function () {
        cy.visit('/');
    });

    it('Проверка заголовка', function () {
        cy.get('h1').should('have.text', 'МБОУ АЛГОСОШ')
    })

    it('Проверка наличия ссылок', function () {
        cy.get('a').should('have.length', 6)
    })

    it('Проверка роутинга в строку', function () {
        cy.get('a[href*="/recursion"]').click()
        cy.location('pathname').should('eq', '/recursion')
        cy.get('a[href*="/"').click()
    })
    it('Проверка роутинга в последовательность фибоначи', function () {
        cy.get('a[href*="/fibonacci"]').click()
        cy.location('pathname').should('eq', '/fibonacci')
        cy.get('a[href*="/"').click()
    })
    it('Проверка роутинга в сортировку', function () {
        cy.get('a[href*="/sorting"]').click()
        cy.location('pathname').should('eq', '/sorting')
        cy.get('a[href*="/"').click()
    })
    it('Проверка роутинга в стек', function () {
        cy.get('a[href*="/stack"]').click()
        cy.location('pathname').should('eq', '/stack')
        cy.get('a[href*="/"').click()
    })
    it('Проверка роутинга в очередь', function () {
        cy.get('a[href*="/queue"]').click()
        cy.location('pathname').should('eq', '/queue')
        cy.get('a[href*="/"').click()
    })
    it('Проверка роутинга в связный список', function () {
        cy.get('a[href*="/list"]').click()
        cy.location('pathname').should('eq', '/list')
        cy.get('a[href*="/"').click()
    })
})