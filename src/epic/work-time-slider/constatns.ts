export interface IProps {
  ariaLabel: string
  value: number
  defaultValue?: number
  onChange?: (event: Event, value: number) => void
}
