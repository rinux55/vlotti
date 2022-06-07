<script setup lang="ts">
import { computed, defineProps } from "vue"
import { useSize } from "@/composables/use-size"

const props = defineProps<{
  modelValue?: string
  placeholder?: string
  warning?: boolean
  danger?: boolean
  success?: boolean
  large?: boolean
  medium?: boolean
  small?: boolean
  tiny?: boolean
}>()

const size = useSize(props)

const computedClass = computed((): string => {
  return size.value
})
</script>
<template>
  <input
    class="rounded border-1 border-gray-300 shadow-sm transition duration-150 ring-primary-500 ring-opacity-30 focus:ring-3 focus:border-primary-400 focus-visible:outline-none"
    :class="computedClass"
    :value="modelValue"
    :placeholder="placeholder"
    @input="$emit('update:modelValue', $event)"
  />
</template>
