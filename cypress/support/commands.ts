/// <reference types="cypress" />


declare namespace Cypress {
  interface Chainable {
    navigateAndCheckRoute(name: string, headerText: string): Chainable;

    getInput(): Chainable<JQuery<HTMLElement>>;
    typeOnInput(inputText: string): Chainable<JQuery<HTMLElement>>;
    getBtn(): Chainable<JQuery<HTMLElement>>;
    clickBtn(btnName: string | RegExp): Chainable<JQuery<HTMLElement>>;

    checkIfInputHaveNoValue(havePlaceholder?: string): Chainable<Element>;
    checkIfButtonDisabled(buttonText: string): Chainable<Element>;
    checkIfAllButtonsDisabled(buttonText: string): Chainable<Element>;

    getCircleList(): Chainable<JQuery<HTMLElement>>;
    checkListLength(expectedLength: number): Chainable<JQuery<HTMLElement>>;
    checkFilledCirclesLength(expectedLength: number): Chainable<JQuery<HTMLElement>>;
    checkIfQueueCirclesAreEmpty(): Chainable<JQuery<HTMLElement>>;

    checkCircleTextAndColor(circleNumber: number, text: string, color: string): Chainable<Element>;

    addItemsWithForCycle(
      numItems: number,
      bigCircleSelector: string,
      defaultColor: string,
      checkOnlyFilledCircles?: boolean,
      extraActions?: (i: number) => void
    ): Chainable<Element>;

    addListItem(
      startLength: number,
      inputValue: string,
      indexValue: number,
      buttonName: string,
      defaultColor: string,
      changingColor: string,
      modifiedColor: string,
      haveTypedIndex?: boolean
    ): Chainable<Element>;
    removeListItem(
      startLength: number, 
      indexValue: number,
      buttonName: string,
      changingColor: string,
      defaultColor: string
    ): Chainable<Element>;
  }
}

// навигация
Cypress.Commands.add('navigateAndCheckRoute', (name, headerText) => {
  cy.get(`[data-cy="${name}"]`).click();
  cy.location('pathname').should('eq', `/${name}`);
  cy.get('h3').should('have.text', headerText);
});

// простые действия
Cypress.Commands.add('getInput', () => {
  return cy.get('input')
});
Cypress.Commands.add('typeOnInput', (inputText) => {
  cy.getInput().type(inputText);
});
Cypress.Commands.add('getBtn', () => {
  return cy.get('button')
});
Cypress.Commands.add('clickBtn', (btnName) => {
  cy.get('button').contains(btnName).click();
});
Cypress.Commands.add('getCircleList', () => {
  return cy.get('ul').find('li')
});


// простые проверки

Cypress.Commands.add('checkIfInputHaveNoValue', (havePlaceholder = '') => {
  if (havePlaceholder !== '') {
    cy.get(`input[placeholder="${havePlaceholder}"]`).should('not.have.value');
  } else {
    cy.getInput().should('not.have.value');
  }
});

Cypress.Commands.add('checkIfButtonDisabled', (buttonText) => {
  cy.getBtn().contains(buttonText).parent().should('be.disabled');
});
Cypress.Commands.add('checkIfAllButtonsDisabled', (buttonText) => {
  cy.getBtn().filter(`:contains("${buttonText}")`).each((button) => {
    cy.wrap(button).should('be.disabled');
  });
});

Cypress.Commands.add('checkListLength', (expectedLength) => {
  cy.get('ul').find('li').should('have.length', expectedLength);
});
Cypress.Commands.add('checkFilledCirclesLength', (expectedLength) => {
  // проверяем количество больших кругов с текстов (т.е. заполненных)
  cy.get('ul').find('li > div > div:nth-child(2) > p:not(:empty)').should('have.length', expectedLength);
});

Cypress.Commands.add('checkIfQueueCirclesAreEmpty', () => {
  cy.get('ul').find('li').each((li) => {
    cy.wrap(li).find('p').first().should('have.text', '');
    cy.wrap(li).find('div > div:not(:nth-child(3))').each((circle) => {
      cy.wrap(circle).should('have.text', '');
    });
  });
});

Cypress.Commands.add('checkCircleTextAndColor', (circleNumber, text, color) => {
  cy.get(`@circle-${circleNumber}`).should('have.text', text)
    .and('have.css', 'border-color', color);
});


// комплексные команды

// добавить элементы в стек или очередь с помощью цикла
Cypress.Commands.add('addItemsWithForCycle', (
  numItems,
  bigCircleSelector,
  defaultColor,
  checkOnlyFilledCircles = false,
  extraActions
  ) => {
    for (let i = 0; i < numItems; i++) {
      // для удобства будем заполнять круги соответствующими индексами
      const inputText = i.toString();
      cy.typeOnInput(inputText);
      cy.clickBtn('Добавить');

      // дополнительные проверки при необходимости
      if (typeof extraActions !== 'undefined') {
        extraActions(i);
      }

      // на каждом шаге длина стека равна числу добавленных элементов
      if (checkOnlyFilledCircles) {
        cy.checkFilledCirclesLength(i+1);
      } else {
        cy.checkListLength(i+1);
      }

      // проверяем, что круг после добавления стал синим, чтоб не нарушить последующих тестов
      cy.getCircleList().eq(i).find(bigCircleSelector)
        .should('have.css', 'border-color', defaultColor);
    }
});

// добавить в связный список
Cypress.Commands.add('addListItem', (
  startLength, 
  inputValue, 
  indexValue,
  buttonName,
  defaultColor, 
  changingColor, 
  modifiedColor,
  haveTypedIndex = false
  ) => {
    // добавляем элемент
    cy.get('input[placeholder="Введите значение"]').type(inputValue);
    if (haveTypedIndex) { cy.get('input[placeholder="Введите индекс"]').type(indexValue.toString()); }
    cy.clickBtn(buttonName);

    cy.checkListLength(startLength);

    // 1 - добавляемый эл-т появляется вместо head над розовым кружком с индексом indexValue
    cy.getCircleList().eq(indexValue).find('div > p').first()
      .should('have.text', inputValue).parent().should('have.css', 'border-color', changingColor);

    // условие для добавления элемента в конец списка
    if (indexValue === startLength - 1) { indexValue += 1 };

    // 2 - новый элемент рендерится в зеленом кружке, head теперь над ним
    cy.checkListLength(startLength + 1);
    cy.getCircleList().eq(indexValue).find('div > div > p')
      .should('have.text', inputValue).parent().should('have.css', 'border-color', modifiedColor);

    // 3 - кружок становится синим
    cy.getCircleList().eq(indexValue).find('div > div > p')
      .should('have.text', inputValue).parent().should('have.css', 'border-color', defaultColor);
});

// удалить из связного списка
Cypress.Commands.add('removeListItem', (
  startLength, 
  indexValue,
  buttonName,
  changingColor,
  defaultColor
) => {
  // сохраняем удаляемое значение в переменную перед удалением
  let elementText: string;
  cy.getCircleList().eq(indexValue).find('div > p').first().as('itemP')
    .then(p => elementText = p.text());

  // удаляем
  cy.get('input[placeholder="Введите индекс"]').type(indexValue.toString());
  cy.clickBtn(buttonName);

  cy.checkListLength(startLength);

  // 1 - большой круг пустеет
  cy.get('@itemP').should('be.empty')
    // снизу появляется розовый круг
    .parent().next().next().find('div').first().children().eq(1)
    .should('have.css', 'border-color', changingColor)
    // в котором удаленное значение
    .find('p')
    .then(p => cy.wrap(p).should('have.text', elementText));

  // 2 - длина списка соответствует ожидаемой
  cy.checkListLength(startLength - 1);
  // все круги синие
  cy.getCircleList().find('div > div:nth-child(2)').each(circle => {
    cy.wrap(circle).should('have.css', 'border-color', defaultColor);
  });
  // head отображается над 0 элементом, tail под последним
  cy.getCircleList().find('div > div:nth-child(1)').should('have.text', 'head');
  cy.getCircleList().find('div > div:nth-child(4)').should('have.text', 'tail');
});