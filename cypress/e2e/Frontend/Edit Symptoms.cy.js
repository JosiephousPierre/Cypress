describe('Edit functionality', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/');
    });

        it('Editing Symptom', () => {

        cy.get('#username').type('admin1');
        cy.get('#password').type('admin1');
        cy.get('#login-b').click();
        cy.url().should('include', '/home');

        // Navigate to the Manage page
        cy.contains('a', 'Symptoms').click();
        cy.url().should('include', '/symptoms');

        cy.wait(5000);

        // Click the Add button
        cy.contains('button', 'Edit').click();

        // Type 'Fever' into the symptom text field
        cy.get('#illness').clear().type('test');

        // Click the Add button
        cy.contains('button', 'Save').click();

        cy.wait(5000);
    
           
        });
        // Wait for the alert and assert its content
        cy.on('window:alert', (message) => {
            expect(message).to.equal('Symptom was successfully edited.');
    });

    it('Canceling Editing Symptoms', () => {

        cy.get('#username').type('admin1');
        cy.get('#password').type('admin1');
        cy.get('#login-b').click();
        cy.url().should('include', '/home');

        // Navigate to the Manage page
        cy.contains('a', 'Symptoms').click();
        cy.url().should('include', '/symptoms');

        // Click the Add button
        cy.contains('button', 'Edit').click();
                
        cy.contains('button', 'Cancel').click();   
        
        cy.wait(5000);
    
        });
        // Wait for the alert and assert its content
        cy.on('window:alert', (message) => {
            expect(message).to.equal('Editing symptoms has been canceled.');
    });

    it('Leaving empty on text fields should alert', () => {

        cy.get('#username').type('admin1');
        cy.get('#password').type('admin1');
        cy.get('#login-b').click();
        cy.url().should('include', '/home');

        // Navigate to the Manage page
        cy.contains('a', 'Symptoms').click();
        cy.url().should('include', '/symptoms');

        // Click the Add button
        cy.contains('button', 'Edit').click();

        // Type 'Fever' into the symptom text field
        cy.get('#illness').clear();
    
        cy.contains('button', 'Save').click();   
        
        cy.wait(5000);
    
        });
        // Wait for the alert and assert its content
        cy.on('window:alert', (message) => {
            expect(message).to.equal('Please fill in all fields before saving.');
    });

});