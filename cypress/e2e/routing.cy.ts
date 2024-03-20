describe('Роутинг', () => {
  it('Переход на страницу разворота строки', () => {
    cy.visit('http://localhost:3000/recursion')
  });

  it('Переход на страницу с рядом Фибоначчи', () => {
    cy.visit('http://localhost:3000/fibonacci')
  });

  it('Переход на страницу с сортировкой массива', () => {
    cy.visit('http://localhost:3000/sorting')
  });

  it('Переход на страницу стека', () => {
    cy.visit('http://localhost:3000/stack')
  });

  it('Переход на страницу очереди', () => {
    cy.visit('http://localhost:3000/queue')
  });

  it('Переход на страницу связного списка', () => {
    cy.visit('http://localhost:3000/list')
  });
})