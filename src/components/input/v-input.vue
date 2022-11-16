<script setup lang="ts">
import { computed, type InputHTMLAttributes } from "vue"
import { useDefaultClasses } from "@/composables/use-default-classes"

export interface InputProps {
  label: string
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  warning?: boolean
  danger?: boolean
  success?: boolean
  tiny?: boolean
  small?: boolean
  large?: boolean
}

const props = defineProps<InputProps>()

const emit = defineEmits(["update:modelValue"])

const { colorClass, disabledClass, sizeClass } = useDefaultClasses(props)

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
    :class="[colorClass, disabledClass, sizeClass]"
    v-model="value"
    v-bind="computedAttrs"
  />
</template>
<style scoped>
.v-input {
  @apply rounded 
    border-1 border-gray-300 
    ring-primary-500 ring-3 ring-opacity-0 
    shadow-sm  
    transition duration-150;
}

.v-input:focus,
.v-input.focus {
  @apply ring-opacity-30 ring-3 border-primary-400 outline-none;
}

.v-disabled {
  @apply bg-gray-100 text-gray-400;
}
</style>
