import { 
	textInCircleSelector, 
	circlDefaultColor, 
	linkToString, 
	circlChangingColor, 
	circleModifiedColor, 
  } from '../constants';
  
  const inputTextSelector = 'input[placeholder="Введите текст"]';
  const buttonName = 'Развернуть';
  
  describe('Компонент Строка', () => {
  
	beforeEach(() => {
	  cy.visit('/');
	  cy.get(linkToString).click();
	});
  
	it('Доступность кнопки Добавить', () => {
	  cy.get(inputTextSelector).should('be.empty');
	  cy.contains(buttonName).should('be.disabled');
	  cy.get(inputTextSelector).type('Hallo');
	  cy.contains(buttonName).should('be.enabled');
	});
  
	it('Разворот Строки', async() => {
	  const string = 'Hallo';
	  cy.get(inputTextSelector).type(string);
	  cy.contains(buttonName).click();
	  cy.get(textInCircleSelector).parent()
		.should('have.length', '5')
		.each((item, index) => {
		  cy.wrap(item)
			.should('have.css', 'border-color', circlDefaultColor)
			.and('have.text', string[index]);
		});
	  cy.wait(1000)
		.then(() => {})
		.get(textInCircleSelector)
		.parent()
		.each((item, index) => {
		  if (index === 0 || index === 4) {
			cy.wrap(item)
			  .should('have.css', 'border-color', circlChangingColor)
			  .and('have.text', string[index]);
		  } else {
			cy.wrap(item)
			  .should('have.css', 'border-color', circlDefaultColor)
			  .and('have.text', string[index]);
		  }
		});
	  cy.wait(1000)
		.then(() => {})
		.get(textInCircleSelector)
		.parent()
		.each((item, index) => {
		  if (index === 0 || index === 4) {
			cy.wrap(item)
			  .should('have.css', 'border-color', circleModifiedColor)
			  .and('have.text', string[string.length - 1 - index]);
		  } else {
			cy.wrap(item)
			  .should('have.css', 'border-color', circlDefaultColor)
			  .and('have.text', string[index]);
		  }
		});
	  cy.wait(1000)
		.then(() => {})
		.get(textInCircleSelector)
		.parent()
		.each((item, index) => {
		  if (index === 0 || index === 4) {
			cy.wrap(item)
			  .should('have.css', 'border-color', circleModifiedColor)
			  .and('have.text', string[string.length - 1 - index]);
		  } else if (index === 1 || index === 3) {
			cy.wrap(item)
			  .should('have.css', 'border-color', circlChangingColor)
			  .and('have.text', string[index]);
		  } else {
			cy.wrap(item)
			  .should('have.css', 'border-color', circlDefaultColor)
			  .and('have.text', string[index]);
		  }
		});
	  cy.wait(1000)
		.then(() => {})
		.get(textInCircleSelector)
		.parent()
		.each((item, index) => {
		  if (index === 0 || index === 1 || index === 3 || index === 4) {
			cy.wrap(item)
			  .should('have.css', 'border-color', circleModifiedColor)
			  .and('have.text', string[string.length - 1 - index]);
		  } else {
			cy.wrap(item)
			  .should('have.css', 'border-color', circlDefaultColor)
			  .and('have.text', string[index]);
		  }
		});
	  cy.wait(1000)
		.then(() => {})
		.get(textInCircleSelector)
		.parent()
		.each((item, index) => {
		  cy.wrap(item)
			.should('have.css', 'border-color', circleModifiedColor)
			.and('have.text', string[string.length - 1 - index])
		});
	});
  
  });