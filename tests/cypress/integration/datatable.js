describe("datatable", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("wrapper have a semantized classname", () => {
		cy.get('.datatable.datatable-customers')
  });
});
