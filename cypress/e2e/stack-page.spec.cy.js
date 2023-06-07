import { defaultColor, changingColor } from '../../src/utils/constants/delays'

describe('Stack', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/stack');
  });

  it('should be disabled while input is empty', () => {
    cy.get('input').should('be.empty')
    cy.get('form').find('button[type="submit"]').should('be.disabled')
  });

  it('should add elements to stack correctly', () => {

    cy.get('input').type('6');
    cy.get('form').find('button[type="submit"]').should('not.be.disabled').click();

    cy.get('[class^="circle_circle"]').as('circle');

    cy.get('@circle').should(($circle) => {
      expect($circle).to.have.length(1);
      expect($circle).to.contain('6').to.have.css('border-color', changingColor)
    });

    cy.wait(1000);

    cy.get('@circle').should(($circle) => {
      expect($circle).to.have.length(1);
      expect($circle).to.contain('6').to.have.css('border-color', defaultColor)
    });
  });

  it('should delete elements from stack correctly', () => {

    cy.get('input').type('6');
    cy.get('form').find('button[type="submit"]').should('not.be.disabled').click();

    cy.get('form').find('button[type="button"]').should('not.be.disabled').click();

    cy.get('[class^="circle_circle"]').as('circle');  

    cy.get('@circle').should(($circle) => {
      expect($circle).to.have.css('border-color', changingColor)
    });

    cy.wait(1000);

    cy.get('@circle').should(($circle) => {
      expect($circle).to.have.length(0);
    });
    
  });

  it('should reset the stack', () => {

    for(let j = 0; j < 5; j++) {
      cy.get('input').type(j);
      cy.get('form').find('button[type="submit"]').should('not.be.disabled').click();
    };

    cy.get('form').find('button[type="reset"]').should('not.be.disabled').click();

    cy.get('[class^="circle_circle"]').as('circle');

    cy.get('@circle').should(($circle) => {
      expect($circle).to.have.length(0);
    });
  });
  
});