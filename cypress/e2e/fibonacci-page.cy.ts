import { COLOR_DEFAULT } from "../support/constants";
import { getRandomInt } from "../../src/utils/helpers/random";
import getFibonacciSeries from "../../src/components/fibonacci-page/algorithm";


function checkFibonacciNumbers(maxLength: number) {
  for (let i = 0; i < maxLength; i++) {
    cy.get('@circleList').eq(i).find('div > div:nth-child(2)')
      .should('have.text', getFibonacciSeries(maxLength)[i]).and('have.css', 'border-color', COLOR_DEFAULT);
  }
}

describe('Fibonacci Page', () => {
  beforeEach(() => {
    cy.visit('fibonacci');
  });

  it('Кнопка добавления недоступна при пустом инпуте', () => {
    cy.get('input').should('not.have.value');
    cy.get('button').should('be.disabled');
  });

  it('Числа корректно генерируются', () => {
    // вводим рандомное число из промежутка 1-19
    const inputText = getRandomInt(1, 19).toString();
    const maxFibonacciLength = Number(inputText) + 1;

    cy.get('input').type(inputText);
    cy.get('button').contains('Рассчитать').click();

    // даем псевдоним списку и проверяем, что его длина соответствует длине введенной строки
    cy.get('ul').find('li').as('circleList').should('have.length', 1);

    // проверяем корректность генерации чисел
    // cy.get('@circleList').eq(0).find('div > div:nth-child(2)')
    //   .should('have.text', '1').and('have.css', 'border-color', COLOR_DEFAULT);
    // cy.get('@circleList').eq(1).find('div > div:nth-child(2)')
    //   .should('have.text', '1').and('have.css', 'border-color', COLOR_DEFAULT);
    // cy.get('@circleList').eq(2).find('div > div:nth-child(2)')
    //   .should('have.text', '2').and('have.css', 'border-color', COLOR_DEFAULT);
    // cy.get('@circleList').eq(3).find('div > div:nth-child(2)')
    //   .should('have.text', '3').and('have.css', 'border-color', COLOR_DEFAULT);
    // cy.get('@circleList').eq(4).find('div > div:nth-child(2)')
    //   .should('have.text', '5').and('have.css', 'border-color', COLOR_DEFAULT);
    // cy.get('@circleList').eq(5).find('div > div:nth-child(2)')
    //   .should('have.text', '8').and('have.css', 'border-color', COLOR_DEFAULT);

    // проверяем корректность генерации чисел с помощью функции
    checkFibonacciNumbers(maxFibonacciLength);

    cy.get('@circleList').should('have.length', maxFibonacciLength);
  });
})