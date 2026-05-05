import { StyleSheet, View } from 'react-native'
import { isValidElement } from 'react'

import Text from '@/components/text'

const ProfileHeader = ({ title, description }: HeaderType) => {
  return (
    <View style={styles.container}>
      <Text size={28} lineHeight={32} weight={700} color="black">
        {title}
      </Text>
      {!description ? null : isValidElement(description) ? (
        description
      ) : (
        <Text size={16} lineHeight={24} color="grey-400">
          {description}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    rowGap: 10,
  },
})

export default ProfileHeader
