import { mount } from "cypress/vue"
import VInput from "./v-input.vue"

describe("v-input", () => {
  function createWrapper({ props = {} } = {}) {
    return mount(VInput, {
      props: {
        label: "My input",
        ...props,
      },
    })
  }

  it("should render a placeholder text", () => {
    const placeholderText = "Enter your name"
    const wrapper = createWrapper({
      props: {
        placeholder: placeholderText,
      },
    })

    wrapper
      .get("[data-test=input]")
      .should("have.attr", "placeholder", placeholderText)
  })

  it("should add the aria-label attribute with the label", () => {
    const wrapper = createWrapper()

    wrapper
      .get("[data-test=input]")
      .should("have.attr", "aria-label", "My input")
  })

  it("should render an input as disabled when property 'disabled' is given", () => {
    const input = createWrapper({
      props: {
        disabled: true,
      },
    }).get("[data-test=input]")

    input.should("have.class", "v-disabled")
    input.should("have.attr", "disabled")
  })

  it("should not render an input as disabled when property 'disabled' is not given", () => {
    const input = createWrapper({
      props: {
        disabled: false,
      },
    }).get("[data-test=input]")

    input.should("not.have.class", "v-disabled")
    input.should("not.have.attr", "disabled")
  })

  it("should render the input with a specific size", () => {
    const sizes: Record<string, string> = {
      large: "v-large",
      small: "v-small",
      tiny: "v-tiny",
    }

    Object.keys(sizes).forEach((size) => {
      const wrapper = createWrapper({
        props: {
          [size]: true,
        },
      })

      wrapper.get("[data-test=input]").should("have.class", sizes[size])
    })
  })
})
