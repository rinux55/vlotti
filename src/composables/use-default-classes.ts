import { computed, type ComputedRef } from "vue"

type ColorClass =
  | "v-primary"
  | "v-warning"
  | "v-danger"
  | "v-success"
  | "v-default"
type DisabledClass = "v-disabled" | false
type SizeClass = "v-tiny" | "v-small" | "v-default" | "v-large" | "v-huge"
type Props = {
  primary?: boolean
  warning?: boolean
  danger?: boolean
  success?: boolean
  tiny?: boolean
  small?: boolean
  large?: boolean
  disabled?: boolean
}

export function useDefaultClasses(props: Props): {
  colorClass: ComputedRef<ColorClass>
  disabledClass: ComputedRef<DisabledClass>
  sizeClass: ComputedRef<SizeClass>
} {
  return {
    colorClass: computed(() => getColorClass(props)),
    sizeClass: computed(() => getSizeClass(props)),
    disabledClass: computed(() => getDisabledClass(props)),
  }
}

function getColorClass(props: Props): ColorClass {
  return (
    (getClassFromMap(props, {
      primary: "v-primary",
      warning: "v-warning",
      danger: "v-danger",
      success: "v-success",
    }) as ColorClass) || "v-default"
  )
}

function getSizeClass(props: Props): SizeClass {
  return getClassFromMap(props, {
    tiny: "v-tiny",
    small: "v-small",
    large: "v-large",
    huge: "v-huge",
  }) as SizeClass
}

function getDisabledClass(props: Props): DisabledClass {
  return getClassFromMap(props, {
    disabled: "v-disabled",
  }) as DisabledClass
}

function getClassFromMap(
  props: Props,
  map: Record<string, string>
): string | false {
  // return Object.entries(map).find((key, value) => props[])

  let value: string | false = false

  Object.keys(map).forEach((key) => {
    if (props[key as keyof Props]) {
      value = map[key]
    }
  })

  return value
}
