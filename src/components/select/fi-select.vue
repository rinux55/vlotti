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
  type InputHTMLAttributes,
} from "vue"
import type { Size } from "@/types/size"

const props = defineProps<{
  modelValue?: ListItem
  items: Array<ListItem>
  label: string
  size?: Size
  disabled?: boolean
  searchable?: boolean
}>()

const emit = defineEmits(["update:modelValue"])

const selectedItem = ref<ListItem | undefined>(props.modelValue)
const focusedItem = ref<ComponentPublicInstance<HTMLDivElement> | null>()
const itemRefs = ref<Array<ComponentPublicInstance<HTMLDivElement>>>([])
const inputValue = ref<string>(selectedItem.value?.label || "")
const searching = ref<boolean>(false)

watch(
  () => props.modelValue,
  (listItem: ListItem | undefined) => {
    selectedItem.value = listItem
  }
)

watch(
  () => selectedItem.value,
  (listItem: ListItem | undefined) => {
    searching.value = false
    focusedItem.value = null
    inputValue.value = listItem?.label || ""
  }
)

const computedClass = computed((): string => {
  const classes: Array<string> = []

  if (props.disabled) {
    classes.push("disabled")
  }

  if (props.searchable) {
    classes.push("searchable")
  }

  return classes.join(" ")
})

const inputAttributes = computed((): InputHTMLAttributes => {
  const attributes: InputHTMLAttributes = {}

  if (!props.searchable) {
    attributes.readonly = true
  }

  return attributes
})

const filteredItems = computed((): Array<ListItem> => {
  if (!searching.value) {
    return props.items
  } else {
    const pattern = new RegExp(`^${inputValue.value}`, "i")
    return props.items.filter(({ label }) => label.match(pattern))
  }
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

function handleInput($event: KeyboardEvent) {
  if ($event.key.match(/^[a-z ]$/i)) {
    searching.value = true
  }
}

async function handleArrowKey(event: KeyboardEvent) {
  const currentIndex = itemRefs.value.findIndex((i) => i === focusedItem?.value)

  const index = currentIndex + (event.key === "ArrowDown" ? 1 : -1)

  if (!itemRefs.value[index]) {
    return
  }

  focusedItem.value = itemRefs.value[index]
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
          @keydown="handleInput($event)"
          v-model="inputValue"
          class="input"
          :class="{ focus: active }"
          :label="label"
          :size="size"
          :disabled="disabled"
          :aria-activedescendant="activeDescendant"
          placeholder="select an item"
          v-bind="inputAttributes"
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
          v-for="item in filteredItems"
          ref="itemRefs"
          :key="(item.value as string)"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
          :id="`fi-list-${uid}-item-${item.value}`"
          role="option"
        ></fi-list-item>
        <fi-list-item
          data-test="no-results"
          v-if="!filteredItems.length"
          label="No results"
          class="text-gray-400"
        >
        </fi-list-item>
      </fi-list>
    </template>
  </fi-dropdown>
</template>
<style scoped>
.input {
  @apply pr-8;
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

.fi-select:not(.searchable, .disabled) .input {
  @apply cursor-pointer;
}

.fi-select.disabled .icon {
  @apply !text-gray-300;
}
</style>
