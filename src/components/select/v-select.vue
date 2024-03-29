<script setup lang="ts">
import type {
  ColorProps,
  DisabledProps,
  SizeProps,
  ListProps,
} from "@/types/component-props"
import type { ListItem } from "@/types/list.d"
import VDropdown from "@/components/dropdown/v-dropdown.vue"
import VList from "@/components/list/v-list.vue"
import VListItem from "@/components/list/v-list-item.vue"
import VInput from "@/components/input/v-input.vue"
import VIcon from "@/components/icon/v-icon.vue"
import { useDisabled } from "@/composables/use-disabled"
import { pick } from "lodash-es"
import {
  computed,
  ref,
  watch,
  getCurrentInstance,
  type ComponentPublicInstance,
} from "vue"

interface SelectProps extends ColorProps, DisabledProps, SizeProps, ListProps {
  modelValue?: ListItem
  label: string
  placeholder?: string
  searchable?: boolean
}

const props = defineProps<SelectProps>()

const { disabledClass } = useDisabled(props)

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

const inputProps = computed(() => {
  return pick(props, [
    "warning",
    "danger",
    "success",
    "tiny",
    "small",
    "large",
    "disabled",
    "label",
    "placeholder",
  ])
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

  return `v-list-${uid.value}-item-${selectedItem.value.value}`
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
  <v-dropdown
    data-test="select"
    @keydown.up="handleArrowKey($event)"
    @keydown.down="handleArrowKey($event)"
    class="v-select"
    :class="[searchable ? 'v-searchable' : null, disabledClass]"
    :disabled="disabled"
  >
    <template #trigger="{ active, open }">
      <div
        data-test="input-wrapper"
        class="v-input-wrapper"
        :class="{ active }"
        :aria-expanded="active"
        :aria-owns="`v-list-${uid}`"
        aria-haspopup="listbox"
      >
        <v-input
          data-test="input"
          @keydown.down="open()"
          @keydown="handleInput($event)"
          v-model="inputValue"
          v-bind="{ ...inputProps }"
          :class="{ 'v-focus': active }"
          :aria-activedescendant="activeDescendant"
          :readonly="!searchable"
        />
        <v-icon icon="fa-chevron-down" class="v-icon" />
      </div>
    </template>
    <template #content>
      <v-list
        data-test="list"
        @update:model-value="selectListItem($event)"
        :model-value="selectedItem"
        role="listbox"
        :id="`v-list-${uid}`"
      >
        <v-list-item
          data-test="list-item"
          ref="itemRefs"
          v-for="item in filteredItems"
          :key="(item.value as string)"
          :id="`v-list-${uid}-item-${item.value}`"
          v-bind="item"
          role="option"
        ></v-list-item>
        <v-list-item
          data-test="no-results"
          v-if="!filteredItems.length"
          label="No results"
          class="text-gray-400"
        >
        </v-list-item>
      </v-list>
    </template>
  </v-dropdown>
</template>
<style scoped>
.v-input {
  @apply pr-8;
}

.v-icon {
  @apply absolute right-3 bottom-0 top-0 m-auto text-gray-300 h-1/3;
}

.v-input-wrapper {
  @apply relative;
}

.v-input-wrapper.active .v-icon {
  @apply !text-primary-500;
}

.v-select:hover .v-icon {
  @apply text-gray-400;
}

.v-select:not(.v-searchable, .v-disabled) .v-input {
  @apply cursor-pointer;
}

.v-select.disabled .icon {
  @apply !text-gray-300;
}
</style>
