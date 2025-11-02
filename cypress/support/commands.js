// cypress/support/commands.js
// Custom commands for e-commerce testing suite
// Credentials are loaded from environment variables for security
// ***********************************************

/// <reference types="cypress" />

// =====================
// Helper Functions
// =====================

/**
 * Safely click on an element if it exists (without failing)
 * @param {JQuery|String} maybe - jQuery object or selector string
 */
function safeClickMaybe(maybe) {
  if (maybe && maybe.length) {
    cy.wrap(maybe.first()).click({ force: true });
    return true;
  }
  return false;
}

// =====================
// Custom Commands
// =====================

/**
 * Navigate directly to the login page
 */
Cypress.Commands.add('openLoginPage', () => {
  cy.visit('https://demo.codenbox.com/index.php?route=account/login');

  // Close cookie banners if they exist
  cy.get('body').then(($b) => {
    const selectors = [
      '.cookie',
      '.cc-window',
      '.cookie-banner',
      '[id*="cookie"]',
      '.btn-accept',
      '.cc-accept',
      "button:contains('Accept')",
      "button:contains('Aceptar')"
    ];

    for (const sel of selectors) {
      const found = $b.find(sel);
      if (found && found.length) {
        cy.wrap(found.first()).click({ force: true });
        break;
      }
    }
  });

  cy.url().should('include', 'route=account/login');
});

/**
 * Successful login using environment variables
 * Credentials should be defined in cypress.env.json (not committed to repo)
 * 
 * @param {string} email - User email (defaults to env variable)
 * @param {string} password - User password (defaults to env variable)
 */
Cypress.Commands.add(
  'login',
  (email = Cypress.env('defaultEmail'), password = Cypress.env('defaultPassword')) => {
    cy.get('form[action*="route=account/login"]', { timeout: 10000 }).within(() => {
      cy.get('#input-email').clear().type(email);
      cy.get('#input-password').clear().type(password, { log: false });

      // Try to locate and click the submit button
      cy.get('button[type="submit"], input[type="submit"], input[value="Login"]', { timeout: 2000 })
        .then(($btns) => {
          if ($btns && $btns.length) {
            cy.wrap($btns.first()).click({ force: true });
          } else {
            // Fallback: search for button with login text
            cy.contains('button', /login|sign in/i, { matchCase: false })
              .then(($btn) => {
                if ($btn && $btn.length) {
                  cy.wrap($btn).click({ force: true });
                } else {
                  // Last option: press Enter in password field
                  cy.get('#input-password').type('{enter}');
                }
              })
              .catch(() => {
                cy.get('#input-password').type('{enter}');
              });
          }
        });
    });
  }
);

/**
 * Login attempt with invalid credentials (should fail)
 * Uses invalid credentials from environment variables
 * 
 * @param {string} email - Invalid email (defaults to env variable)
 * @param {string} password - Invalid password (defaults to env variable)
 */
Cypress.Commands.add(
  'loginShouldFail',
  (email = Cypress.env('invalidEmail'), password = Cypress.env('invalidPassword')) => {
    cy.get('form[action*="route=account/login"]', { timeout: 10000 }).within(() => {
      cy.get('#input-email').clear().type(email);
      cy.get('#input-password').clear().type(password, { log: false });

      cy.get('button[type="submit"], input[type="submit"], input[value="Login"]', { timeout: 2000 })
        .then(($btns) => {
          if ($btns && $btns.length) {
            cy.wrap($btns.first()).click({ force: true });
          } else {
            cy.contains('button', /login|sign in/i, { matchCase: false })
              .then(($btn) => {
                if ($btn && $btn.length) cy.wrap($btn).click({ force: true });
                else cy.get('#input-password').type('{enter}');
              })
              .catch(() => cy.get('#input-password').type('{enter}'));
          }
        });
    });

    // Verify error message is displayed
    cy.get('.alert, .text-danger, .warning, .invalid-feedback', { timeout: 5000 })
      .should('exist')
      .and('be.visible');
  }
);

/**
 * Check if element is visible
 * @param {string} selector - CSS selector
 */
Cypress.Commands.add('isVisible', (selector) => {
  cy.get(selector).should('be.visible');
});

/**
 * Check if element is hidden or doesn't exist
 * @param {string} selector - CSS selector
 */
Cypress.Commands.add('isHidden', (selector) => {
  cy.get('body').then(($b) => {
    const found = $b.find(selector);
    if (found && found.length) {
      cy.get(selector).should('not.be.visible');
    } else {
      expect(found.length).to.equal(0);
    }
  });
});

// TypeScript definitions for custom commands
declare namespace Cypress {
  interface Chainable {
    openLoginPage(): Chainable<void>;
    login(email?: string, password?: string): Chainable<void>;
    loginShouldFail(email?: string, password?: string): Chainable<void>;
    isVisible(selector: string): Chainable<void>;
    isHidden(selector: string): Chainable<void>;
  }
}