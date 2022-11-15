import { shallowMount, VueWrapper } from "@vue/test-utils"
import { describe, test, expect } from "vitest"
import VButton from "./v-button.vue"

describe("v-button", () => {
  const buttonText = "Click me!"

  function createWrapper({ props = {} } = {}) {
    return shallowMount(VButton, {
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
    const wrapper = shallowMount(VButton, {
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
    const wrapper = shallowMount(VButton)

    expect(wrapper.findComponent("[data-test=icon]").exists()).toBe(false)
  })

  test.each(["large", "small", "tiny"])(
    "renders a button with size %s",
    (size) => {
      const wrapper = createWrapper({
        props: { size },
      })

      expect(wrapper.attributes("class")).toContain(size)
    }
  )

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
