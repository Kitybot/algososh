import { textInCircleSelector, 
	circlDefaultColor, 
	containerWithCircles, 
	circlChangingColor, 
	circleModifiedColor, 
	linkToListPage } from '../constants';
import { HEAD, TAIL } from '../../src/constants/element-captions';

const inputStringPlaceholder = 'input[placeholder="Введите значение"]';
const inputIndexPlaceholder = 'input[placeholder="Введите индекс"]';
const buttonAddHeadText = 'Добавить в head';
const buttonAddTailText = 'Добавить в tail';
const buttonAddByIndex = 'Добавить по индексу';
const buttonDeleteByIndex = 'Удалить по индексу';
const smallCircleWidth = '56px';

describe(
'Компонент Связнный список',
() => {

beforeEach(() => {
cy.visit('/');
cy.get(linkToListPage).click();
});

it('Доступность кнопок', () => {  
cy.get(inputStringPlaceholder).should('have.value', '');
cy.get(inputIndexPlaceholder).should('have.value', '');
cy.contains(buttonAddHeadText).should('be.disabled');
cy.contains(buttonAddTailText).should('be.disabled');
cy.contains(buttonAddByIndex).should('be.disabled');
cy.contains(buttonDeleteByIndex).should('be.disabled');
cy.get(inputStringPlaceholder).type('aaaa');
cy.contains(buttonAddHeadText).should('be.enabled');
cy.contains(buttonAddTailText).should('be.enabled');
cy.contains(buttonAddByIndex).should('be.disabled');
cy.contains(buttonDeleteByIndex).should('be.disabled');
cy.get(inputIndexPlaceholder).type('1');
cy.contains(buttonAddHeadText).should('be.enabled');
cy.contains(buttonAddTailText).should('be.enabled');
cy.contains(buttonAddByIndex).should('be.enabled');
cy.contains(buttonDeleteByIndex).should('be.enabled');
cy.get(inputStringPlaceholder).clear();
cy.contains(buttonAddHeadText).should('be.disabled');
cy.contains(buttonAddTailText).should('be.disabled');
cy.contains(buttonAddByIndex).should('be.disabled');
cy.contains(buttonDeleteByIndex).should('be.enabled');
});

it('Отображение дефолтного списка', () => {
let number: number = 0;
cy.get(textInCircleSelector)
 .should('have.length.greaterThan', 3)
 .and('have.length.lessThan', 7)
 .each((item) => {
   cy.wrap(item).should('not.be.empty');
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
   number += 1;
 })
 .next()
 .each((item, index) => {
   if (index < (number - 1)) {
	 cy.wrap(item).should('be.empty');
   } else {
	 cy.wrap(item).should('have.text', TAIL);
   }
 });
});

it('Добавление элемента в head', () => {
cy.get(inputStringPlaceholder).type('aaa');
cy.contains(buttonAddHeadText).click();
// первая анимация: вместо head появляется маленький круг с вводимым значением
cy.get(containerWithCircles)
 .children().first()
 .contains('aaa')
 .parent()
 .should('have.css', 'border-color', circlChangingColor)
 .and('have.css', 'width', smallCircleWidth)
 .parent().parent()
 .next()
 .should('have.css', 'border-color', circlDefaultColor)
// вторая анимация: на первое место ставится подсвеченный круг с вводимым значением
cy.wait(500)
 .then(() => {})
 .get(textInCircleSelector)
 .each((item, index) => {
   switch (index) {
	 case 0:
	   cy.wrap(item)
		 .should('have.text', 'aaa')
		 .parent()
		 .should('have.css', 'border-color', circleModifiedColor)
		 .prev()
		 .should('have.text', HEAD)
		 .next().next()
		 .should('have.text', '0')
		 .next()
		 .should('be.empty');
	   break
	 case 1:
	   cy.wrap(item)
		 .parent()
		 .should('have.css', 'border-color', circlDefaultColor)
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
 .get(textInCircleSelector)
 .first()
 .parent()
 .should('have.css', 'border-color', circlDefaultColor)
});

it('Добавление элемента в tail', () => {
cy.get(inputStringPlaceholder).type('aaa');
cy.contains(buttonAddTailText).click();
// первая анимация: вместо tail появляется маленький круг с вводимым значением
cy.get(containerWithCircles)
 .children().last()
 .contains('aaa')
 .parent()
 .should('have.css', 'border-color', circlChangingColor)
 .and('have.css', 'width', smallCircleWidth)
 .parent().parent()
 .next()
 .should('have.css', 'border-color', circlDefaultColor);
// вторая анимация: на последнее место ставится подсвеченный круг с вводимым значением
cy.wait(500)
 .then(() => {})
 .get(textInCircleSelector)
 .last()
 .should('have.text', 'aaa')
 .parent()
 .should('have.css', 'border-color', circleModifiedColor)
 .prev()
 .should('be.empty')
 .next().next().next()
 .should('have.text', TAIL)
 .parent().parent()
 .prev().children().first().children().eq(1)
 .should('have.css', 'border-color', circlDefaultColor)
// третья анимация: первый круг с введенным значением принимает обычную окраску границы
cy.wait(500)
 .then(() => {})
 .get(textInCircleSelector)
 .last()
 .parent()
 .should('have.css', 'border-color', circlDefaultColor)
});

it('Добавление элемента по индексу', () => {
cy.get(inputStringPlaceholder).type('aaa');
cy.get(inputIndexPlaceholder).type('2');
cy.contains(buttonAddByIndex).click();
// первая анимация: над первым кругом вместо head появляется маленький круг с 
// вводимым значением
cy.get(containerWithCircles)
 .children().first()
 .contains('aaa')
 .parent()
 .should('have.css', 'border-color', circlChangingColor)
 .and('have.css', 'width', smallCircleWidth)
 .parent().parent()
 .next()
 .should('have.css', 'border-color', circlDefaultColor);
// вторая анимация: переход маленького круга с вводимым значением на второй круг
cy.wait(500)
 .then(() => {})
 .get(containerWithCircles)
 .children().first()
 .children().first()
 .children().first()
 .should('have.text', HEAD)
 .next()
 .should('have.css', 'border-color', circlChangingColor)
 .get(containerWithCircles)
 .children().eq(1)
 .contains('aaa')
 .parent()
 .should('have.css', 'border-color', circlChangingColor)
 .and('have.css', 'width', smallCircleWidth)
 .parent().parent()
 .next()
 .should('have.css', 'border-color', circlDefaultColor);
// третья анимация: переход маленького круга с вводимым значением на третий круг
cy.wait(500)
 .then(() => {})
 .get(containerWithCircles)
 .children().first()
 .children().first()
 .children().first()
 .should('have.text', HEAD)
 .next()
 .should('have.css', 'border-color', circlChangingColor)
 .get(containerWithCircles)
 .children().eq(1)
 .children().first()
 .children().first()
 .should('be.empty')
 .next()
 .should('have.css', 'border-color', circlChangingColor)
 .get(containerWithCircles)
 .children().eq(2)
 .contains('aaa')
 .parent()
 .should('have.css', 'border-color', circlChangingColor)
 .and('have.css', 'width', smallCircleWidth)
 .parent().parent()
 .next()
 .should('have.css', 'border-color', circlDefaultColor);
// третья анимация: на третье место ставится новый подсвеченный круг с новым значением
cy.wait(500)
 .then(() => {})
 .get(containerWithCircles)
 .children().first()
 .children().first()
 .children().first()
 .should('have.text', HEAD)
 .next()
 .should('have.css', 'border-color', circlChangingColor)
 .get(containerWithCircles)
 .children().eq(1)
 .children().first()
 .children().first()
 .should('be.empty')
 .next()
 .should('have.css', 'border-color', circlChangingColor)
 .get(containerWithCircles)
 .children().eq(2)
 .children().first()
 .children().first()
 .should('be.empty')
 .next()
 .should('have.css', 'border-color', circleModifiedColor)
 .children().first()
 .should('have.text', 'aaa');
// четвёртая анимация: все элементы получают дефолтный цвет
cy.get(textInCircleSelector)
 .parent()
 .each((item) => {
   cy.wrap(item).should('have.css', 'border-color', circlDefaultColor);
 })
 .next()
 .each((item, index) => {
   cy.wrap(item).should('have.text', `${index}`);
 })
});

it('Удаление элемента из head', { env: {} }, () => {
cy.get(textInCircleSelector)
 .then((elements) => {
   Cypress.env({'numberOfElements': elements.length})
 })
 .first()
 .then((paragrafInCircle) => {
   Cypress.env('textInCircle', paragrafInCircle.text());
 })
cy.contains('Удалить из head').click()
 .get(containerWithCircles)
 .children().first()
 .children().first()
 .children().eq(1).should('have.css', 'border-color', circlDefaultColor)
 .children().should('be.empty')
 .parent()
 .next().next()
 .children().first()
 .children().eq(1).should('have.css', 'border-color', circlChangingColor)
 .and('have.css', 'width', smallCircleWidth)
 .children().then((paragraf) => {
   cy.wrap(paragraf).should('have.text', Cypress.env("textInCircle"));
 })
cy.wait(500)
 .then(() => {})
 .get(textInCircleSelector)
 .then((elements) => {
   cy.wrap(elements).should('have.length', Cypress.env('numberOfElements') - 1)
 })
});

it('Удаление элемента из tail', { env: {} }, () => {
cy.get(textInCircleSelector)
 .then((elements) => {
   Cypress.env({'numberOfElements': elements.length})
 })
 .last()
 .then((paragrafInCircle) => {
   Cypress.env('textInCircle', paragrafInCircle.text());
 })
cy.contains('Удалить из tail').click()
 .get(containerWithCircles)
 .children().last()
 .children().first()
 .children().eq(1).should('have.css', 'border-color', circlDefaultColor)
 .children().should('be.empty')
 .parent()
 .next().next()
 .children().first()
 .children().eq(1).should('have.css', 'border-color', circlChangingColor)
 .and('have.css', 'width', smallCircleWidth)
 .children().then((paragraf) => {
   cy.wrap(paragraf).should('have.text', Cypress.env("textInCircle"));
 })
cy.wait(500)
 .then(() => {})
 .get(textInCircleSelector)
 .then((elements) => {
   cy.wrap(elements).should('have.length', Cypress.env('numberOfElements') - 1)
 })
});

it('Удаление элемента по индексу', { env: {} }, () => {
cy.get(textInCircleSelector)
 .then((elements) => {
   Cypress.env({'numberOfElements': elements.length})
 })
 .eq(2)
 .then((paragrafInCircle) => {
   Cypress.env('textInCircle', paragrafInCircle.text());
 });
cy.get(inputIndexPlaceholder).type('2');
cy.contains(buttonDeleteByIndex).click();
cy.get(textInCircleSelector)
 .parent()
 .each((item, index) => {
   if (index === 0) {
	 cy.wrap(item).should('have.css', 'border-color', circlChangingColor);
   } else {
	 cy.wrap(item).should('have.css', 'border-color', circlDefaultColor);
   }
 });
cy.wait(500)
 .then(() => {})
 .get(textInCircleSelector)
 .parent()
 .each((item, index) => {
   if (index === 0 || index === 1) {
	 cy.wrap(item).should('have.css', 'border-color', circlChangingColor);
   } else {
	 cy.wrap(item).should('have.css', 'border-color', circlDefaultColor);
   }
 });
cy.wait(500)
 .then(() => {})
 .get(textInCircleSelector)
 .parent()
 .each((item, index) => {
   if (index === 0 || index === 1 || index === 2) {
	 cy.wrap(item).should('have.css', 'border-color', circlChangingColor);
   } else {
	 cy.wrap(item).should('have.css', 'border-color', circlDefaultColor);
   }
 });
cy.wait(500)
 .then(() => {})
 .get(containerWithCircles)
 .children().eq(2)
 .children().first()
 .children().eq(1).should('have.css', 'border-color', circlDefaultColor)
 .children().should('be.empty')
 .parent()
 .next().next()
 .children().first()
 .children().eq(1).should('have.css', 'border-color', circlChangingColor)
 .and('have.css', 'width', smallCircleWidth)
 .children().then((paragraf) => {
   cy.wrap(paragraf).should('have.text', Cypress.env("textInCircle"));
 });
cy.wait(500)
 .then(() => {})
 .get(textInCircleSelector)
 .parent()
 .each((item, index) => {
   if (index === 0 || index === 1) {
	 cy.wrap(item).should('have.css', 'border-color', circlChangingColor);
   } else {
	 cy.wrap(item).should('have.css', 'border-color', circlDefaultColor);
   }
 });
cy.wait(500)
 .then(() => {})
 .get(textInCircleSelector)
 .then((elements) => {
   cy.wrap(elements).should('have.length', Cypress.env('numberOfElements') - 1)
 })
 .parent()
 .each((item) => {
	 cy.wrap(item).should('have.css', 'border-color', circlDefaultColor);
 });
});
});