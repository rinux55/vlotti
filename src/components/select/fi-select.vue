<script setup lang="ts">
import type { ListItem } from "@/types/list.d"
import FiDropdown from "@/components/dropdown/fi-dropdown.vue"
import FiList from "@/components/list/fi-list.vue"
import FiListItem from "@/components/list/fi-list-item.vue"
import FiInput from "@/components/input/fi-input.vue"
import FiIcon from "@/components/icon/fi-icon.vue"
import { computed, ref, watch } from "vue"

const props = defineProps<{
  modelValue?: ListItem
  items: Array<ListItem>
}>()

const emit = defineEmits(["update:modelValue"])

const selectedItem = ref(props.modelValue)
const selectedItemLabel = computed((): string => {
  return selectedItem.value?.label || ""
})

function updateSelectedListItem(listItem: ListItem): void {
  emit("update:modelValue", listItem)

  // only update the selected item internally when no v-model has been bound
  if (!props.modelValue) {
    selectedItem.value = listItem
  }
}

watch(
  () => props.modelValue,
  (value) => {
    selectedItem.value = value
  }
)
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
      <fi-icon icon="chevron-down" />
    </template>
    <template #content>
      <fi-list
        data-test="list"
        @update:model-value="updateSelectedListItem($event)"
        :model-value="selectedItem"
      >
        <fi-list-item
          data-test="list-item"
          v-for="item in items"
          :key="(item.value as string)"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        ></fi-list-item>
      </fi-list>
    </template>
  </fi-dropdown>
</template>
