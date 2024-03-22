/// <reference types="cypress" />


declare namespace Cypress {
  interface Chainable {
    navigateAndCheckRoute(name: string, headerText: string): Chainable;

    checkIfInputHaveNoValue(havePlaceholder?: boolean): Chainable<Element>;
    checkIfButtonDisabled(buttonText: string): Chainable<Element>;

    getCircleList(): Chainable<JQuery<HTMLElement>>;
    checkListLength(expectedLength: number): Chainable<JQuery<HTMLElement>>;
    checkIfQueueCirclesAreEmpty: () => void;
  }
}

Cypress.Commands.add('navigateAndCheckRoute', (name, headerText) => {
  cy.get(`[data-cy="${name}"]`).click();
  cy.location('pathname').should('eq', `/${name}`);
  cy.get('h3').should('have.text', headerText);
});

Cypress.Commands.add('checkIfInputHaveNoValue', (havePlaceholder = false) => {
  if (havePlaceholder) {
    // 
  } else {
    cy.get('input').should('not.have.value');
  }
});

Cypress.Commands.add('checkIfButtonDisabled', (buttonText: string) => {
  cy.get('button').contains(buttonText).parent().should('be.disabled');
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