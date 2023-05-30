import { textInCircleSelector } from '../constants';
import { linkToFibonacci } from '../constants';

const inputPlaceholder = 'input[placeholder="Введите число"]';
const buttonName = 'Рассчитать';

describe('Компонент Последовательность Фибоначчи', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.get(linkToFibonacci).click();
  });

  it('Доступность кнопки Рассчитать', () => {
    cy.get(inputPlaceholder).should('be.empty');
    cy.contains(buttonName).should('be.disabled');
    cy.get(inputPlaceholder).type('10');
    cy.contains(buttonName).should('be.enabled');
  });

  it('Правильная генерация чисел', () => {
    const array: number[] = [];
    cy.get(inputPlaceholder).type('19');
    cy.contains(buttonName).click();
    cy.get(textInCircleSelector, {timeout: 20000})
      .should('have.length', '20')
      .each((item, index) => {
        if (index === 0 || index === 1) {
          cy.wrap(item).should('have.text', '1');
          array.push(1);
        } else {
          array.push(array[index -2] + array[index - 1]);
          cy.wrap(item).should('have.text', `${array[index]}`);
        }
      });
  });
  
});