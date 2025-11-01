/// <reference types="cypress" />

const baseUrl = "http://uitestingplayground.com";

describe("UI Testing Playground Automation (with delays)", () => {

    it("1. Dynamic ID - should click button with changing ID", () => {
        cy.visit(`${baseUrl}/dynamicid`);
        cy.wait(1000);
        cy.contains("Button with Dynamic ID").click();
        cy.wait(500);
    });

    it("2. Class Attribute - should click blue button", () => {
        cy.visit(`${baseUrl}/classattr`);
        cy.wait(1000);
        cy.get(".btn-primary").click();
        cy.wait(500);
    });
    it("3. Hidden Layers - should click green button and detect pink overlap", () => {
        cy.visit(`${baseUrl}/hiddenlayers`);
        cy.wait(2000);
        cy.get("#greenButton").click();
        cy.wait(2000);
        cy.get("#blueButton").should("be.visible"); 
    });

    it("4. Load Delay - waits until button appears", () => {
        cy.visit(`${baseUrl}/loaddelay`);
        cy.wait(2000);
        cy.get(".btn-primary", { timeout: 10000 }).should("be.visible").click();
        cy.wait(500);
    });

    it("5. AJAX Data - waits for data to appear", () => {
        cy.visit(`${baseUrl}/ajax`);
        cy.wait(1000);
        cy.contains("Button Triggering AJAX Request").click();
        cy.get(".bg-success", { timeout: 20000 })
            .should("be.visible")
            .and("contain.text", "Data loaded with AJAX");
    });

    it("6. Client Side Delay - waits for message", () => {
        cy.visit(`${baseUrl}/clientdelay`);
        cy.wait(1000);
        cy.contains("Button Triggering Client Side Logic").click();
        cy.get(".bg-success", { timeout: 20000 })
            .should("be.visible")
            .and("contain.text", "Data calculated on the client side.");
    });
    it("7. Click - verifies click works correctly", () => {
        cy.visit(`${baseUrl}/click`);
        cy.wait(1000);
        cy.get("#badButton").click().should("have.class", "btn-success");
        cy.wait(500);
    });

    it("8. Text Input - types and verifies output", () => {
        cy.visit(`${baseUrl}/textinput`);
        cy.wait(1000);
        cy.get("#newButtonName").type("Fatima QA Test");
        cy.wait(500);
        cy.get("#updatingButton").click().should("have.text", "Fatima QA Test");
        cy.wait(500);
    });

    it("9. Scrollbars - verifies hidden button becomes visible", () => {
        cy.visit(`${baseUrl}/scrollbars`);
        cy.wait(1000);
        cy.get("#hidingButton").scrollIntoView().should("be.visible").click();
        cy.wait(500);
    });

    it("10. Visibility - checks hidden and visible elements", () => {
        cy.visit(`${baseUrl}/visibility`);
        cy.wait(1000);
        cy.get("#hideButton").click();
        cy.wait(1000);
        cy.get("#removedButton").should("not.exist");
        cy.get("#zeroWidthButton").should("not.be.visible");
        cy.wait(500);
    });

    it("11. Sample App - positive login", () => {
        cy.visit(`${baseUrl}/sampleapp`);
        cy.wait(1000);
        cy.get("input[name='UserName']").type("Fatima");
        cy.wait(500);
        cy.get("input[name='Password']").type("pwd");
        cy.wait(500);
        cy.contains("Log In").click();
        cy.wait(1000);
        cy.contains("Welcome, Fatima!").should("be.visible");
    });

    it("12. Progress Bar - waits until reaches 75%", () => {
        cy.visit(`${baseUrl}/progressbar`);
        cy.wait(1000);
        cy.get("#startButton").click();
        cy.wait(5000);
        cy.get("#progressBar", { timeout: 15000 }).should(($bar) => {
            const progress = parseInt($bar.text());
            expect(progress).to.be.gte(75);
        });
    });
});
