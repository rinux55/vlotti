<template>
  <div class="p-30">
    <h1 class="text-3xl pb-5">My App</h1>
    <div class="space-y-6 space-x-2">
      <wui-button primary small>Small button</wui-button>
      <wui-button small>Small button</wui-button>
    </div>
    <div class="space-y-6 space-x-2">
      <wui-button primary>Default button</wui-button>
      <wui-button>Default button</wui-button>
    </div>
    <div class="space-y-6 space-x-2">
      <wui-button primary large>Large button</wui-button>
      <wui-button large>Large button</wui-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import wuiButton from "./components/button/wui-button.vue"
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rubik:wght@400;500&display=swap");
</style>
