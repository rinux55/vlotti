<script setup lang="ts">
import { computed, defineProps } from "vue"
import { useColor } from "@/composables/use-color"
import FiIcon from "../icon/fi-icon.vue"
import type { Size } from "@/types/size"

const props = defineProps<{
  primary?: boolean
  size?: Size
  icon?: string
  iconRight?: string
  warning?: boolean
  danger?: boolean
  success?: boolean
}>()

const color = useColor(props)

const computedClass = computed((): string => {
  const classes = []

  if (color.value) {
    classes.push(
      `text-white border-transparent bg-${color.value}-600 ` +
        `hover:bg-${color.value}-500 ` +
        `ring-${color.value}-500 `
    )
  } else {
    classes.push(
      "text-gray-700 bg-gray-50 border-gray-400 bg-white " +
        "hover:border-gray-400 hover:text-gray-900 " +
        "focus:border-primary-400 ring-primary-500 "
    )
  }

  if (props.size) {
    classes.push(props.size)
  }

  return classes.join(" ")
})
</script>

<template>
  <button class="fi-button" :class="computedClass">
    <span>
      <fi-icon class="pr-2" data-test="icon" :icon="icon" v-if="icon" />
      <slot />
    </span>
  </button>
</template>
<style scoped>
button {
  @apply font-medium rounded border-1 border-opacity-50 shadow ring-opacity-30 transition duration-150 focus:ring-3 focus-visible:outline-none;
}
</style>
