import { computed, type ComputedRef } from "vue"

interface Props {
  large?: boolean
  small?: boolean
  tiny?: boolean
}

export function useSize(props: Props): ComputedRef<string> {
  return computed((): string => {
    if (props.large) return "large"
    if (props.small) return "small"
    if (props.tiny) return "tiny"

    return ""
  })
}
