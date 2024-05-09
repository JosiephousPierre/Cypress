describe('The Login Page', () => {
    it('successfully loads', () => {
      cy.visit('https://stirring-frangollo-3f6016.netlify.app/') // change URL to match your dev URL
    })
  })

  describe('Login Functionality', () => {
    it('successfully login with valid credentials', () => {
        // Visit the login page
        cy.visit('https://stirring-frangollo-3f6016.netlify.app/') // Change URL to match your local development URL
        
        // Enter valid username and password
        cy.get('#username').type('admin1')
        cy.get('#password').type('admin1')
        
        // Click on the login button
        cy.get('#login-b').click()
        
        // Assertion to ensure successful login, assuming the user is redirected to the home page
        cy.url().should('include', '/home') // Adjust the URL check based on your application's routing
        
        // Optionally, you can also check for a success message on the home page
        cy.on('window:alert', (message) => {
            expect(message).to.equal('Login successful!')
        })
    })

    it('displays error message with invalid credentials', () => {
        // Visit the login page
        cy.visit('https://stirring-frangollo-3f6016.netlify.app/') // Change URL to match your local development URL
        
        // Enter invalid username and password
        cy.get('#username').type('invalidUsername')
        cy.get('#password').type('invalidPassword')
        
        // Click on the login button
        cy.get('#login-b').click()
        
        // Assertion to ensure error message is displayed
        cy.on('window:alert', (message) => {
            expect(message).to.equal('Invalid username or password!')
        })
    })

    it('displays error message with empty username', () => {
        // Visit the login page
        cy.visit('https://stirring-frangollo-3f6016.netlify.app/') // Change URL to match your local development URL
        
        // Click on the login button
        cy.get('#login-b').click()
        
        // Assertion to ensure error message is displayed
        cy.get('.error-message').should('be.visible').and('contain.text', 'Provide username or password!')
    })

    it('displays error message with empty password', () => {
        // Visit the login page
        cy.visit('https://stirring-frangollo-3f6016.netlify.app/') // Change URL to match your local development URL
        
        // Enter valid username
        cy.get('#username').type('validUsername')
        
        // Click on the login button
        cy.get('#login-b').click()
        
        // Assertion to ensure error message is displayed
        cy.get('.error-message').should('be.visible').and('contain.text', 'Provide username or password!')
    })
})