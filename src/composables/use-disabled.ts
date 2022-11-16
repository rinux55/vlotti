import { computed, type ComputedRef, type InputHTMLAttributes } from "vue"
import type { CSSClassObject } from "@/types/attributes"
import type { DisabledProps } from "@/types/component-props"

export function useDisabled({ disabled }: DisabledProps): {
  disabledAttr: ComputedRef<InputHTMLAttributes>
  disabledClass: ComputedRef<CSSClassObject>
} {
  return {
    disabledAttr: computed((): InputHTMLAttributes => {
      if (disabled) {
        return { disabled: true }
      }
      return {}
    }),
    disabledClass: computed((): CSSClassObject => {
      return { "v-disabled": disabled }
    }),
  }
}
