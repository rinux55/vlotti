<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"

const props = defineProps<{
  value: string | number | boolean
  text: string
  disabled?: boolean
}>()

const computedClass = computed((): string => {
  const classes = ["p-3"]
  if (props.disabled) {
    classes.push("text-gray-400 cursor-default")
  } else {
    classes.push(
      "hover:bg-gray-100 active:bg-gray-200 focus:bg-gray-200 cursor-pointer"
    )
  }

  return classes.join(" ")
})

const computedAttrs = computed((): HTMLAttributes => {
  const attrs: HTMLAttributes = {}

  if (props.disabled) {
    attrs["aria-disabled"] = "true"
  } else {
    attrs["tabindex"] = "0"
  }

  return attrs
})
</script>
<template>
  <div
    data-test="list-item"
    role="listitem"
    :class="computedClass"
    v-bind="computedAttrs"
  >
    {{ text }}
  </div>
</template>
