<script setup lang="ts">
import { defineProps } from "vue"
import { useColor, type ColorProps } from "@/composables/use-color"
import { useSize, type SizeProps } from "@/composables/use-size"
import VIcon from "../icon/v-icon.vue"

interface ButtonProps extends ColorProps, SizeProps {
  icon?: string
  iconRight?: string
}

const props = defineProps<ButtonProps>()

const { colorClass } = useColor(props)
const { sizeClass } = useSize(props)
</script>

<template>
  <button class="v-button" :class="[colorClass, sizeClass]">
    <span>
      <v-icon class="pr-2" data-test="icon" :icon="icon" v-if="icon" />
      <slot />
    </span>
  </button>
</template>
<style scoped>
.v-button {
  @apply font-medium 
    border-1 
    shadow-sm rounded
    ring-opacity-30 ring-primary-500 
    focus:ring-3 focus:border-primary-400 focus-visible:outline-none 
    
    transition duration-150;
}

.v-default {
  @apply text-gray-700 bg-white border-gray-300 
  hover:text-gray-900 hover:border-gray-400 hover:bg-gray-50;
}

.v-danger,
.v-warning,
.v-success,
.v-primary {
  @apply text-white border-transparent;
}

.v-primary {
  @apply bg-primary-600 hover:bg-primary-500;
}

.v-danger {
  @apply bg-red-500 hover:bg-red-400 ring-red-500;
}

.v-warning {
  @apply bg-yellow-500 hover:bg-yellow-400 ring-yellow-500;
}

.v-success {
  @apply bg-green-500 hover:bg-green-400 ring-green-500;
}
</style>
