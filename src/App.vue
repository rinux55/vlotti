<template>
  <div class="p-30">
    <h1 class="text-3xl pb-5">My App {{ name }}</h1>
    <div class="space-y-6 space-x-2">
      <fi-button primary tiny>Tiny button</fi-button>
      <fi-button tiny>Tiny button</fi-button>
      <fi-input tiny />
    </div>
    <div class="space-y-6 space-x-2">
      <fi-button primary small>Small button</fi-button>
      <fi-button small>Small button</fi-button>
      <fi-input small />
    </div>
    <div class="space-y-6 space-x-2">
      <fi-button primary>Default button</fi-button>
      <fi-button>Default button</fi-button>
      <fi-input v-model="name" placeholder="Enter app name" />
    </div>
    <div class="space-y-6 space-x-2">
      <fi-button primary medium>Medium button</fi-button>
      <fi-button medium>Medium button</fi-button>
      <fi-input medium />
    </div>
    <div class="space-y-6 space-x-2">
      <fi-button primary large>Large button</fi-button>
      <fi-button large>Large button</fi-button>
      <fi-input large />
    </div>
    <div class="space-y-6 space-x-2"></div>
    <h1 class="text-3xl pb-5 pt-5">Dropdown</h1>
    <fi-dropdown>
      <template #trigger>
        <fi-button>Dropdown</fi-button>
      </template>
      <template #content>
        <fi-list>
          <fi-list-item text="Item one" />
          <fi-list-item text="Item two" />
        </fi-list>
      </template>
    </fi-dropdown>
    <h1 class="text-3xl pb-5 pt-5">Table</h1>
    <fi-table
      :columns="[{ label: 'Fruit' }, { label: 'Color' }]"
      :data="[
        ['Apple', 'Red'],
        ['Apple', 'Green'],
        ['Banana', 'Yellow'],
      ]"
    ></fi-table>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
import fiButton from "./components/button/fi-button.vue"
import fiInput from "./components/input/fi-input.vue"
import fiTable from "./components/table/fi-table.vue"
import fiDropdown from "./components/dropdown/fi-dropdown.vue"
import fiList from "./components/list/fi-list.vue"
import fiListItem from "./components/list/fi-list-item.vue"

let name = ref("test")
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rubik:wght@400;500&display=swap");
</style>
