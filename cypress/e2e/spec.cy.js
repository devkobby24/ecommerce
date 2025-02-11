describe('My First Test', () => {
  it('Gets, types, and asserts', () => {
    cy.visit('http://localhost:5173/')

    // Ensure the "View Details" button exists and click it
    cy.contains(/view details/i).click()

    // Verify that the URL now includes '/product/'
    cy.url().should('include', '/product/')

    // Ensure the "Back to Home" button exists and click it
    cy.contains(/back to home/i).click()

    // Verify the URL is back to the homepage
    cy.url().should('eq', 'http://localhost:5173/')
  })
})
