import { shallowMount, VueWrapper } from "@vue/test-utils"
import { describe, test, expect } from "vitest"
import FiDropdown from "./fi-dropdown.vue"

describe("fi-dropdown", () => {
  function createWrapper(): VueWrapper {
    return shallowMount(FiDropdown, {
      slots: {
        trigger: '<a data-test="trigger">Click me</a>',
        content: '<div data-test="content">Content</div>',
      },
    })
  }

  test("renders the #trigger template by default", () => {
    expect(createWrapper().find("a[data-test=trigger]").exists()).toBe(true)
  })

  test("does not render the #content template by default", () => {
    expect(createWrapper().find("[data-test=content]").exists()).toBe(false)
  })

  test("content will be visible when trigger is clicked", async () => {
    const wrapper = createWrapper()

    await wrapper.find("[data-test=trigger-wrapper]").trigger("click")

    expect(wrapper.find("[data-test=content]").isVisible()).toBe(true)
  })
})
