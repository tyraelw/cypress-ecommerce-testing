
export default class BasePage {
   static logInfo (message) {
       cy.log(message);

   }

  static logError (message) {
       cy.log(message)

  }


    static pause (ms) {
       cy.log(ms);

    }



}