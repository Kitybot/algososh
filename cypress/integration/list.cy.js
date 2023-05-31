import { DELAY_IN_MS } from "../../src/constants/delays";
import {
	changingStyle,
	dataCyAdd,
	dataCyAddByIndex,
	dataCyAddHead,
	dataCyForm,
	dataCyFormByIndex,
	dataCyIndex,
	dataCyInput,
	dataCyRemove,
	dataCyRemoveByIndex,
	dataCyRemoveHead,
	defaultStyle,
	mainCircle,
	modifiedtStyle
} from "../constants/test";


describe('Корректная работа очереди', () => {
	const addIndexElem = (value, index) => {
		cy.clock()
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInput).type(value)
				cy.get(dataCyAdd).should('be.not.disabled')
				cy.get(dataCyAddHead).should('be.not.disabled')
				cy.get(dataCyRemove).should('be.not.disabled')
				cy.get(dataCyRemoveHead).should('be.not.disabled')
			})
		cy.get(dataCyFormByIndex)
			.within(() => {
				cy.get(dataCyIndex).type(index)
				cy.get(dataCyAddByIndex).should('be.not.disabled')
				cy.get(dataCyRemoveByIndex).should('be.not.disabled')
			})
		cy.tick(DELAY_IN_MS)
		cy.get(dataCyFormByIndex)
			.within(() => {
				cy.get(dataCyAddByIndex).click()
				cy.get(dataCyIndex).should('be.disabled')
				cy.get(dataCyRemoveByIndex).should('be.disabled')
			})
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyAdd).should('be.disabled')
				cy.get(dataCyInput).should('be.disabled')
				cy.get(dataCyAddHead).should('be.disabled')
				cy.get(dataCyRemove).should('be.disabled')
				cy.get(dataCyRemoveHead).should('be.disabled')
			})
		cy.get(mainCircle).contains(value).parent()
			.invoke('attr', 'class')
			.then(classList => expect(classList).contains('circle_small'))
		cy.get(mainCircle).contains(value).parent()
			.invoke('attr', 'class')
			.then(classList => expect(classList).contains(changingStyle))
		cy.tick(DELAY_IN_MS)
	}

	const addTailElem = (value) => {
		cy.clock()
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInput).type(value)
				cy.get(dataCyAdd).should('be.not.disabled')
				cy.get(dataCyAddHead).should('be.not.disabled')
				cy.get(dataCyRemove).should('be.not.disabled')
				cy.get(dataCyRemoveHead).should('be.not.disabled')
			})
		cy.get(dataCyFormByIndex)
			.within(() => {
				cy.get(dataCyIndex).should('be.not.disabled')
				cy.get(dataCyAddByIndex).should('be.not.disabled')
				cy.get(dataCyRemoveByIndex).should('be.not.disabled')
			})
		cy.tick(DELAY_IN_MS)
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyAdd).click()
				cy.get(dataCyInput).should('be.disabled')
				cy.get(dataCyAddHead).should('be.disabled')
				cy.get(dataCyRemove).should('be.disabled')
				cy.get(dataCyRemoveHead).should('be.disabled')
			})
		cy.get(dataCyFormByIndex)
			.within(() => {
				cy.get(dataCyIndex).should('be.disabled')
				cy.get(dataCyAddByIndex).should('be.disabled')
				cy.get(dataCyRemoveByIndex).should('be.disabled')
			})
		cy.get(mainCircle).contains(value).parent()
			.invoke('attr', 'class')
			.then(classList => expect(classList).contains('circle_small'))
		cy.get(mainCircle).contains(value).parent()
			.invoke('attr', 'class')
			.then(classList => expect(classList).contains(changingStyle))
		cy.tick(DELAY_IN_MS)
	}

	const addHeadElem = (value) => {
		cy.clock()
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInput).type(value)
				cy.get(dataCyAdd).should('be.not.disabled')
				cy.get(dataCyAddHead).should('be.not.disabled')
				cy.get(dataCyRemove).should('be.not.disabled')
				cy.get(dataCyRemoveHead).should('be.not.disabled')
			})
		cy.get(dataCyFormByIndex)
			.within(() => {
				cy.get(dataCyIndex).should('be.not.disabled')
				cy.get(dataCyAddByIndex).should('be.not.disabled')
				cy.get(dataCyRemoveByIndex).should('be.not.disabled')
			})
		cy.tick(DELAY_IN_MS)
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyAddHead).click()
				cy.get(dataCyInput).should('be.disabled')
				cy.get(dataCyAdd).should('be.disabled')
				cy.get(dataCyRemove).should('be.disabled')
				cy.get(dataCyRemoveHead).should('be.disabled')
			})
		cy.get(dataCyFormByIndex)
			.within(() => {
				cy.get(dataCyIndex).should('be.disabled')
				cy.get(dataCyAddByIndex).should('be.disabled')
				cy.get(dataCyRemoveByIndex).should('be.disabled')
			})
		cy.get(mainCircle).contains(value).parent()
			.invoke('attr', 'class')
			.then(classList => expect(classList).contains('circle_small'))
		cy.get(mainCircle).contains(value).parent()
			.invoke('attr', 'class')
			.then(classList => expect(classList).contains(changingStyle))
		cy.tick(DELAY_IN_MS)
	}

	beforeEach(() => {
		cy.visit(`/list`)
	});
	it('Если в инпуте пусто, то кнопка добавления недоступна', function () {
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInput).should('have.value', '')
				cy.get(dataCyAdd).should('be.disabled')
				cy.get(dataCyAddHead).should('be.disabled')
				cy.get(dataCyRemove).should('be.not.disabled')
				cy.get(dataCyRemoveHead).should('be.not.disabled')

			})
		cy.get(dataCyFormByIndex)
			.within(() => {
				cy.get(dataCyIndex).should('have.value', '1')
				cy.get(dataCyAddByIndex).should('be.disabled')
				cy.get(dataCyRemoveByIndex).should('be.not.disabled')

			})
	})

	it('Корректная отрисовка по умолчанию', function () {
		cy.get(mainCircle).should('have.length', 4)
			.invoke('attr', 'class')
			.then(classList => expect(classList).contains(defaultStyle))

		cy.get(mainCircle).then((elem) => {
			cy.get(elem[0])
				.children().should('have.text', '0')

			cy.get(elem[1])
				.children().should('have.text', '34')

			cy.get(elem[2])
				.children().should('have.text', '8')

			cy.get(elem[3])
				.children().should('have.text', '1')
		})

		cy.get(mainCircle).should('have.length', 4)
			.invoke('attr', 'class')
			.then(classList => expect(classList).contains(defaultStyle))
	})

	it('Корректное добавление элемента в head.', function () {
		cy.clock()
		addHeadElem('5')
		cy.get(mainCircle).then((elem) => {
			cy.get(elem[0])
				.children().should('have.text', '5')
			cy.get(elem[0])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(modifiedtStyle))

			cy.get(elem[1])
				.children().should('have.text', '0')
			cy.get(elem[1])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(defaultStyle))

			cy.get(elem[2])
				.children().should('have.text', '34')
			cy.get(elem[2])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(defaultStyle))

			cy.get(elem[3])
				.children().should('have.text', '8')
			cy.get(elem[3])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(defaultStyle))

			cy.get(elem[4])
				.children().should('have.text', '1')
			cy.get(elem[4])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(defaultStyle))

		})

		cy.tick(DELAY_IN_MS)

		cy.get(mainCircle)
			.invoke('attr', 'class')
			.then(classList => expect(classList).contains(defaultStyle))
	})

	it('Корректное добавление элемента в tail', function () {
		cy.clock()
		addTailElem('5')
		cy.get(mainCircle).then((elem) => {
			cy.get(elem[0])
				.children().should('have.text', '0')
			cy.get(elem[0])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(defaultStyle))

			cy.get(elem[1])
				.children().should('have.text', '34')
			cy.get(elem[0])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(defaultStyle))

			cy.get(elem[2])
				.children().should('have.text', '8')
			cy.get(elem[2])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(defaultStyle))

			cy.get(elem[3])
				.children().should('have.text', '1')
			cy.get(elem[3])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(defaultStyle))

			cy.get(elem[4])
				.children().should('have.text', '5')
			cy.get(elem[4])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(modifiedtStyle))

		})

		cy.tick(DELAY_IN_MS)

		cy.get(mainCircle)
			.invoke('attr', 'class')
			.then(classList => expect(classList).contains(defaultStyle))
	})

	it('Корректное добавления элемента по индексу', function () {
		addIndexElem('5', 2)
		cy.tick(DELAY_IN_MS)
		cy.wait(DELAY_IN_MS)
		cy.get(mainCircle).then((elem) => {
			cy.get(elem[0])
				.children().should('have.text', '0')
			cy.get(elem[0])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(changingStyle))

			cy.get(elem[1])
				.children().should('have.text', '5')
			cy.get(elem[1])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(changingStyle))

			cy.get(elem[2])
				.children().should('have.text', '34')
			cy.get(elem[2])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(changingStyle))

			cy.get(elem[3])
				.children().should('have.text', '8')
			cy.get(elem[3])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(defaultStyle))

			cy.get(elem[4])
				.children().should('have.text', '1')
			cy.get(elem[4])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(defaultStyle))
		})

		cy.tick(DELAY_IN_MS)

		cy.get(mainCircle).then((elem) => {
			cy.get(elem[0])
				.children().should('have.text', '0')
			cy.get(elem[0])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(changingStyle))

			cy.get(elem[1])
				.children().should('have.text', '5')
			cy.get(elem[1])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(modifiedtStyle))

			cy.get(elem[2])
				.children().should('have.text', '34')
			cy.get(elem[2])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(defaultStyle))

			cy.get(elem[3])
				.children().should('have.text', '8')
			cy.get(elem[3])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(defaultStyle))

			cy.get(elem[4])
				.children().should('have.text', '1')
			cy.get(elem[4])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(defaultStyle))
		})

		cy.tick(DELAY_IN_MS)

		cy.get(mainCircle).should('have.length', 5)
			.invoke('attr', 'class')
			.then(classList => expect(classList).contains(defaultStyle))
	})

	it('Корректное удаление элемента из head.', function () {
		cy.clock()
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInput).should('be.not.disabled')
				cy.get(dataCyAdd).should('be.disabled')
				cy.get(dataCyAddHead).should('be.disabled')
				cy.get(dataCyRemove).should('be.not.disabled')
				cy.get(dataCyRemoveHead).should('be.not.disabled')
			})
		cy.get(dataCyFormByIndex)
			.within(() => {
				cy.get(dataCyIndex).should('be.not.disabled')
				cy.get(dataCyAddByIndex).should('be.disabled')
				cy.get(dataCyRemoveByIndex).should('be.not.disabled')
			})
		cy.tick(DELAY_IN_MS)
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyRemoveHead).click()
				cy.get(dataCyAddHead).should('be.disabled')
				cy.get(dataCyInput).should('be.disabled')
				cy.get(dataCyAdd).should('be.disabled')
				cy.get(dataCyRemove).should('be.disabled')
			})
		cy.get(dataCyFormByIndex)
			.within(() => {
				cy.get(dataCyIndex).should('be.disabled')
				cy.get(dataCyAddByIndex).should('be.disabled')
				cy.get(dataCyRemoveByIndex).should('be.disabled')
			})

		cy.tick(DELAY_IN_MS)
		cy.wait(DELAY_IN_MS)

		cy.get(mainCircle).then((elem) => {
			cy.get(elem[0])
				.children().should('have.text', '34')

			cy.get(elem[1])
				.children().should('have.text', '8')

			cy.get(elem[2])
				.children().should('have.text', '1')
		})

		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInput).should('be.not.disabled')
				cy.get(dataCyAdd).should('be.disabled')
				cy.get(dataCyAddHead).should('be.disabled')
				cy.get(dataCyRemove).should('be.not.disabled')
				cy.get(dataCyRemoveHead).should('be.not.disabled')
			})
		cy.get(dataCyFormByIndex)
			.within(() => {
				cy.get(dataCyIndex).should('be.not.disabled')
				cy.get(dataCyAddByIndex).should('be.disabled')
				cy.get(dataCyRemoveByIndex).should('be.not.disabled')
			})
	})

	it('Корректное удаление элемента из tail.', function () {
		cy.clock()
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInput).should('be.not.disabled')
				cy.get(dataCyAdd).should('be.disabled')
				cy.get(dataCyAddHead).should('be.disabled')
				cy.get(dataCyRemove).should('be.not.disabled')
				cy.get(dataCyRemoveHead).should('be.not.disabled')
			})
		cy.get(dataCyFormByIndex)
			.within(() => {
				cy.get(dataCyIndex).should('be.not.disabled')
				cy.get(dataCyAddByIndex).should('be.disabled')
				cy.get(dataCyRemoveByIndex).should('be.not.disabled')
			})
		cy.tick(DELAY_IN_MS)
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyRemove).click()
				cy.get(dataCyRemoveHead).should('be.disabled')
				cy.get(dataCyAddHead).should('be.disabled')
				cy.get(dataCyInput).should('be.disabled')
				cy.get(dataCyAdd).should('be.disabled')
			})
		cy.get(dataCyFormByIndex)
			.within(() => {
				cy.get(dataCyIndex).should('be.disabled')
				cy.get(dataCyAddByIndex).should('be.disabled')
				cy.get(dataCyRemoveByIndex).should('be.disabled')
			})

		cy.tick(DELAY_IN_MS)
		cy.wait(DELAY_IN_MS)

		cy.get(mainCircle).then((elem) => {
			cy.get(elem[0])
				.children().should('have.text', '0')

			cy.get(elem[1])
				.children().should('have.text', '34')

			cy.get(elem[2])
				.children().should('have.text', '8')
		})

		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInput).should('be.not.disabled')
				cy.get(dataCyAdd).should('be.disabled')
				cy.get(dataCyAddHead).should('be.disabled')
				cy.get(dataCyRemove).should('be.not.disabled')
				cy.get(dataCyRemoveHead).should('be.not.disabled')
			})
		cy.get(dataCyFormByIndex)
			.within(() => {
				cy.get(dataCyIndex).should('be.not.disabled')
				cy.get(dataCyAddByIndex).should('be.disabled')
				cy.get(dataCyRemoveByIndex).should('be.not.disabled')
			})
	})

	it('Корректное удаление элемента по индексу..', function () {
		cy.clock()
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInput).should('be.not.disabled')
				cy.get(dataCyAdd).should('be.disabled')
				cy.get(dataCyAddHead).should('be.disabled')
				cy.get(dataCyRemove).should('be.not.disabled')
				cy.get(dataCyRemoveHead).should('be.not.disabled')
			})
		cy.get(dataCyFormByIndex)
			.within(() => {
				cy.get(dataCyIndex).type('1')
				cy.get(dataCyAddByIndex).should('be.disabled')
				cy.get(dataCyRemoveByIndex).should('be.not.disabled')
			})
		cy.tick(DELAY_IN_MS)

		cy.get(dataCyFormByIndex)
			.within(() => {
				cy.get(dataCyRemoveByIndex).click()
				cy.get(dataCyIndex).should('be.disabled')
				cy.get(dataCyAddByIndex).should('be.disabled')
			})
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyRemove).should('be.disabled')
				cy.get(dataCyRemoveHead).should('be.disabled')
				cy.get(dataCyAddHead).should('be.disabled')
				cy.get(dataCyInput).should('be.disabled')
				cy.get(dataCyAdd).should('be.disabled')
			})

		cy.tick(DELAY_IN_MS)
		cy.wait(DELAY_IN_MS)

		cy.get(mainCircle).then((elem) => {
			cy.get(elem[0])
				.children().should('have.text', '0')

			cy.get(elem[1])
				.children().should('have.text', '34')

			cy.get(elem[2])
				.children().should('have.text', '8')

			cy.get(elem[3])
				.children().should('have.text', '1')
		})

		cy.tick(DELAY_IN_MS)
		cy.wait(DELAY_IN_MS)

		cy.get(mainCircle).then((elem) => {
			cy.get(elem[0])
				.children().should('have.text', '0')

			cy.get(elem[1])
				.children().should('have.text', '34')

			cy.get(elem[2])
				.children().should('have.text', '8')

			cy.get(elem[3])
				.children().should('have.text', '1')
		})

		cy.tick(DELAY_IN_MS)
		cy.wait(DELAY_IN_MS)

		cy.get(mainCircle).then((elem) => {
			cy.get(elem[0])
				.children().should('have.text', '0')

			cy.get(elem[1])
				.children().should('have.text', '34')

			cy.get(elem[2])
				.children().should('have.text', '')

			cy.get(elem[3])
				.children().should('have.text', '8')

			cy.get(elem[4])
				.children().should('have.text', '1')
		})

		cy.tick(DELAY_IN_MS)
		cy.wait(DELAY_IN_MS)

		cy.get(mainCircle).then((elem) => {
			cy.get(elem[0])
				.children().should('have.text', '0')

			cy.get(elem[1])
				.children().should('have.text', '8')

			cy.get(elem[2])
				.children().should('have.text', '1')

		})

		cy.tick(DELAY_IN_MS)
		cy.wait(DELAY_IN_MS)

		cy.get(mainCircle).then((elem) => {
			cy.get(elem[0])
				.children().should('have.text', '0')

			cy.get(elem[1])
				.children().should('have.text', '8')

			cy.get(elem[2])
				.children().should('have.text', '1')
		})

		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInput).should('be.not.disabled')
				cy.get(dataCyAdd).should('be.disabled')
				cy.get(dataCyAddHead).should('be.disabled')
				cy.get(dataCyRemove).should('be.not.disabled')
				cy.get(dataCyRemoveHead).should('be.not.disabled')
			})
		cy.get(dataCyFormByIndex)
			.within(() => {
				cy.get(dataCyIndex).should('be.not.disabled')
				cy.get(dataCyAddByIndex).should('be.disabled')
				cy.get(dataCyRemoveByIndex).should('be.not.disabled')
			})

		cy.get(mainCircle).should('have.length', 3)
			.invoke('attr', 'class')
			.then(classList => expect(classList).contains(defaultStyle))
	})
}); 