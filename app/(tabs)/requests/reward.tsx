import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Button from '@/components/ui/button'
import Text from '@/components/text'
import { useRequest } from '@/context/requestContext'

interface RewardOption {
  id: string
  amount: string
  label: string
}

const REWARDS: RewardOption[] = [
  { id: '1000', amount: '₦1,000', label: 'Popular for simple tasks' },
  { id: '2500', amount: '₦2,500', label: 'Attracts fast responses' },
  { id: 'custom', amount: 'Custom', label: 'Set your own price' },
]

export default function RewardScreen() {
  const router = useRouter()
  const { request, updateRequest } = useRequest()

  const [selectedReward, setSelectedReward] = useState<string | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [noReward, setNoReward] = useState(false)

  useEffect(() => {
    if (!request) return
    if (request.reward === 0) {
      setNoReward(true)
    } else if (request.reward) {
      setSelectedReward(String(request.reward))
    }
  }, [request])

  const handleNext = () => {
    if (noReward) {
      updateRequest({ ...request, reward: 0 })
      router.push('/requests/confirm' as never)
      return
    }
    if (!selectedReward) {
      alert('Please select a reward or choose no reward.')
      return
    }
    if (selectedReward === 'custom') {
      const amount = Number(customAmount)
      if (!amount || amount < 500) {
        alert('Minimum custom reward is ₦500')
        return
      }
      updateRequest({ ...request, reward: amount })
    } else {
      updateRequest({ ...request, reward: Number(selectedReward) })
    }
    router.push('/requests/confirm' as never)
  }

  const canProceed = noReward || (selectedReward !== null && (selectedReward !== 'custom' || Number(customAmount) >= 500))

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text size={13} color="grey-400" style={styles.stepText}>
          Step 3 of 4
        </Text>
        <Text size={20} weight={700} color="grey-800" style={styles.title}>
          Add reward
        </Text>

        {REWARDS.map((r) => {
          const isSelected = selectedReward === r.id
          return (
            <TouchableOpacity
              key={r.id}
              style={[styles.rewardCard, isSelected && styles.rewardCardSelected]}
              onPress={() => {
                setSelectedReward(r.id)
                setNoReward(false)
              }}>
              <View style={styles.cardRow}>
                <View>
                  <Text size={18} weight={600} color="grey-800">
                    {r.amount}
                  </Text>
                  <Text size={13} color="grey-400">
                    {r.label}
                  </Text>
                </View>
                <View style={[styles.radioOuter, isSelected && styles.radioOuterActive]}>
                  {isSelected && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>
          )
        })}

        {selectedReward === 'custom' && (
          <View style={{ marginBottom: 20 }}>
            <Text size={14} weight={500} color="grey-800" style={{ marginBottom: 6 }}>
              Enter amount
            </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="2000"
              value={customAmount}
              onChangeText={setCustomAmount}
            />
          </View>
        )}

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => {
            setNoReward(!noReward)
            setSelectedReward(null)
            setCustomAmount('')
          }}>
          <View style={[styles.checkbox, noReward && styles.checkboxChecked]} />
          <Text size={14} color="grey-800">
            Post without reward
          </Text>
        </TouchableOpacity>

        <Button
          label="Next"
          onPress={handleNext}
          disabled={!canProceed}
          btnStyle={{ marginTop: 8 }}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 60 },
  backButton: { marginBottom: 10 },
  stepText: { marginBottom: 4 },
  title: { marginBottom: 20 },
  rewardCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 16,
    marginBottom: 14,
  },
  rewardCardSelected: { borderColor: '#E60023', backgroundColor: '#FFF5F5' },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between' },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#aaa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterActive: { borderColor: '#E60023' },
  radioInner: { width: 12, height: 12, backgroundColor: '#E60023', borderRadius: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  checkbox: { width: 20, height: 20, borderWidth: 2, borderColor: '#999', borderRadius: 4, marginRight: 10 },
  checkboxChecked: { backgroundColor: '#E60023', borderColor: '#E60023' },
})
