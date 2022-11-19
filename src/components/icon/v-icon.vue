<script setup lang="ts">
import { computed } from "vue"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faCoffee, faChevronDown } from "@fortawesome/free-solid-svg-icons"

library.add(faCoffee, faChevronDown)

const props = defineProps<{ icon: string }>()

const computedIcon = computed((): Array<string> => {
  return ["fas", props.icon]
})
</script>
<template>
  <font-awesome-icon :icon="computedIcon" />
</template>
