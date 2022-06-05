import { mount } from "cypress/vue"
import YiButton from "./yi-button.vue"

describe("yi-button", () => {
  const buttonText = "Click me!"

  it("should render a button with text", () => {
    mount(YiButton, {
      slots: {
        default: () => buttonText,
      },
    })
      .get("[data-test=button]")
      .should("be.visible")
      .and("contain.text", buttonText)
  })

  it("should render a large button", () => {
    mount(YiButton, {
      slots: {
        default: () => buttonText,
      },
      props: {
        large: true,
      },
    })
      .get("[data-test=button]")
      .should("have.class", "py-3 px-6 text-lg")
  })
})
