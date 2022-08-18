import { shallowMount } from "@vue/test-utils"
import { describe, test, expect } from "vitest"
import FiDropdown from "./fi-dropdown.vue"

describe("fi-dropdown", () => {
  test("renders the #trigger template by default", () => {
    const wrapper = shallowMount(FiDropdown, {
      slots: {
        trigger: '<a data-test="trigger">Click me</a>',
      },
    })

    expect(wrapper.find('a[data-test="trigger"]').exists()).toBe(true)
  })
})
