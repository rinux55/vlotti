import { shallowMount } from "@vue/test-utils"
import { describe, test, expect } from "vitest"
import VIcon from "./v-icon.vue"

describe("v-icon", () => {
  function createWrapper({ props = {} } = {}) {
    return shallowMount(VIcon, {
      props,
    })
  }

  test("passes the correct icon prop to the font awesome component", () => {
    const wrapper = createWrapper({ props: { icon: "fa-coffee" } })

    expect(
      wrapper.getComponent({ name: "font-awesome-icon" }).props("icon")
    ).toBe("fa-solid fa-coffee")
  })
})
