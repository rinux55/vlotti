import { shallowMount } from "@vue/test-utils"
import { describe, test, expect } from "vitest"
import WuiButton from "./wui-button.vue"

describe("wui-button", () => {
  const buttonText = "Click me!"

  test("renders button with text", () => {
    const wrapper = shallowMount(WuiButton, {
      slots: {
        default: () => buttonText,
      },
    })

    expect(wrapper.find("[data-test=button]").text()).toBe(buttonText)
  })

  test.each([
    ["large", "py-3 px-6 text-lg"],
    ["medium", "py-2 px-5"],
    ["small", "py-1 px-3 text-sm"],
    ["tiny", "py-1 px-3 text-xs"],
    ["default", "py-2 px-4 text-sm"],
  ])("should render a button with size %s", (size, expectedClass) => {
    const wrapper = shallowMount(WuiButton, {
      slots: {
        default: () => buttonText,
      },
      props: { [size]: true },
    })

    expect(wrapper.find("[data-test=button]").attributes("class")).toContain(
      expectedClass
    )
  })

  test.each([
    ["primary", "bg-indigo-600 hover:bg-indigo-500 ring-indigo-500"],
    ["warning", "bg-yellow-600 hover:bg-yellow-500 ring-yellow-500"],
    ["danger", "bg-red-600 hover:bg-red-500 ring-red-500"],
    ["success", "bg-green-600 hover:bg-green-500 ring-green-500"],
  ])("should render a button with color %s", (color, expectedClass) => {
    const wrapper = shallowMount(WuiButton, {
      slots: {
        default: () => buttonText,
      },
      props: { [color]: true },
    })

    expect(wrapper.find("[data-test=button]").attributes("class")).toContain(
      expectedClass
    )
  })
})
