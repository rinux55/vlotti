import { mount } from "cypress/vue"
import FiListItem from "./fi-list-item.vue"

describe("fi-list-item", () => {
  function createWrapper() {
    return mount(FiListItem, {
      props: {
        text: "List Item",
      },
    })
  }

  it("should render the list item text", () => {
    const wrapper = createWrapper()

    wrapper.get("[data-test=list-item]").contains("List Item")
  })
})
