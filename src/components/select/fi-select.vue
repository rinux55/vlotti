<script setup lang="ts">
import type { ListItem, ListItemValue } from "@/types/list.d"
import FiDropdown from "@/components/dropdown/fi-dropdown.vue"
import FiList from "@/components/list/fi-list.vue"
import FiListItem from "@/components/list/fi-list-item.vue"
import FiInput from "@/components/input/fi-input.vue"
import { computed } from "vue"

const props = defineProps<{
  modelValue?: ListItem
  items: Array<ListItem>
}>()

const emit = defineEmits(["update:modelValue"])
const selectedItemLabel = computed((): string => {
  return props.modelValue?.label || ""
})
</script>
<template>
  <fi-dropdown>
    <template #trigger>
      <fi-input
        data-test="input"
        v-model="selectedItemLabel"
        readonly
        Placeholder="select an item"
      />
    </template>
    <template #content>
      <fi-list
        data-test="list"
        @update:model-value="emit('update:modelValue', $event)"
        :model-value="modelValue"
      >
        <fi-list-item
          data-test="list-item"
          v-for="item in items"
          :key="(item.value as string)"
          :label="item.label"
          :value="item.value"
        ></fi-list-item>
      </fi-list>
    </template>
  </fi-dropdown>
</template>
