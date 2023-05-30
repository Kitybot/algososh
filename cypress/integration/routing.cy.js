import {
  linkToString, 
  linkToFibonacci, 
  linkToSortingPage, 
  linkToStackPage, 
  linkToQueuePage, 
  linkToListPage, 
} from '../constants';

describe('Проверка роутинга приложения.', () => {

  beforeEach(() => {
    cy.visit('/')
  });

  afterEach(() => {
    cy.get('button').contains('К оглавлению').click();
    cy.contains('МБОУ АЛГОСОШ');
  });

  it('Строка', () => {
    cy.get(linkToString).click();
    cy.contains('Строка');
    cy.get('button').contains('Развернуть');
  });

  it("Последовательность Фибоначчи", () => {
    cy.get(linkToFibonacci).click();
    cy.contains('Последовательность Фибоначчи');
    cy.get('button').contains('Рассчитать');
  });

  it("Сортировка массива", () => {
    cy.get(linkToSortingPage).click();
    cy.contains('Сортировка массива');
    cy.get('button').contains('Новый массив');
  });

  it("Стек", () => {
    cy.get(linkToStackPage).click();
    cy.contains('Стек');
    cy.get('button').contains('Очистить');
  });

  it("Очередь", () => {
    cy.get(linkToQueuePage).click();
    cy.contains('Очередь');
    cy.get('button').contains('Очистить');
  });

  it("Связнный список", () => {
    cy.get(linkToListPage).click();
    cy.contains('Связный список');
    cy.get('button').contains('Удалить по индексу');
  });
  
});