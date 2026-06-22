import { StyleSheet, View } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { Divider } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { LogOut } from 'lucide-react-native'

import { ThemedView } from '@/components/themed-view'
import ProfileHeader from '@/modules/profile/components/user-profile-header'
import Tile from '@/modules/profile/components/tile'
import { PROFILE_DATA } from '@/modules/profile/profile.data'
import AccountTransaction from '@/modules/profile/components/account-transaction'
import ScrollView from '@/components/scrollview'
import Button from '@/components/ui/button'
import { useBoundStore } from '@/state'
import AppStorage from '@/utils/storage'
import { STORE_KEYS } from '@/constants'
import { COLORS } from '@/constants/theme'
import { AuthenticatedAPI } from '@/services'
import { API_ENDPOINTS } from '@/constants/endpoints'
import { catchErr } from '@/utils/error-handlers'
import { showToastMessage } from '@/components/notification'
import { storePreference } from '@/modules/profile/profile.handlers'

const UserProfile = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false)

  const logout = useBoundStore((state) => state.logout)
  const userId = useBoundStore((state) => state.user?.id ?? '')
  const storage = useRef(new AppStorage()).current

  const router = useRouter()

  const handleLogout = () => {
    logout()
    storage.removeItem(STORE_KEYS.token)

    router.replace('/(auth)/login' as any)
  }

  useEffect(() => {
    if (!userId) return
    const preferenceKey = `${STORE_KEYS.preference}_${userId}`
    const storedPreference = storage.getItem<'string'>(preferenceKey)

    if (!storedPreference) return

    const preference = JSON.parse(storedPreference) as UserPreference

    setIsSwitchOn(!!preference['pushEnabled'])
  }, [userId])

  const handleNotification = async (value: boolean) => {
    let errMsg = ''

    try {
      await AuthenticatedAPI.patch(API_ENDPOINTS.profile.toggle_notification, {
        type: 'request_updates',
        enabled: value,
      })

      setIsSwitchOn(value)
      storePreference(storage, { key: 'pushEnabled', value }, userId)
    } catch (error) {
      errMsg = catchErr(error).message ?? 'Something went wrong'
    } finally {
      showToastMessage(
        errMsg ||
          (value
            ? "You've subscribed for push notifications"
            : "You've unsubscribed for push notification"),
        errMsg ? 'error' : 'success'
      )
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        <ProfileHeader />
        <AccountTransaction />
        <Divider style={styles.divider} />
        <View style={styles.tileWrapper}>
          {PROFILE_DATA.map((item, index) => (
            <Tile
              key={item.title + index}
              title={item.title}
              description={item.description}
              icon={item.icon}
              link={item.link}
              isEnabled={
                item.title === 'Notifications' ? isSwitchOn : undefined
              }
              onToggle={
                item.title === 'Notifications' ? handleNotification : undefined
              }
            />
          ))}
        </View>
        <Button
          label="Log out"
          icon={<LogOut size={24} color={COLORS.red[500]} />}
          alignIcon="right"
          labelColor="red-500"
          btnStyle={styles.logoutBtn}
          buttonColor="white"
          onPress={handleLogout}
        />
      </ScrollView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
  },
  scrollContent: {
    rowGap: 24,
  },
  divider: {
    backgroundColor: COLORS.grey[50],
    height: 1,
  },
  tileWrapper: {},
  logoutBtn: {
    borderWidth: 1,
    borderColor: '#CDCDCD',
  },
})

export default UserProfile
