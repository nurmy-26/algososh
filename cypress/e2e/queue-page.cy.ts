import { COLOR_CHANGING, COLOR_DEFAULT } from "../support/constants";
import { getRandomInt } from "../../src/utils/helpers/random";


describe('Queue Page', () => {
  beforeEach(() => {
    cy.visit('queue');

    // перед манипуляциями со стеком убеждаемся, что инпут не заблокирован
    cy.get('input').should('not.have.attr', 'disabled');
  });

  it('При пустом инпуте кнопка добавления недоступна', () => {
    cy.get('input').should('not.have.value');
    cy.get('button').contains('Добавить').parent().should('be.disabled');
  });


  it('Элементы правильно добавляются в стек', () => {
    const numTests = getRandomInt(3, 7);
    for (let i = 0; i < numTests; i++) {
      // для удобства будем заполнять круги соответствующими индексами
      const inputText = i.toString();
      cy.get('input').type(inputText);
      cy.get('button').contains('Добавить').click();

      // на 1м шаге круг пуст
      cy.get('ul').find('li').eq(i).find('p').first()
        .should('have.text', '');
      // а цвет круга - розовый
      cy.get('ul').find('li').find('div > div:nth-child(2)').eq(i).as('circle')
        .should('have.css', 'border-color', COLOR_CHANGING);

      // на 2м шаге добавляется содержимое и надпись tail
      if (i > 0) {
        cy.get('ul').find('li').eq(i)
          .should('have.text', `${i}${i}tail`);
      } else {
      // а если это 1й добавляемый элемент - то еще и head
      cy.get('ul').find('li').eq(i)
        .should('have.text', `head${i}${i}tail`);
      }

      // на 3м шаге круг становится синим
      cy.get('@circle').should('have.css', 'border-color', COLOR_DEFAULT);
    }
  });


  it('Элементы правильно удаляются из стека', () => {
    // добавляем в стек рандомное кол-во элементов для примера
    const numItems = getRandomInt(3, 7);
    for (let i = 0; i < numItems; i++) {
      // для удобства будем заполнять круги соответствующими индексами
      const inputText = i.toString();
      cy.get('input').type(inputText);
      cy.get('button').contains('Добавить').click();

      // проверяем, что круг после добавления стал синим, чтоб не нарушить последующих тестов
      cy.get('ul').find('li').eq(i).find('div > div:nth-child(2)')
      .should('have.css', 'border-color', COLOR_DEFAULT);
    }

    for (let i = 0; i < numItems; i++) {
      cy.get('button').contains('Удалить').click();
      
      // 1й шаг удаления - круг розовый и имеет над собой head
      cy.get('ul').find('li').eq(i).find('div > div:nth-child(2)')
        .should('have.css', 'border-color', COLOR_CHANGING);

      // пока не дойдем до последнего элемента:
      if (i < numItems - 1) {
        // на 2м шаге - надпись head перемещается
        cy.get('ul').find('li').eq(i + 1).find('div > div').first()
          .should('have.text', 'head');
        cy.get('ul').find('li').eq(i + 1).find('div > div:nth-child(2)')
          .should('have.css', 'border-color', COLOR_DEFAULT);

        // у удаленного круга остается только индекс
        cy.get('ul').find('li').eq(i)
          .should('have.text', `${i}`);
      }
    }

  });


  it('Кнопка "Очистить" корректно очищает стек', () => {
    // добавляем в стек рандомное кол-во элементов для примера
    const numItems = getRandomInt(3, 7);
    for (let i = 0; i < numItems; i++) {
      // для удобства будем заполнять круги соответствующими индексами
      const inputText = i.toString();
      cy.get('input').type(inputText);
      cy.get('button').contains('Добавить').click();

      // проверяем, что круг после добавления стал синим, чтоб не нарушить последующих тестов
      cy.get('ul').find('li').eq(i).find('div > div:nth-child(2)')
      .should('have.css', 'border-color', COLOR_DEFAULT);
    }

    cy.get('button').contains('Очистить').click();
    // TODO - добавить Custom Commands тут и в других местах
    // после удаления всех элементов все круги должны быть пусты
    cy.get('ul').find('li').find('p').first()
        .should('have.text', '');
    // и не должно быть надписей head и tail
    cy.get('ul').find('li').find('div > div')
      .should('have.text', '');
  });
})