import { ADD_BTN_NAME, BIG_CIRCLE_SELECTOR, COLOR_CHANGING, COLOR_DEFAULT, COLOR_MODIFIED, 
  DOWN_CIRCLE_SELECTOR, UP_CIRCLE_SELECTOR } from "../support/constants";


const startArr = [0, 34, 8, 1];
const startLength = startArr.length;
const inputValue = '50';

describe('List Page', () => {
  beforeEach(() => {
    cy.visit('list');
  });

  it('При пустом инпуте значения недоступны все кнопки "добавить"', () => {
    cy.checkIfInputHaveNoValue('Введите значение');
    cy.checkIfAllButtonsDisabled(ADD_BTN_NAME);
  });

  it('При пустом инпуте индекса недоступны все кнопки "по индексу"', () => {
    cy.checkIfInputHaveNoValue('Введите индекс');
    cy.checkIfAllButtonsDisabled('по индексу');
  });

  it('Правильно отрисовывается дефолтный список', () => {
    // проверяем длину стартового списка и что все кружки синие
    cy.checkListLength(startLength);
    cy.getCircleList().find(BIG_CIRCLE_SELECTOR)
      .should('have.css', 'border-color', COLOR_DEFAULT);

    // проверка надписи "head" над первым кружком
    cy.getCircleList().first().find(UP_CIRCLE_SELECTOR)
      .should('have.text', 'head');

    // проверка надписи "tail" под последним кружком
    cy.getCircleList().last().find(DOWN_CIRCLE_SELECTOR)
      .should('have.text', 'tail');

    // проверка содержимого каждого кружка
    cy.getCircleList().each((li, index) => {
      cy.wrap(li).find('p').first().should('have.text', startArr[index].toString());
      cy.wrap(li).find('p').last().should('have.text', index.toString());
    })
  })

  it('Элемент правильно добавляется в head', () => {
    const indexValue = 0; // так как head - нулевой элемент
    const buttonName = 'Добавить в head';

    cy.addListItem(
      startLength,
      inputValue,
      indexValue,
      buttonName,
      COLOR_DEFAULT,
      COLOR_CHANGING,
      COLOR_MODIFIED
    );
  });

  it('Элемент правильно добавляется в tail', () => {
    const indexValue = startLength - 1; // так как tail - последний элемент
    cy.log(indexValue.toString())
    const buttonName = 'Добавить в tail';

    cy.addListItem(
      startLength,
      inputValue,
      indexValue,
      buttonName,
      COLOR_DEFAULT,
      COLOR_CHANGING,
      COLOR_MODIFIED
    );
  })

  it('Элемент правильно добавляется по индексу', () => {
    const indexValue = 1; // индекс для примера
    const buttonName = 'Добавить по индексу';

    cy.addListItem(
      startLength,
      inputValue,
      indexValue,
      buttonName,
      COLOR_DEFAULT,
      COLOR_CHANGING,
      COLOR_MODIFIED,
      true
    );
  })

  it('Элемент правильно удаляется из head', () => {
    const indexValue = 0; // так как head - нулевой элемент
    const buttonName = 'Удалить из head';

    cy.removeListItem(
      startLength, 
      indexValue, 
      buttonName, 
      COLOR_CHANGING, 
      COLOR_DEFAULT
    );
  });

  it('Элемент правильно удаляется из tail', () => {
    const indexValue = startLength - 1; // так как tail - последний элемент
    const buttonName = 'Удалить из tail';

    cy.removeListItem(
      startLength, 
      indexValue, 
      buttonName, 
      COLOR_CHANGING, 
      COLOR_DEFAULT
    );
  })


  it('Элемент правильно удаляется по индексу', () => {
    const indexValue = 2; // индекс для примера
    const buttonName = 'Удалить по индексу';

    cy.removeListItem(
      startLength, 
      indexValue, 
      buttonName, 
      COLOR_CHANGING, 
      COLOR_DEFAULT
    );
  });

})