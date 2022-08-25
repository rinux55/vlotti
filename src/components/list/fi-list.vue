<script setup lang="ts">
import { provide } from "vue"
import mitt, { type Emitter } from "mitt"
import type { ListEvents } from "@/types/events"

defineProps<{
  modelValue?: string | number | boolean
}>()

const emit = defineEmits(["update:modelValue"])
const listEmitter: Emitter<ListEvents> = mitt<ListEvents>()

provide("listEmitter", listEmitter)

listEmitter.on("select", (value) => {
  emit("update:modelValue", value)
})
</script>

<template>
  <div role="list" data-test="list">
    <slot></slot>
  </div>
</template>
