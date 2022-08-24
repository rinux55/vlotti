<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
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

const computedTabindex = computed((): string => {
  return props.disabled ? "-1" : "0"
})
</script>
<template>
  <div
    data-test="list-item"
    role="listitem"
    :tabindex="computedTabindex"
    :class="computedClass"
  >
    {{ text }}
  </div>
</template>
