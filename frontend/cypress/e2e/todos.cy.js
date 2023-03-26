describe('The Todos page', () => {
  it('should show some todos', () => {
    cy.visit('/');
    cy.get('h1').should('contain', 'Todos');
  });
  it('should open the singup/login page when clicking SINGUP/LOGIN', () => {
    cy.visit('/');
    cy.contains('SIGNUP/LOGIN').click();
    cy.url().should('include', 'auth');
    cy.get('h2').should('contain', 'Login');
  });
  it('should allow a logged in user to add a todo', () => {
    cy.login('test@user.com', 'testuser');
    cy.url().should('be.equal', `${Cypress.config().baseUrl}/`);
    cy.contains('ADD TODO').click();
    cy.get('#task').type('Test Todo');
    cy.get('#tag').type('Test');
    cy.get('#done').click();
    cy.get('.button').click();

    cy.visit('/');
    cy.contains('Test Todo - Test - Done');
  });
});
