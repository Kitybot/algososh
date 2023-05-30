describe(
	'Компонент Связнный список',
	() => {
  
	beforeEach(() => {
	  cy.viewport(1280, 900);
	  cy.visit('localhost:3000');
	  cy.get('a[href*="list"]').click();
	});
  
	it('Доступность кнопок', () => {  
	  cy.get('input[placeholder="Введите значение"]').should('have.value', '');
	  cy.get('input[placeholder="Введите индекс"]').should('have.value', '');
	  cy.contains('Добавить в head').should('be.disabled');
	  cy.contains('Добавить в tail').should('be.disabled');
	  cy.contains('Добавить по индексу').should('be.disabled');
	  cy.contains('Удалить по индексу').should('be.disabled');
	  cy.get('input[placeholder="Введите значение"]').type('aaaa');
	  cy.contains('Добавить в head').should('be.enabled');
	  cy.contains('Добавить в tail').should('be.enabled');
	  cy.contains('Добавить по индексу').should('be.disabled');
	  cy.contains('Удалить по индексу').should('be.disabled');
	  cy.get('input[placeholder="Введите индекс"]').type('1');
	  cy.contains('Добавить в head').should('be.enabled');
	  cy.contains('Добавить в tail').should('be.enabled');
	  cy.contains('Добавить по индексу').should('be.enabled');
	  cy.contains('Удалить по индексу').should('be.enabled');
	  cy.get('input[placeholder="Введите значение"]').clear();
	  cy.contains('Добавить в head').should('be.disabled');
	  cy.contains('Добавить в tail').should('be.disabled');
	  cy.contains('Добавить по индексу').should('be.disabled');
	  cy.contains('Удалить по индексу').should('be.enabled');
	});
  
	it('Отображение дефолтного списка', () => {
	  let number: number = 0;
	  cy.get('p[data-testid="text-in-circle"]')
		.should('have.length.greaterThan', 3)
		.and('have.length.lessThan', 7)
		.each((item) => {
		  cy.wrap(item).should('not.be.empty');
		})
		.parent()
		.each((item) => {
		  cy.wrap(item).should('have.css', 'border-color', 'rgb(0, 50, 255)');
		})
		.prev()
		.each((item, index) => {
		  if (index === 0) {
			cy.wrap(item).should('have.text', 'head');
		  } else {
			cy.wrap(item).should('be.empty');
		  }
		})
		.next().next()
		.each((item, index) => {
		  cy.wrap(item).should('have.text', `${index}`);
		  number += 1;
		})
		.next()
		.each((item, index) => {
		  if (index < (number - 1)) {
			cy.wrap(item).should('be.empty');
		  } else {
			cy.wrap(item).should('have.text', 'tail');
		  }
		});
	});
  
	it('Добавление элемента в head', () => {
	  cy.get('input[placeholder="Введите значение"]').type('aaa');
	  cy.contains('Добавить в head').click();
	  // первая анимация: вместо head появляется маленький круг с вводимым значением
	  cy.get('#circlesContainer')
		.children().first()
		.contains('aaa')
		.parent()
		.should('have.css', 'border-color', 'rgb(210, 82, 225)')
		.and('have.css', 'width', '56px')
		.parent().parent()
		.next()
		.should('have.css', 'border-color', 'rgb(0, 50, 255)')
	  // вторая анимация: на первое место ставится подсвеченный круг с вводимым значением
	  cy.wait(500)
		.then(() => {})
		.get('p[data-testid="text-in-circle"]')
		.each((item, index) => {
		  switch (index) {
			case 0:
			  cy.wrap(item)
				.should('have.text', 'aaa')
				.parent()
				.should('have.css', 'border-color', 'rgb(127, 224, 81)')
				.prev()
				.should('have.text', 'head')
				.next().next()
				.should('have.text', '0')
				.next()
				.should('be.empty');
			  break
			case 1:
			  cy.wrap(item)
				.parent()
				.should('have.css', 'border-color', 'rgb(0, 50, 255)')
				.next()
				.should('have.text', '1');
			  break
			default:
			  break
		  }
		})
	  // третья анимация: первый круг с введенным значением принимает обычную окраску границы
	  cy.wait(500)
		.then(() => {})
		.get('p[data-testid="text-in-circle"]')
		.first()
		.parent()
		.should('have.css', 'border-color', 'rgb(0, 50, 255)')
	});
  
	it('Добавление элемента в tail', () => {
	  cy.get('input[placeholder="Введите значение"]').type('aaa');
	  cy.contains('Добавить в tail').click();
	  // первая анимация: вместо tail появляется маленький круг с вводимым значением
	  cy.get('#circlesContainer')
		.children().last()
		.contains('aaa')
		.parent()
		.should('have.css', 'border-color', 'rgb(210, 82, 225)')
		.and('have.css', 'width', '56px')
		.parent().parent()
		.next()
		.should('have.css', 'border-color', 'rgb(0, 50, 255)');
	  // вторая анимация: на последнее место ставится подсвеченный круг с вводимым значением
	  cy.wait(500)
		.then(() => {})
		.get('p[data-testid="text-in-circle"]')
		.last()
		.should('have.text', 'aaa')
		.parent()
		.should('have.css', 'border-color', 'rgb(127, 224, 81)')
		.prev()
		.should('be.empty')
		.next().next().next()
		.should('have.text', 'tail')
		.parent().parent()
		.prev().children().first().children().eq(1)
		.should('have.css', 'border-color', 'rgb(0, 50, 255)')
	  // третья анимация: первый круг с введенным значением принимает обычную окраску границы
	  cy.wait(500)
		.then(() => {})
		.get('p[data-testid="text-in-circle"]')
		.last()
		.parent()
		.should('have.css', 'border-color', 'rgb(0, 50, 255)')
	});
  
	it('Добавление элемента по индексу', () => {
	  cy.get('input[placeholder="Введите значение"]').type('aaa');
	  cy.get('input[placeholder="Введите индекс"]').type('2');
	  cy.contains('Добавить по индексу').click();
	  // первая анимация: над первым кругом вместо head появляется маленький круг с 
	  // вводимым значением
	  cy.get('#circlesContainer')
		.children().first()
		.contains('aaa')
		.parent()
		.should('have.css', 'border-color', 'rgb(210, 82, 225)')
		.and('have.css', 'width', '56px')
		.parent().parent()
		.next()
		.should('have.css', 'border-color', 'rgb(0, 50, 255)');
	  // вторая анимация: переход маленького круга с вводимым значением на второй круг
	  cy.wait(500)
		.then(() => {})
		.get('#circlesContainer')
		.children().first()
		.children().first()
		.children().first()
		.should('have.text', 'head')
		.next()
		.should('have.css', 'border-color', 'rgb(210, 82, 225)')
		.get('#circlesContainer')
		.children().eq(1)
		.contains('aaa')
		.parent()
		.should('have.css', 'border-color', 'rgb(210, 82, 225)')
		.and('have.css', 'width', '56px')
		.parent().parent()
		.next()
		.should('have.css', 'border-color', 'rgb(0, 50, 255)');
	  // третья анимация: переход маленького круга с вводимым значением на третий круг
	  cy.wait(500)
		.then(() => {})
		.get('#circlesContainer')
		.children().first()
		.children().first()
		.children().first()
		.should('have.text', 'head')
		.next()
		.should('have.css', 'border-color', 'rgb(210, 82, 225)')
		.get('#circlesContainer')
		.children().eq(1)
		.children().first()
		.children().first()
		.should('be.empty')
		.next()
		.should('have.css', 'border-color', 'rgb(210, 82, 225)')
		.get('#circlesContainer')
		.children().eq(2)
		.contains('aaa')
		.parent()
		.should('have.css', 'border-color', 'rgb(210, 82, 225)')
		.and('have.css', 'width', '56px')
		.parent().parent()
		.next()
		.should('have.css', 'border-color', 'rgb(0, 50, 255)');
	  // третья анимация: на третье место ставится новый подсвеченный круг с новым значением
	  cy.wait(500)
		.then(() => {})
		.get('#circlesContainer')
		.children().first()
		.children().first()
		.children().first()
		.should('have.text', 'head')
		.next()
		.should('have.css', 'border-color', 'rgb(210, 82, 225)')
		.get('#circlesContainer')
		.children().eq(1)
		.children().first()
		.children().first()
		.should('be.empty')
		.next()
		.should('have.css', 'border-color', 'rgb(210, 82, 225)')
		.get('#circlesContainer')
		.children().eq(2)
		.children().first()
		.children().first()
		.should('be.empty')
		.next()
		.should('have.css', 'border-color', 'rgb(127, 224, 81)')
		.children().first()
		.should('have.text', 'aaa');
	  // четвёртая анимация: все элементы получают дефолтный цвет
	  cy.get('p[data-testid="text-in-circle"]')
		.parent()
		.each((item) => {
		  cy.wrap(item).should('have.css', 'border-color', 'rgb(0, 50, 255)');
		})
		.next()
		.each((item, index) => {
		  cy.wrap(item).should('have.text', `${index}`);
		})
	});
  
	it('Удаление элемента из head', { env: {} }, () => {
	  cy.get('p[data-testid="text-in-circle"]')
		.then((elements) => {
		  Cypress.env({'numberOfElements': elements.length})
		})
		.first()
		.then((paragrafInCircle) => {
		  Cypress.env('textInCircle', paragrafInCircle.text());
		})
	  cy.contains('Удалить из head').click()
		.get('#circlesContainer')
		.children().first()
		.children().first()
		.children().eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)')
		.children().should('be.empty')
		.parent()
		.next().next()
		.children().first()
		.children().eq(1).should('have.css', 'border-color', 'rgb(210, 82, 225)')
		.and('have.css', 'width', '56px')
		.children().then((paragraf) => {
		  cy.wrap(paragraf).should('have.text', Cypress.env("textInCircle"));
		})
	  cy.wait(500)
		.then(() => {})
		.get('p[data-testid="text-in-circle"]')
		.then((elements) => {
		  cy.wrap(elements).should('have.length', Cypress.env('numberOfElements') - 1)
		})
	});
  
	it('Удаление элемента из tail', { env: {} }, () => {
	  cy.get('p[data-testid="text-in-circle"]')
		.then((elements) => {
		  Cypress.env({'numberOfElements': elements.length})
		})
		.last()
		.then((paragrafInCircle) => {
		  Cypress.env('textInCircle', paragrafInCircle.text());
		})
	  cy.contains('Удалить из tail').click()
		.get('#circlesContainer')
		.children().last()
		.children().first()
		.children().eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)')
		.children().should('be.empty')
		.parent()
		.next().next()
		.children().first()
		.children().eq(1).should('have.css', 'border-color', 'rgb(210, 82, 225)')
		.and('have.css', 'width', '56px')
		.children().then((paragraf) => {
		  cy.wrap(paragraf).should('have.text', Cypress.env("textInCircle"));
		})
	  cy.wait(500)
		.then(() => {})
		.get('p[data-testid="text-in-circle"]')
		.then((elements) => {
		  cy.wrap(elements).should('have.length', Cypress.env('numberOfElements') - 1)
		})
	});
  
	it('Удаление элемента по индексу', { env: {} }, () => {
	  cy.get('p[data-testid="text-in-circle"]')
		.then((elements) => {
		  Cypress.env({'numberOfElements': elements.length})
		})
		.eq(2)
		.then((paragrafInCircle) => {
		  Cypress.env('textInCircle', paragrafInCircle.text());
		});
	  cy.get('input[placeholder="Введите индекс"]').type('2');
	  cy.contains('Удалить по индексу').click();
	  cy.get('p[data-testid="text-in-circle"]')
		.parent()
		.each((item, index) => {
		  if (index === 0) {
			cy.wrap(item).should('have.css', 'border-color', 'rgb(210, 82, 225)');
		  } else {
			cy.wrap(item).should('have.css', 'border-color', 'rgb(0, 50, 255)');
		  }
		});
	  cy.wait(500)
		.then(() => {})
		.get('p[data-testid="text-in-circle"]')
		.parent()
		.each((item, index) => {
		  if (index === 0 || index === 1) {
			cy.wrap(item).should('have.css', 'border-color', 'rgb(210, 82, 225)');
		  } else {
			cy.wrap(item).should('have.css', 'border-color', 'rgb(0, 50, 255)');
		  }
		});
	  cy.wait(500)
		.then(() => {})
		.get('p[data-testid="text-in-circle"]')
		.parent()
		.each((item, index) => {
		  if (index === 0 || index === 1 || index === 2) {
			cy.wrap(item).should('have.css', 'border-color', 'rgb(210, 82, 225)');
		  } else {
			cy.wrap(item).should('have.css', 'border-color', 'rgb(0, 50, 255)');
		  }
		});
	  cy.wait(500)
		.then(() => {})
		.get('#circlesContainer')
		.children().eq(2)
		.children().first()
		.children().eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)')
		.children().should('be.empty')
		.parent()
		.next().next()
		.children().first()
		.children().eq(1).should('have.css', 'border-color', 'rgb(210, 82, 225)')
		.and('have.css', 'width', '56px')
		.children().then((paragraf) => {
		  cy.wrap(paragraf).should('have.text', Cypress.env("textInCircle"));
		});
	  cy.wait(500)
		.then(() => {})
		.get('p[data-testid="text-in-circle"]')
		.parent()
		.each((item, index) => {
		  if (index === 0 || index === 1) {
			cy.wrap(item).should('have.css', 'border-color', 'rgb(210, 82, 225)');
		  } else {
			cy.wrap(item).should('have.css', 'border-color', 'rgb(0, 50, 255)');
		  }
		});
	  cy.wait(500)
		.then(() => {})
		.get('p[data-testid="text-in-circle"]')
		.then((elements) => {
		  cy.wrap(elements).should('have.length', Cypress.env('numberOfElements') - 1)
		})
		.parent()
		.each((item) => {
			cy.wrap(item).should('have.css', 'border-color', 'rgb(0, 50, 255)');
		});
	});
  });