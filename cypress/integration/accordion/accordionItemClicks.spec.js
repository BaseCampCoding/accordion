context("Accordion Item Clicks", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5500/");
  });

  it("should open an item when it is clicked", () => {
    cy.get(".accordion-item:not(.accordion-item--open):first")
      .click()
      .should("have.class", "accordion-item--open");
  });

  it("should close other items when an item is clicked", () => {
    cy.get(".accordion:first").within(() => {
      cy.get(".accordion-item:not(.accordion-item--open):first")
        .as("first")
        .click();

      cy.get(".accordion-item:not(.accordion-item--open):last")
        .as("last")
        .click();

      cy.get("@first").should("not.have.class", "accordion-item--open");
      cy.get("@last").should("have.class", "accordion-item--open");
    });
  });

  it("should not affect other accordions on the page", () => {
    cy.get(".accordion:first").within(() => {
      cy.get(".accordion-item:not(.accordion-item--open):first")
        .as("itemFromFirstAccordion")
        .click()
        .should("have.class", "accordion-item--open");
    });

    cy.get(".accordion:last").within(() => {
      cy.get(".accordion-item:not(.accordion-item--open):first")
        .as("itemFromOtherAccordion")
        .click()
        .should("have.class", "accordion-item--open");
    });

    cy.get("@itemFromFirstAccordion").should(
      "have.class",
      "accordion-item--open"
    );

    cy.get("@itemFromOtherAccordion").should(
      "have.class",
      "accordion-item--open"
    );
  });
});
