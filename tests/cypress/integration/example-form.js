const loginWithTestAccount = () => {
  cy.executeDatabaseScript('cleanForms.js')

  cy.get('#switchToSignUp').click()
  const accountForm = cy.get('.accounts-ui')
  accountForm.get('#username').type('test')
  accountForm.get('#email').type('test@gmail.com')
  accountForm.get('#password').type('test123')

  cy.get('#signUp').click()
}

describe('exemple forms', () => {
  before(() => {
    // Correctly setup the .meteor/packages file
    cy.task('saveUserMeteorPackages')
    cy.task('useDefaultMeteorPackages')
    cy.exec('meteor remove getting-started')
    cy.exec('meteor add example-forms')
  });

  after(() => {
    cy.task('restoreUserMeteorPackages')
  });

  beforeEach(() => {
    cy.visit('http://localhost:3000/', { timeout: 40000 });
  });

  it('datatable wrapper have a semantized classname', () => {
		cy.get('.datatable.datatable-customers')
  });

  it('account creation and login', () => {
    loginWithTestAccount()
  });

  it('create new entry', () => {
    loginWithTestAccount()

    cy.get('.modal-trigger button').click()

    cy.get('.modal-content .input-name input')
      .type('Test')
    cy.get('.modal-content #funnel-lead').click()
    cy.get('.form-section-addresses .form-nested-add').click()
    cy.get('input[name="street"]').type('foo')
    cy.get('input[name="country"]').type('foo')
    cy.get('input[name="zipCode"]').type('34000')
    cy.get('.form-submit button').click()

    cy.get('.alert-success')
  });
});
