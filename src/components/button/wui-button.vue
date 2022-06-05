<template>
  <button
    data-cy="button"
    class="wui-button rounded border-1 focus:ring-3 ring-opacity-30 shadow-sm transition duration-150"
    :class="computedClass"
  >
    <slot />
  </button>
</template>
<script setup lang="ts">
import { computed, defineProps } from "vue"

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

const color = computed((): string => {
  if (props.primary) return "indigo"
  if (props.warning) return "yellow"
  if (props.danger) return "red"
  if (props.success) return "green"
  return ""
})

const sizing = computed((): string => {
  if (props.large) return "py-3 px-6 text-lg"
  if (props.medium) return "py-2 px-5"
  if (props.small) return "py-1 px-3 text-sm"
  if (props.tiny) return "py-1 px-3 text-xs"
  return "py-2 px-4 text-sm"
})

const computedClass = computed(() => {
  switch (true) {
    case props.primary || props.warning || props.danger || props.success:
      return (
        `border-${color.value}-600 bg-${color.value}-600 ` +
        `hover:border-opacity-10 hover:bg-${color.value}-500 ` +
        `focus:border-${color.value}-400 ring-${color.value}-500 ` +
        "text-white font-semibold border-opacity-20 " +
        sizing.value
      )
    default:
      return (
        "border-gray-300 bg-white text-gray-700 font-medium " +
        "hover:border-gray-400 hover:text-gray-900 " +
        "focus:border-blue-400 ring-blue-500 " +
        sizing.value
      )
  }
})
</script>
