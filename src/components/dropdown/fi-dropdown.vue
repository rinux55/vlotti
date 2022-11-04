<script setup lang="ts">
import { ref, provide } from "vue"
import mitt, { type Emitter } from "mitt"
import type { ListEvents } from "@/types/list"
import useCloseOnClickOutside from "@/composables/use-close-on-click-outside"

const wrapper = ref<HTMLElement | null>(null)
const active = ref(false)

const props = defineProps<{
  disabled?: boolean
}>()

const dropdownEmitter: Emitter<ListEvents> = mitt<ListEvents>()
provide("dropdownEmitter", dropdownEmitter)

dropdownEmitter.on("select", () => {
  active.value = false
})

useCloseOnClickOutside(wrapper, active)

function handleClick(): undefined {
  if (props.disabled) {
    return
  }

  active.value = !active.value
}
</script>
<template>
  <div ref="wrapper" class="inline-block" @keydown.escape="active = false">
    <a data-test="trigger-wrapper" @click="handleClick">
      <slot name="trigger" :active="active"></slot>
    </a>
    <div v-show="active" class="content z-1">
      <slot name="content" :active="active"></slot>
    </div>
  </div>
</template>
<style scoped>
.content {
  @apply bg-white border-1 border-gray-300 rounded shadow-xl absolute;
}
</style>
