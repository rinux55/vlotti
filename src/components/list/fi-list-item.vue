<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>
<template>
  <div
    data-test="list-item"
    role="listitem"
    tabindex="0"
    class="p-3 hover:bg-gray-100 active:bg-gray-200 focus:bg-gray-200 cursor-pointer"
  >
    {{ text }}
  </div>
</template>
