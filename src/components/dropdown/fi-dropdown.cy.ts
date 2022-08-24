import { mount } from "cypress/vue"
import { h } from "vue"
import FiDropdown from "./fi-dropdown.vue"
import FiList from "../list/fi-list.vue"
import FiListItem from "../list/fi-list-item.vue"

describe("fi-dropdown", () => {
  function createWrapper() {
    return mount(FiDropdown, {
      slots: {
        trigger: () => h("a", { "data-test": "trigger" }, "Click me"),
        content: () =>
          h(FiList, { "data-test": "content" }, () => [
            h(FiListItem, { "data-test": "item-1", text: "Item One" }),
            h(FiListItem, {
              "data-test": "item-2",
              text: "Item Two",
              disabled: true,
            }),
          ]),
      },
    })
  }

  it("should render the dropdown trigger button", () => {
    const wrapper = createWrapper()

    wrapper.get("[data-test=trigger]").should("be.visible")
  })

  it("should not display the dropdown content", () => {
    const wrapper = createWrapper()

    wrapper.get("[data-test=content]").should("not.be.visible")
  })

  it("should toggle the dropdown content when the trigger button is clicked", () => {
    const wrapper = createWrapper()

    wrapper.get("[data-test=trigger]").click()
    wrapper.get("[data-test=content]").should("be.visible")

    wrapper.get("[data-test=trigger]").click()
    wrapper.get("[data-test=content]").should("not.be.visible")
  })

  it("should close the dropdown content when clicked outside of the dropdown", () => {
    const wrapper = createWrapper()

    wrapper.get("[data-test=trigger]").click()
    wrapper.get("[data-test=content]").should("be.visible")

    cy.window().get("body").click()
    wrapper.get("[data-test=content]").should("not.be.visible")
  })

  it("should close the dropdown content when an item is clicked", () => {
    const wrapper = createWrapper()

    wrapper.get("[data-test=trigger]").click()
    wrapper.get("[data-test=content]").should("be.visible")

    wrapper.get("[data-test=item-1]").click()
    wrapper.get("[data-test=content]").should("not.be.visible")
  })

  it("should not close the dropdown content when a disabled item is clicked", () => {
    const wrapper = createWrapper()

    wrapper.get("[data-test=trigger]").click()
    wrapper.get("[data-test=content]").should("be.visible")

    wrapper.get("[data-test=item-2]").click()
    wrapper.get("[data-test=content]").should("be.visible")
  })
})
