# 🛒 E-commerce Testing Suite with Cypress

![Cypress](https://img.shields.io/badge/Cypress-v13-green)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![Page Object Model](https://img.shields.io/badge/Pattern-POM-blue)

A comprehensive end-to-end testing suite for e-commerce applications using Cypress with Page Object Model design pattern. This project demonstrates test automation fundamentals including component testing, smoke testing, and complete user journey validation.

**Application Under Test:** [demo.codenbox.com](https://demo.codenbox.com)

---

## 📋 Table of Contents

- [Overview](#overview)
- [What I Learned](#what-i-learned)
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

---

## 🎯 Overview

This testing suite automates the complete e-commerce user journey from product discovery to checkout. Built during my QA automation training, it demonstrates professional test automation patterns suitable for junior QA portfolios.

**Training Context:** This was my capstone project after completing a 29.5-hour Cypress course. It took me several weeks to build, debug, and refine.

---

## 📚 What I Learned

Building this project taught me:

✅ **Page Object Model Pattern** - Separating test logic from page interactions  
✅ **Custom Cypress Commands** - Creating reusable authentication functions  
✅ **Environment Variables** - Secure credential management  
✅ **Component Testing** - Validating individual UI components  
✅ **E2E Flow Testing** - Complete user journey validation  
✅ **Test Data Management** - Using fixtures for maintainable data  
✅ **CI/CD Basics** - Setting up GitHub Actions (following tutorial)  
✅ **Debugging** - Video recording and screenshots for failures  

---

## ✨ Features

- ✅ **Page Object Model (POM)**: Clean separation of concerns
- ✅ **Custom Commands**: Reusable authentication and utility functions
- ✅ **Environment Variables**: Credentials not committed to repo
- ✅ **Component Testing**: Individual UI element validation
- ✅ **E2E Smoke Tests**: Complete purchase flow validation
- ✅ **Test Data Fixtures**: Maintainable test data
- ✅ **Video Recording**: Automatic recording of test runs
- ✅ **Screenshot on Failure**: Easy debugging
- ✅ **Basic CI/CD**: GitHub Actions integration (from course tutorial)

---

## 📁 Project Structure
```
cypress-ecommerce-testing/
├── cypress/
│   ├── e2e/
│   │   └── ecommerce-smoke.cy.js      # Main test suite
│   ├── fixtures/
│   │   └── testData.json               # Test data
│   ├── support/
│   │   ├── commands.js                 # Custom commands
│   │   └── e2e.js                      # Global config
│   ├── PageObject/
│   │   ├── BasePage.js                 # Base class
│   │   ├── pages/
│   │   │   ├── HomePage.js             
│   │   │   ├── Single_ProductPage.js   
│   │   │   ├── CheckoutPage.js         
│   │   │   └── LoginPage.js            
│   │   └── components/
│   │       └── Navbar.js               # Navigation component
│   ├── videos/                         # Test recordings
│   └── screenshots/                    # Failure captures
├── .github/
│   └── workflows/
│       └── cypress.yml                 # Basic CI setup
├── cypress.config.js                   # Cypress configuration
├── cypress.env.json.example            # Credential template
├── package.json                        
├── .gitignore                          
└── README.md                           
```

---

## 🔧 Prerequisites

- **Node.js** (v18 or higher)
- **npm** or yarn
- Modern web browser (Chrome, Firefox, Edge)
```bash
# Verify installations
node --version
npm --version
```

---

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

# Edit cypress.env.json with your test credentials
```

**cypress.env.json** (create this - NOT committed to git):
```json
{
  "defaultEmail": "your-test-email@example.com",
  "defaultPassword": "your-test-password",
  "invalidEmail": "invalid@example.com",
  "invalidPassword": "wrongpassword"
}
```

⚠️ **Security Note:** This file is git-ignored. Never commit credentials.

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `defaultEmail` | Valid login email | user@example.com |
| `defaultPassword` | Valid password | TestPass123! |
| `invalidEmail` | Invalid email for negative tests | wrong@test.com |
| `invalidPassword` | Invalid password | wrongpass |

### Cypress Configuration

Key settings in `cypress.config.js`:

- **Base URL:** https://demo.codenbox.com
- **Viewport:** 1280x720 (desktop)
- **Default Timeout:** 8000ms
- **Video Recording:** Enabled

---

## 🚀 Running Tests

### Interactive Mode (Recommended for learning)
```bash
npm run cy:open
```

Best for:
- Test development
- Debugging
- Visual inspection

### Headless Mode
```bash
# Run all tests
npm run cy:run

# Run in specific browser
npm run cy:run:chrome
npm run cy:run:firefox
npm run cy:run:edge
```

### Smoke Tests Only
```bash
npm run cy:run:smoke
```

---

## 🧪 Test Scenarios

### Component Test Suite

**Objective:** Validate individual UI components
```javascript
it('Component test', function () {
  Navbar.searchProduct('MacBook')
  Navbar.validateAllSearchResults('MacBook')
  Navbar.clickOnMyAccount()
  Navbar.clickOnLogin()
  Navbar.clickOnLogo()
})
```

**Validations:**
- ✅ Search functionality
- ✅ Search results accuracy
- ✅ Navigation menu
- ✅ Logo redirect

### E2E Smoke Test Suite

**Objective:** Complete user purchase journey

**Test Flow:**

1. **Product Discovery** 🔍
   - Verify 4 products displayed
   - Filter by name
   - Navigate to details

2. **Product Validation** ✅
   - Validate name: "MacBook"
   - Validate price: "$602.00"
   - Check description

3. **Review Submission** ⭐
   - Fill review form
   - Submit 5-star rating
   - Validate success message

4. **Cart Operations** 🛒
   - Add to cart
   - Verify quantity and price
   - Navigate to checkout

5. **Authentication** 🔐
   - **Negative Test:** Invalid credentials
   - **Positive Test:** Valid login

6. **Order Validation** ✨
   - Verify checkout page
   - Validate totals

**Total Validations:** 20+ assertions per run

---

## 🏗️ Page Object Model

### Architecture
```
BasePage (Parent)
├── HomePage
├── Single_ProductPage
├── CheckoutPage
├── LoginPage
└── Navbar (Component)
```

### Example: HomePage.js
```javascript
import BasePage from '../BasePage'

export default class HomePage extends BasePage {
  static displayProducts() {
    return cy.get('.product-layout')
  }
  
  static selectProducts(productName) {
    this.displayProducts()
      .contains(productName)
      .click()
  }
}
```

### Custom Commands

Located in `cypress/support/commands.js`:

| Command | Description | Usage |
|---------|-------------|-------|
| `openLoginPage()` | Navigate to login | `cy.openLoginPage()` |
| `login(email, password)` | Successful login | `cy.login()` |
| `loginShouldFail()` | Invalid login | `cy.loginShouldFail()` |
| `isVisible(selector)` | Check visibility | `cy.isVisible('.alert')` |

---

## 🎯 Best Practices Implemented

### 1. Security
✅ Environment variables for credentials  
✅ `.gitignore` prevents exposure  
✅ Template file for easy setup  

### 2. Code Organization
✅ Page Object Model pattern  
✅ DRY principle  
✅ Reusable custom commands  
✅ Separated test data  

### 3. Test Reliability
✅ Explicit waits  
✅ Proper selectors  
✅ Clean state between tests  

### 4. Debugging
✅ Video recording  
✅ Screenshots on failure  
✅ Descriptive test names  

---

## 🐛 Troubleshooting

### Common Issues

**Issue:** Tests fail with "defaultEmail is not defined"  
**Solution:** Create `cypress.env.json` with your credentials
```bash
cp cypress.env.json.example cypress.env.json
# Edit with your test account details
```

**Issue:** Login button not found  
**Solution:** The site may have changed. Update selector in `commands.js`

**Issue:** Tests timeout  
**Solution:** Increase timeout in `cypress.config.js`:
```javascript
defaultCommandTimeout: 10000
```

---

## 📚 Learning Notes

### Challenges I Faced

During this project, I encountered several debugging challenges:

1. **Async Operations:** Learned to handle timing issues with proper waits
2. **Dynamic Elements:** Practiced writing reliable selectors
3. **Test Data:** Implemented fixtures for maintainability
4. **CI/CD Setup:** Followed GitHub Actions tutorial to automate runs

### What I'd Do Differently

If starting fresh, I would:
- Start with simpler page structure
- Add more comments while building
- Practice writing tests for failures first
- Document challenges as I solve them

---

## 👤 Author

**Isrrael Andres Toro Alvarez**

- GitHub: [@tyraelw](https://github.com/tyraelw)
- LinkedIn: [Isrrael Toro Alvarez](https://www.linkedin.com/in/your-profile)
- Email: tyrael78w@gmail.com

---

## 📧 Contact

For questions or feedback: **tyrael78w@gmail.com**

---

## 🔗 Related Projects

- **[Trello API Testing](https://github.com/tyraelw/trello-api-testing)** - REST API automation with Postman
- **[Grocery Store API](https://github.com/tyraelw/simple-grocery-store-api-testing)** - E-commerce API testing

---

**⭐ If you find this project helpful for learning Cypress, please star it!**

---

### 📝 Honest Disclosure

This is a training project built during my QA automation course. It demonstrates concepts I learned and practiced over 4 months. I'm comfortable explaining the code and patterns used, though I'm still growing as a test automation engineer and excited to learn more in a professional environment.
