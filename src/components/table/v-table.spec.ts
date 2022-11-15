import { shallowMount } from "@vue/test-utils"
import { describe, test, expect } from "vitest"
import VTable from "./v-table.vue"

describe("v-table", () => {
  const columns = [
    {
      label: "Fruit",
    },
    {
      label: "Color",
    },
  ]
  const data = [
    ["Apple", "Red"],
    ["Apple", "Green"],
    ["Banana", "Yellow"],
  ]

  test("renders table headers", () => {
    const wrapper = shallowMount(VTable, {
      props: {
        columns,
        data,
      },
    })

    const tableCells = wrapper.findAll(".table .table-header-group .table-cell")

    expect(tableCells.length).toBe(2)
    expect(tableCells.at(0)?.text()).toBe("Fruit")
    expect(tableCells.at(1)?.text()).toBe("Color")
  })

  test("renders table rows", () => {
    const wrapper = shallowMount(VTable, {
      props: {
        columns,
        data,
      },
    })

    expect(wrapper.findAll(".table .table-row-group .table-row").length).toBe(3)
    expect(wrapper.findAll(".table .table-row-group .table-cell").length).toBe(
      6
    )

    expect(
      wrapper
        .findAll(".table .table-row-group .table-row")
        .at(0)
        ?.findAll(".table-cell")
        .at(0)
        ?.text()
    ).toBe("Apple")
  })
})
