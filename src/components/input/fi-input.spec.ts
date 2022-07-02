import { shallowMount } from "@vue/test-utils"
import { describe, test, expect } from "vitest"
import FiInput from "./fi-input.vue"

describe("fi-button", () => {
  test("renders an input with a placholder text", () => {
    const placeholderText = "Enter your name"
    const wrapper = shallowMount(FiInput, {
      props: {
        placeholder: "Enter your name",
      },
    })

    expect(wrapper.find("[data-test=input]").attributes("placeholder")).toBe(
      placeholderText
    )
  })

  test.each([
    ["large", "py-3 px-6 text-lg"],
    ["medium", "py-2 px-5"],
    ["small", "py-1 px-3 text-sm"],
    ["tiny", "py-1 px-3 text-xs"],
    ["default", "py-2 px-4 text-sm"],
  ])("renders an input with size %s", (size, expectedClass) => {
    const wrapper = shallowMount(FiInput, {
      props: { [size]: true },
    })

    expect(wrapper.find("[data-test=input]").attributes("class")).toContain(
      expectedClass
    )
  })
})
