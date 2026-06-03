import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native'

import Text from '@/components/text'
import Switch from '@/components/ui/switch'
import { showToastMessage } from '@/components/notification'
import { AuthenticatedAPI } from '@/services'
import { COLORS } from '@/constants/theme'
import { initDeviceToken } from '@/utils/deviceToken'
import { getToken } from '@/utils/secureStore'
import { NotificationState } from '@/modules/profile/profile.types'
import NotifRow from '@/modules/profile/components/noft-row'

export default function NotificationSettings() {
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState<NotificationState>({
    pushRequest: false,
    pushEarnings: false,
    pushOffers: false,
    emailRequest: false,
    emailEarnings: false,
    emailOffers: false,
  })

  useFocusEffect(
    useCallback(() => {
      initDeviceToken()
    }, [])
  )

  const saveSettings = async (updated: NotificationState) => {
    setSaving(true)
    try {
      await initDeviceToken()
      const deviceToken = await getToken('device_token')
      await AuthenticatedAPI.post('/device-token', {
        device_token: deviceToken,
        push_request: updated.pushRequest,
        push_earnings: updated.pushEarnings,
        push_offers: updated.pushOffers,
        email_request: updated.emailRequest,
        email_earnings: updated.emailEarnings,
        email_offers: updated.emailOffers,
      })
    } catch {
      showToastMessage('Failed to save notification settings', 'error')
    } finally {
      setSaving(false)
    }
  }

  const toggle = (key: keyof NotificationState) => (value: boolean) => {
    const updated = { ...settings, [key]: value }
    setSettings(updated)
    saveSettings(updated)
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {saving && (
        <ActivityIndicator
          size="small"
          color={COLORS.primary[500]}
          style={styles.loader}
        />
      )}

      <View style={styles.section}>
        <Text
          size={16}
          lineHeight={20}
          weight={600}
          color="grey-800"
          style={styles.sectionLabel}
        >
          Push Notifications
        </Text>
        <NotifRow
          label="Request updates"
          description="Receive alerts for new requests or status changes."
          value={settings.pushRequest}
          onToggle={toggle('pushRequest')}
        />
        <NotifRow
          label="Earnings and transactions"
          description="Be notified instantly when you receive earnings or withdraw money."
          value={settings.pushEarnings}
          onToggle={toggle('pushEarnings')}
        />
        <NotifRow
          label="Promotions and offers"
          description="Receive alerts about new features and special deals."
          value={settings.pushOffers}
          onToggle={toggle('pushOffers')}
        />
      </View>

      <View style={styles.section}>
        <Text
          size={14}
          lineHeight={20}
          weight={600}
          color="grey-400"
          style={styles.sectionLabel}
        >
          Email Notifications
        </Text>
        <NotifRow
          label="Request updates"
          description="Receive alerts for new requests or status changes."
          value={settings.emailRequest}
          onToggle={toggle('emailRequest')}
        />
        <NotifRow
          label="Earnings and transactions"
          description="Be notified instantly when you receive earnings or withdraw money."
          value={settings.emailEarnings}
          onToggle={toggle('emailEarnings')}
        />
        <NotifRow
          label="Promotions and offers"
          description="Receive alerts about new features and special deals."
          value={settings.emailOffers}
          onToggle={toggle('emailOffers')}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    rowGap: 32,
  },
  loader: {
    alignSelf: 'flex-end',
    marginBottom: 4,
  },
  section: {
    rowGap: 0,
  },
  sectionLabel: {
    marginBottom: 8,
    textTransform: 'capitalize',
    letterSpacing: 0.5,
  },
})
