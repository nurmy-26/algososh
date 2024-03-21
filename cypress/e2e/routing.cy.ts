describe('Роутинг', () => {
  beforeEach (() => {
    cy.visit('');
  });

  afterEach(() => {
    cy.get('button').contains(/к оглавлению/i).click();
    cy.location('pathname').should('eq', '/');
  });


  it('Переход на страницу разворота строки и обратно', () => {
    cy.get('[data-cy="recursion"]').click();
    cy.location('pathname').should('eq', '/recursion');
    cy.get('h3').should('have.text', 'Строка');
  });

  it('Переход на страницу с рядом Фибоначчи и обратно', () => {
    cy.get('[data-cy="fibonacci"]').click();
    cy.location('pathname').should('eq', '/fibonacci');
    cy.get('h3').should('have.text', 'Последовательность Фибоначчи');
  });

  it('Переход на страницу с сортировкой массива и обратно', () => {
    cy.get('[data-cy="sorting"]').click();
    cy.location('pathname').should('eq', '/sorting');
    cy.get('h3').should('have.text', 'Сортировка массива');
  });

  it('Переход на страницу стека и обратно', () => {
    cy.get('[data-cy="stack"]').click();
    cy.location('pathname').should('eq', '/stack');
    cy.get('h3').should('have.text', 'Стек');
  });

  it('Переход на страницу очереди и обратно', () => {
    cy.get('[data-cy="queue"]').click();
    cy.location('pathname').should('eq', '/queue');
    cy.get('h3').should('have.text', 'Очередь');
  });

  it('Переход на страницу связного списка и обратно', () => {
    cy.get('[data-cy="list"]').click();
    cy.location('pathname').should('eq', '/list');
    cy.get('h3').should('have.text', 'Связный список');
  });
})