import { mount } from "cypress/vue"
import VList from "./v-list.vue"

describe("v-list", () => {
  function createWrapper() {
    return mount(VList, {
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
