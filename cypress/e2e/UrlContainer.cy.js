describe('URL Container', () => {
  beforeEach(() => {
    cy.fixture('SingleUrlFixture.json').then((urls) => {
      cy.intercept('GET', 'http://localhost:3001/api/v1/urls', urls).as('getUrls');
    });

    cy.visit('http://localhost:3000');
    cy.wait('@getUrls');
  });

  it('should display the page title and existing shortened URLs', () => {
    cy.contains('URL Shortener'); 
    cy.get('.url').should('have.length', 1);
  });

  it('should display the form with the proper inputs', () => {
    cy.get('form').within(() => {
      cy.get('input[name="title"]').should('have.attr', 'placeholder', 'Title...');
      cy.get('input[name="urlToShorten"]').should('have.attr', 'placeholder', 'URL to Shorten...');
    });
  });

  it('should reflect the form inputs when filled out', () => {
    const title = 'Example Title';
    const urlToShorten = 'https://exampleofareallylongurlthatyouwanttoshorten.com';

    cy.get('form').within(() => {
      cy.get('input[name="title"]').type(title).should('have.value', title);
      cy.get('input[name="urlToShorten"]').type(urlToShorten).should('have.value', urlToShorten);
    });
  });
});
