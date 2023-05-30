describe('Компонент Строка', () => {

	beforeEach(() => {
	  cy.viewport(1280, 900);
	  cy.visit('localhost:3000');
	  cy.get('a[href*="recursion"]').click();
	});
  
	it('Доступность кнопки Добавить', () => {
	  cy.get('input[placeholder="Введите текст"]').should('be.empty');
	  cy.contains('Развернуть').should('be.disabled');
	  cy.get('input[placeholder="Введите текст"]').type('Hallo');
	  cy.contains('Развернуть').should('be.enabled');
	});
  
	it('Разворот Строки', async() => {
	  const string = 'Hallo';
	  cy.get('input[placeholder="Введите текст"]').type(string);
	  cy.contains('Развернуть').click();
	  cy.get('p[data-testid="text-in-circle"]').parent()
		.should('have.length', '5')
		.each((item, index) => {
		  cy.wrap(item)
			.should('have.css', 'border-color', 'rgb(0, 50, 255)')
			.and('have.text', string[index]);
		});
	  cy.wait(1000)
		.then(() => {})
		.get('p[data-testid="text-in-circle"]')
		.parent()
		.each((item, index) => {
		  if (index === 0 || index === 4) {
			cy.wrap(item)
			  .should('have.css', 'border-color', 'rgb(210, 82, 225)')
			  .and('have.text', string[index]);
		  } else {
			cy.wrap(item)
			  .should('have.css', 'border-color', 'rgb(0, 50, 255)')
			  .and('have.text', string[index]);
		  }
		});
	  cy.wait(1000)
		.then(() => {})
		.get('p[data-testid="text-in-circle"]')
		.parent()
		.each((item, index) => {
		  if (index === 0 || index === 4) {
			cy.wrap(item)
			  .should('have.css', 'border-color', 'rgb(127, 224, 81)')
			  .and('have.text', string[string.length - 1 - index]);
		  } else {
			cy.wrap(item)
			  .should('have.css', 'border-color', 'rgb(0, 50, 255)')
			  .and('have.text', string[index]);
		  }
		});
	  cy.wait(1000)
		.then(() => {})
		.get('p[data-testid="text-in-circle"]')
		.parent()
		.each((item, index) => {
		  if (index === 0 || index === 4) {
			cy.wrap(item)
			  .should('have.css', 'border-color', 'rgb(127, 224, 81)')
			  .and('have.text', string[string.length - 1 - index]);
		  } else if (index === 1 || index === 3) {
			cy.wrap(item)
			  .should('have.css', 'border-color', 'rgb(210, 82, 225)')
			  .and('have.text', string[index]);
		  } else {
			cy.wrap(item)
			  .should('have.css', 'border-color', 'rgb(0, 50, 255)')
			  .and('have.text', string[index]);
		  }
		});
	  cy.wait(1000)
		.then(() => {})
		.get('p[data-testid="text-in-circle"]')
		.parent()
		.each((item, index) => {
		  if (index === 0 || index === 1 || index === 3 || index === 4) {
			cy.wrap(item)
			  .should('have.css', 'border-color', 'rgb(127, 224, 81)')
			  .and('have.text', string[string.length - 1 - index]);
		  } else {
			cy.wrap(item)
			  .should('have.css', 'border-color', 'rgb(0, 50, 255)')
			  .and('have.text', string[index]);
		  }
		});
	  cy.wait(1000)
		.then(() => {})
		.get('p[data-testid="text-in-circle"]')
		.parent()
		.each((item, index) => {
		  cy.wrap(item)
			.should('have.css', 'border-color', 'rgb(127, 224, 81)')
			.and('have.text', string[string.length - 1 - index])
		});
	});
  
  });