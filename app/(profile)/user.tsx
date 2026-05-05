import { StyleSheet, Text, View } from 'react-native'

import { ThemedView } from '@/components/themed-view'
import ProfileHeader from '@/modules/profile/components/user-profile-header'
import Tile from '@/modules/profile/components/tile'
import { PROFILE_DATA } from '@/modules/profile/profile.data'
import AccountTransaction from '@/modules/profile/components/account-transaction'

const UserProfile = () => {
  return (
    <ThemedView>
      <ProfileHeader />
      <AccountTransaction />
      <View>
        {PROFILE_DATA.map((item) => (
          <Tile
            title={item.title}
            description={item.description}
            icon={item.icon}
            link={item.link}
          />
        ))}
      </View>
    </ThemedView>
  )
}

export default UserProfile
const styles = StyleSheet.create({})
