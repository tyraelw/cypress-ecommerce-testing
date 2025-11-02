// cypress/PageObject/pages/CheckoutPage.js
import BasePage from '../BasePage.js'
export default class CheckoutPage extends BasePage {

    static clickOnLoginLink() {
        return cy.get('form[id="form-register"] p a strong').click()
    }


    static validateCheckoutAmount() {
        let sum = 0

        cy.get('table.table.table-bordered.table-hover tfoot tr td:nth-child(2)')
            .each(($el, index, $list) => {
                if (index < $list.length - 1) {
                    const priceText = $el.text()
                    const amount = parseFloat(priceText.replace(/[^0-9.-]+/g, ''))
                    sum = sum + amount
                    cy.log('sum of amount is ' + sum)
                }
            }).then(() => {
                cy.get('tfoot > :nth-child(4) > :nth-child(2)').invoke('text').then((total) => {
                    const totalAmount = parseFloat(total.replace(/[^0-9.-]+/g, ''))
                    expect(totalAmount).to.equal(sum)
                })
            })
    }


}