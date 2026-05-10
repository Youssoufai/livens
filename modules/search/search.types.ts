import { Href } from 'expo-router'
import { ReactElement } from 'react'

export type OptionType = {
  title: string
  description: string
  icon: () => ReactElement
  link?: Href
}

export type SearchFilterProps = {
  value: string
  onValueChange: (value?: string) => void
}
