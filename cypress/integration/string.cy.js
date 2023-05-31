import {
	changingStyle,
	dataCyForm,
	dataCyInput,
	dataCySubmit,
	defaultStyle,
	mainCircle,
	modifiedtStyle
} from '../constants/test';
import { DELAY_IN_MS } from "../../src/constants/delays";

describe('Корректная работа строки', () => {
	beforeEach(() => {
		cy.visit(`/recursion`)
	});
	it('Если в инпуте пусто, то кнопка добавления недоступна.', function () {
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInput).should('have.value', '')
				cy.get(dataCySubmit).should('be.disabled')
			})
	})
	it('Cтрока разворачивается корректно', function () {
		cy.clock()
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInput).type('hello')
				cy.get(dataCySubmit).click()
				cy.get(dataCyInput).should('be.disabled')
			})


		cy.get(mainCircle).then((elem) => {
			cy.get(elem[0])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(changingStyle))
			cy.get(elem[0])
				.children().should('have.text', 'h')

			cy.get(elem[1])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(defaultStyle))
			cy.get(elem[1])
				.children().should('have.text', 'e')

			cy.get(elem[2])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(defaultStyle))
			cy.get(elem[2])
				.children().should('have.text', 'l')

			cy.get(elem[3])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(defaultStyle))
			cy.get(elem[3])
				.children().should('have.text', 'l')

			cy.get(elem[4])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(changingStyle))
			cy.get(elem[4])
				.children().should('have.text', 'o')
		})

		cy.tick(DELAY_IN_MS)

		cy.get(mainCircle).then((elem) => {
			cy.get(elem[0])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(modifiedtStyle))
			cy.get(elem[0])
				.children().should('have.text', 'o')

			cy.get(elem[1])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(changingStyle))
			cy.get(elem[1])
				.children().should('have.text', 'e')

			cy.get(elem[3])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(changingStyle))
			cy.get(elem[3])
				.children().should('have.text', 'l')

			cy.get(elem[4])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(modifiedtStyle))
			cy.get(elem[4])
				.children().should('have.text', 'h')
		})

		cy.tick(DELAY_IN_MS)

		cy.get(mainCircle).then((elem) => {
			cy.get(elem[1])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(modifiedtStyle))
			cy.get(elem[1])
				.children().should('have.text', 'l')

			cy.get(elem[2])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(changingStyle))
			cy.get(elem[2])
				.children().should('have.text', 'l')

			cy.get(elem[3])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(modifiedtStyle))
			cy.get(elem[3])
				.children().should('have.text', 'e')
		})

		cy.tick(DELAY_IN_MS)
		cy.wait(DELAY_IN_MS)

		cy.get(mainCircle).then((elem) => {
			cy.get(elem[2])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(modifiedtStyle))
			cy.get(elem[2])
				.children().should('have.text', 'l')
		})

		cy.get(mainCircle)
			.invoke('attr', 'class')
			.then(classList => expect(classList).contains(modifiedtStyle))

		cy.get(dataCyForm).within(() => {
			cy.get(dataCyInput).should('have.value', '')
			cy.get(dataCySubmit).should('be.disabled')
		})
	})
}); 