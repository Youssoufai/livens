import { Ionicons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Text from '@/components/text'
import api from '@/lib/api'
import { Request } from '@/models/auth'
import Overveiw from '@/components/Overveiw'
import { ResponderTab } from '@/components/respondersTab'
import StatusTab from '@/components/statusTab'

type TabName = 'overview' | 'responders' | 'status'

const TABS: { key: TabName; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'responders', label: 'Responders' },
  { key: 'status', label: 'Status' },
]

export default function RequestDetails() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [request, setRequest] = useState<Request | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<TabName>('overview')

  const fetchRequestDetails = async () => {
    try {
      const { data } = await api.get<{ data: Request[] }>(`/get-request/${id}`)
      setRequest(data?.data?.[0] || null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) fetchRequestDetails()
  }, [id])

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />
  }

  if (!request) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text size={15} color="grey-400">
          Request not found
        </Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text size={17} weight={600} color="grey-800" style={{ marginLeft: 12 }}>
          Request details
        </Text>
      </View>

      <View style={styles.tabs}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            onPress={() => setActiveTab(tab.key)}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}>
            <Text
              size={14}
              weight={activeTab === tab.key ? 600 : 400}
              color={activeTab === tab.key ? 'grey-800' : 'grey-400'}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {activeTab === 'overview' && <Overveiw data={request} />}
        {activeTab === 'responders' && (
          <ResponderTab responders={request.responders || []} requestId={id} />
        )}
        {activeTab === 'status' && (
          <StatusTab statusResponse={request.status} requestId={id} />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#eee' },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  tabActive: { borderBottomWidth: 2, borderBottomColor: '#111' },
})
