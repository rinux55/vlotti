import { mount } from "cypress/vue"
import { h } from "vue"
import FiDropdown from "./fi-dropdown.vue"

describe("fi-dropdown", () => {
  function createWrapper() {
    return mount(FiDropdown, {
      slots: {
        trigger: () => h("a", { "data-test": "trigger" }, "Click me"),
        content: () => h("div", { "data-test": "content" }, "Dropdown content"),
      },
    })
  }

  it("should render the dropdown trigger button", () => {
    const wrapper = createWrapper()

    wrapper.get("[data-test=trigger]").should("be.visible")
  })

  it("should not render the dropdown content", () => {
    const wrapper = createWrapper()

    wrapper.get("[data-test=content]").should("not.exist")
  })

  it("should toggle the dropdown content when the trigger button is clicked", () => {
    const wrapper = createWrapper()

    wrapper.get("[data-test=trigger]").click()
    wrapper.get("[data-test=content]").should("be.visible")

    wrapper.get("[data-test=trigger]").click()
    wrapper.get("[data-test=content]").should("not.exist")
  })

  it("should close the dropdown content when clicked outside of the dropdown", () => {
    const wrapper = createWrapper()

    wrapper.get("[data-test=trigger]").click()
    wrapper.get("[data-test=content]").should("be.visible")

    cy.window().get("body").click()
    wrapper.get("[data-test=content]").should("not.exist")
  })

  it("should not close the dropdown content when clicked inside of the dropdown", () => {
    const wrapper = createWrapper()

    wrapper.get("[data-test=trigger]").click()
    wrapper.get("[data-test=content]").click()

    wrapper.get("[data-test=content]").should("be.visible")
  })
})
