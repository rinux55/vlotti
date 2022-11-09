<script setup lang="ts">
import type { Emitter } from "mitt"
import type { ListEvents, ListItem, ListItemValue } from "@/types/list"
import {
  computed,
  defineEmits,
  inject,
  readonly,
  type ComputedRef,
  type HTMLAttributes,
} from "vue"

const props = defineProps<{
  value?: ListItemValue
  label: string
  disabled?: boolean
}>()

const selectedListItem = inject("selectedListItem") as
  | ComputedRef<ListItem>
  | undefined

const emit = defineEmits(["select"])
const emitters: Array<Emitter<ListEvents>> = [
  inject("listEmitter") as Emitter<ListEvents>,
  inject("dropdownEmitter") as Emitter<ListEvents>,
]

const isSelected = computed((): boolean => {
  return selectedListItem?.value?.value === props.value
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

const computedClass = computed((): string => {
  const classes = []

  if (isSelected.value) {
    classes.push("selected")
  }

  if (props.disabled) {
    classes.push("disabled")
  }

  return classes.join(" ")
})

function select(): void {
  if (props.disabled) {
    return
  }

  const item: ListItem = readonly(props)

  emitters.forEach(({ emit }) => emit("select", item))

  emit("select", item)
}
</script>
<template>
  <div
    ref="list-item"
    data-test="list-item"
    role="listitem"
    :aria-selected="isSelected"
    class="fi-list-item"
    :class="computedClass"
    v-bind="computedAttrs"
    @click="select"
    @keydown.enter="select"
  >
    {{ label }}
  </div>
</template>
<style scoped>
.fi-list-item {
  @apply p-3;
}

.fi-list-item:not(.disabled) {
  @apply hover:bg-gray-100 active:bg-gray-200 focus:bg-gray-200 cursor-pointer;
}

.fi-list-item.focused {
  @apply bg-gray-200;
}

.selected {
  @apply bg-primary-100 text-primary-500;
}

.disabled {
  @apply text-gray-400 cursor-default;
}
</style>
