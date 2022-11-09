<script setup lang="ts">
import type { ListItem } from "@/types/list.d"
import FiDropdown from "@/components/dropdown/fi-dropdown.vue"
import FiList from "@/components/list/fi-list.vue"
import FiListItem from "@/components/list/fi-list-item.vue"
import FiInput from "@/components/input/fi-input.vue"
import FiIcon from "@/components/icon/fi-icon.vue"
import {
  computed,
  ref,
  watch,
  nextTick,
  getCurrentInstance,
  type ComponentPublicInstance,
} from "vue"
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

const itemRefs = ref<Array<ComponentPublicInstance<HTMLDivElement>>>([])

let focusedItem = ref()

const computedClass = computed((): string => {
  if (props.disabled) {
    return "disabled"
  }

  return ""
})

const uid = computed((): number => {
  return getCurrentInstance()?.uid || 0
})

const activeDescendant = computed((): string => {
  if (!selectedItem.value) {
    return ""
  }

  return `fi-list-${uid.value}-item-${selectedItem.value.value}`
})

function selectListItem(listItem: ListItem): void {
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

async function handleArrowKey(event: KeyboardEvent) {
  // make sure the list is visible before focusing
  await nextTick()

  const currentIndex =
    props.items.findIndex((i) => i === focusedItem?.value) || 0

  const index = currentIndex + (event.key === "ArrowDown" ? 1 : -1)

  if (!props.items[index]) {
    return
  }

  focusedItem.value = props.items[index]
  itemRefs.value[index].$el.focus()
}
</script>
<template>
  <fi-dropdown
    data-test="select"
    @keydown.up="handleArrowKey($event)"
    @keydown.down="handleArrowKey($event)"
    class="fi-select"
    :class="computedClass"
    :disabled="disabled"
  >
    <template #trigger="{ active, open }">
      <div
        data-test="input-wrapper"
        class="input-wrapper relative"
        :class="{ active }"
        aria-haspopup="listbox"
        :aria-expanded="active"
        :aria-owns="`fi-list-${uid}`"
      >
        <fi-input
          data-test="input"
          @keydown.down="open()"
          v-model="selectedItemLabel"
          class="input"
          :class="{ focus: active }"
          :label="label"
          :size="size"
          :disabled="disabled"
          :aria-activedescendant="activeDescendant"
          placeholder="select an item"
          readonly
        />
        <fi-icon icon="fa-chevron-down" class="icon" />
      </div>
    </template>
    <template #content>
      <fi-list
        data-test="list"
        @update:model-value="selectListItem($event)"
        :model-value="selectedItem"
        role="listbox"
        :id="`fi-list-${uid}`"
      >
        <fi-list-item
          data-test="list-item"
          v-for="item in items"
          ref="itemRefs"
          :key="(item.value as string)"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
          :id="`fi-list-${uid}-item-${item.value}`"
          role="option"
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

.fi-select:hover .icon {
  @apply text-gray-400;
}

.fi-select.disabled .input {
  @apply !cursor-default;
}

.fi-select.disabled .icon {
  @apply !text-gray-300;
}
</style>
