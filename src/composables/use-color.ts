import { computed, type ComputedRef } from "vue"
import type { CSSClassObject } from "@/types/attributes"

export interface ColorProps {
  primary?: boolean
  warning?: boolean
  danger?: boolean
  success?: boolean
}

export function useColor({ primary, warning, danger, success }: ColorProps): {
  colorClass: ComputedRef<CSSClassObject>
} {
  return {
    colorClass: computed((): CSSClassObject => {
      switch (true) {
        case primary:
          return { "v-primary": true }
        case warning:
          return { "v-warning": true }
        case danger:
          return { "v-danger": true }
        case success:
          return { "v-success": true }
        default:
          return {}
      }
    }),
  }
}
