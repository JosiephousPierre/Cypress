describe('Edit functionality', () => {
    beforeEach(() => {
        cy.visit('https://stirring-frangollo-3f6016.netlify.app/');
    });

    it('Check if the edit button works', () => {
        it('Edit a student', () => {
            // Log in
            cy.get('#username').type('admin1');
            cy.get('#password').type('admin1');
            cy.get('#login-b').click();
            cy.url().should('include', '/home');
    
            // Navigate to the Manage page
            cy.contains('a', 'Manage').click();
            cy.url().should('include', '/manage');

            cy.wait(5000);
    
            // Click the Add button
            cy.contains('button', 'Add').click();
    
            // Click on the Consultation link
            cy.contains('a', 'Consult').click();
            // If student is successfully added
            cy.url().should('include', '/consult');

            cy.wait(5000);
                    
            // Verify if the added student is displayed in the table on the consultation page
            cy.get('.p-datatable-tbody tr').should('have.length.above', 0).then(($rows) => {
                // Extract the added student's information and verify if it is present in the table
                const studentId = $rows.first().find('td').eq(0).text().trim();
                expect(studentId).to.not.be.empty;
    
                // Click on the edit button for the first student
                cy.get('.p-datatable-tbody tr').first().find('button.p-button-info').click();
            });
        });
    });

    it('Edit a student', () => {
        // Log in
        cy.get('#username').type('admin1');
        cy.get('#password').type('admin1');
        cy.get('#login-b').click();
        cy.url().should('include', '/home');

        // Navigate to the Manage page
        cy.contains('a', 'Manage').click();
        cy.url().should('include', '/manage');

        cy.wait(5000);

        // Click the Add button
        cy.contains('button', 'Add').click();

        // Click on the Consultation link
        cy.contains('a', 'Consult').click();
        // If student is successfully added
        cy.url().should('include', '/consult');

        cy.wait(5000);
                
        // Verify if the added student is displayed in the table on the consultation page
        cy.get('.p-datatable-tbody tr').should('have.length.above', 0).then(($rows) => {
            // Extract the added student's information and verify if it is present in the table
            const studentId = $rows.first().find('td').eq(0).text().trim();
            expect(studentId).to.not.be.empty;

            // Click on the edit button for the first student
            cy.get('.p-datatable-tbody tr').first().find('button.p-button-info').click();

            // Type 'Fever' into the symptom text field
            cy.get('#editedDescription').type('Fever');

            // Type 'Biogesic' into the medicine text field
            cy.get('#editedMedicine').type('Biogesic');

            // Click on the date button
            cy.get('#editedDate').should('be.visible').click();
            // Ensure the calendar button is visible before clicking it

            // Select the date 21
            cy.get('td[aria-label="21"]').click();
            
            cy.get('#editedTime').should('be.visible').click(); // Click on the element that triggers the time picker

            // Click on the button to increment the hour with { force: true } option
            cy.get('.p-hour-picker button[aria-label="Next Hour"]').click();

            // Click the "Save" button
            cy.contains('button', 'Save').click({force:true});

            cy.wait(5000);

            // Wait for the alert and assert its content
            cy.on('window:alert', (message) => {
                expect(message).to.equal('Category successfully saved!');

            });

            });
        });

        it('Leaving fields blank should trigger an alert', () => {

        cy.get('#username').type('admin1');
        cy.get('#password').type('admin1');
        cy.get('#login-b').click();
        cy.url().should('include', '/home');

        // Navigate to the Manage page
        cy.contains('a', 'Manage').click();
        cy.url().should('include', '/manage');

        cy.wait(5000);

        // Click the Add button
        cy.contains('button', 'Add').click();

        // Click on the Consultation link
        cy.contains('a', 'Consult').click();
        // If student is successfully added
        cy.url().should('include', '/consult');

        cy.wait(5000);
                
        // Verify if the added student is displayed in the table on the consultation page
        cy.get('.p-datatable-tbody tr').should('have.length.above', 0).then(($rows) => {
            // Extract the added student's information and verify if it is present in the table
            const studentId = $rows.first().find('td').eq(0).text().trim();
            expect(studentId).to.not.be.empty;

            // Click on the edit button for the first student
            cy.get('.p-datatable-tbody tr').first().find('button.p-button-info').click();

            // Click the "Add" button
            cy.contains('button', 'Add').click();
    
            // Click the "Save" button without filling any fields
            cy.contains('button', 'Save').click({force:true});

            cy.wait(5000);
    
            // Wait for the alert and assert its content
            cy.on('window:alert', (message) => {
                expect(message).to.equal('Please fill in all fields before saving.');
            });
        });
    });

    it('Canceling edit should trigger an alert', () => {

        cy.get('#username').type('admin1');
        cy.get('#password').type('admin1');
        cy.get('#login-b').click();
        cy.url().should('include', '/home');

        // Navigate to the Manage page
        cy.contains('a', 'Manage').click();
        cy.url().should('include', '/manage');

        // Click the Add button
        cy.contains('button', 'Add').click();

        // Click on the Consultation link
        cy.contains('a', 'Consult').click();
        // If student is successfully added
        cy.url().should('include', '/consult');
                
        // Verify if the added student is displayed in the table on the consultation page
        cy.get('.p-datatable-tbody tr').should('have.length.above', 0).then(($rows) => {
            // Extract the added student's information and verify if it is present in the table
            const studentId = $rows.first().find('td').eq(0).text().trim();
            expect(studentId).to.not.be.empty;

        // Click on the edit button for the first student
        cy.get('.p-datatable-tbody tr').first().find('button.p-button-info').click();
    
        // Click the "Cancel" button
        cy.contains('button', 'Cancel').click({force:true});
    
        // Wait for the alert and assert its content
        cy.on('window:alert', (message) => {
            expect(message).to.equal('Edit canceled!');
        });
    });
});
});
