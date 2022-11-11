<script setup lang="ts">
import { ref, provide } from "vue"
import mitt, { type Emitter } from "mitt"
import type { ListEvents } from "@/types/list"
import useCloseOnClickOutside from "@/composables/use-close-on-click-outside"

const wrapper = ref<HTMLElement | null>(null)
const active = ref(false)

const props = defineProps<{
  disabled?: boolean
}>()

const dropdownEmitter: Emitter<ListEvents> = mitt<ListEvents>()
provide("dropdownEmitter", dropdownEmitter)

dropdownEmitter.on("select", () => {
  active.value = false
})

useCloseOnClickOutside(wrapper, active)

function handleClick(): undefined {
  if (props.disabled) {
    return
  }

  active.value = !active.value
}

function close() {
  active.value = false
}

function open() {
  active.value = true
}
</script>
<template>
  <div ref="wrapper" class="fi-dropdown" @keydown.escape="active = false">
    <a data-test="trigger-wrapper" @click="handleClick">
      <slot name="trigger" v-bind="{ active, close, open }"></slot>
    </a>
    <transition>
      <div v-show="active" class="content">
        <slot name="content" :active="ref(active)"></slot>
      </div>
    </transition>
  </div>
</template>
<style scoped>
.fi-dropdown {
  @apply inline-block relative;
}

.content {
  @apply bg-white border-1 border-gray-300 rounded shadow-xl z-1 absolute right-0 left-0;
}

.v-enter-active,
.v-leave-active {
  @apply transition-all duration-150 opacity-100 ease-out;
}

.v-enter-from,
.v-leave-to {
  @apply opacity-0;
}

.v-enter-from {
  transform: translateY(-1em);
}
</style>
