// cypress/PageObject/pages/HomePage.js
import BasePage from '../BasePage.js'

export default class HomePage extends BasePage {

  static displayProducts() {
    // devuelve el chainable para poder encadenar .should(...) desde el test
    return cy.get('.col.mb-3')
  }

  static selectProducts(productName) {
    // mejor: primero filtramos por texto, devolvemos el chainable para poder encadenar si es necesario
    return cy.get('.col.mb-3')
      // usa contains dentro de filter con interpolación correcta
      .filter(`:contains("${productName}")`)
      .then(($products) => {
        // si quieres asegurar que hay exactamente 1 coincidente:
        expect($products.length).to.equal(1)
        // clic sobre el link dentro del producto
        cy.wrap($products).contains('a', productName).click()
      })
  }

}
