import { computed, type ComputedRef, type InputHTMLAttributes } from "vue"
import type { CSSClassObject } from "@/types/attributes"

export interface DisabledProps {
  disabled?: boolean
}

export function useDisabled({ disabled }: DisabledProps): {
  disabledAttr: ComputedRef<InputHTMLAttributes>
  disabledClass: ComputedRef<CSSClassObject>
} {
  return {
    disabledAttr: computed((): InputHTMLAttributes => {
      return { disabled: disabled ? "true" : "false" }
    }),
    disabledClass: computed((): CSSClassObject => {
      return { "v-disabled": disabled }
    }),
  }
}
