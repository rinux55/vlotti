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

const selected = computed((): boolean => {
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

  if (selected.value) {
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
  <li
    ref="list-item"
    data-test="list-item"
    :aria-selected="selected"
    class="v-list-item"
    :class="computedClass"
    :title="label"
    v-bind="computedAttrs"
    @click="select"
    @keydown.enter="select"
    tabindex="0"
  >
    {{ label }}
  </li>
</template>
<style scoped>
.v-list-item {
  @apply p-3 overflow-x-hidden overflow-ellipsis;
}

.v-list-item:not(.disabled) {
  @apply hover:bg-gray-100 active:bg-gray-200 focus:bg-gray-200 cursor-pointer;
}

.selected {
  @apply bg-primary-100 text-primary-500 font-bold;
}

.selected:not(.disabled) {
  @apply hover:bg-primary-200 focus:bg-primary-200 cursor-pointer;
}

.disabled {
  @apply text-gray-400 cursor-default;
}
</style>
