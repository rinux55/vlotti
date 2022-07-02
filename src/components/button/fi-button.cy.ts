import { mount } from "cypress/vue"
import FiButton from "./fi-button.vue"

describe("fi-button", () => {
  it("should render a button with text", () => {
    const buttonText = "Click me!"

    mount(FiButton, {
      slots: {
        default: () => buttonText,
      },
    })
      .get("[data-test=button]")
      .should("be.visible")
      .and("contain.text", buttonText)
  })

  it("should render a large button", () => {
    mount(FiButton, {
      props: {
        large: true,
      },
    })
      .get("[data-test=button]")
      .should("have.class", "py-3 px-6 text-lg")
  })
})
