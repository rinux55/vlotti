import { fileURLToPath, URL } from "url"
import { resolve } from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import WindiCSS from "vite-plugin-windicss"
import VueTypeImports from "vite-plugin-vue-type-imports" // temporary solution until https://github.com/vuejs/core/issues/4294 is fixed

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueTypeImports(), WindiCSS()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "Vlotti",
      fileName: "vlotti",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
})
