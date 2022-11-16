<script setup lang="ts">
import type {
  ColorProps,
  SizeProps,
  DisabledProps,
} from "@/types/component-props"
import type { ButtonHTMLAttributes } from "vue"
import { useColor } from "@/composables/use-color"
import { useSize } from "@/composables/use-size"
import { useDisabled } from "@/composables/use-disabled"
import VIcon from "../icon/v-icon.vue"

interface ButtonProps extends ColorProps, SizeProps, DisabledProps {
  icon?: string
  iconRight?: string
}

const props = defineProps<ButtonProps>()

const { colorClass } = useColor(props)
const { sizeClass } = useSize(props)
const { disabledAttr, disabledClass } = useDisabled(props)
</script>

<template>
  <button
    class="v-button"
    data-test="button"
    :class="[colorClass, sizeClass, disabledClass]"
    v-bind="disabledAttr as ButtonHTMLAttributes"
  >
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
    shadow-sm
    rounded
    ring-opacity-30 ring-primary-500
    transition duration-150
    focus:ring-3 focus:border-primary-400 focus-visible:outline-none;

  &.v-disabled {
    @apply cursor-default;
  }
}

.v-danger,
.v-warning,
.v-success,
.v-primary {
  @apply text-white border-transparent;

  &.v-disabled {
    @apply text-opacity-60;
  }
}

.v-default {
  @apply text-gray-700 bg-white border-gray-300;

  &:not(.v-disabled) {
    @apply hover:text-gray-900 hover:border-gray-400 hover:bg-gray-50;
  }

  &.v-disabled {
    @apply bg-gray-100 text-gray-400;
  }
}

.v-primary {
  @apply bg-primary-600;

  &:not(.v-disabled) {
    @apply hover:bg-primary-500;
  }

  &.v-disabled {
    @apply bg-primary-400;
  }
}

.v-danger {
  @apply bg-red-500 ring-red-300 focus:border-red-600;

  &:not(.v-disabled) {
    @apply hover:bg-red-400;
  }

  &.v-disabled {
    @apply bg-red-400;
  }
}

.v-warning {
  @apply bg-yellow-500 ring-yellow-300 focus:border-yellow-600;

  &:not(.v-disabled) {
    @apply hover:bg-yellow-400;
  }

  &.v-disabled {
    @apply bg-yellow-400;
  }
}

.v-success {
  @apply bg-green-500 ring-green-300 focus:border-green-600;

  &:not(.v-disabled) {
    @apply hover:bg-green-400;
  }

  &.v-disabled {
    @apply bg-green-400;
  }
}
</style>
