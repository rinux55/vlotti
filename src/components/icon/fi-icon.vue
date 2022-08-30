<script setup lang="ts">
import { computed } from "vue"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faCoffee } from "@fortawesome/free-solid-svg-icons"

library.add(faCoffee)

const props = defineProps<{ icon: string }>()

const computedIcon = computed((): string => {
  return `fa-solid ${props.icon}`
})
</script>
<template>
  <font-awesome-icon :icon="computedIcon" />
</template>
