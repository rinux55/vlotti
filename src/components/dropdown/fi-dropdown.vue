<script setup lang="ts">
import { ref } from "vue"

let contentVisible = ref(false)
</script>
<template>
  <a data-test="trigger-wrapper" @click="contentVisible = !contentVisible">
    <slot name="trigger"></slot>
  </a>
  <div
    v-if="contentVisible"
    class="bg-white border-1 border-gray-300 rounded shadow-xl absolute"
  >
    <slot name="content"></slot>
  </div>
</template>
