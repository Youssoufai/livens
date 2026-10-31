import { StyleSheet, View } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { Divider } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { LogOut, UserRoundX } from 'lucide-react-native'

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
import { sessionToken } from '@/utils/session-token'
import CloseAccount from '@/modules/account/components/close-account'

const UserProfile = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false)
  const [isAutoLocationOn, setIsAutoLocationOn] = useState(false)
  const [isCloseAccountVisible, setIsCloseAccountVisible] = useState(false)

  const logout = useBoundStore((state) => state.logout)
  const user = useBoundStore((state) => state.user ?? null)

  const storage = useRef(new AppStorage()).current

  const router = useRouter()

  const handleLogout = () => {
    logout()
    sessionToken.clear()
    storage.removeItem(STORE_KEYS.token)

    router.replace('/(auth)/login' as any)
  }

  useEffect(() => {
    if (!user?.id) return
    const preferenceKey = `${STORE_KEYS.preference}_${user.id}`
    const storedPreference = storage.getItem<'string'>(preferenceKey)

    if (!storedPreference) return

    const preference = JSON.parse(storedPreference) as UserPreference

    setIsSwitchOn(!!preference['pushEnabled'])
    setIsAutoLocationOn(!!preference.autoLocation)
  }, [user?.id, user?.device_token])

  const handleNotification = async (value: boolean) => {
    let errMsg = ''

    try {
      if (!user?.id) return

      await AuthenticatedAPI.patch(API_ENDPOINTS.profile.toggle_notification, {
        enabled: value ? 1 : 0,
      })

      setIsSwitchOn(value)
      storePreference(storage, { key: 'pushEnabled', value }, user?.id)
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

  const handleLocationAutoUpdate = async (value: boolean) => {
    try {
      if (!user?.id) return

      storePreference(storage, { key: 'autoLocation', value }, user?.id)
      setIsAutoLocationOn(value)
    } catch (error) {}
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
                item.title === 'Notifications'
                  ? isSwitchOn
                  : item.title === 'Auto-update location'
                    ? isAutoLocationOn
                    : undefined
              }
              onToggle={
                item.title === 'Notifications'
                  ? handleNotification
                  : item.title === 'Auto-update location'
                    ? handleLocationAutoUpdate
                    : undefined
              }
            />
          ))}
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            label="Log out"
            icon={<LogOut size={24} color={COLORS.red[500]} />}
            alignIcon="right"
            labelColor="red-500"
            btnStyle={styles.logoutBtn}
            buttonColor="white"
            onPress={handleLogout}
          />
          <Button
            label="Close Account"
            icon={<UserRoundX size={24} color={COLORS.white} />}
            alignIcon="right"
            labelColor="white"
            buttonColor="red-500"
            onPress={() => setIsCloseAccountVisible(true)}
          />
        </View>
      </ScrollView>
      <CloseAccount
        visible={isCloseAccountVisible}
        onClose={() => setIsCloseAccountVisible(false)}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
  },
  scrollContent: {
    rowGap: 24,
    paddingBottom: 16,
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
  buttonWrapper: {
    rowGap: 24,
  },
})

export default UserProfile
