# 🛒 E-commerce Testing Suite with Cypress

![Cypress](https://img.shields.io/badge/Cypress-v13-brightgreen)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![Page Object Model](https://img.shields.io/badge/Pattern-Page%20Object%20Model-blue)
![Tests](https://img.shields.io/badge/Tests-E2E%20%26%20Component-success)

A comprehensive end-to-end testing suite for e-commerce applications using Cypress with Page Object Model (POM) design pattern. This project demonstrates professional test automation practices including component testing, smoke testing, and complete user journey validation.

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Scenarios](#test-scenarios)
- [Page Object Model](#page-object-model)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Author](#author)

## 🎯 Overview

This testing suite automates the complete e-commerce user journey from product discovery to checkout. Built with Cypress and following industry best practices, it demonstrates professional test automation skills suitable for modern QA portfolios.

**Application Under Test:** [demo.codenbox.com](https://demo.codenbox.com/)

## ✨ Features

- **Page Object Model (POM)**: Clean separation of test logic and page interactions
- **Custom Commands**: Reusable authentication and utility functions
- **Environment Variables**: Secure credential management (not committed to repo)
- **Component Testing**: Individual UI component validation
- **E2E Smoke Tests**: Complete user journey validation
- **Dynamic Test Data**: Fixtures for maintainable test data
- **Multiple Browser Support**: Chrome, Firefox, Edge
- **Video Recording**: Automatic test execution recording
- **Screenshot on Failure**: Debugging made easy
- **TypeScript Support**: Type-safe custom commands

## 📁 Project Structure

```
cypress-ecommerce-testing/
├── cypress/
│   ├── e2e/
│   │   └── ecommerce-smoke.cy.js      # Main test suite
│   ├── fixtures/
│   │   └── testData.json               # Test data (no credentials)
│   ├── support/
│   │   ├── commands.js                 # Custom Cypress commands
│   │   └── e2e.js                      # Global configuration
│   ├── PageObject/
│   │   ├── BasePage.js                 # Base page class
│   │   ├── pages/
│   │   │   ├── HomePage.js             # Home page actions
│   │   │   ├── Single_ProductPage.js   # Product details page
│   │   │   ├── CheckoutPage.js         # Checkout flow
│   │   │   └── LoginPage.js            # Authentication page
│   │   └── components/
│   │       └── Navbar.js               # Navigation component
│   ├── videos/                         # Test execution videos
│   └── screenshots/                    # Failure screenshots
├── cypress.config.js                   # Cypress configuration
├── cypress.env.json.example            # Environment variables template
├── package.json                        # Dependencies and scripts
├── .gitignore                          # Git ignore rules
└── README.md                           # This file
```

## 🔧 Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- Modern web browser (Chrome, Firefox, or Edge)

```bash
# Verify Node.js installation
node --version

# Verify npm installation
npm --version
```

## 📥 Installation

### 1. Clone the repository

```bash
git clone https://github.com/tyraelw/cypress-ecommerce-testing.git
cd cypress-ecommerce-testing
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
# Copy the example file
cp cypress.env.json.example cypress.env.json

# Edit cypress.env.json with your credentials
# This file is git-ignored for security
```

**cypress.env.json** (create this file - NOT committed):

```json
{
  "defaultEmail": "your-email@example.com",
  "defaultPassword": "your-password",
  "invalidEmail": "invalid@example.com",
  "invalidPassword": "wrongpassword123"
}
```

## ⚙️ Configuration

### Environment Variables

Credentials are stored in `cypress.env.json` which is NOT committed to version control. The template `cypress.env.json.example` shows the required structure.

| Variable | Description | Example |
|----------|-------------|---------|
| `defaultEmail` | Valid login email | user@example.com |
| `defaultPassword` | Valid login password | SecurePass123! |
| `invalidEmail` | Invalid email for negative tests | wrong@example.com |
| `invalidPassword` | Invalid password for negative tests | wrongpass |

### Cypress Configuration

Key settings in `cypress.config.js`:

- **Base URL**: `https://demo.codenbox.com`
- **Viewport**: 1280x720 (desktop)
- **Default Timeout**: 8000ms
- **Video Recording**: Enabled

## 🚀 Running Tests

### Interactive Mode (Cypress UI)

```bash
# Open Cypress Test Runner
npm run cy:open
```

**Best for:**
- Test development
- Debugging
- Visual inspection

### Headless Mode

```bash
# Run all tests headlessly
npm run cy:run

# Run in headed mode (see browser)
npm run cy:run:headed

# Run with specific browser
npm run cy:run:chrome
npm run cy:run:firefox
npm run cy:run:edge
```

### Smoke Tests Only

```bash
# Run smoke test suite only
npm run cy:run:smoke
```

### Clean and Run

```bash
# Remove old reports/videos and run tests
npm run cy:run:clean
```

## 🧪 Test Scenarios

### Component Test Suite

**Objective:** Validate individual UI components work correctly

```javascript
it('Component test', function () {
  // Search functionality
  Navbar.searchProduct('MacBook')
  Navbar.validateAllSearchResults('MacBook')
  
  // Navigation components
  Navbar.clickOnMyAccount()
  Navbar.clickOnLogin()
  Navbar.clickOnLogo()
})
```

**Validations:**
- ✅ Search functionality returns relevant results
- ✅ All search results contain search term
- ✅ Navigation menu interactions
- ✅ Logo redirects to home page

### E2E Smoke Test Suite

**Objective:** Validate complete user purchase journey

```javascript
it('e-2-e smoke test', function () {
  // 1. Product Discovery
  // 2. Product Details Validation
  // 3. Review Submission
  // 4. Add to Cart
  // 5. Checkout Process
  // 6. Authentication (positive & negative)
  // 7. Order Completion
})
```

**Test Flow:**

#### 1. Product Discovery 🔍
- Verify 4 products are displayed on homepage
- Filter products by name ("MacBook")
- Navigate to product details page

#### 2. Product Validation ✅
- Validate product name: "MacBook"
- Validate price: "$602.00"
- Verify product description contains "Intel Core 2 Duo processor"
- Check product specifications

#### 3. Review Submission ⭐
- Navigate to reviews tab
- Fill review form with test data from fixtures
- Select 5-star rating
- Submit review
- Validate success message

#### 4. Cart Operations 🛒
- Add product to cart
- Validate cart success message
- Open cart dropdown menu
- Verify cart contains:
  - Product quantity (x1)
  - Product price ($602.00)
  - View Cart button
  - Checkout button

#### 5. Checkout Process 💳
- Navigate to checkout page
- Click login link

#### 6. Authentication 🔐
- **Negative Test**: Attempt login with invalid credentials
  - Verify warning message appears
  - Validate error message text
- **Positive Test**: Login with valid credentials
  - Verify successful authentication

#### 7. Order Validation ✨
- Validate checkout page loads
- Verify order total calculations
- Confirm all amounts are correct

**Total Validations:** 20+ assertions per test run

## 🏗️ Page Object Model

### Architecture

```
BasePage (Parent Class)
    ├── HomePage
    ├── Single_ProductPage
    ├── CheckoutPage
    ├── LoginPage
    └── Navbar (Component)
```

### Page Objects

#### **BasePage.js**
Base class with utility methods used by all page objects.

```javascript
export default class BasePage {
  static logInfo(message) { cy.log(message) }
  static logError(message) { cy.log(message) }
  static pause(ms) { cy.wait(ms) }
}
```

#### **HomePage.js**
Handles homepage product listing and selection.

**Methods:**
- `displayProducts()` - Returns all product elements
- `selectProducts(productName)` - Filters and clicks on specific product

#### **Single_ProductPage.js**
Manages product details page interactions.

**Methods:**
- `getProductName()` - Returns product name element
- `getProductPrice()` - Returns price element
- `getProductDescription()` - Returns description tab
- `validateProductDescription()` - Gets specific description text
- `writeReview()` - Fills review form
- `clickOnRating()` - Selects star rating
- `submitReview()` - Submits review form
- `validateSuccessMessage()` - Checks success alert
- `clickOnCart()` - Adds product to cart
- `validateCartSuccessMessage()` - Verifies cart message
- `clickOnCheckout()` - Navigates to checkout

#### **CheckoutPage.js**
Handles checkout process and calculations.

**Methods:**
- `clickOnLoginLink()` - Opens login modal
- `validateCheckoutAmount()` - Validates order total calculations

#### **LoginPage.js**
Manages authentication flows.

**Methods:**
- `failedLogin()` - Attempts login with invalid credentials
- `getWarningMessage()` - Returns error message element
- `successLogin()` - Performs successful login

#### **Navbar.js** (Component)
Reusable navigation component.

**Methods:**
- `clickOnLogo()` - Returns to homepage
- `searchProduct(text)` - Performs product search
- `validateAllSearchResults(productName)` - Returns search results
- `clickOnMyAccount()` - Opens account menu
- `clickOnLogin()` - Navigates to login

### Custom Commands

Located in `cypress/support/commands.js`:

| Command | Description | Usage |
|---------|-------------|-------|
| `openLoginPage()` | Navigate to login page | `cy.openLoginPage()` |
| `login(email, password)` | Successful login | `cy.login()` |
| `loginShouldFail(email, password)` | Invalid login attempt | `cy.loginShouldFail()` |
| `isVisible(selector)` | Check element visibility | `cy.isVisible('.alert')` |
| `isHidden(selector)` | Check element is hidden | `cy.isHidden('.modal')` |

## 🎯 Best Practices Implemented

### 1. **Security**
✅ Credentials stored in environment variables  
✅ `.gitignore` prevents credential exposure  
✅ Environment template provided for easy setup  
✅ Passwords never logged in test output

### 2. **Code Organization**
✅ Page Object Model for maintainability  
✅ DRY (Don't Repeat Yourself) principle  
✅ Reusable custom commands  
✅ Separation of test data from test logic

### 3. **Test Reliability**
✅ Explicit waits and proper selectors  
✅ Retry logic for flaky tests  
✅ Cookie and storage cleanup between tests  
✅ Proper assertions and error messages

### 4. **Debugging**
✅ Video recording of test runs  
✅ Screenshot on failure  
✅ Descriptive test names  
✅ Console logging in custom commands

## 🐛 Troubleshooting

### Common Issues

#### **Issue**: Tests fail with "defaultEmail is not defined"
**Solution**: Create `cypress.env.json` file with credentials

```bash
cp cypress.env.json.example cypress.env.json
# Edit the file with your actual credentials
```

#### **Issue**: Login button not found
**Solution**: The site may have changed. Update the selector in `commands.js`:

```javascript
cy.get('button[type="submit"]') // Update this selector
```

#### **Issue**: Tests timeout waiting for elements
**Solution**: Increase timeout in `cypress.config.js`:

```javascript
defaultCommandTimeout: 10000, // Increase from 8000
```

#### **Issue**: "cypress.env.json" not found
**Solution**: This file should NOT exist in the repo. Create it locally:

```bash
cp cypress.env.json.example cypress.env.json
```

### Debug Mode

Run tests with debug output:

```bash
# Set debug environment variable
DEBUG=cypress:* npm run cy:run
```

## 📚 Additional Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Page Object Model Pattern](https://martinfowler.com/bliki/PageObject.html)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)

### My Other Testing Projects

- [Trello API Testing Suite](https://github.com/tyraelw/trello-api-testing) - REST API automation with Postman
- [Simple Grocery Store API Testing](https://github.com/tyraelw/simple-grocery-store-api-testing) - E-commerce API testing with Postman

## 🤝 Contributing

This is a portfolio project, but suggestions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📜 License

This project is open source and available for educational purposes.

## 👤 Author

**Isrrael Andres Toro Alvarez**

- GitHub: [@tyraelw](https://github.com/tyraelw)
- LinkedIn: [Isrrael Toro Alvarez](https://www.linkedin.com/in/isrrael-toro-alvarez-1019a4119/)
- Email: [tyrael78w@gmail.com](mailto:tyrael78w@gmail.com)

## 📧 Contact

For questions, feedback, or collaboration opportunities, please reach out via [tyrael78w@gmail.com](mailto:tyrael78w@gmail.com)

---

⭐ **If you find this project useful, please consider giving it a star on GitHub!**


**Related Projects:**
- [Trello API Testing Suite](https://github.com/tyraelw/trello-api-testing) - REST API automation with Postman
- [Simple Grocery Store API Testing](https://github.com/tyraelw/simple-grocery-store-api-testing) - E-commerce API testing with Postman