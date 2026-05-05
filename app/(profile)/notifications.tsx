import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Switch, View } from 'react-native'

import Text from '@/components/text'
import api from '@/lib/api'
import { initDeviceToken } from '@/utils/deviceToken'
import { getToken } from '@/utils/secureStore'

interface NotificationState {
  pushRequest: boolean
  pushEarnings: boolean
  pushOffers: boolean
  emailRequest: boolean
  emailEarnings: boolean
  emailOffers: boolean
}

export default function NotificationSettings() {
  const [loading, setLoading] = useState(false)
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
    }, []),
  )

  const saveSettings = async (updated: NotificationState) => {
    setLoading(true)
    try {
      await initDeviceToken()
      const deviceToken = await getToken('device_token')
      await api.post('/device-token', {
        device_token: deviceToken,
        push_request: updated.pushRequest,
        push_earnings: updated.pushEarnings,
        push_offers: updated.pushOffers,
        email_request: updated.emailRequest,
        email_earnings: updated.emailEarnings,
        email_offers: updated.emailOffers,
      })
    } catch {
      Alert.alert('Error', 'Failed to save settings.')
    } finally {
      setLoading(false)
    }
  }

  const toggle = (key: keyof NotificationState) => (value: boolean) => {
    const updated = { ...settings, [key]: value }
    setSettings(updated)
    saveSettings(updated)
  }

  const NotifRow = ({ label, settingKey }: { label: string; settingKey: keyof NotificationState }) => (
    <View style={styles.row}>
      <Text size={16} color="grey-800">
        {label}
      </Text>
      <Switch value={settings[settingKey]} onValueChange={toggle(settingKey)} />
    </View>
  )

  return (
    <ScrollView style={styles.container}>
      <Text size={22} weight={700} color="grey-800" style={styles.title}>
        Notification Settings
      </Text>

      {loading && <ActivityIndicator size="large" style={{ marginVertical: 10 }} />}

      <View style={styles.section}>
        <Text size={18} weight={600} color="grey-800" style={styles.sectionTitle}>
          Push Notifications
        </Text>
        <NotifRow label="Requests" settingKey="pushRequest" />
        <NotifRow label="Earnings" settingKey="pushEarnings" />
        <NotifRow label="Offers" settingKey="pushOffers" />
      </View>

      <View style={styles.section}>
        <Text size={18} weight={600} color="grey-800" style={styles.sectionTitle}>
          Email Notifications
        </Text>
        <NotifRow label="Requests" settingKey="emailRequest" />
        <NotifRow label="Earnings" settingKey="emailEarnings" />
        <NotifRow label="Offers" settingKey="emailOffers" />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 18, backgroundColor: '#fff' },
  title: { marginBottom: 15 },
  section: { marginBottom: 25, padding: 15, backgroundColor: '#f6f6f6', borderRadius: 10 },
  sectionTitle: { marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 },
})
