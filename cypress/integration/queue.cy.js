import {
	changingStyle,
	dataCyAdd,
	dataCyClear,
	dataCyForm,
	dataCyInput,
	dataCyRemove,
	defaultStyle,
	mainCircle
} from "../constants/test";

const DELAY_IN_MS = 1000;
describe('Корректная работа очереди', () => {
	const addNextElem = (value) => {
		cy.clock()

		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInput).type(value)
				cy.get(dataCyAdd).should('be.not.disabled')
				cy.get(dataCyRemove).should('be.not.disabled')
				cy.get(dataCyClear).should('be.not.disabled')
			})

		cy.tick(DELAY_IN_MS)

		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyAdd).click()
				cy.get(dataCyRemove).should('be.disabled')
				cy.get(dataCyClear).should('be.disabled')
			})
		cy.get(mainCircle).contains(value).parent()
			.invoke('attr', 'class')
			.then(classList => expect(classList).contains(changingStyle))

		cy.tick(DELAY_IN_MS)
	}

	const addFirstElem = (value) => {
		cy.clock()

		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInput).type(value)
				cy.get(dataCyAdd).should('be.not.disabled')
				cy.get(dataCyRemove).should('be.disabled')
				cy.get(dataCyClear).should('be.disabled')
			})

		cy.tick(DELAY_IN_MS)

		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyAdd).click()
				cy.get(dataCyRemove).should('be.disabled')
				cy.get(dataCyClear).should('be.disabled')
			})

		cy.get(mainCircle).contains(value).parent()
			.invoke('attr', 'class')
			.then(classList => expect(classList).contains(changingStyle))
		cy.tick(DELAY_IN_MS)
	}

	beforeEach(() => {
		cy.visit(`/queue`)
	});
	it('Если в инпуте пусто, то кнопка добавления недоступна', function () {
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInput).should('have.value', '')
				cy.get(dataCyAdd).should('be.disabled')
				cy.get(dataCyRemove).should('be.disabled')
				cy.get(dataCyClear).should('be.disabled')
			})
	})

	it('Добавление элемента в очередь корректно', function () {
		cy.clock()
		cy.get(mainCircle).should('have.length', 7)
			.invoke('attr', 'class')
			.then(classList => expect(classList).contains(defaultStyle))

		addFirstElem('5')

		cy.get(mainCircle)
			.siblings('div').contains('head')
		cy.get(mainCircle)
			.siblings('div').contains('tail')
		cy.get(mainCircle)
			.siblings('p').contains('0')

		cy.tick(DELAY_IN_MS)

		cy.get(mainCircle)
			.invoke('attr', 'class')
			.then(classList => expect(classList).contains(defaultStyle))

		cy.tick(DELAY_IN_MS)

		addNextElem('6')

		cy.get(mainCircle)
			.contains('6').parent('div')
			.nextAll().contains('tail')
		cy.get(mainCircle)
			.siblings('p').contains('1')
		cy.get(mainCircle)
			.invoke('attr', 'class')
			.then(classList => expect(classList).contains(defaultStyle))

		cy.tick(DELAY_IN_MS)

		addNextElem('7')

		cy.get(mainCircle)
			.contains('7').parent('div')
			.nextAll().contains('tail')
		cy.get(mainCircle)
			.siblings('p').contains('2')
		cy.get(mainCircle)
			.invoke('attr', 'class')
			.then(classList => expect(classList).contains(defaultStyle))
	})

	it('Корректное удаления элемента из очереди', function () {
		cy.clock()
		addFirstElem('5')

		cy.tick(DELAY_IN_MS)

		addNextElem('6')

		cy.tick(DELAY_IN_MS)

		addNextElem('7')

		cy.tick(DELAY_IN_MS)

		cy.get(dataCyForm).within(() => {
			cy.get(dataCyInput).should('have.value', '')
			cy.get(dataCyAdd).should('be.disabled')
			cy.get(dataCyRemove).click()
		})

		cy.get(mainCircle).first()
			.invoke('attr', 'class')
			.then(classList => expect(classList).contains(changingStyle))

		cy.tick(DELAY_IN_MS)

		cy.get(mainCircle).then((elem) => {
			cy.get(elem[0]).children().should('be.empty')
			cy.get(elem[0])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(defaultStyle))

			cy.get(elem[1])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(defaultStyle))
			cy.get(elem[1])
				.children().should('have.text', '6')

			cy.get(elem[2])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(defaultStyle))
			cy.get(elem[2])
				.children().should('have.text', '7')
		})

		cy.tick(DELAY_IN_MS)

		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInput).should('have.value', '')
				cy.get(dataCyAdd).should('be.disabled')
				cy.get(dataCyRemove).should('be.not.disabled')
				cy.get(dataCyClear).should('be.not.disabled')
			})
	})

	it('Корректное поведение кнопки «Очистить»', function () {
		cy.clock()
		addFirstElem('5')

		cy.tick(DELAY_IN_MS)

		addNextElem('6')

		cy.tick(DELAY_IN_MS)

		addNextElem('7')

		cy.tick(DELAY_IN_MS)

		cy.get(dataCyForm).within(() => {
			cy.get(dataCyInput).should('have.value', '')
			cy.get(dataCyAdd).should('be.disabled')
			cy.get(dataCyClear).click()
		})

		cy.tick(DELAY_IN_MS)

		cy.get(mainCircle).children().next().should('not.exist');
		cy.tick(DELAY_IN_MS)
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInput).should('have.value', '')
				cy.get(dataCyAdd).should('be.disabled')
				cy.get(dataCyRemove).should('be.disabled')
				cy.get(dataCyClear).should('be.disabled')
			})
	})
}); 