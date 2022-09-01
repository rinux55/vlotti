import { mount } from "cypress/vue"
import FiSelect from "./fi-select.vue"
import { ref } from "vue"
describe("fi-select", () => {
  function createWrapper() {
    return mount(FiSelect, {
      props: {
        modelValue: ref(),
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

    wrapper.get("[data-test=input]").should("have.text", "Apple")
  })
})
