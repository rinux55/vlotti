<script setup lang="ts">
import type { ListItem } from "@/types/list.d"
import FiDropdown from "@/components/dropdown/fi-dropdown.vue"
import FiList from "@/components/list/fi-list.vue"
import FiListItem from "@/components/list/fi-list-item.vue"
import FiInput from "@/components/input/fi-input.vue"
import { computed, ref } from "vue"

const props = defineProps<{
  modelValue?: ListItem
  items: Array<ListItem>
}>()

const emit = defineEmits(["update:modelValue"])
const selectedItemLabel = computed((): string => {
  if (props.modelValue) {
    return props.modelValue?.label || ""
  } else {
    return internalModel.value?.label || ""
  }
})
const internalModel = ref(props.modelValue)

function handleModelValueUpdate(value: ListItem): void {
  emit("update:modelValue", value)
  internalModel.value = value
}
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
        @update:model-value="handleModelValueUpdate($event)"
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
