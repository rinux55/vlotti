<script setup lang="ts">
import { ref, watch, onUnmounted } from "vue"

let contentVisible = ref(false)

watch(contentVisible, () => {
  window.addEventListener("click", closeOnClickOutside)
})

const content = ref<HTMLElement | null>(null)

function closeOnClickOutside({ target }: MouseEvent | TouchEvent): void {
  if (content.value?.contains(target as Node)) {
    return
  }

  contentVisible.value = false
  window.removeEventListener("click", closeOnClickOutside)
}

onUnmounted(() => {
  window.removeEventListener("click", closeOnClickOutside)
})
</script>
<template>
  <a data-test="trigger-wrapper" @click="contentVisible = !contentVisible">
    <slot name="trigger"></slot>
  </a>
  <div
    ref="content"
    v-if="contentVisible"
    class="bg-white border-1 border-gray-300 rounded shadow-xl absolute"
  >
    <slot name="content"></slot>
  </div>
</template>
