export {};
describe('end to end', () => {
  it('pages forward and backwards', () => {
    // visits the local host
    cy.visit('http://localhost:3000/');
    cy.intercept('GET', 'https://swapi.dev/api/people/', {
      fixture: 'page1.json'
    });
    cy.intercept('GET', 'https://swapi.dev/api/people/?page=1', {
      fixture: 'page1.json'
    });
    cy.contains('Luke Skywalker', { timeout: 4000 }).should('be.visible');

    // pages forward
    cy.get('.ant-pagination-next').click();
    cy.intercept('GET', 'https://swapi.dev/api/people/?page=2', {
      fixture: 'page2.json'
    });
    cy.contains('Anakin Skywalker', { timeout: 4000 }).should('be.visible');

    //updates the query string
    cy.location().should((loc) => {
      expect(loc.search).to.eq('?page=2');
    });

    // pages backward
    cy.get('.ant-pagination-prev').click();
    cy.intercept('GET', 'https://swapi.dev/api/people/?page=1', {
      fixture: 'page1.json'
    });
    cy.contains('Luke Skywalker', { timeout: 4000 }).should('be.visible');

    // sort ascending
    cy.get('.ant-table-column-sorters').click();
    cy.get('.ant-table-row-level-0').first().contains('R2-D2');
    cy.get('.ant-table-row-level-0').last().contains('Darth Vader');

    // sort descending
    cy.get('.ant-table-column-sorters').click();
    cy.get('.ant-table-row-level-0').first().contains('Darth Vader');
    cy.get('.ant-table-row-level-0').last().contains('R5-D4');

    // clear sort
    cy.get('.ant-table-column-sorters').click();
    cy.get('.ant-table-row-level-0').first().contains('Luke Skywalker');
    cy.get('.ant-table-row-level-0').last().contains('Obi-Wan Kenobi');
  });

  it('responds to query string', () => {
    cy.visit('http://localhost:3000/?page=2');
    cy.intercept('GET', 'https://swapi.dev/api/people/', {
      fixture: 'page1.json'
    });
    cy.intercept('GET', 'https://swapi.dev/api/people/?page=2', {
      fixture: 'page2.json'
    });
    cy.contains('Anakin Skywalker', { timeout: 4000 }).should('be.visible');
  });

  it('responds to incorrect query string', () => {
    cy.visit('http://localhost:3000/?page=-9001');
    cy.intercept('GET', 'https://swapi.dev/api/people/', {
      fixture: 'page1.json'
    });
    cy.intercept('GET', 'https://swapi.dev/api/people/?page=1', {
      fixture: 'page1.json'
    });
    cy.contains('Luke Skywalker', { timeout: 4000 }).should('be.visible');
  });

  it('handles 404', () => {
    cy.visit('http://localhost:3000/fourohfour', {
      failOnStatusCode: false,
      retryOnStatusCodeFailure: false
    });
    cy.intercept('GET', 'https://swapi.dev/api/people/', {
      fixture: 'page1.json'
    });
    cy.contains('This page could not be found.', { timeout: 4000 }).should(
      'be.visible'
    );
  });

  it('handles !200', () => {
    cy.visit('http://localhost:3000/');
    cy.intercept('GET', 'https://swapi.dev/api/people/', {
      fixture: 'page1.json'
    });
    cy.intercept('GET', 'https://swapi.dev/api/people/?page=1', {
      statusCode: 500
    });
  });
  it('responds on mobile', () => {
    // set viewport
    cy.viewport('iphone-6');
    cy.visit('http://localhost:3000/');
    cy.intercept('GET', 'https://swapi.dev/api/people/', {
      fixture: 'page1.json'
    });
    cy.intercept('GET', 'https://swapi.dev/api/people/?page=1', {
      fixture: 'page1.json'
    });
    // check table has been shrunk
    cy.contains('Height', { timeout: 4000 }).should('not.exist');
  });
});
