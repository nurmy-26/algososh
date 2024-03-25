import { BIG_CIRCLE_SELECTOR, COLOR_CHANGING, COLOR_DEFAULT,
   COLOR_MODIFIED, EXPAND_BTN_NAME } from "../support/constants";


describe('String Page', () => {
  beforeEach(() => {
    cy.visit('recursion');
  });

  it('Кнопка добавления недоступна при пустом инпуте', () => {
    cy.checkIfInputHaveNoValue();
    cy.checkIfButtonDisabled(EXPAND_BTN_NAME);
  });

  it('Строка корректно разворачивается', () => {
    // до нажатия на кнопку список пуст
    cy.getCircleList().should('not.exist');

    const inputText = 'abc';
    const inputLength = inputText.length;

    cy.typeOnInput(inputText);
    cy.clickBtn(EXPAND_BTN_NAME);

    // проверяем, что длина списка соответствует длине введенной строки
    cy.checkListLength(inputLength);
    // даем псевдоним каждому кругу из списка
    cy.getCircleList().each((item, index) => {
      cy.wrap(item).find(BIG_CIRCLE_SELECTOR).as(`circle-${index}`);
    })

    // проверяем корректность разворота на 1м шаге анимации
    cy.checkCircleTextAndColor(0, 'a', COLOR_CHANGING);
    cy.checkCircleTextAndColor(1, 'b', COLOR_DEFAULT);
    cy.checkCircleTextAndColor(2, 'c', COLOR_CHANGING);

    // проверяем корректность разворота на 2м шаге анимации
    // wait не нужен в соответствии с best-practices (cypress сам дождется изменений, если они в пределах 4с)
    cy.checkCircleTextAndColor(0, 'c', COLOR_MODIFIED);
    cy.checkCircleTextAndColor(1, 'b', COLOR_CHANGING);
    cy.checkCircleTextAndColor(2, 'a', COLOR_MODIFIED);

    // проверяем корректность разворота на 3м шаге анимации
    cy.checkCircleTextAndColor(1, 'b', COLOR_MODIFIED);
  });
})