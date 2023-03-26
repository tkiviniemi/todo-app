describe('The Authentication page', () => {
  it('should allow switching between SIGNUP and LOGIN', () => {
    cy.visit('/auth');
    cy.contains('SIGNUP instead?').click();
    cy.get('button').should('not.contain', 'SIGNUP instead?');
    cy.contains('LOGIN instead?').click();
    cy.get('button').should('not.contain', 'LOGIN instead?');
  });
  it('should allow a user to sign up with valid credentials', () => {
    cy.visit('/auth');
    cy.contains('SIGNUP instead?').click();
    cy.get('button').should('not.contain', 'SIGNUP instead?');

    cy.get('#name').type('Test User');
    cy.get('#email').type('test@user.com');
    cy.get('#password').type('testuser');

    cy.get('form > .button').click();
    cy.url().should('be.equal', `${Cypress.config().baseUrl}/`);
  });
  it('should allow a user to login with valid credentials', () => {
    cy.visit('/auth');
    cy.get('#email').type('test@user.com');
    cy.get('#password').type('testuser');

    cy.get('form > .button').click();
    cy.url().should('be.equal', `${Cypress.config().baseUrl}/`);
  });
});
