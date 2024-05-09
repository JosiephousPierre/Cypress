describe('API Manage Endpoint Testing', () => {
  // Define the base URL of your FastAPI application
  const baseUrl = 'https://backendfinal-eta.vercel.app';

  beforeEach(() => {
    // Visit the Swagger UI page
    cy.visit(`${baseUrl}/docs#/`);
  });

it('should GET consult using consult_id', () => {
  // Locate the div with the class 'opblock-summary opblock-summary-put' containing the specified text
  cy.get('.opblock-summary.opblock-summary-get')
        .contains('/api/consult/{consult_id}')
        .click(); // Click the div itself

  // Click on the 'Try it out' button
  cy.get('.btn.try-out__btn').click();

  // Set the `consult_id` parameter
  cy.get('input[type="text"][placeholder="consult_id"]').clear().type('3');

  // Execute the endpoint
  cy.get('.btn.execute').click();

  cy.wait(5000);

  // Wait for the response to be visible and check that it's not empty
  cy.get('.response')
    .find('.response-body') // Adjust selector as necessary
    .should('not.be.empty');

  // Check for possible errors
  cy.get('.response')
    .find('.microlight')
    .should('not.contain', 'Internal Server Error')
    .and('not.contain', 'Error');
});
});