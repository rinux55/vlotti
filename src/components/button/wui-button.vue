<script setup lang="ts">
import { computed, defineProps, ref } from "vue"
import { useColor } from "../../composables/use-color"

const props = defineProps<{
  primary?: boolean
  warning?: boolean
  danger?: boolean
  success?: boolean
  rounded?: boolean
  large?: boolean
  medium?: boolean
  small?: boolean
  tiny?: boolean
}>()

const color = useColor(props)

const size = computed((): string => {
  if (props.large) return "py-3 px-6 text-lg"
  if (props.medium) return "py-2 px-5"
  if (props.small) return "py-1 px-3 text-sm"
  if (props.tiny) return "py-1 px-3 text-xs"

  return "py-2 px-4 text-sm"
})

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
        "focus:border-blue-400 ring-blue-500 "
    )
  }

  classes.push(size.value)

  return classes.join(" ")
})
</script>

<template>
  <button
    data-test="button"
    class="wui-button font-medium rounded border-1 shadow-sm focus:ring-3 ring-opacity-30 transition duration-150"
    :class="computedClass"
  >
    <slot />
  </button>
</template>
