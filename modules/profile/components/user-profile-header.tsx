import { Image, StyleSheet, View } from 'react-native'
import { ChevronRight } from 'lucide-react-native'
import { Link } from 'expo-router'

import { COLORS } from '@/constants/theme'
import { useBoundStore } from '@/state'
import Text from '@/components/text'

const profileAvatar = require('@/assets/images/profile-avatar.png')

const UserProfileHeader = () => {
  const user = useBoundStore((state) => state.user)

  return (
    <View style={styles.container}>
      <Image source={profileAvatar} style={styles.image} />
      <View style={styles.nameWrapper}>
        <Text size={16} lineHeight={20} weight={600} color="grey-700">
          {user?.name}
        </Text>
        <Text size={16} lineHeight={24} color="grey-300">
          Edit profile
        </Text>
      </View>
      <Link href="/(profile)/edit">
        <ChevronRight size={24} color={COLORS.grey[200]} />
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 9999,
  },
  nameWrapper: {
    flex: 1,
  },
  link: {
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
})

export default UserProfileHeader
