<script setup lang="ts">
import { ref } from "vue"
import useCloseOnClickOutside from "@/composables/use-close-on-click-outside"

const wrapper = ref<HTMLElement | null>(null)
const contentVisible = ref(false)

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
      v-if="contentVisible"
      class="bg-white border-1 border-gray-300 rounded shadow-xl absolute"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>
