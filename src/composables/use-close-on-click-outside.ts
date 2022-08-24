import { onMounted, onUnmounted, type Ref } from "vue"

/**
 * Toggles the value of contentVisibleRef whenever a click is made outside
 * of the elementRef. Useful for closing dropdowns or modals by clicking
 * outside of their content.
 */
export default function useCloseOnClickOutside(
  elementRef: Ref<HTMLElement | null>,
  contentVisibleRef: Ref<boolean>
) {
  onMounted(() => {
    window.addEventListener("mouseup", tryClose)
  })

  onUnmounted(() => {
    window.removeEventListener("mouseup", tryClose)
  })

  function tryClose({ target }: MouseEvent | TouchEvent): void {
    if (
      contentVisibleRef.value &&
      !elementRef.value?.contains(target as Node)
    ) {
      contentVisibleRef.value = false
    }
  }

  return { contentVisible: contentVisibleRef }
}
