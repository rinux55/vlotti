import { mount } from "cypress/vue"
import FiListItem from "./fi-list-item.vue"

describe("fi-list-item", () => {
  function createWrapper({ props = {} } = {}) {
    return mount(FiListItem, {
      props: {
        text: "List Item",
        ...props,
      },
    })
  }

  const activeClass =
    "hover:bg-gray-100 active:bg-gray-200 focus:bg-gray-200 cursor-pointer"

  const disabledClass = "text-gray-400 cursor-default"

  it("should render the list item text", () => {
    const wrapper = createWrapper()

    wrapper.get("[data-test=list-item]").contains("List Item")
  })

  it("should add classes for interactivity when the list item is not disabled", () => {
    createWrapper()
      .get("[data-test=list-item]")
      .should("have.class", activeClass)
      .should("not.have.class", disabledClass)
  })

  it("should have a gray text when the list item is disabled", () => {
    createWrapper({
      props: {
        disabled: true,
      },
    })
      .get("[data-test=list-item]")
      .should("have.class", disabledClass)
      .should("not.have.class", activeClass)
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
