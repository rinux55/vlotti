<script setup lang="ts">
import type { ListItem } from "@/types/list.d"
import FiDropdown from "@/components/dropdown/fi-dropdown.vue"
import FiList from "@/components/list/fi-list.vue"
import FiListItem from "@/components/list/fi-list-item.vue"
import FiInput from "@/components/input/fi-input.vue"
import FiIcon from "@/components/icon/fi-icon.vue"
import { computed, ref, watch } from "vue"
import type { Size } from "@/types/size"

const props = defineProps<{
  modelValue?: ListItem
  items: Array<ListItem>
  label: string
  size?: Size
  disabled?: boolean
}>()

const emit = defineEmits(["update:modelValue"])

const selectedItem = ref(props.modelValue)
const selectedItemLabel = computed((): string => {
  return selectedItem.value?.label || ""
})

const computedClass = computed((): string => {
  if (props.disabled) {
    return "disabled"
  }

  return ""
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
  <fi-dropdown
    data-test="select"
    class="select"
    :class="computedClass"
    :disabled="disabled"
  >
    <template #trigger="{ active }">
      <div
        data-test="input-wrapper"
        class="input-wrapper relative"
        :class="{ active }"
      >
        <fi-input
          class="input"
          data-test="input"
          v-model="selectedItemLabel"
          readonly
          :label="label"
          :size="size"
          :disabled="disabled"
          Placeholder="select an item"
        />
        <fi-icon icon="fa-chevron-down" class="icon" />
      </div>
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
<style scoped>
.input {
  @apply pr-8 cursor-pointer;
}

.icon {
  @apply absolute right-3 bottom-0 top-0 m-auto text-gray-300 h-1/3;
}

.input-wrapper.active .icon {
  @apply !text-primary-500;
}

.select:hover .icon {
  @apply text-gray-400;
}

.select.disabled .input {
  @apply !cursor-default;
}

.select.disabled .icon {
  @apply !text-gray-300;
}
</style>
