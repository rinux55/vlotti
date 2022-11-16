import type { ListItem } from "./list"

export interface SizeProps {
  tiny?: boolean
  small?: boolean
  large?: boolean
}

export interface ColorProps {
  primary?: boolean
  warning?: boolean
  danger?: boolean
  success?: boolean
}

export interface DisabledProps {
  disabled?: boolean
}

export interface ListProps {
  items: Array<ListItem>
}
