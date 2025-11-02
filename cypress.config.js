const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Base URL for the application under test
    baseUrl: 'https://demo.codenbox.com',
    
    // Video recording settings
    video: true,
    videoCompression: 32,
    
    // Screenshot settings
    screenshotOnRunFailure: true,
    
    // Viewport settings
    viewportWidth: 1280,
    viewportHeight: 720,
    
    // Timeouts
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 30000,
    
    // Test isolation
    testIsolation: true,
    
    // Retry settings
    retries: {
      runMode: 2,
      openMode: 0
    },
    
    setupNodeEvents(on, config) {
      // Environment variables are loaded from cypress.env.json
      // This file should NOT be committed to version control
      // See cypress.env.json.example for template
      
      return config;
    },
    
    // Exclude certain spec patterns
    excludeSpecPattern: [
      '**/examples/*',
      '**/practice/*'
    ],
    
    // Spec pattern for test files
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
  },
});