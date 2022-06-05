import { computed, type ComputedRef } from "vue"

interface Props {
  primary?: boolean
  warning?: boolean
  danger?: boolean
  success?: boolean
}

export function useColor(props: Props): ComputedRef<string> {
  return computed<string>(() => {
    if (props.primary) return "indigo"
    if (props.warning) return "yellow"
    if (props.danger) return "red"
    if (props.success) return "green"
    return ""
  })
}
