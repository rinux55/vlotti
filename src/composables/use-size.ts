import { computed, type ComputedRef } from "vue"
import type { CSSClassObject } from "@/types/attributes"

export interface SizeProps {
  tiny?: boolean
  small?: boolean
  large?: boolean
}

export function useSize({ tiny, small, large }: SizeProps): {
  sizeClass: ComputedRef<CSSClassObject>
} {
  return {
    sizeClass: computed((): CSSClassObject => {
      switch (true) {
        case tiny:
          return { "v-tiny": true }
        case small:
          return { "v-small": true }
        case large:
          return { "v-large": true }
        default:
          return {}
      }
    }),
  }
}
