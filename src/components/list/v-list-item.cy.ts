import { mount } from "cypress/vue"
import VListItem from "./v-list-item.vue"

describe("v-list-item", () => {
  function createWrapper({ props = {} } = {}) {
    return mount(VListItem, {
      props: {
        label: "List Item",
        ...props,
      },
    })
  }

  it("should render the list item label", () => {
    const wrapper = createWrapper()

    wrapper.get("[data-test=list-item]").contains("List Item")
  })

  it("should add classes for interactivity when the list item is not disabled", () => {
    createWrapper()
      .get("[data-test=list-item]")
      .should("not.have.class", "v-disabled")
  })

  it("should add the disabled class when the list item is disabled", () => {
    createWrapper({
      props: {
        disabled: true,
      },
    })
      .get("[data-test=list-item]")
      .should("have.class", "v-disabled")
  })

  it("should have a tabindex when the list item is not disabled", () => {
    createWrapper()
      .get("[data-test=list-item]")
      .should("have.attr", "tabindex", "0")
  })

  it("should not have a tabindex when the list item is disabled", () => {
    createWrapper({
      props: {
        disabled: true,
      },
    })
      .get("[data-test=list-item]")
      .should("not.have.attr", "tabindex")
  })

  it("should not have the attribute aria-disabled when the item is not disabled", () => {
    createWrapper()
      .get("[data-test=list-item]")
      .should("not.have.attr", "aria-disabled")
  })

  it("should have the attribute aria-disabled when the item is disabled", () => {
    createWrapper({
      props: {
        disabled: true,
      },
    })
      .get("[data-test=list-item]")
      .should("have.attr", "aria-disabled", "true")
  })
})
