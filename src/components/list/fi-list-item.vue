<script setup lang="ts">
import type { Emitter } from "mitt"
import type { ListEvents } from "@/events/list"
import { computed, defineEmits, inject, type HTMLAttributes } from "vue"

const props = defineProps<{
  value?: string | number | boolean
  text: string
  disabled?: boolean
}>()

const emit = defineEmits(["select"])
const emitters: Array<Emitter<ListEvents>> = [
  inject("listEmitter") as Emitter<ListEvents>,
  inject("dropdownEmitter") as Emitter<ListEvents>,
]

function handleClick(): void {
  if (props.disabled) {
    return
  }

  emitters.forEach((emitter) =>
    emitter.emit("select", props.value as string | boolean | number)
  )

  emit("select", props.value)
}

const computedAttrs = computed((): HTMLAttributes => {
  const attrs: HTMLAttributes = {}

  if (props.disabled) {
    attrs["aria-disabled"] = "true"
  } else {
    attrs["tabindex"] = "0"
  }

  return attrs
})

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
</script>
<template>
  <div
    data-test="list-item"
    role="listitem"
    :class="computedClass"
    v-bind="computedAttrs"
    @click="handleClick"
  >
    {{ text }}
  </div>
</template>
