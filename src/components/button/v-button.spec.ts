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

  test("renders a disabled button", () => {
    const wrapper = shallowMount(VButton, {
      props: {
        disabled: true,
      },
      slots: {
        default: () => buttonText,
      },
    })

    expect(wrapper.classes("v-disabled")).toBe(true)
    expect(wrapper.props("disabled")).toBe(true)
  })

  test.each([
    ["large", "v-large"],
    ["small", "v-small"],
    ["tiny", "v-tiny"],
  ])("renders a button with size %s", (size, expectedClass) => {
    const wrapper = createWrapper({
      props: { [size]: true },
    })

    expect(wrapper.attributes("class")).toContain(expectedClass)
  })

  test.each([
    ["primary", "v-primary"],
    ["warning", "v-warning"],
    ["danger", "v-danger"],
    ["success", "v-success"],
    [null, "v-default"],
  ])("renders a button with color %s", (color, expectedClass) => {
    const props = color ? { [color]: true } : {}
    const wrapper = createWrapper({ props })

    expect(wrapper.attributes("class")).toContain(expectedClass)
  })
})
