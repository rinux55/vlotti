<script setup lang="ts">
import { defineProps } from "vue"

export interface TableCell {
  label: string
  type?: string
}

defineProps<{
  columns: Array<TableCell>
  data: Array<Array<string>>
}>()
</script>

<template>
  <div class="table border-collapse">
    <div class="table-header-group">
      <div class="table-row">
        <div v-for="(cell, index) in columns" :key="index" class="table-cell">
          {{ cell.label }}
        </div>
      </div>
    </div>
    <div class="table-row-group">
      <div v-for="(row, index) in data" :key="index" class="table-row">
        <div
          v-for="(cell, index) in row"
          :key="index"
          class="table-cell border p-2"
        >
          {{ cell }}
        </div>
      </div>
    </div>
  </div>
</template>
