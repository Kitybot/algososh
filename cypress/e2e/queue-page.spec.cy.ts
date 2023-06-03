import { 
	textInCircleSelector, 
	circlDefaultColor, 
	linkToQueuePage, 
	circlChangingColor
  } from '../constants';
  import { HEAD, TAIL } from '../../src/constants/element-captions';
  
  const inputTextPlaceholder = 'input[placeholder="Введите текст"]';
  const buttonAddText = 'Добавить';
  const buttonDeleteText = 'Удалить';
  const buttonClearText = 'Очистить';
  
  describe('Компонент Очередь', () => {
  
	beforeEach(() => {
	  cy.visit('/');
	  cy.get(linkToQueuePage).click();
	});
  
	it('Доступность кнопки Добавить', () => {
	  cy.get(inputTextPlaceholder).should('be.empty');
	  cy.contains(buttonAddText).should('be.disabled');
	  cy.get(inputTextPlaceholder).type('s');
	  cy.contains(buttonAddText).should('be.enabled');
	});
  
	it('Добавление элемента в очередь', () => {
	  // проверка первичного состояния элементов очереди
	  cy.get(textInCircleSelector)
		.each((item) => {
		  cy.wrap(item).should('be.empty');
		})
		.parent()
		.each((item) => {
		  cy.wrap(item).should('have.css', 'border-color', circlDefaultColor);
		})
		.prev()
		.each((item) => {
		  cy.wrap(item).should('be.empty');
		})
		.next().next()
		.each((item, index) => {
		  cy.wrap(item).should('have.text', `${index}`);
		})
		.next()
		.each((item) => {
		  cy.wrap(item).should('be.empty');
		});
  
	  // добавление первого значения в очередь
	  cy.get(inputTextPlaceholder).type('a');
	  cy.contains(buttonAddText).click();
	  // первый шаг анимации (окрашивание элемента, в который добавляется значение)
	  cy.get(textInCircleSelector)
		.each((item) => {
		  cy.wrap(item).should('be.empty');
		})
		.parent()
		.each((item, index) => {
		  if (index === 0) {
			cy.wrap(item).should('have.css', 'border-color', circlChangingColor);
		  }
		  else {
			cy.wrap(item).should('have.css', 'border-color', circlDefaultColor);
		  }
		})
		.prev()
		.each((item) => {
		  cy.wrap(item).should('be.empty');
		})
		.next().next()
		.each((item, index) => {
		  cy.wrap(item).should('have.text', `${index}`);
		})
		.next()
		.each((item) => {
		  cy.wrap(item).should('be.empty');
		});
	  // второй шаг анимации (внесение значения в элемент, распределение head и tail)
	  cy.get(textInCircleSelector, {timeout: 500})
		.each((item, index) => {
		  if (index === 0) {
			cy.wrap(item).should('have.text', 'a');
		  } else {
			cy.wrap(item).should('be.empty');
		  }
		})
		.parent()
		.each((item, index) => {
		  if (index === 0) {
			cy.wrap(item).should('have.css', 'border-color', circlChangingColor);
		  }
		  else {
			cy.wrap(item).should('have.css', 'border-color', circlDefaultColor);
		  }
		})
		.prev()
		.each((item, index) => {
		  if (index === 0) {
			cy.wrap(item).should('have.text', HEAD);
		  } else {
			cy.wrap(item).should('be.empty');
		  }
		})
		.next().next()
		.each((item, index) => {
		  cy.wrap(item).should('have.text', `${index}`);
		})
		.next()
		.each((item, index) => {
		  if (index === 0) {
			cy.wrap(item).should('have.text', TAIL);
		  } else {
			cy.wrap(item).should('be.empty');
		  }
		});
	  // третий шаг анимации (возврат обычного цвета у элемента, куда добавляли новое значение)
	  cy.get(textInCircleSelector, {timeout: 500})
		.each((item, index) => {
		  if (index === 0) {
			cy.wrap(item).should('have.text', 'a');
		  } else {
			cy.wrap(item).should('be.empty');
		  }
		})
		.parent()
		.each((item) => {
		  cy.wrap(item).should('have.css', 'border-color', circlDefaultColor);
		})
		.prev()
		.each((item, index) => {
		  if (index === 0) {
			cy.wrap(item).should('have.text', HEAD);
		  } else {
			cy.wrap(item).should('be.empty');
		  }
		})
		.next().next()
		.each((item, index) => {
		  cy.wrap(item).should('have.text', `${index}`);
		})
		.next()
		.each((item, index) => {
		  if (index === 0) {
			cy.wrap(item).should('have.text', TAIL);
		  } else {
			cy.wrap(item).should('be.empty');
		  }
		});
  
	  // добавление второго значения в очередь
	  cy.get(inputTextPlaceholder).type('bbbb');
	  cy.contains(buttonAddText).click();
	  // первый шаг анимации (окрашивание элемента, в который добавляется значение)
	  cy.get(textInCircleSelector)
		.each((item, index) => {
		  if (index === 0) {
			cy.wrap(item).should('have.text', 'a');
		  } else {
			cy.wrap(item).should('be.empty');
		  }
		})
		.parent()
		.each((item, index) => {
		  if (index === 1) {
			cy.wrap(item).should('have.css', 'border-color', circlChangingColor);
		  }
		  else {
			cy.wrap(item).should('have.css', 'border-color', circlDefaultColor);
		  }
		})
		.prev()
		.each((item, index) => {
		  if (index === 0) {
			cy.wrap(item).should('have.text', HEAD);
		  } else {
			cy.wrap(item).should('be.empty');
		  }
		})
		.next().next()
		.each((item, index) => {
		  cy.wrap(item).should('have.text', `${index}`);
		})
		.next()
		.each((item, index) => {
		  if (index === 0) {
			cy.wrap(item).should('have.text', TAIL);
		  } else {
			cy.wrap(item).should('be.empty');
		  }
		});
	  // второй шаг анимации (внесение значения в элемент, распределение head и tail)
	  cy.get(textInCircleSelector, {timeout: 500})
		.each((item, index) => {
		  switch (index) {
			case 0:
			  cy.wrap(item).should('have.text', 'a');
			  break;
			case 1:
			  cy.wrap(item).should('have.text', 'bbbb');
			  break;
			default:
			  cy.wrap(item).should('be.empty');
		  }
		})
		.parent()
		.each((item, index) => {
		  if (index === 1) {
			cy.wrap(item).should('have.css', 'border-color', circlChangingColor);
		  }
		  else {
			cy.wrap(item).should('have.css', 'border-color', circlDefaultColor);
		  }
		})
		.prev()
		.each((item, index) => {
		  if (index === 0) {
			cy.wrap(item).should('have.text', HEAD);
		  } else {
			cy.wrap(item).should('be.empty');
		  }
		})
		.next().next()
		.each((item, index) => {
		  cy.wrap(item).should('have.text', `${index}`);
		})
		.next()
		.each((item, index) => {
		  if (index === 1) {
			cy.wrap(item).should('have.text', TAIL);
		  } else {
			cy.wrap(item).should('be.empty');
		  }
		});
	  // третий шаг анимации (возврат обычного цвета у элемента, куда добавляли новое значение)
	  cy.get(textInCircleSelector, {timeout: 500})
		.each((item, index) => {
		  switch (index) {
			case 0:
			  cy.wrap(item).should('have.text', 'a');
			  break;
			case 1:
			  cy.wrap(item).should('have.text', 'bbbb');
			  break;
			default:
			  cy.wrap(item).should('be.empty');
		  }
		})
		.parent()
		.each((item) => {
		  cy.wrap(item).should('have.css', 'border-color', circlDefaultColor);
		})
		.prev()
		.each((item, index) => {
		  if (index === 0) {
			cy.wrap(item).should('have.text', HEAD);
		  } else {
			cy.wrap(item).should('be.empty');
		  }
		})
		.next().next()
		.each((item, index) => {
		  cy.wrap(item).should('have.text', `${index}`);
		})
		.next()
		.each((item, index) => {
		  if (index === 1) {
			cy.wrap(item).should('have.text', TAIL);
		  } else {
			cy.wrap(item).should('be.empty');
		  }
		});
  
	  // добавление и удаление элементов в таком количестве, чтобы tail оказалось левее head
	  // tail должен иметь индекс 0, а head - индекс 1; а также проверка отрисовки
	  for (let i = 0; i < 5; i++) {
		cy.get(inputTextPlaceholder).type(`c${i}`);
		cy.contains(buttonAddText).click();
		cy.contains(buttonDeleteText).should('be.enabled');
	  }
	  cy.contains(buttonDeleteText).click();
	  cy.contains(buttonDeleteText).should('be.enabled');
	  cy.get(inputTextPlaceholder).type(`dddd`);
	  cy.contains(buttonAddText).click();
	  cy.contains(buttonDeleteText).should('be.enabled');
	  cy.contains('bbbb')
		.parent()
		.prev().should('have.text', HEAD)
		.next().next().should('have.text', '1')
		.next().should('be.empty');
	  cy.contains('dddd')
		.parent()
		.prev().should('be.empty')
		.next().next().should('have.text', '0')
		.next().should('have.text', TAIL);
	});
  
	it('Удаление элемента из очереди', () => {
	  for (let i = 1; i <= 3; i++) {
		cy.get(inputTextPlaceholder).type(`${i}${i}${i}${i}`);
		cy.contains(buttonAddText).click();
		cy.contains(buttonDeleteText).should('be.enabled');
	  }
	  cy.contains(buttonDeleteText).click();
	  // первый этап анимации - подсветка удалаемого элемента
	  cy.get(textInCircleSelector)
		.each((item, index) => {
		  switch (index) {
			case 0:
			  cy.wrap(item).should('have.text', '1111');
			  break;
			case 1:
			  cy.wrap(item).should('have.text', '2222');
			  break;
			case 2:
			  cy.wrap(item).should('have.text', '3333');
			  break;
			default:
			  cy.wrap(item).should('be.empty');
		  }
		})
		.parent()
		.each((item, index) => {
		  if (index === 0) {
			cy.wrap(item).should('have.css', 'border-color', circlChangingColor);
		  }
		  else {
			cy.wrap(item).should('have.css', 'border-color', circlDefaultColor);
		  }
		})
		.prev()
		.each((item, index) => {
		  if (index === 0) {
			cy.wrap(item).should('have.text', HEAD);
		  } else {
			cy.wrap(item).should('be.empty');
		  }
		})
		.next().next()
		.each((item, index) => {
		  cy.wrap(item).should('have.text', `${index}`);
		})
		.next()
		.each((item, index) => {
		  if (index === 2) {
			cy.wrap(item).should('have.text', TAIL);
		  } else {
			cy.wrap(item).should('be.empty');
		  }
		});
	  // второй этап анимации (удаление значения, перенос head, возврат дефолтного цвета)
	  cy.get(textInCircleSelector, {timeout: 500})
		.each((item, index) => {
		  switch (index) {
			case 1:
			  cy.wrap(item).should('have.text', '2222');
			  break;
			case 2:
			  cy.wrap(item).should('have.text', '3333');
			  break;
			default:
			  cy.wrap(item).should('be.empty');
		  }
		})
		.parent()
		.each((item, index) => {
		  cy.wrap(item).should('have.css', 'border-color', circlDefaultColor);
		})
		.prev()
		.each((item, index) => {
		  if (index === 1) {
			cy.wrap(item).should('have.text', HEAD);
		  } else {
			cy.wrap(item).should('be.empty');
		  }
		})
		.next().next()
		.each((item, index) => {
		  cy.wrap(item).should('have.text', `${index}`);
		})
		.next()
		.each((item, index) => {
		  if (index === 2) {
			cy.wrap(item).should('have.text', TAIL);
		  } else {
			cy.wrap(item).should('be.empty');
		  }
		});
  
	  // проверка правильности отрисовки, если после удаления в очереди осталось только
	  // одно значение
	  cy.contains(buttonDeleteText).click();
	  cy.contains(buttonDeleteText).should('be.enabled');
	  cy.get(textInCircleSelector)
		.each((item, index) => {
		  if (index === 2) {
			cy.wrap(item).should('have.text', '3333');
		  } else {
			cy.wrap(item).should('be.empty');
		  }
		})
		.parent()
		.prev()
		.each((item, index) => {
		  if (index === 2) {
			cy.wrap(item).should('have.text', HEAD);
		  } else {
			cy.wrap(item).should('be.empty');
		  }
		})
		.next().next().next()
		.each((item, index) => {
		  if (index === 2) {
			cy.wrap(item).should('have.text', TAIL);
		  } else {
			cy.wrap(item).should('be.empty');
		  }
		});
  
	  // проверка правильности удаления единственного значения из очереди
	  cy.contains(buttonDeleteText).click();
	  cy.contains(buttonClearText).should('be.enabled');
	  cy.get(textInCircleSelector)
		.each((item) => {
		  cy.wrap(item).should('be.empty');
		})
		.parent()
		.prev()
		.each((item, index) => {
		  if (index === 2) {
			cy.wrap(item).should('have.text', HEAD);
		  } else {
			cy.wrap(item).should('be.empty');
		  }
		})
		.next().next().next()
		.each((item) => {
		  cy.wrap(item).should('be.empty');
		});
  
	  // проверка правильности добавления элемента после того, как ранее все элементы
	  // были удалены
	  cy.get(inputTextPlaceholder).type(`new`);
	  cy.contains(buttonAddText).click();
	  cy.get(textInCircleSelector)
		.each((item, index) => {
		  if (index === 2) {
			cy.wrap(item).should('have.text', 'new');
		  } else {
			cy.wrap(item).should('be.empty');
		  }
		})
		.parent()
		.prev()
		.each((item, index) => {
		  if (index === 2) {
			cy.wrap(item).should('have.text', HEAD);
		  } else {
			cy.wrap(item).should('be.empty');
		  }
		})
		.next().next().next()
		.each((item, index) => {
		  if (index === 2) {
			cy.wrap(item).should('have.text', TAIL);
		  } else {
			cy.wrap(item).should('be.empty');
		  }
		});
	});
  
	it('Очистка очереди', () => {
	  for (let i = 1; i <= 3; i++) {
		cy.get(inputTextPlaceholder).type(`${i}${i}${i}${i}`);
		cy.contains(buttonAddText).click();
		cy.contains(buttonDeleteText).should('be.enabled');
	  }
	  cy.contains(buttonClearText).click();
	  cy.get(textInCircleSelector)
		.each((item) => {
		  cy.wrap(item).should('be.empty');
		})
		.parent()
		.prev()
		.each((item) => {
		  cy.wrap(item).should('be.empty');
		})
		.next().next().next()
		.each((item) => {
		  cy.wrap(item).should('be.empty');
		});
	});
  
  });