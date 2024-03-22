import { COLOR_CHANGING, COLOR_DEFAULT, COLOR_MODIFIED } from "../support/constants";


const startArr = [0, 34, 8, 1];
const startLength = startArr.length;
const inputValue = '50';

describe('List Page', () => {
  beforeEach(() => {
    cy.visit('list');
  });

  it('При пустом инпуте значения недоступны все кнопки "добавить"', () => {
    cy.checkIfInputHaveNoValue('Введите значение');
    cy.checkIfAllButtonsDisabled('Добавить');
  });

  it('При пустом инпуте индекса недоступны все кнопки "по индексу"', () => {
    cy.checkIfInputHaveNoValue('Введите индекс');
    cy.checkIfAllButtonsDisabled('по индексу');
  });

  it('Правильно отрисовывается дефолтный список', () => {
    // проверяем длину стартового списка и что все кружки синие
    cy.checkListLength(startLength);
    cy.getCircleList().find('div > div:nth-child(2)')
      .should('have.css', 'border-color', COLOR_DEFAULT);

    // проверка надписи "head" над первым кружком
    cy.getCircleList().first().find('div > div').first()
      .should('have.text', 'head');

    // проверка надписи "tail" над последним кружком
    cy.getCircleList().last().find('div > div').last()
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

    cy.removeItem(
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

    cy.removeItem(
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

    cy.removeItem(
      startLength, 
      indexValue, 
      buttonName, 
      COLOR_CHANGING, 
      COLOR_DEFAULT
    );
  });

})