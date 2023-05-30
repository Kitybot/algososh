import { 
  textInCircleSelector, 
  circlDefaultColor, 
  linkToStackPage, 
} from '../constants';

const inputTextPlaceholder = 'input[placeholder="Введите текст"]';
const buttonAddName = 'Добавить';
const buttonDeleteName = 'Удалить';
const buttonClearName = 'Очистить';

describe('Компонент Стек', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.get(linkToStackPage).click();
  });

  it('Доступность кнопки Добавить', () => {
    cy.get(inputTextPlaceholder).should('be.empty');
    cy.contains(buttonAddName).should('be.disabled');
    cy.get(inputTextPlaceholder).type('s');
    cy.contains(buttonAddName).should('be.enabled');
  });

  it('Добавление элемента в стек', () => {
    cy.get(inputTextPlaceholder).type('a');
    cy.contains(buttonAddName).click();
    cy.get(textInCircleSelector)
      .parent()
      .should('have.length', '1')
      .and('have.css', 'border-color', 'rgb(210, 82, 225)')
      .and('have.text', 'a')
      .prev()
      .should('have.text', 'top');
    cy.wait(500)
      .then(() => {})
      .get(textInCircleSelector)
      .parent()
      .should('have.css', 'border-color', circlDefaultColor)
      .next()
      .should('have.text', '0');
    cy.get(inputTextPlaceholder).type('b');
    cy.contains(buttonAddName).click();
    cy.get(textInCircleSelector)
      .should('have.length', '2')
      .each((item, index) => {
        if (index === 0) {
          cy.wrap(item)
            .should('have.text', 'a')
            .parent()
            .should('have.css', 'border-color', circlDefaultColor)
            .prev()
            .should('be.empty')
            .next().next()
            .should('have.text', `${index}`);
        }
        if (index === 1) {
          cy.wrap(item)
            .should('have.text', 'b')
            .parent()
            .should('have.css', 'border-color', 'rgb(210, 82, 225)')
            .prev()
            .should('have.text', 'top')
            .next().next()
            .should('have.text', `${index}`);
        }
      });
    cy.wait(500)
      .then(() => {})
      .get(textInCircleSelector)
      .parent()
      .eq(1)
      .should('have.css', 'border-color', circlDefaultColor);
  });

  it('Удаление элемента из стека', () => {
    cy.get(inputTextPlaceholder).type('a');
    cy.contains(buttonAddName).click();
    cy.contains(buttonDeleteName).should('be.enabled');
    cy.get(inputTextPlaceholder).type('b');
    cy.contains(buttonAddName).click();
    cy.contains(buttonDeleteName).should('be.enabled').click();
    cy.get(textInCircleSelector)
      .each((item, index) => {
        if (index === 0) {
          cy.wrap(item)
            .should('have.text', 'a')
            .parent()
            .should('have.css', 'border-color', circlDefaultColor)
            .prev()
            .should('be.empty')
            .next().next()
            .should('have.text', `${index}`);
        }
        if (index === 1) {
          cy.wrap(item)
            .should('have.text', 'b')
            .parent()
            .should('have.css', 'border-color', 'rgb(210, 82, 225)')
            .prev()
            .should('have.text', 'top')
            .next().next()
            .should('have.text', `${index}`);
        }
      });
    cy.get(textInCircleSelector, {timeout: 500})
      .should('have.text', 'a')
      .parent()
      .should('have.css', 'border-color', circlDefaultColor)
      .prev()
      .should('have.text', 'top')
      .next().next()
      .should('have.text', `0`);
    cy.contains(buttonDeleteName).click();
    cy.get(textInCircleSelector)
      .parent()
      .should('have.css', 'border-color', 'rgb(210, 82, 225)');
    cy.get(textInCircleSelector, {timeout: 500})
      .should('have.length', '0');
  });

  it('Очистка стека', () => {
    cy.get(inputTextPlaceholder).type('a');
    cy.contains(buttonAddName).click();
    cy.contains(buttonClearName).should('be.enabled');
    cy.get(inputTextPlaceholder).type('b');
    cy.contains(buttonAddName).click();
    cy.contains(buttonClearName).should('be.enabled');
    cy.get(inputTextPlaceholder).type('с');
    cy.contains(buttonAddName).click();
    cy.get(textInCircleSelector).should('have.length', '3');
    cy.contains(buttonClearName).click();
    cy.get(textInCircleSelector).should('have.length', '0');
  });

});