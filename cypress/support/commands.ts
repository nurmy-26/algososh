/// <reference types="cypress" />


declare namespace Cypress {
  interface Chainable {
    navigateAndCheckRoute(name: string, headerText: string): Chainable;

    checkIfInputHaveNoValue(havePlaceholder?: string): Chainable<Element>;
    checkIfButtonDisabled(buttonText: string): Chainable<Element>;
    checkIfAllButtonsDisabled(buttonText: string): Chainable<Element>;

    getCircleList(): Chainable<JQuery<HTMLElement>>;
    checkListLength(expectedLength: number): Chainable<JQuery<HTMLElement>>;
    checkIfQueueCirclesAreEmpty: () => void;

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
    removeItem(
      startLength: number, 
      indexValue: number,
      buttonName: string,
      changingColor: string,
      defaultColor: string
    ): Chainable<Element>;
  }
}

Cypress.Commands.add('navigateAndCheckRoute', (name, headerText) => {
  cy.get(`[data-cy="${name}"]`).click();
  cy.location('pathname').should('eq', `/${name}`);
  cy.get('h3').should('have.text', headerText);
});

Cypress.Commands.add('checkIfInputHaveNoValue', (havePlaceholder = '') => {
  if (havePlaceholder !== '') {
    cy.get(`input[placeholder="${havePlaceholder}"]`).should('not.have.value');
  } else {
    cy.get('input').should('not.have.value');
  }
});

Cypress.Commands.add('checkIfButtonDisabled', (buttonText: string) => {
  cy.get('button').contains(buttonText).parent().should('be.disabled');
});
Cypress.Commands.add('checkIfAllButtonsDisabled', (buttonText: string) => {
  cy.get('button').filter(`:contains("${buttonText}")`).each((button) => {
    cy.wrap(button).should('be.disabled');
  });
});

Cypress.Commands.add('getCircleList', () => {
  return cy.get('ul').find('li')
});

Cypress.Commands.add('checkListLength', (expectedLength: number) => {
  cy.get('ul').find('li').should('have.length', expectedLength);
});

Cypress.Commands.add('checkIfQueueCirclesAreEmpty', () => {
  cy.get('ul').find('li').each((li) => {
    cy.wrap(li).find('p').first().should('have.text', '');
    cy.wrap(li).find('div > div').should('have.text', '');
  });
});


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
    cy.get('input[placeholder="Введите значение"]').type(inputValue);
    if (haveTypedIndex) { cy.get('input[placeholder="Введите индекс"]').type(indexValue.toString()); }
    cy.get('button').contains(buttonName).click();

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

Cypress.Commands.add('removeItem', (
  startLength, 
  indexValue,
  buttonName,
  changingColor,
  defaultColor
) => {
  // сохраняем удаляемое значение в переменную перед удалением
  let elementText: string;
  cy.getCircleList().eq(indexValue).find('div > p').first().as('itemP')
    .then(p => {
      elementText = p.text();
    });

  // удаляем
  cy.get('input[placeholder="Введите индекс"]').type(indexValue.toString());
  cy.get('button').contains(buttonName).click();

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
  // head отображается над 0 элементом, tail над последним
  cy.getCircleList().find('div > div').first().should('have.text', 'head');
  cy.getCircleList().find('div > div').last().should('have.text', 'tail');
});