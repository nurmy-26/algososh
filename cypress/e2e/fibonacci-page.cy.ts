import { COLOR_DEFAULT } from "../support/constants";
import { getRandomInt } from "../../src/utils/helpers/random";
import getFibonacciSeries from "../../src/components/fibonacci-page/algorithm";


function checkFibonacciNumbers(maxLength: number) {
  for (let i = 0; i < maxLength; i++) {
    cy.getCircleList().eq(i).find('div > div:nth-child(2)')
      .should('have.text', getFibonacciSeries(maxLength)[i]).and('have.css', 'border-color', COLOR_DEFAULT);
  }
}

describe('Fibonacci Page', () => {
  beforeEach(() => {
    cy.visit('fibonacci');
  });

  it('Кнопка добавления недоступна при пустом инпуте', () => {
    cy.checkIfInputHaveNoValue();
    cy.checkIfButtonDisabled('Рассчитать');
  });

  it('Числа корректно генерируются', () => {
    // до нажатия на кнопку список пуст
    cy.getCircleList().should('not.exist');
    
    // вводим рандомное число из промежутка 1-19
    const inputText = getRandomInt(1, 19).toString();
    const maxFibonacciLength = Number(inputText) + 1;

    cy.get('input').type(inputText);
    cy.get('button').contains('Рассчитать').click();

    // проверяем, что длина списка в начале генерации чисел равна 1
    cy.checkListLength(1);

    // проверяем корректность генерации чисел с помощью функции
    checkFibonacciNumbers(maxFibonacciLength);

    // в конце проверяем, что длина списка соответствует требуемой
    cy.checkListLength(maxFibonacciLength);
  });
})