import { shallowMount } from "@vue/test-utils"
import { describe, test, expect } from "vitest"
import FiButton from "./fi-button.vue"

describe("fi-button", () => {
  const buttonText = "Click me!"

  test("renders a button with text", () => {
    const wrapper = shallowMount(FiButton, {
      slots: {
        default: () => buttonText,
      },
    })

    expect(wrapper.text()).toBe(buttonText)
  })

  test.each([
    ["large", "py-3 px-6 text-lg"],
    ["medium", "py-2 px-5"],
    ["small", "py-1 px-3 text-sm"],
    ["tiny", "py-1 px-3 text-xs"],
    ["default", "py-2 px-4 text-sm"],
  ])("renders a button with size %s", (size, expectedClass) => {
    const wrapper = shallowMount(FiButton, {
      slots: {
        default: () => buttonText,
      },
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
    const wrapper = shallowMount(FiButton, {
      slots: {
        default: () => buttonText,
      },
      props: { [color]: true },
    })

    expect(wrapper.attributes("class")).toContain(expectedClass)
  })
})
