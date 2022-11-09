import { mount } from "cypress/vue"
import FiInput from "./fi-input.vue"

describe("fi-input", () => {
  function createWrapper({ props = {} } = {}) {
    return mount(FiInput, {
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

    input.should("have.class", "bg-gray-100 text-gray-400")
    input.should("have.attr", "disabled")
  })

  it("should not render an input as disabled when property 'disabled' is not given", () => {
    const input = createWrapper({
      props: {
        disabled: false,
      },
    }).get("[data-test=input]")

    input.should("not.have.class", "bg-gray-100 text-gray-400")
    input.should("not.have.attr", "disabled")
  })

  it("should render the input with a specific size", () => {
    const sizes = ["large", "small", "tiny"]

    sizes.forEach((size) => {
      const wrapper = createWrapper({
        props: {
          size,
        },
      })

      wrapper.get("[data-test=input]").should("have.class", size)
    })
  })
})
