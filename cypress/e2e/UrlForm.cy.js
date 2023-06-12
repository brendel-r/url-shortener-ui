describe('URL Form', () => {
  beforeEach(() => {
    cy.fixture('singleUrlFixture.json').then((urls) => {
      cy.intercept('GET', 'http://localhost:3001/api/v1/urls', urls).as('getUrls');
    });

    cy.visit('http://localhost:3000');
    cy.wait('@getUrls');
  });

  it('should submit the form and add the new URL to the list', () => {
    cy.fixture('multipleUrlFixture.json').then((multipleUrls) => {
      const newUrl = multipleUrls.urls[1];
      const { title, long_url } = newUrl;

      cy.intercept('POST', 'http://localhost:3001/api/v1/urls', { fixture: 'postUrlFixture.json' }).as('postUrl');

      cy.get('form').within(() => {
        cy.get('input[name="title"]').type(title);
        cy.get('input[name="urlToShorten"]').type(long_url);
        cy.get('button').click();
      });

      cy.wait('@postUrl').then(() => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/urls', multipleUrls).as('getMultipleUrls');
        cy.visit('http://localhost:3000');
        cy.wait('@getMultipleUrls');
        cy.get('.url').should('have.length', 2);
      });
    });
  });
})