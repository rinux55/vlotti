import { mount } from "cypress/vue"
import VSelect from "./v-select.vue"

describe("v-select", () => {
  function createWrapper({ props = {} } = {}) {
    return mount(VSelect, {
      props: {
        label: "test label",
        items: [
          {
            value: "apple",
            label: "Apple",
          },
          {
            value: "banana",
            label: "Banana",
          },
          {
            value: "pear",
            label: "Pear",
          },
        ],
        ...props,
      },
    })
  }

  describe("rendering", () => {
    it("should render an input field", () => {
      const wrapper = createWrapper()

      wrapper.get("[data-test=input]").should("be.visible")
    })

    it("should not have the list visible by default", () => {
      const wrapper = createWrapper()

      wrapper.get("[data-test=list]").should("not.be.visible")
    })
  })

  describe("opening", () => {
    it("should open the dropdown with a list of items when the user clicks on the input", () => {
      const wrapper = createWrapper()

      wrapper.get("[data-test=input-wrapper]").click()

      wrapper.get("[data-test=list]").should("be.visible")
      wrapper.get("[data-test=list-item]").first().should("have.text", "Apple")
    })

    it("should add the class 'active' to the input wrapper when the dropdown opens", () => {
      const wrapper = createWrapper()

      wrapper
        .get("[data-test=input-wrapper]")
        .should("not.have.class", "active")

      wrapper.get("[data-test=input-wrapper]").click()

      wrapper.get("[data-test=input-wrapper]").should("have.class", "active")
    })
  })

  describe("selecting", () => {
    it("should select an item and close the dropdown when the user clicks on an item", () => {
      const wrapper = createWrapper()

      wrapper.get("[data-test=input-wrapper]").click()
      wrapper.get("[data-test=list-item]").first().click()

      wrapper.get("[data-test=input]").should("have.value", "Apple")
      wrapper.get("[data-test=list]").should("not.be.visible")
    })

    it("should add the class 'selected' to the selected list item", () => {
      const wrapper = createWrapper()

      wrapper.get("[data-test=input-wrapper]").click()
      wrapper.get("[data-test=list-item]").first().click()
      wrapper.get("[data-test=input-wrapper]").click()

      wrapper
        .get("[data-test=list-item]")
        .first()
        .should("have.class", "selected")

      wrapper
        .get("[data-test=list-item]")
        .eq(1)
        .should("not.have.class", "selected")
    })
  })

  xdescribe("keyboard navigation", () => {
    it("should open the dropdown when the user uses the down arrow", () => {
      const wrapper = createWrapper()

      wrapper.get("[data-test=input]").focus()
      cy.focused().type("{downArrow}", { force: true })

      wrapper.get("[data-test=list]").should("be.visible")
    })

    it("should navigate through the list when the user uses the arrow keys", () => {
      const wrapper = createWrapper({ props: { searchable: true } })

      wrapper.get("[data-test=input]").focus()
      cy.focused().type("{downArrow}", { force: true })

      wrapper.get("[data-test=list-item]").first().should("be.focused")

      cy.focused().type("{downArrow}", { force: true })

      wrapper.get("[data-test=list-item]").eq(1).should("be.focused")

      cy.focused().type("{downArrow}", { force: true })

      wrapper.get("[data-test=list-item]").last().should("be.focused")

      cy.focused().type("{upArrow}", { force: true })

      wrapper.get("[data-test=list-item]").eq(1).should("be.focused")
    })

    it("should not navigate past the last item in the list", () => {
      const wrapper = createWrapper()

      wrapper.get("[data-test=input]").focus()
      cy.focused().type("{downArrow}", { force: true })
      cy.focused().type("{downArrow}", { force: true })
      cy.focused().type("{downArrow}", { force: true })
      cy.focused().type("{downArrow}", { force: true })

      wrapper.get("[data-test=list-item]").last().should("be.focused")
    })

    it("should not navigate past the first item in the list", () => {
      const wrapper = createWrapper()

      wrapper.get("[data-test=input]").focus()
      cy.focused().type("{downArrow}", { force: true })
      cy.focused().type("{upArrow}", { force: true })
      cy.focused().type("{upArrow}", { force: true })
      cy.focused().type("{upArrow}", { force: true })

      wrapper.get("[data-test=list-item]").first().should("be.focused")
    })

    it("should select an item when the user presses enter on a focused item", () => {
      const wrapper = createWrapper()

      wrapper.get("[data-test=input]").focus()
      cy.focused().type("{downArrow}", { force: true })
      cy.focused().type("{downArrow}", { force: true })
      cy.focused().type("{enter}", { force: true })

      wrapper.get("[data-test=input]").should("have.value", "Banana")
      wrapper.get("[data-test=list]").should("not.be.visible")
    })
  })

  describe("accessibility", () => {
    it("should toggle the aria-expanded attribute when opening and closing the dropdown", () => {
      const wrapper = createWrapper()

      wrapper
        .get("[data-test=input-wrapper]")
        .should("have.attr", "aria-expanded", "false")

      wrapper.get("[data-test=input-wrapper]").click()

      wrapper
        .get("[data-test=input-wrapper]")
        .should("have.attr", "aria-expanded", "true")
    })

    it("should have a role and aria-owns attribute with a matching list id", async () => {
      const wrapper = createWrapper()

      wrapper.get("[data-test=list]").invoke("attr", "id").as("listId")

      wrapper
        .get("[data-test=input-wrapper]")
        .should("have.attr", "role", "listbox")
        .should("have.attr", "aria-owns", "@listId")
    })

    it("should set the correct aria-activedescendant attribute when selecting a list item", () => {
      const wrapper = createWrapper()

      wrapper.get("[data-test=list]").invoke("attr", "id").as("listId")

      wrapper.get("[data-test=input-wrapper]").click()
      wrapper.get("[data-test=list-item]").first().click()

      wrapper.get("@listId").then((listId) => {
        wrapper
          .get("[data-test=input]")
          .should(
            "have.attr",
            "aria-activedescendant",
            `v-list-${listId}-item-1`
          )
      })
    })

    it("should set the aria-selected attribute to the selected list item", () => {
      const wrapper = createWrapper()

      wrapper.get("[data-test=input-wrapper]").click()
      wrapper.get("[data-test=list-item]").first().click()
      wrapper.get("[data-test=input-wrapper]").click()

      wrapper
        .get("[data-test=list-item]")
        .first()
        .should("have.class", "selected")
        .should("have.attr", "aria-selected", "true")

      wrapper
        .get("[data-test=list-item]")
        .eq(1)
        .should("not.have.class", "selected")
        .should("have.attr", "aria-selected", "false")
    })
  })

  describe("disabled items", () => {
    const listWithDisabledItem = [
      {
        value: "apple",
        label: "Apple",
      },
      {
        value: "banana",
        label: "Banana",
      },
      {
        value: "pear",
        label: "Pear",
        disabled: true,
      },
    ]

    it("should apply the class 'disabled' to disabled items", () => {
      const wrapper = createWrapper({ props: { items: listWithDisabledItem } })

      wrapper.get("[data-test=input-wrapper]").click()

      wrapper
        .get("[data-test=list-item]")
        .first()
        .should("not.have.class", "disabled")
      wrapper
        .get("[data-test=list-item]")
        .last()
        .should("have.class", "disabled")
    })

    it("should not select an item when the item is disabled", () => {
      const wrapper = createWrapper({ props: { items: listWithDisabledItem } })

      wrapper.get("[data-test=input-wrapper]").click()
      wrapper.get("[data-test=list-item]").last().click()

      wrapper.get("[data-test=input]").should("not.have.value", "Pear")
      wrapper.get("[data-test=list]").should("be.visible")
    })

    it("should render the select field as disabled when the property 'disabled' is passed", () => {
      const wrapper = createWrapper({ props: { disabled: true } })

      wrapper.get("[data-test=input]").should("have.attr", "disabled")
      wrapper.get("[data-test=select]").should("have.class", "disabled")
    })
  })

  describe("disabled select box", () => {
    it("should not open the dropdown when the select is disabled", () => {
      const wrapper = createWrapper({ props: { disabled: true } })

      wrapper.get("[data-test=input-wrapper]").click()
      wrapper.get("[data-test=list]").should("not.be.visible")
    })
  })

  describe("searchable", () => {
    it("should not be searchable when the searchable prop has not been passed", () => {
      const wrapper = createWrapper()

      wrapper.get("[data-test=input]").should("have.attr", "readonly")
    })

    it("should filter items when the user searches and the searchable prop has been passed", () => {
      const wrapper = createWrapper({ props: { searchable: true } })

      wrapper.get("[data-test=input]").type("App")

      wrapper.get("[data-test=list-item]").should("have.length", 1)
      wrapper.get("[data-test=list-item]").first().should("have.text", "Apple")
    })

    it("should search without case sensitivity", () => {
      const wrapper = createWrapper({ props: { searchable: true } })

      wrapper.get("[data-test=input]").type("ba")

      wrapper.get("[data-test=list-item]").should("have.length", 1)
      wrapper.get("[data-test=list-item]").first().should("have.text", "Banana")
    })

    it("should show the label of the selected item in the input when an item is selected", () => {
      const wrapper = createWrapper({ props: { searchable: true } })

      wrapper.get("[data-test=input]").type("ba")

      wrapper.get("[data-test=list-item]").first().click()
      wrapper.get("[data-test=input]").should("have.value", "Banana")
    })

    it("should display a 'no results' item when no results are found", () => {
      const wrapper = createWrapper({ props: { searchable: true } })

      wrapper.get("[data-test=input]").type("pinneapple")

      wrapper.get("[data-test=list-item]").should("not.exist")
      wrapper.get("[data-test=no-results]").should("be.visible")
      wrapper.get("[data-test=no-results]").should("have.text", "No results")
    })

    it("should not display the 'no results' item when there are results", () => {
      const wrapper = createWrapper({ props: { searchable: true } })

      wrapper.get("[data-test=input]").type("ba")

      wrapper.get("[data-test=list-item]").should("have.length", 1)
      wrapper.get("[data-test=no-results]").should("not.exist")
    })
  })
})
