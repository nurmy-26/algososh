import { ADD_BTN_NAME, BIG_CIRCLE_SELECTOR, CLEAR_BTN_NAME, COLOR_CHANGING, COLOR_DEFAULT, DELETE_BTN_NAME, UP_CIRCLE_SELECTOR } from "../support/constants";
import { getRandomInt } from "../../src/utils/helpers/random";


describe('Queue Page', () => {
  beforeEach(() => {
    cy.visit('queue');

    // перед манипуляциями с очередью убеждаемся, что инпут не заблокирован
    cy.getInput().should('not.have.attr', 'disabled');
    // и что круги пусты
    cy.checkIfQueueCirclesAreEmpty();
  });

  it('При пустом инпуте кнопка добавления недоступна', () => {
    cy.checkIfInputHaveNoValue();
    cy.checkIfButtonDisabled(ADD_BTN_NAME);
  });


  it('Элементы правильно добавляются в очередь', () => {
    // добавляем в очередь рандомное кол-во элементов для примера
    const numItems = getRandomInt(3, 7);
    // с помощью кастомной команды
    cy.addItemsWithForCycle(numItems, BIG_CIRCLE_SELECTOR, COLOR_DEFAULT, true, (i) => {

      // с дополнительной проверкой при добавлении:
      // на 1м шаге круг пуст
      cy.getCircleList().eq(i).find('p').first()
        .should('have.text', '');
      // а цвет круга - розовый
      cy.getCircleList().find(BIG_CIRCLE_SELECTOR).eq(i).as('circle')
        .should('have.css', 'border-color', COLOR_CHANGING);

      // на 2м шаге добавляется содержимое и надпись tail
      if (i > 0) {
        cy.getCircleList().eq(i)
          .should('have.text', `${i}${i}tail`);
      } else {
      // а если это 1й добавляемый элемент - то еще и head
      cy.getCircleList().eq(i)
        .should('have.text', `head${i}${i}tail`);
      }
    });
  });


  it('Элементы правильно удаляются из очереди', () => {
    // добавляем в очередь рандомное кол-во элементов для примера
    const numItems = getRandomInt(3, 7);
    // с помощью кастомной команды
    cy.addItemsWithForCycle(numItems, BIG_CIRCLE_SELECTOR, COLOR_DEFAULT, true);

    // и начинаем удалять
    for (let i = 0; i < numItems; i++) {
      cy.clickBtn(DELETE_BTN_NAME);
      
      // 1й шаг удаления - круг розовый и имеет над собой head
      cy.getCircleList().eq(i).find(BIG_CIRCLE_SELECTOR)
        .should('have.css', 'border-color', COLOR_CHANGING);

      // пока не дойдем до последнего элемента:
      if (i < numItems - 1) {
        // на 2м шаге - надпись head перемещается
        cy.getCircleList().eq(i + 1).find(UP_CIRCLE_SELECTOR)
          .should('have.text', 'head');
        cy.getCircleList().eq(i + 1).find(BIG_CIRCLE_SELECTOR)
          .should('have.css', 'border-color', COLOR_DEFAULT);

        // у удаленного круга остается только индекс
        cy.getCircleList().eq(i)
          .should('have.text', `${i}`);
      }
    }
  });


  it('Кнопка "Очистить" корректно очищает очередь', () => {
    // добавляем в очередь рандомное кол-во элементов для примера
    const numItems = getRandomInt(3, 7);
    // с помощью кастомной команды
    cy.addItemsWithForCycle(numItems, BIG_CIRCLE_SELECTOR, COLOR_DEFAULT, true);

    cy.clickBtn(CLEAR_BTN_NAME);
    // после удаления всех элементов все круги должны быть пусты
    cy.checkIfQueueCirclesAreEmpty();
  });
})