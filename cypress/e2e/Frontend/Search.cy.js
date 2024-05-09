describe('Search functionality', () => {
    beforeEach(() => {
        cy.visit('https://stirring-frangollo-3f6016.netlify.app/');
    });

    it('Searches for a student', () => {
        // Log in
        cy.get('#username').type('admin1');
        cy.get('#password').type('admin1');
        cy.get('#login-b').click();
        cy.url().should('include', '/home');

        // Navigate to the Manage page
        cy.contains('a', 'Manage').click();
        cy.url().should('include', '/manage');

        cy.wait(5000);

        // Extract a student ID from the table and use it as the search term
        cy.get('.p-datatable-tbody tr:first-child td:first-child').invoke('text').then((studentId) => {
            // Click on the search input field and type the student ID
            cy.get('.p-inputtext').should('be.visible').eq(0).click().type(studentId.trim());

            // Wait for search results to appear
            cy.get('.p-datatable-tbody').should('be.visible');

            // Check if the search results contain the expected student ID
            cy.contains('.p-datatable-tbody', studentId).should('exist');
        });
    });

    it('Searches for a non-existing student', () => {
        const nonExistingStudentId = '999999'; // Assuming '999999' is a non-existing student ID
    
        // Log in
        cy.get('#username').type('admin1');
        cy.get('#password').type('admin1');
        cy.get('#login-b').click();
        cy.url().should('include', '/home');
    
        // Navigate to the Manage page
        cy.contains('a', 'Manage').click();
        cy.url().should('include', '/manage');

        cy.wait(5000);
    
        // Click on the search input field and type the non-existing student ID
        cy.get('.p-inputtext').should('be.visible').eq(0).click().type(nonExistingStudentId);
    
        // Wait for search results to appear
        cy.get('.p-datatable-tbody').should('be.visible');
    
        // Check if the "No Records Found" message is displayed within the container
        cy.get('.container').contains('No records found').should('exist');
    });
});
