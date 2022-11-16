<script setup lang="ts">
import { computed } from "vue"
import { useDisabled, type DisabledProps } from "@/composables/use-disabled"
import { useColor, type ColorProps } from "@/composables/use-color"
import { useSize, type SizeProps } from "@/composables/use-size"

export interface InputProps extends ColorProps, DisabledProps, SizeProps {
  label: string
  modelValue?: string
  placeholder?: string
}

const props = defineProps<InputProps>()

const emit = defineEmits(["update:modelValue"])

const { disabledAttr, disabledClass } = useDisabled(props)
const { colorClass } = useColor(props)
const { sizeClass } = useSize(props)

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
    v-model="value"
    v-bind="disabledAttr"
    class="v-input"
    :class="[colorClass, sizeClass, disabledClass]"
    :placeholder="placeholder"
    :aria-label="label"
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
.v-input.v-focus {
  @apply ring-opacity-30 ring-3 border-primary-400 outline-none;
}

.v-disabled {
  @apply bg-gray-100 text-gray-400;
}
</style>
