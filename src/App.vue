<template>
  <main class="p-30">
    <h1 class="text-3xl pb-5">My App {{ name }}</h1>
    <div class="pb-3 pb-3 space-x-2">
      <v-button
        icon="fa-coffee"
        :primary="isPrimary"
        @click="isPrimary = !isPrimary"
        tiny
        >Tiny button</v-button
      >
      <v-button tiny>Tiny button</v-button>
      <v-input tiny label="tiny-input" />
      <v-select :items="listItems" tiny label="dropdown" />
    </div>
    <div class="pb-3 space-x-2">
      <v-button danger small>Small button</v-button>
      <v-button small>Small button</v-button>
      <v-input small label="small-input" />
      <v-select
        :items="listItems"
        small
        v-model="selectedListItem"
        label="dropdown"
      />
    </div>
    <div class="pb-3 space-x-2">
      <v-button primary>Default button</v-button>
      <v-button icon="fa-coffee">Default button</v-button>
      <v-input
        v-model="name"
        placeholder="Enter app name"
        label="default input"
      />
      <v-select
        :items="listItems"
        v-model="selectedListItem"
        label="dropdown"
      />
    </div>
    <div class="pb-3 space-x-2">
      <v-button large primary>Large button</v-button>
      <v-button large disabled>Large button</v-button>
      <v-input large disabled v-model="name" label="large input" />
      <v-select
        :items="listItems"
        disabled
        large
        v-model="selectedListItem"
        label="dropdown"
      />
    </div>
    <div class="pb-3 space-x-2"></div>
    <h1 class="text-3xl pb-5 pt-5">Dropdown</h1>
    <v-dropdown>
      <template #trigger>
        <v-button>Dropdown</v-button>
      </template>
      <template #content>
        <v-list v-model="selectedDropdownItem">
          <v-list-item label="Item one" value="1" />
          <v-list-item label="Item two" value="2" />
          <v-list-item label="Item three" value="3" disabled />
        </v-list>
      </template>
    </v-dropdown>
    Selected Item: {{ selectedDropdownItem }}
    <h1 class="text-3xl pb-5 pt-5">Select</h1>

    <v-select
      :items="[
        { label: 'Areallyreallysuperduperlongname', value: 1 },
        { label: 'Banana', value: 2 },
        { label: 'test', value: 3, disabled: true },
      ]"
      v-model="selectedListItem"
      searchable
      label="dropdown"
    />
    <v-button @click="selectedListItem = listItems[1]">
      Select Banana
    </v-button>
    <h1 class="text-3xl pb-5 pt-5">Table</h1>

    <v-table
      :columns="[{ label: 'Fruit' }, { label: 'Color' }]"
      :data="[
        ['Apple', 'Red'],
        ['Apple', 'Green'],
        ['Banana', 'Yellow'],
      ]"
    ></v-table>
    <h1 class="text-3xl pb-5 pt-5">Icon</h1>
    <v-icon icon="fa-coffee" />
  </main>
</template>
<script setup lang="ts">
import { ref, type Ref } from "vue"
import VButton from "./components/button/v-button.vue"
import VInput from "./components/input/v-input.vue"
import VTable from "./components/table/v-table.vue"
import VDropdown from "./components/dropdown/v-dropdown.vue"
import VList from "./components/list/v-list.vue"
import VListItem from "./components/list/v-list-item.vue"
import VIcon from "./components/icon/v-icon.vue"
import VSelect from "./components/select/v-select.vue"
import type { ListItem } from "./types/list"

let name = ref("test")
let listItems: Ref<Array<ListItem>> = ref([
  {
    label: "Apple",
    value: 1,
  },
  {
    label: "Banana",
    value: 2,
  },
  {
    label: "Pear",
    value: 3,
  },
])
let isPrimary = ref(true)
let selectedDropdownItem = ref()
let selectedListItem = ref()
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rubik:wght@400;500&display=swap");
</style>
<style>
body {
  background: #eee;
}
</style>
