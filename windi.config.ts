import { defineConfig } from "windicss/helpers"
import colors from "windicss/colors"

const safelistColors = [
  "primary",
  "light",
  "dark",
  "red",
  "green",
  "blue",
  "yellow",
  "violet",
  "indigo",
]
const safelistShades = ["50", "100", "200", "300", "400", "500", "600", "700"]
const safelist = []

safelist.push(
  safelistColors
    .map((color) =>
      safelistShades.map(
        (shade) =>
          `bg-${color}-${shade} border-${color}-${shade} hover:bg-${color}-${shade} hover:border-${color}-${shade} ring-${color}-${shade}`
      )
    )
    .flat()
    .join(" ")
)

export default defineConfig({
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
      },
      fontFamily: {
        sans: ["Inter"],
        body: ["Inter"],
      },
    },
    borderRadius: {
      sm: "0.125rem",
      DEFAULT: "6px",
      md: "0.375rem",
      lg: "0.5rem",
      full: "9999px",
      large: "12px",
    },
  },
  safelist,
})
