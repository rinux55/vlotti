import { shallowMount, VueWrapper } from "@vue/test-utils"
import { describe, test, expect } from "vitest"
import FiButton from "./fi-button.vue"

describe("fi-button", () => {
  const buttonText = "Click me!"

  function createWrapper({ props = {} } = {}) {
    return shallowMount(FiButton, {
      slots: {
        default: () => buttonText,
      },
      props,
    })
  }

  test("renders a button with text", () => {
    const wrapper = createWrapper()

    expect(wrapper.text()).toBe(buttonText)
  })

  test("renders a button with an icon", () => {
    const wrapper = shallowMount(FiButton, {
      slots: {
        default: () => buttonText,
      },
      props: {
        icon: "fa-coffee",
      },
    })

    const icon = wrapper.getComponent("[data-test=icon]") as VueWrapper

    expect(icon.isVisible()).toBe(true)
    expect(icon.props("icon")).toBe("fa-coffee")
  })

  test("doesn't render an icon when the icon prop is not passed", () => {
    const wrapper = shallowMount(FiButton)

    expect(wrapper.findComponent("[data-test=icon]").exists()).toBe(false)
  })

  test.each([
    ["large", "py-3 px-6 text-lg"],
    ["medium", "py-2 px-5"],
    ["small", "py-1 px-3 text-sm"],
    ["tiny", "py-1 px-3 text-xs"],
    ["default", "py-2 px-4 text-sm"],
  ])("renders a button with size %s", (size, expectedClass) => {
    const wrapper = createWrapper({
      props: { [size]: true },
    })

    expect(wrapper.attributes("class")).toContain(expectedClass)
  })

  test.each([
    ["primary", "bg-primary-600 hover:bg-primary-500 ring-primary-500"],
    ["warning", "bg-yellow-600 hover:bg-yellow-500 ring-yellow-500"],
    ["danger", "bg-red-600 hover:bg-red-500 ring-red-500"],
    ["success", "bg-green-600 hover:bg-green-500 ring-green-500"],
  ])("renders a button with color %s", (color, expectedClass) => {
    const wrapper = createWrapper({
      props: { [color]: true },
    })

    expect(wrapper.attributes("class")).toContain(expectedClass)
  })
})
