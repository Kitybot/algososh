import {  defaultColor } from '../../src/utils/constants/element-captoins';

describe('Fibonacci', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/fibonacci');
  });

  it('should be disabled while input is empty', () => {
    cy.get('input').should('be.empty')
    cy.get('form').find('button').should('be.disabled')
  });

  it('should generate numbers correctly', () => {

    cy.get('input').type('6');
    cy.get('form').find('button').should('not.be.disabled').click();

    cy.get('[class^="circle_circle"]').as('circles');

    cy.get('@circles').should(($circles) => {
      expect($circles).to.have.length(7);

      expect($circles.eq(0)).to.contain('1').to.have.css('border-color', defaultColor);
      expect($circles.eq(1)).to.contain('1').to.have.css('border-color', defaultColor);
      expect($circles.eq(2)).to.contain('2').to.have.css('border-color', defaultColor);
      expect($circles.eq(3)).to.contain('3').to.have.css('border-color', defaultColor);
      expect($circles.eq(4)).to.contain('5').to.have.css('border-color', defaultColor);
      expect($circles.eq(5)).to.contain('8').to.have.css('border-color', defaultColor);
      expect($circles.eq(6)).to.contain('13').to.have.css('border-color', defaultColor);
    });
  });
});