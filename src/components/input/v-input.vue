<script setup lang="ts">
import { computed, type InputHTMLAttributes } from "vue"
import type { Size } from "@/types/size"

const props = defineProps<{
  label: string
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  warning?: boolean
  danger?: boolean
  success?: boolean
  size?: Size
}>()

const emit = defineEmits(["update:modelValue"])

const computedClass = computed((): string => {
  const classes: Array<string> = []

  if (props.size) {
    classes.push(props.size)
  }

  if (props.disabled) {
    classes.push("bg-gray-100 text-gray-400")
  }

  return classes.join(" ")
})

const computedAttrs = computed((): InputHTMLAttributes => {
  const attrs: InputHTMLAttributes = {}

  if (props.disabled) {
    attrs.disabled = true
  }

  if (props.placeholder) {
    attrs.placeholder = props.placeholder
  }

  return attrs
})

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit("update:modelValue", value)
  },
})
</script>
<template>
  <input
    data-test="input"
    :aria-label="label"
    class="v-input"
    :class="computedClass"
    v-model="value"
    v-bind="computedAttrs"
  />
</template>
<style scoped>
.v-input {
  @apply rounded border-1 border-gray-300 shadow-sm  ring-primary-500 ring-3 ring-opacity-0 transition duration-150;
}

.v-input:focus,
.v-input.focus {
  @apply ring-opacity-30 ring-3 border-primary-400 outline-none;
}
</style>
