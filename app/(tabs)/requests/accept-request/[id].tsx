import { Ionicons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Button from '@/components/ui/button'
import ScreenHeader from '@/components/screen-header'
import Text from '@/components/text'
import api from '@/lib/api'
import { Request } from '@/models/auth'
import { styles } from '@/styles/OffertoHelp'

interface InfoRowProps {
  icon: React.ComponentProps<typeof Ionicons>['name']
  text?: string
}

const InfoRow = ({ icon, text }: InfoRowProps) => (
  <View style={styles.infoRow}>
    <Ionicons name={icon} size={18} color="#666" />
    <Text size={14} color="grey-500" style={styles.infoText}>
      {text || '—'}
    </Text>
  </View>
)

export default function AcceptRequestScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const requestId = Array.isArray(id) ? id[0] : id

  const [loading, setLoading] = useState(true)
  const [offering, setOffering] = useState(false)
  const [data, setData] = useState<Request | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (requestId) fetchRequestDetails()
  }, [requestId])

  const fetchRequestDetails = async () => {
    try {
      const res = await api.get<{ data: Request | Request[] }>(`/get-request/${requestId}`)
      const requestData = Array.isArray(res.data?.data) ? res.data.data[0] : res.data?.data
      setData(requestData || null)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const offerToHelp = async () => {
    try {
      setOffering(true)
      await api.post('/temp-response', { request_id: requestId })
      router.push({
        pathname: '/requests/captureContent' as never,
        params: { request_id: String(requestId) },
      })
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } }
      const message = e?.response?.data?.message || 'Something went wrong'
      alert(message)
    } finally {
      setOffering(false)
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={localStyles.centered}>
        <ActivityIndicator size="large" color="#ff3b30" />
      </SafeAreaView>
    )
  }

  if (error || !data) {
    return (
      <SafeAreaView style={localStyles.centered}>
        <Text size={15} color="grey-400">
          Failed to load request.
        </Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader title="Request Details" />

        <Text size={28} weight={700} color="primary-300" style={{ marginVertical: 12 }}>
          ₦{data.reward}
        </Text>

        <View style={styles.card}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: data.user?.profile_photo || 'https://ui-avatars.com/api/?name=User' }}
              style={styles.avatar}
            />
            <Text size={15} weight={600} color="grey-800">
              {data.user?.name || 'Unknown User'}
            </Text>
          </View>
          <InfoRow icon="location-outline" text={data.location} />
          <InfoRow icon="time-outline" text={`Duration: ${data.duration}`} />
        </View>

        <View style={styles.descriptionSection}>
          <Text size={16} weight={600} color="grey-800" style={styles.sectionTitle}>
            Description
          </Text>
          <Text size={14} color="grey-500" style={styles.descriptionText}>
            {data.description}
          </Text>
        </View>

        <Button
          label="Offer to help"
          onPress={offerToHelp}
          loading={offering}
          disabled={offering}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const localStyles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})
