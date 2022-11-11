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
    boxShadow: {
      sm: "0px 2px 3px -1px rgba(0, 0, 0, 0.1), 0px 8px 8px 5px rgba(0, 0, 0, 0.02)",
      DEFAULT:
        "0px 1px 3px 0px rgba(0, 0, 0, 0.15), 0px 8px 15px 5px rgba(0, 0, 0, 0.04)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      none: "none",
    },
  },
  safelist,
})
