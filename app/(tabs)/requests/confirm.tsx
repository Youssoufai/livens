import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Button from '@/components/ui/button'
import Text from '@/components/text'
import api from '@/lib/api'
import { useRequest } from '@/context/requestContext'
import { saveCurrentRequestId } from '@/utils/requestStorage'

interface ItemProps {
  label: string
  value: string
}

function Item({ label, value }: ItemProps) {
  return (
    <View style={styles.item}>
      <Text size={12} color="grey-400">
        {label}
      </Text>
      <Text size={15} weight={500} color="grey-800">
        {value}
      </Text>
    </View>
  )
}

interface SummaryRowProps {
  label: string
  value: string
  bold?: boolean
}

function SummaryRow({ label, value, bold }: SummaryRowProps) {
  return (
    <View style={styles.summaryRow}>
      <Text size={14} weight={bold ? 700 : 400} color="grey-800">
        {label}
      </Text>
      <Text size={14} weight={bold ? 700 : 400} color="grey-800">
        {value}
      </Text>
    </View>
  )
}

export default function ConfirmPublish() {
  const router = useRouter()
  const { request } = useRequest()
  const [loading, setLoading] = useState(false)

  const rewardNum = Number(request.reward)

  const handlePostRequest = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('location', request.location)
      formData.append('description', request.description)
      formData.append('duration', request.duration)
      formData.append('allow_comment', request.allow_comment)
      formData.append('reward', String(rewardNum))

      const { data } = await api.post('/create-request', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      if (data?.data?.id) {
        await saveCurrentRequestId(data.data.id)
      }

      router.push('/requests/success' as never)
    } catch {
      // error handled silently
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
          <Text size={22} weight={700} color="grey-800" style={styles.title}>
            Confirm & Publish
          </Text>

          <View style={styles.card}>
            <Text size={15} weight={600} color="grey-800" style={styles.sectionTitle}>
              Request summary
            </Text>
            <Item label="Location" value={request.location} />
            <Item label="Description" value={request.description} />
            <Item label="Duration" value={request.duration} />
            <Item
              label="Comments"
              value={request.allow_comment === '1' ? 'Allowed' : 'Not allowed'}
            />
            <Item label="Reward" value={`₦${rewardNum.toLocaleString()}`} />
          </View>

          <Text size={16} weight={600} color="grey-800" style={styles.sectionHeader}>
            Payment details
          </Text>

          <View style={styles.walletCard}>
            <View style={styles.walletLeft}>
              <View style={styles.walletIcon}>
                <Ionicons name="wallet-outline" size={20} color="#000" />
              </View>
              <View>
                <Text size={15} weight={600} color="grey-800">
                  Wallet (₦{rewardNum.toLocaleString()})
                </Text>
                <Text size={12} color="grey-400">
                  Default payment method
                </Text>
              </View>
            </View>
            <View style={styles.radioOuter}>
              <View style={styles.radioInner} />
            </View>
          </View>

          <View style={styles.card}>
            <Text size={15} weight={600} color="grey-800" style={styles.sectionTitle}>
              Deposit & Refund Policy
            </Text>
            <Text size={13} color="grey-500" style={{ lineHeight: 20 }}>
              Deposited funds remain secured until the request is completed or cancelled. Refunds
              will be processed according to our dispute and cancellation policies.
            </Text>
          </View>

          <View style={styles.card}>
            <Text size={15} weight={600} color="grey-800" style={styles.sectionTitle}>
              Payment summary
            </Text>
            <SummaryRow label="Reward amount" value={`₦${rewardNum.toLocaleString()}`} />
            <View style={styles.line} />
            <SummaryRow label="Total" value={`₦${rewardNum.toLocaleString()}`} bold />
          </View>
        </ScrollView>

        <View style={styles.bottom}>
          <Button
            label="Post Request"
            onPress={handlePostRequest}
            loading={loading}
            disabled={loading}
            btnStyle={{ borderRadius: 12 }}
            buttonColor="black"
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F6F7FB' },
  container: { padding: 20, paddingBottom: 140 },
  title: { marginBottom: 18 },
  sectionHeader: { marginBottom: 10, marginTop: 10 },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  sectionTitle: { marginBottom: 12 },
  item: { marginBottom: 12 },
  walletCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
    elevation: 3,
  },
  walletLeft: { flexDirection: 'row', alignItems: 'center' },
  walletIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#000' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  line: { height: 1, backgroundColor: '#EEE', marginVertical: 10 },
  bottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
})
