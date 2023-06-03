describe('Компонент Последовательность Фибоначчи', () => {

  beforeEach(() => {
    cy.viewport(1280, 900);
    cy.visit('localhost:3000');
    cy.get('a[href*="fibonacci"]').click();
  });

  it('Доступность кнопки Рассчитать', () => {
    cy.get('input[placeholder="Введите число"]').should('be.empty');
    cy.contains('Рассчитать').should('be.disabled');
    cy.get('input[placeholder="Введите число"]').type('10');
    cy.contains('Рассчитать').should('be.enabled');
  });

  it('Правильная генерация чисел', () => {
    const array = [];
    cy.get('input[placeholder="Введите число"]').type('19');
    cy.contains('Рассчитать').click();
    cy.get('p[data-testid="text-in-circle"]', {timeout: 20000})
      .should('have.length', '20')
      .each((item, index) => {
        if (index === 0 || index === 1) {
          cy.wrap(item).should('have.text', '1');
          array.push(1);
        } else {
          array.push(array[index -2] + array[index - 1]);
          cy.wrap(item).should('have.text', `${array[index]}`);
        }
      });
  });
  
});