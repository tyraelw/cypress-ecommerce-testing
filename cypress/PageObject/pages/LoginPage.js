// cypress/PageObject/pages/LoginPage.js
import BasePage from '../BasePage.js'
export default class LoginPage extends BasePage{
   
    static failedLogin() {
  // @ts-ignore
  cy.loginShouldFail();
}

    static getWarningMessage() {
       return cy.get('.alert.alert-danger.alert-dismissible')

    }


    static successLogin() {
        cy.login();
    

    }

}