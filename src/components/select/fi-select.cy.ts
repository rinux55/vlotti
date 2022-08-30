import { mount } from "cypress/vue"
import FiSelect from "./fi-select.vue"

describe("fi-select", () => {
  function createWrapper() {
    return mount(FiSelect, {
      props: {
        items: [
          {
            value: 1,
            text: "test",
          },
        ],
      },
    })
  }
})
