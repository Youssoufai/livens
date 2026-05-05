import { Href } from 'expo-router'
import { FC, FunctionComponent } from 'react'
import { SvgProps } from 'react-native-svg'

export interface TileProps {
  type?: string
  isEnabled?: boolean
  title: string
  description?: string
  textColor?: string
  actionValue?: string
  icon: FunctionComponent<SvgProps>
  link?: Href
  hasBorder?: boolean
  onPress?: VoidFunction
}

export type ProfileDataType = {
  title: string
  description: string
  icon: FC<SvgProps>
  link?: Href
}
