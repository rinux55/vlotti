<script setup lang="ts">
import { computed, type InputHTMLAttributes } from "vue"
import { useSize } from "@/composables/use-size"

const props = defineProps<{
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  warning?: boolean
  danger?: boolean
  success?: boolean
  large?: boolean
  small?: boolean
  tiny?: boolean
}>()

const emit = defineEmits(["update:modelValue"])

const size = useSize(props)

const computedClass = computed((): string => {
  const classes: Array<string> = []

  classes.push(size.value)

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
    :class="computedClass"
    v-model="value"
    v-bind="computedAttrs"
  />
</template>
<style scoped>
input {
  @apply rounded border-1 border-gray-300 shadow-sm transition duration-150 ring-primary-500 ring-opacity-30 focus:ring-3 focus:border-primary-400 focus-visible:outline-none;
}
</style>
