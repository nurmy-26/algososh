import { ADD_BTN_NAME, BIG_CIRCLE_SELECTOR, CLEAR_BTN_NAME, COLOR_CHANGING, COLOR_DEFAULT, DELETE_BTN_NAME, UP_CIRCLE_SELECTOR } from "../support/constants";
import { getRandomInt } from "../../src/utils/helpers/random";


describe('Stack Page', () => {
  beforeEach(() => {
    cy.visit('stack');

    // перед манипуляциями со стеком убеждаемся, что он пуст
    cy.getCircleList().should('not.exist');
    // а инпут не заблокирован
    cy.getInput().should('not.have.attr', 'disabled');
  });

  it('При пустом инпуте кнопки недоступны', () => {
    cy.checkIfInputHaveNoValue();
    cy.checkIfButtonDisabled(ADD_BTN_NAME);

    // так как стек еще пуст, остальные кнопки также должныбыть недоступны
    cy.checkIfButtonDisabled(DELETE_BTN_NAME);
    cy.checkIfButtonDisabled(CLEAR_BTN_NAME);
  });


  it('Элементы правильно добавляются в стек', () => {
    const numItems = getRandomInt(3, 8); // количество добавляемых элементов в стек (и тестов)
    // добавляем элементы с помощью кастомной команды
    cy.addItemsWithForCycle(numItems, BIG_CIRCLE_SELECTOR, COLOR_DEFAULT, false, (i) => {

      // с дополнительной проверкой при добавлении:
      // на 1м шаге у текущего добавляемого элемента есть надпись top и совпадают текст в круге и индекс
      cy.getCircleList().eq(i)
          .should('have.text', `top${i}${i}`);
      // а цвет круга - розовый
      cy.getCircleList().find(BIG_CIRCLE_SELECTOR).eq(i).as('circle')
          .should('have.text', `${i}`).and('have.css', 'border-color', COLOR_CHANGING);
    });

    // в конце проверяем, что длина списка соответствует кол-ву введенных элементов
    cy.checkListLength(numItems);
  });


  it('Элементы правильно удаляются из стека', () => {
    // добавляем в стек рандомное кол-во элементов для примера
    const numItems = getRandomInt(3, 8);
    // с помощью кастомной команды
    cy.addItemsWithForCycle(numItems, BIG_CIRCLE_SELECTOR, COLOR_DEFAULT);

    // проверяем, что длина списка соответствует кол-ву введенных элементов
    cy.checkListLength(numItems);

    for (let i = 0; i < numItems; i++) {
      cy.clickBtn(DELETE_BTN_NAME);
      
      // 1й шаг удаления - круг розовый
      cy.getCircleList().eq(numItems - (i + 1)).find(BIG_CIRCLE_SELECTOR)
        .should('have.css', 'border-color', COLOR_CHANGING);

      // пока не дойдем до последнего элемента:
      if (i < numItems - 1) {
        // на 2м шаге - надпись top перемещается
        cy.getCircleList().eq(numItems - (i + 2)).find(UP_CIRCLE_SELECTOR)
        .should('have.text', 'top');
        cy.getCircleList().eq(numItems - (i + 2)).find(BIG_CIRCLE_SELECTOR)
        .should('have.css', 'border-color', COLOR_DEFAULT);
      }

      // на каждом шаге проверяем, что длина стека сокращается
      cy.checkListLength(numItems - (i+1));
    }

    // после удаления всех элементов стек должен остаться пустым
    cy.getCircleList().should('not.exist');
  });


  it('Кнопка "Очистить" корректно очищает стек', () => {
    // добавляем в стек рандомное кол-во элементов для примера
    const numItems = getRandomInt(3, 8);
    // с помощью кастомной команды
    cy.addItemsWithForCycle(numItems, BIG_CIRCLE_SELECTOR, COLOR_DEFAULT);

    cy.clickBtn(CLEAR_BTN_NAME);
    // после удаления всех элементов стек должен остаться пустым
    cy.getCircleList().should('not.exist');
  });
})