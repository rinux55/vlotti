<script setup lang="ts">
import { provide, computed } from "vue"
import mitt, { type Emitter } from "mitt"
import type { ListEvents, ListItem } from "@/types/list"

const props = defineProps<{
  modelValue?: ListItem
}>()

const emit = defineEmits(["update:modelValue"])
const listEmitter: Emitter<ListEvents> = mitt<ListEvents>()

provide(
  "selectedListItem",
  computed(() => props.modelValue)
)
provide("listEmitter", listEmitter)

listEmitter.on("select", (value) => {
  emit("update:modelValue", value)
})
</script>

<template>
  <li data-test="list" class="fi-list">
    <slot></slot>
  </li>
</template>
