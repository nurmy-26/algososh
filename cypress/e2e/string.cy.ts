import { COLOR_CHANGING, COLOR_DEFAULT, COLOR_MODIFIED } from "../support/constants";


describe('String Page', () => {
  beforeEach(() => {
    cy.visit('recursion');
  });

  it('Кнопка добавления недоступна при пустом инпуте', () => {
    cy.checkIfInputHaveNoValue();
    cy.checkIfButtonDisabled('Развернуть');
  });

  it('Строка корректно разворачивается', () => {
    // до нажатия на кнопку список пуст
    cy.getCircleList().should('not.exist');

    const inputText = 'abc';
    const inputLength = inputText.length;

    cy.get('input').type(inputText);
    cy.get('button').contains('Развернуть').click();

    // проверяем, что длина списка соответствует длине введенной строки
    cy.checkListLength(inputLength);
    // даем псевдоним каждому кругу из списка
    cy.getCircleList().each((item, index) => {
      cy.wrap(item).find('div > div:nth-child(2)').as(`circle-${index}`);
    })

    // проверяем корректность разворота на 1м шаге анимации
    cy.get('@circle-0').should('have.text', 'a').and('have.css', 'border-color', COLOR_CHANGING);
    cy.get('@circle-1').should('have.text', 'b').and('have.css', 'border-color', COLOR_DEFAULT);
    cy.get('@circle-2').should('have.text', 'c').and('have.css', 'border-color', COLOR_CHANGING);

    // проверяем корректность разворота на 2м шаге анимации
    // wait не нужен в соответствии с best-practices (cypress сам дождется изменений, если они в пределах 4с)
    cy.get('@circle-0').should('have.text', 'c').and('have.css', 'border-color', COLOR_MODIFIED);
    cy.get('@circle-1').should('have.text', 'b').and('have.css', 'border-color', COLOR_CHANGING);
    cy.get('@circle-2').should('have.text', 'a').and('have.css', 'border-color', COLOR_MODIFIED);

    // проверяем корректность разворота на 3м шаге анимации
    cy.get('@circle-1').should('have.text', 'b').and('have.css', 'border-color', COLOR_MODIFIED);
  });
})