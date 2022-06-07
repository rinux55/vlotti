<template>
  <div class="p-30">
    <h1 class="text-3xl pb-5">My App {{ name }}</h1>
    <div class="space-y-6 space-x-2">
      <yi-button primary tiny>Tiny button</yi-button>
      <yi-button tiny>Tiny button</yi-button>
      <yi-input tiny />
    </div>
    <div class="space-y-6 space-x-2">
      <yi-button primary small>Small button</yi-button>
      <yi-button small>Small button</yi-button>
      <yi-input small />
    </div>
    <div class="space-y-6 space-x-2">
      <yi-button primary>Default button</yi-button>
      <yi-button>Default button</yi-button>
      <yi-input v-model="name" placeholder="Enter app name" />
    </div>
    <div class="space-y-6 space-x-2">
      <yi-button primary medium>Medium button</yi-button>
      <yi-button medium>Medium button</yi-button>
      <yi-input medium />
    </div>
    <div class="space-y-6 space-x-2">
      <yi-button primary large>Large button</yi-button>
      <yi-button large>Large button</yi-button>
      <yi-input large />
    </div>
    <div class="space-y-6 space-x-2"></div>
  </div>
</template>
<script setup lang="ts">
import yiButton from "./components/button/yi-button.vue"
import yiInput from "./components/input/yi-input.vue"

let name = "test"
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rubik:wght@400;500&display=swap");
</style>
