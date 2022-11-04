import { onMounted, onUnmounted, type Ref } from "vue"

/**
 * Sets the value of toggleRef to false whenever a click is made outside
 * of the elementRef. Useful for closing dropdowns or modals by clicking
 * outside of their content.
 */
export default function useCloseOnClickOutside(
  elementRef: Ref<HTMLElement | null>,
  toggleRef: Ref<boolean>
): void {
  onMounted(() => {
    window.addEventListener("mouseup", tryClose)
  })

  onUnmounted(() => {
    window.removeEventListener("mouseup", tryClose)
  })

  function tryClose({ target }: MouseEvent | TouchEvent): void {
    if (toggleRef.value && !elementRef.value?.contains(target as Node)) {
      toggleRef.value = false
    }
  }
}
