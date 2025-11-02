// cypress/PageObject/components/Navbar.js
import BasePage from '../BasePage.js'
export default class Navbar extends BasePage {


    static clickOnLogo() {
        cy.get('img[title="Your Store"]').click();
}

    static searchProduct(text){
        cy.get('input[placeholder="Search"]').clear().type(`${text}{enter}`);

    }

    static validateAllSearchResults(productName){
        return cy.get('#product-list')

    }

    static clickOnMyAccount(){
    cy.get('a[class="dropdown-toggle"] span[class="d-none d-lg-inline"]').click()
    
}

static clickOnLogin(){
    cy.get('.dropdown-menu.show').contains('a', 'Login').click()
    
}

}
