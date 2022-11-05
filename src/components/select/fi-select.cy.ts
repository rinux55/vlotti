import { mount } from "cypress/vue"
import FiSelect from "./fi-select.vue"
describe("fi-select", () => {
  function createWrapper({ props = {} } = {}) {
    return mount(FiSelect, {
      props: {
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
            disabled: true,
          },
        ],
        ...props,
      },
    })
  }

  it("should render an input field", () => {
    const wrapper = createWrapper()

    wrapper.get("[data-test=input]").should("be.visible")
  })

  it("should not have the list visible by default", () => {
    const wrapper = createWrapper()

    wrapper.get("[data-test=list]").should("not.be.visible")
  })

  it("should open the dropdown with a list of items when the user clicks on the input", () => {
    const wrapper = createWrapper()

    wrapper.get("[data-test=input-wrapper]").click()

    wrapper.get("[data-test=list]").should("be.visible")
    wrapper.get("[data-test=list-item]").first().should("have.text", "Apple")
  })

  it("should add the class 'active' to the input wrapper when the dropdown opens", () => {
    const wrapper = createWrapper()

    wrapper.get("[data-test=input-wrapper]").should("not.have.class", "active")

    wrapper.get("[data-test=input-wrapper]").click()

    wrapper.get("[data-test=input-wrapper]").should("have.class", "active")
  })

  it("should select an item and close the dropdown when the user clicks on an item", () => {
    const wrapper = createWrapper()

    wrapper.get("[data-test=input-wrapper]").click()
    wrapper.get("[data-test=list-item]").first().click()

    wrapper.get("[data-test=input]").should("have.value", "Apple")
    wrapper.get("[data-test=list]").should("not.be.visible")
  })

  it("should add the class 'selected' and the aria-selected attribute to the selected list item", () => {
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

  it("should apply the class 'disabled' to disabled items", () => {
    const wrapper = createWrapper()

    wrapper.get("[data-test=input-wrapper]").click()

    wrapper
      .get("[data-test=list-item]")
      .first()
      .should("not.have.class", "disabled")
    wrapper.get("[data-test=list-item]").last().should("have.class", "disabled")
  })

  it("should not select an item when the item is disabled", () => {
    const wrapper = createWrapper()

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

  it("should not open the dropdown when the select is disabled", () => {
    const wrapper = createWrapper({ props: { disabled: true } })

    wrapper.get("[data-test=input-wrapper]").click()
    wrapper.get("[data-test=list]").should("not.be.visible")
  })
})
