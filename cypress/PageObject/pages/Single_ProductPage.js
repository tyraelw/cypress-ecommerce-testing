// cypress/PageObject/pages/Single_ProductPage.js
import BasePage from "../BasePage.js";

export default class Single_ProductPage extends BasePage {

  static getProductName() {
    return cy.get('div.col-sm h1');
  }

  static getProductPrice() {
    return cy.get('.price-new');
  }

  static getProductDescription() {
    return cy.get('.nav-link.active');
  }

  static validateProductDescription() {
    return cy.get('#tab-description p:nth-child(1) b:nth-child(1)');
  }

  static writeReview() {
    cy.get('#content > .nav > :nth-child(3) > .nav-link').click();
    // get test data from fixture 
    cy.fixture('example').then(function(data) {
      // usa data directamente, no asignes a this dentro de PageObject
      cy.get('#input-author').type(data.name);
      cy.get('#input-text').type(data.review);
    });
  }

  static clickOnRating() {
    return cy.get('input[value="5"]').click();
  }

  static submitReview() {
    return cy.get('#button-review').click();
  }

  static validateSuccessMessage(){
    return cy.get('.alert', { timeout: 5000 });
  }

  static clickOnCart() {
    return cy.get('#button-cart').click();
  }

  static validateCartSuccessMessage() {
    return cy.get('.alert.alert-success.alert-dismissible')
  }

  static clickOnCartButton() {
    return cy.get('.dropdown.d-grid').click()
    
  }

  static getCartItemMenu() {
    return cy.get('.dropdown-menu.dropdown-menu-end.p-2.show')
  
  }

  static clickOnCheckout() {
    return cy.get('.dropdown-menu.dropdown-menu-end.p-2.show').contains('a', 'Checkout').click()

}




}