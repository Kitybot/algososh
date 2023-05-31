describe('Компонент Стек', () => {

  beforeEach(() => {
    cy.viewport(1280, 900);
    cy.visit('http://localhost:3000');
    cy.get('a[href*="stack"]').click();
  });

  it('Доступность кнопки Добавить', () => {
    cy.get('input[placeholder="Введите текст"]').should('be.empty');
    cy.contains('Добавить').should('be.disabled');
    cy.get('input[placeholder="Введите текст"]').type('s');
    cy.contains('Добавить').should('be.enabled');
  });

  it('Добавление элемента в стек', () => {
    cy.get('input[placeholder="Введите текст"]').type('a');
    cy.contains('Добавить').click();
    cy.get('p[data-testid="text-in-circle"]')
      .parent()
      .should('have.length', '1')
      .and('have.css', 'border-color', 'rgb(210, 82, 225)')
      .and('have.text', 'a')
      .prev()
      .should('have.text', 'top');
    cy.wait(500)
      .then(() => {})
      .get('p[data-testid="text-in-circle"]')
      .parent()
      .should('have.css', 'border-color', 'rgb(0, 50, 255)')
      .next()
      .should('have.text', '0');
    cy.get('input[placeholder="Введите текст"]').type('b');
    cy.contains('Добавить').click();
    cy.get('p[data-testid="text-in-circle"]')
      .should('have.length', '2')
      .each((item, index) => {
        if (index === 0) {
          cy.wrap(item)
            .should('have.text', 'a')
            .parent()
            .should('have.css', 'border-color', 'rgb(0, 50, 255)')
            .prev()
            .should('be.empty')
            .next().next()
            .should('have.text', `${index}`);
        }
        if (index === 1) {
          cy.wrap(item)
            .should('have.text', 'b')
            .parent()
            .should('have.css', 'border-color', 'rgb(210, 82, 225)')
            .prev()
            .should('have.text', 'top')
            .next().next()
            .should('have.text', `${index}`);
        }
      });
    cy.wait(500)
      .then(() => {})
      .get('p[data-testid="text-in-circle"]')
      .parent()
      .eq(1)
      .should('have.css', 'border-color', 'rgb(0, 50, 255)');
  });

  it('Удаление элемента из стека', () => {
    cy.get('input[placeholder="Введите текст"]').type('a');
    cy.contains('Добавить').click();
    cy.contains('Удалить').should('be.enabled');
    cy.get('input[placeholder="Введите текст"]').type('b');
    cy.contains('Добавить').click();
    cy.contains('Удалить').should('be.enabled').click();
    cy.get('p[data-testid="text-in-circle"]')
      .each((item, index) => {
        if (index === 0) {
          cy.wrap(item)
            .should('have.text', 'a')
            .parent()
            .should('have.css', 'border-color', 'rgb(0, 50, 255)')
            .prev()
            .should('be.empty')
            .next().next()
            .should('have.text', `${index}`);
        }
        if (index === 1) {
          cy.wrap(item)
            .should('have.text', 'b')
            .parent()
            .should('have.css', 'border-color', 'rgb(210, 82, 225)')
            .prev()
            .should('have.text', 'top')
            .next().next()
            .should('have.text', `${index}`);
        }
      });
    cy.get('p[data-testid="text-in-circle"]', {timeout: 500})
      .should('have.text', 'a')
      .parent()
      .should('have.css', 'border-color', 'rgb(0, 50, 255)')
      .prev()
      .should('have.text', 'top')
      .next().next()
      .should('have.text', `0`);
    cy.contains('Удалить').click();
    cy.get('p[data-testid="text-in-circle"]')
      .parent()
      .should('have.css', 'border-color', 'rgb(210, 82, 225)');
    cy.get('p[data-testid="text-in-circle"]', {timeout: 500})
      .should('have.length', '0');
  });

  it('Очистка стека', () => {
    cy.get('input[placeholder="Введите текст"]').type('a');
    cy.contains('Добавить').click();
    cy.contains('Очистить').should('be.enabled');
    cy.get('input[placeholder="Введите текст"]').type('b');
    cy.contains('Добавить').click();
    cy.contains('Очистить').should('be.enabled');
    cy.get('input[placeholder="Введите текст"]').type('с');
    cy.contains('Добавить').click();
    cy.get('p[data-testid="text-in-circle"]').should('have.length', '3');
    cy.contains('Очистить').click();
    cy.get('p[data-testid="text-in-circle"]').should('have.length', '0');
  });

});