describe('Login-Testing', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  // Positive Test Cases
  describe('Positive Tests', () => {
    it('Login success with valid credentials', () => {
      cy.get('#user-name').type('standard_user');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
      cy.get('[data-test="title"]').should('contain.text', 'Products');
    });

    it('Login success after logout', () => {
      cy.get('#user-name').type('standard_user');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
      cy.get('#react-burger-menu-btn').click();
      cy.get('#logout_sidebar_link').click();
      cy.get('#login-button').should('be.visible');
    });

    it('Login success with performance glitch user', () => {
      cy.get('#user-name').type('performance_glitch_user');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
      cy.get('[data-test="title"]').should('contain.text', 'Products');
    });
  });

  // Negative Test Cases
  describe('Negative Tests', () => {
    it('Login failed - empty username', () => {
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
      cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username is required');
    });

    it('Login failed - empty password', () => {
      cy.get('#user-name').type('standard_user');
      cy.get('#login-button').click();
      cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Password is required');
    });

    it('Login failed - locked out user', () => {
      cy.get('#user-name').type('locked_out_user');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
      cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Sorry, this user has been locked out.');
    });

    it('Login failed - invalid username', () => {
      cy.get('#user-name').type('invalid_user');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
      cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service');
    });

    it('Login failed - invalid password', () => {
      cy.get('#user-name').type('standard_user');
      cy.get('#password').type('wrong_password');
      cy.get('#login-button').click();
      cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service');
    });

    it('Login failed - empty username and password', () => {
      cy.get('#login-button').click();
      cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username is required');
    });
  });

  // Validation Test Cases
  describe('Validation Tests', () => {
    it('Login with special characters in username', () => {
      cy.get('#user-name').type('!@#$%^&*');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
      cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service');
    });

    it('Login with spaces in username and password', () => {
      cy.get('#user-name').type('     ');
      cy.get('#password').type('     ');
      cy.get('#login-button').click();
      cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service');
    });

    it('Login with mixed case sensitivity in username', () => {
      cy.get('#user-name').type('Standard_User');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
      cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service');
    });

    it('Login with username exceeding max length', () => {
      const longUsername = 'a'.repeat(100);
      cy.get('#user-name').type(longUsername);
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
      cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service');
    });

    it('Login with password exceeding max length', () => {
      const longPassword = 'a'.repeat(100);
      cy.get('#user-name').type('standard_user');
      cy.get('#password').type(longPassword);
      cy.get('#login-button').click();
      cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service');
    });

    it('Login with SQL injection string in username', () => {
      cy.get('#user-name').type("' OR '1'='1");
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
      cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service');
    });
  });
});
