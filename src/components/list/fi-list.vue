<script setup lang="ts">
import { provide, readonly } from "vue"
import mitt, { type Emitter } from "mitt"
import type { ListEvents } from "@/events/list"

const props = defineProps<{
  modelValue?: string | number | boolean
}>()

const emit = defineEmits(["update:modelValue"])
const emitter: Emitter<ListEvents> = mitt<ListEvents>()

provide("listEmitter", emitter)

emitter.on("select", (value) => {
  emit("update:modelValue", value)
})
</script>

<template>
  <div role="list" data-test="list">
    <slot></slot>
  </div>
</template>
