import { Href } from 'expo-router'
import { ReactElement } from 'react'

export type OptionType = {
  title: string
  description: string
  icon: () => ReactElement
  link?: Href
}
