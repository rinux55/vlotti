<script setup lang="ts">
import { ref, provide } from "vue"
import mitt, { type Emitter } from "mitt"
import type { ListEvents } from "@/events/list"
import useCloseOnClickOutside from "@/composables/use-close-on-click-outside"

const wrapper = ref<HTMLElement | null>(null)
const contentVisible = ref(false)

const dropdownEmitter: Emitter<ListEvents> = mitt<ListEvents>()
provide("dropdownEmitter", dropdownEmitter)

dropdownEmitter.on("select", () => {
  contentVisible.value = false
})

useCloseOnClickOutside(wrapper, contentVisible)
</script>
<template>
  <div
    ref="wrapper"
    class="inline-block"
    @keydown.escape="contentVisible = false"
  >
    <a data-test="trigger-wrapper" @click="contentVisible = !contentVisible">
      <slot name="trigger"></slot>
    </a>
    <div
      v-show="contentVisible"
      class="bg-white border-1 border-gray-300 rounded shadow-xl absolute"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>
