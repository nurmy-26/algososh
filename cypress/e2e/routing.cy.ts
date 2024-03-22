describe('Роутинг', () => {
  beforeEach (() => {
    cy.visit('');
  });

  afterEach(() => {
    cy.get('button').contains(/к оглавлению/i).click();
    cy.location('pathname').should('eq', '/');
  });


  it('Переход на страницу разворота строки и обратно', () => {
    cy.navigateAndCheckRoute('recursion', 'Строка');
  });

  it('Переход на страницу с рядом Фибоначчи и обратно', () => {
    cy.navigateAndCheckRoute('fibonacci', 'Последовательность Фибоначчи');
  });

  it('Переход на страницу с сортировкой массива и обратно', () => {
    cy.navigateAndCheckRoute('sorting', 'Сортировка массива');
  });

  it('Переход на страницу стека и обратно', () => {
    cy.navigateAndCheckRoute('stack', 'Стек');
  });

  it('Переход на страницу очереди и обратно', () => {
    cy.navigateAndCheckRoute('queue', 'Очередь');
  });

  it('Переход на страницу связного списка и обратно', () => {
    cy.navigateAndCheckRoute('list', 'Связный список');
  });
})