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
          },
        ],
      },
      ...props,
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

  it("should display a list with items when the user clicks on the input", () => {
    const wrapper = createWrapper()

    wrapper.get("[data-test=input]").click()

    wrapper.get("[data-test=list]").should("be.visible")
    wrapper.get("[data-test=list-item]").first().should("have.text", "Apple")
  })

  it("should select an item when the user clicks on an item", () => {
    const wrapper = createWrapper()

    wrapper.get("[data-test=input]").click()
    wrapper.get("[data-test=list-item]").first().click()

    wrapper.get("[data-test=input]").should("have.value", "Apple")
    wrapper.get("[data-test=list]").should("not.be.visible")
  })

  it("should highlight the selected list item in the list", () => {
    const wrapper = createWrapper()

    wrapper.get("[data-test=input]").click()
    wrapper.get("[data-test=list-item]").first().click()
    wrapper.get("[data-test=input]").click()

    wrapper
      .get("[data-test=list-item]")
      .first()
      .should("have.class", "bg-primary-50 text-primary-500")

    wrapper
      .get("[data-test=list-item]")
      .eq(1)
      .should("not.have.class", "bg-primary-50 text-primary-500")
  })

  it("should not select an item when it is disabled", () => {
    const wrapper = mount(FiSelect, {
      props: {
        items: [
          {
            value: 2,
            label: "Pear",
            disabled: true,
          },
        ],
      },
    })

    wrapper.get("[data-test=input]").click()
    wrapper.get("[data-test=list-item]").first().click()

    wrapper.get("[data-test=input]").should("not.have.value", "Pear")
    wrapper.get("[data-test=list]").should("be.visible")
  })
})
