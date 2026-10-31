import { StyleSheet, View } from 'react-native'
import React from 'react'

import Text from '@/components/text'
import { COLORS } from '@/constants/theme'

import { PostActionRowProps } from '../search.types'

const PostActionRow = ({ icon, value }: PostActionRowProps) => {
  const Icon = icon
  return (
    <View style={styles.container}>
      <Icon size={20} color={COLORS.grey[600]} />
      <Text size={12} lineHeight={16} weight={600} color="grey-400">
        {value}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    columnGap: 6,
    alignItems: 'center',
  },
})

export default PostActionRow
