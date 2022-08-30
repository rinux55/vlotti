<script setup lang="ts">
import { computed, defineProps } from "vue"
import { useColor } from "@/composables/use-color"
import { useSize } from "@/composables/use-size"
import FiIcon from "../icon/fi-icon.vue"

const props = defineProps<{
  primary?: boolean
  warning?: boolean
  danger?: boolean
  success?: boolean
  large?: boolean
  medium?: boolean
  small?: boolean
  tiny?: boolean
  icon?: string
  iconRight?: string
}>()

const color = useColor(props)
const size = useSize(props)

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
      "text-gray-700 border-gray-300 bg-white " +
        "hover:border-gray-400 hover:text-gray-900 " +
        "focus:border-primary-400 ring-primary-500 "
    )
  }

  classes.push(size.value)

  return classes.join(" ")
})
</script>

<template>
  <button
    class="font-medium rounded border-1 shadow ring-opacity-30 transition duration-150 focus:ring-3 focus-visible:outline-none"
    :class="computedClass"
  >
    <span>
      <fi-icon class="pr-2" data-test="icon" :icon="icon" v-if="icon" />
      <slot />
    </span>
  </button>
</template>
