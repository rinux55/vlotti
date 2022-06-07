import { computed, type ComputedRef } from "vue"

interface Props {
  large?: boolean
  medium?: boolean
  small?: boolean
  tiny?: boolean
}

export function useSize(props: Props): ComputedRef<string> {
  return computed((): string => {
    if (props.large) return "py-3 px-6 text-lg"
    if (props.medium) return "py-2 px-5"
    if (props.small) return "py-1 px-3 text-sm"
    if (props.tiny) return "py-1 px-3 text-xs"

    return "py-2 px-4 text-sm"
  })
}
