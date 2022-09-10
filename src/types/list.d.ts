export type ListItem = {
  value?: ListItemValue
  label: string
  disabled?: boolean
}

export type ListItemValue = string | boolean | number | undefined

export type ListEvents = {
  select: ListItem
}
