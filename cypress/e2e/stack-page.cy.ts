import { COLOR_CHANGING, COLOR_DEFAULT } from "../support/constants";
import { getRandomInt } from "../../src/utils/helpers/random";


describe('Stack Page', () => {
  beforeEach(() => {
    cy.visit('stack');

    // перед манипуляциями со стеком убеждаемся, что он пуст
    cy.get('ul').find('li').should('not.exist');
    // а инпут не заблокирован
    cy.get('input').should('not.have.attr', 'disabled');
  });

  it('При пустом инпуте кнопки недоступны', () => {
    cy.get('input').should('not.have.value');
    cy.get('button').contains('Добавить').parent().should('be.disabled');

    // так как стек еще пуст, остальные кнопки также должныбыть недоступны
    cy.get('button').contains('Удалить').parent().should('be.disabled');
    cy.get('button').contains('Очистить').parent().should('be.disabled');
  });


  it('Элементы правильно добавляются в стек', () => {
    const numTests = getRandomInt(3, 8); // количество добавляемых элементов в стек (и тестов)
    for (let i = 0; i < numTests; i++) {
      // для удобства будем заполнять круги соответствующими индексами
      const inputText = i.toString();
      cy.get('input').type(inputText);
      cy.get('button').contains('Добавить').click();

      // на каждом шаге длина стека равна числу добавленных элементов
      cy.get('ul').find('li').should('have.length', i+1);

      // на 1м шаге у текущего добавляемого элемента есть надпись top и совпадают текст в круге и индекс
      cy.get('ul').find('li').eq(i)
        .should('have.text', `top${i}${i}`);
      // а цвет круга - розовый
      cy.get('ul').find('li').find('div > div:nth-child(2)').eq(i).as('circle')
        .should('have.text', `${i}`).and('have.css', 'border-color', COLOR_CHANGING);

      // на 2м шаге меняется только цвет
      cy.get('@circle').should('have.text', `${i}`).and('have.css', 'border-color', COLOR_DEFAULT);
    }

    // в конце проверяем, что длина списка соответствует кол-ву введенных элементов
    cy.get('ul').find('li').should('have.length', numTests);
  });


  it('Элементы правильно удаляются из стека', () => {
    // добавляем в стек рандомное кол-во элементов для примера
    const numItems = getRandomInt(3, 8);
    for (let i = 0; i < numItems; i++) {
      // для удобства будем заполнять круги соответствующими индексами
      const inputText = i.toString();
      cy.get('input').type(inputText);
      cy.get('button').contains('Добавить').click();

      // проверяем, что круг после добавления стал синим, чтоб не нарушить последующих тестов
      cy.get('ul').find('li').eq(i).find('div > div:nth-child(2)')
      .should('have.css', 'border-color', COLOR_DEFAULT);
    }

    // проверяем, что длина списка соответствует кол-ву введенных элементов
    cy.get('ul').find('li').should('have.length', numItems);

    for (let i = 0; i < numItems; i++) {
      cy.get('button').contains('Удалить').click();
      
      // 1й шаг удаления - круг розовый
      cy.get('ul').find('li').eq(numItems - (i + 1)).find('div > div:nth-child(2)')
        .should('have.css', 'border-color', COLOR_CHANGING);

      // пока не дойдем до последнего элемента:
      if (i < numItems - 1) {
        // на 2м шаге - надпись top перемещается
        cy.get('ul').find('li').eq(numItems - (i + 2)).find('div > div').first()
        .should('have.text', 'top');
        cy.get('ul').find('li').eq(numItems - (i + 2)).find('div > div:nth-child(2)')
        .should('have.css', 'border-color', COLOR_DEFAULT);
      }

      // на каждом шаге проверяем, что длина стека сокращается
      cy.get('ul').find('li').should('have.length', numItems - (i+1));
    }

    // после удаления всех элементов стек должен остаться пустым
    cy.get('ul').find('li').should('not.exist');
  });


  it('Кнопка "Очистить" корректно очищает стек', () => {
    // добавляем в стек рандомное кол-во элементов для примера
    const numItems = getRandomInt(3, 8);
    for (let i = 0; i < numItems; i++) {
      // для удобства будем заполнять круги соответствующими индексами
      const inputText = i.toString();
      cy.get('input').type(inputText);
      cy.get('button').contains('Добавить').click();
      
      // каждый раз дожидаемся, чтобы круг стал синим, для корректности анимаций
      cy.get('ul').find('li').eq(i).find('div > div:nth-child(2)')
      .should('have.css', 'border-color', COLOR_DEFAULT);
    }

    cy.get('button').contains('Очистить').click();
    // после удаления всех элементов стек должен остаться пустым
    cy.get('ul').find('li').should('not.exist');
  });
})