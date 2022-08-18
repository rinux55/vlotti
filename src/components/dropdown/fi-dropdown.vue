<script setup lang="ts">
import { ref } from "vue"

let contentVisible = ref(false)
</script>
<template>
  <a data-test="trigger-wrapper" @click="contentVisible = true">
    <slot name="trigger"></slot>
  </a>
  <div v-if="contentVisible">
    <slot name="content"></slot>
  </div>
</template>
