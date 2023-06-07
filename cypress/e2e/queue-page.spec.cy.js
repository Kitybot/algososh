import { get } from 'fetch-mock';
import { defaultColor, changingColor, modifiedColor } from '../../src/utils/constants/element-captoins';

describe('List', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/list');
  });

  it('should be disabled while value input is empty', () => {
    cy.get('input[placeholder="Введите значение"]').should('be.empty');
    cy.get('button[id="Добавить в head"]').should('be.disabled');
    cy.get('button[id="Добавить в tail"]').should('be.disabled');
  });

  it('should be disabled while index input is empty', () => {
    cy.get('input[placeholder="Введите индекс"]').should('be.empty');
    cy.get('button[id="Добавить по индексу"]').should('be.disabled');
  });

  it('should show the default list', () => {
  
    cy.get('[class^="circle_circle"]').as('circles');

    cy.get('@circles').each(($circles, index) => {
      expect($circles).to.have.css('border-color', defaultColor);
    });

    cy.get('li').eq(0).should('contain', 'head')
    cy.get('li').eq(-1).should('contain', 'tail')

  });

  it('should prepend the element', () => {

    cy.get('input[placeholder="Введите значение"]').type('5')
    cy.get('button[id="Добавить в head"]').should('not.be.disabled').click();

    cy.get('[class^="circle_circle"]').as('circles');

    cy.get('@circles').should(($circles) => {
      expect($circles.eq(0)).to.contain('5').to.have.css('border-color', changingColor)
    });

    cy.wait(500);

    cy.get('@circles').should(($circles) => {
      expect($circles.eq(0)).to.contain('5').to.have.css('border-color', modifiedColor)
    });

    cy.wait(1000);

    cy.get('@circles').should(($circles) => {
      expect($circles.eq(0)).to.contain('5', 'head').to.have.css('border-color', defaultColor)
    });

  });

  it('should append the element', () => {

    cy.get('input[placeholder="Введите значение"]').type('7')
    cy.get('button[id="Добавить в tail"]').should('not.be.disabled').click();

    cy.get('[class^="circle_circle"]').as('circles');

    cy.get('[class*="list-page_smallCircle"]').as('crcl')

    cy.get('@crcl').should(($circle) => {
      expect($circle).to.contain('7').to.have.css('border-color', changingColor)
    });

    cy.wait(500);

    cy.get('@circles').should(($circle) => {
      expect($circle.eq(-1)).to.contain('7').to.have.css('border-color', modifiedColor)
    });

    cy.wait(1000);

    cy.get('@circles').should(($circles) => {
      expect($circles.last()).to.contain('7', 'tail').to.have.css('border-color', defaultColor);
    });

  });

  it('should shift the element', () => {

    cy.get('input[placeholder="Введите значение"]').type('5')
    cy.get('button[id="Добавить в head"]').should('not.be.disabled').click();

    cy.get('[class^="circle_circle"]').as('circles');

    cy.get('@circles').should(($circles) => {
      expect($circles.eq(0)).to.contain('5')
    });

    cy.wait(500);

    cy.get('@circles').should(($circles) => {
      expect($circles.eq(0)).to.contain('5').to.have.css('border-color', modifiedColor)
    });

    cy.wait(1000);

    cy.get('@circles').should(($circles) => {
      expect($circles.eq(0)).to.contain('5', 'head').to.have.css('border-color', defaultColor)
    });

    cy.get('input[placeholder="Введите значение"]').type('5')
    cy.get('button[id="Удалить из head"]').should("not.be.disabled").click();

    cy.get('[class^="circle_circle"]').as('circles');

    cy.get('@circles').should($circles => {
      expect($circles[1]).to.contain('')
    })

    cy.get('[class*="list-page_smallCircle"]').as('crcl')

    cy.get('@crcl').should($crcl => {
      expect($crcl).to.have.css('border-color', changingColor)
    })

    cy.wait(1000)

  });

  it('should pop the element', () => {

    cy.get('input[placeholder="Введите значение"]').type('7')
    cy.get('button[id="Добавить в tail"]').should('not.be.disabled').click();

    cy.get('[class^="circle_circle"]').as('circles');

    cy.get('[class*="list-page_smallCircle"]').as('crcl')

    cy.get('@crcl').should(($circle) => {
      expect($circle).to.contain('7').to.have.css('border-color', changingColor)
    });

    cy.wait(500);

    cy.get('@circles').should(($circle) => {
      expect($circle.eq(-1)).to.contain('7').to.have.css('border-color', modifiedColor)
    });

    cy.wait(1000);

    cy.get('@circles').should(($circles) => {
      expect($circles.last()).to.contain('7', 'tail').to.have.css('border-color', defaultColor);
    });

    cy.get('input[placeholder="Введите значение"]').type('5')
    cy.get('button[id="Удалить из tail"]').should("not.be.disabled").click();

    cy.get('[class^="circle_circle"]').as('circles');

    cy.get('[class*="list-page_smallCircle"]').as('crcl')

    cy.get('@crcl').should($crcl => {
      expect($crcl).to.have.css('border-color', changingColor)
    })

    cy.wait(1000);

  });

  it('should add the element by index', () => {

    cy.get("input[placeholder='Введите значение']").type('000');
    cy.get("input[placeholder='Введите индекс']").type(2);
    cy.get('button[id="Добавить по индексу"]').should("not.be.disabled").click();

    cy.get('[class^="circle_circle"]').as('circles');

    for (let i = 0; i < 2; i++) {

      cy.get('@circles').should(($circles) => {
        expect($circles.eq(i)).to.have.css('border-color', changingColor);
      });
    }

    cy.wait(500);

    cy.get('[class*="list-page_smallCircle"]').as('crcl')

    cy.get('@crcl').should($crcl => {
      expect($crcl).to.have.css('border-color', changingColor).to.contain('000')
    });

    cy.wait(500);

    cy.get('@circles').should(($circles) => {
      expect($circles.eq(2)).to.contain('000').to.have.css('border-color', modifiedColor);
    });    

    cy.wait(500);

    cy.get('@circles').should(($circles) => {
      expect($circles.eq(2)).to.have.css('border-color', defaultColor);
    }); 

  });

  it('should delete the element by index', () => {
    cy.get("input[placeholder='Введите значение']").type('000');
    cy.get("input[placeholder='Введите индекс']").type(0);
    cy.get('button[id="Добавить по индексу"]').should("not.be.disabled").click();

    cy.get('[class^="circle_circle"]').as('circles');

    for (let i = 0; i <= 0; i++) {
      cy.get('@circles').should(($circles) => {
        expect($circles.eq(i)).to.have.css('border-color', changingColor);
      });
    }

    cy.get('[class*="list-page_smallCircle"]').as('crcl')

    cy.get('@crcl').should($crcl => {
      expect($crcl).to.have.css('border-color', changingColor).to.contain('000')
    });

    cy.wait(500);

    cy.get('@circles').should(($circles) => {
      expect($circles.eq(0)).to.contain('000').to.have.css('border-color', modifiedColor);
    });    

    cy.wait(500);

    cy.get('@circles').should(($circles) => {
      expect($circles.eq(0)).to.have.css('border-color', defaultColor);
    }); 

    cy.get("input[placeholder='Введите индекс']").type('0');
    cy.get('button[id="Удалить по индексу"]').should("not.be.disabled").click();

    cy.get('[class^="circle_circle"]').as('circles');

    for (let i = 0; i <= 0; i++) {
      cy.get('@circles').should(($circles) => {
        expect($circles.eq(i)).to.have.css('border-color', defaultColor).to.contain('');
      });
    }

    cy.wait(500);

    cy.get('[class*="list-page_smallCircle"]').as('crcl')

    cy.get('@crcl').should($crcl => {
      expect($crcl).to.have.css('border-color', changingColor).to.contain('000');
    }); 

    cy.wait(500);

  });

});