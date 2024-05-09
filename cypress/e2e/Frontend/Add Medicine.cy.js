describe('Edit functionality', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/');
    });

        it('Adding Medicine', () => {

        cy.get('#username').type('admin1');
        cy.get('#password').type('admin1');
        cy.get('#login-b').click();
        cy.url().should('include', '/home');

        // Navigate to the Manage page
        cy.contains('a', 'Medicine').click();
        cy.url().should('include', '/medicine');

        cy.wait(5000);

        // Click the Add button
        cy.contains('button', 'Add').click();

        // Type 'Fever' into the symptom text field
        cy.get('#drugName').type('test');
        cy.get('#brandName').type('test');
        cy.get('#quantity').type('10');

        // Click on the date button
        cy.get('#expiration').should('be.visible').click();
        // Ensure the calendar button is visible before clicking it

        // Select the date 21
        cy.get('td[aria-label="21"]').click();

                
        // Click the Add button
        cy.contains('button', 'Save').click();

        cy.wait(5000);
    
           
        });
        // Wait for the alert and assert its content
        cy.on('window:alert', (message) => {
            expect(message).to.equal('Medicine was successfully added.');
    });

    it('Canceling adding Medicine', () => {

        cy.get('#username').type('admin1');
        cy.get('#password').type('admin1');
        cy.get('#login-b').click();
        cy.url().should('include', '/home');

        // Navigate to the Manage page
        cy.contains('a', 'Medicine').click();
        cy.url().should('include', '/medicine');

        // Click the Add button
        cy.contains('button', 'Add').click();
                
        cy.contains('button', 'Cancel').click();   
        
        cy.wait(5000);
    
        });
        // Wait for the alert and assert its content
        cy.on('window:alert', (message) => {
            expect(message).to.equal('Adding medicine has been canceled.');
    });

    it('Leaving empty on text fields should alert', () => {

        cy.get('#username').type('admin1');
        cy.get('#password').type('admin1');
        cy.get('#login-b').click();
        cy.url().should('include', '/home');

        // Navigate to the Manage page
        cy.contains('a', 'Medicine').click();
        cy.url().should('include', '/medicine');

        // Click the Add button
        cy.contains('button', 'Add').click();
                
        cy.contains('button', 'Save').click();   
        
        cy.wait(5000);
    
        });
        // Wait for the alert and assert its content
        cy.on('window:alert', (message) => {
            expect(message).to.equal('Please fill in all fields before saving.');
    });
});