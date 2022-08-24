import { mount } from "cypress/vue"
import FiList from "./fi-list.vue"

describe("fi-list", () => {
  function createWrapper() {
    return mount(FiList, {
      slots: {
        default: "List Content",
      },
    })
  }

  it("should render the slot content", () => {
    const wrapper = createWrapper()

    wrapper.get("[data-test=list]").contains("List Content")
  })
})
