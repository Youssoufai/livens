import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import { router } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { useCallback, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Text from '@/components/text'
import api from '@/lib/api'
import { styles } from '@/styles/profile'

const IMAGE_BASE_URL = 'https://livelenns.online/public/images'

interface ProfileOptionProps {
  icon: React.ComponentProps<typeof Ionicons>['name']
  label: string
  desc: string
  onPress?: () => void
}

const ProfileOption = ({ icon, label, desc, onPress }: ProfileOptionProps) => (
  <TouchableOpacity style={styles.optionRow} onPress={onPress}>
    <Ionicons name={icon} size={22} color="#000" style={{ marginRight: 12 }} />
    <View style={{ flex: 1 }}>
      <Text size={15} weight={600} color="grey-800">
        {label}
      </Text>
      <Text size={13} color="grey-400" style={{ marginTop: 2 }}>
        {desc}
      </Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color="#999" />
  </TouchableOpacity>
)

export default function Profile() {
  const [profile, setProfile] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useFocusEffect(
    useCallback(() => {
      const fetchProfile = async () => {
        setLoading(true)
        try {
          const { data } = await api.get<{ data: User }>('/profile')
          if (data?.data) setProfile(data.data)
        } catch {
          // silently fail — profile stays null
        } finally {
          setLoading(false)
        }
      }
      fetchProfile()
    }, [])
  )

  const logout = async () => {
    try {
      await api.get('/logout')
      await SecureStore.deleteItemAsync('token')
      router.replace('/(auth)/login' as never)
    } catch {
      Alert.alert('Error', 'Something went wrong during logout.')
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#007AFF"
          style={{ marginTop: 100 }}
        />
      </SafeAreaView>
    )
  }

  if (!profile) {
    return (
      <SafeAreaView style={styles.container}>
        <Text
          size={15}
          color="grey-500"
          align="center"
          style={{ marginTop: 100 }}
        >
          No profile data found
        </Text>
      </SafeAreaView>
    )
  }

  const displayImage = `${IMAGE_BASE_URL}/${profile.profile_photo || 'default.jpg'}`

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text size={22} weight={700} color="grey-800" style={styles.header}>
          Profile
        </Text>

        <TouchableOpacity
          style={styles.profileRow}
          onPress={() => router.push('/profile/edit' as never)}
        >
          <View style={styles.avatarContainer}>
            <Image source={{ uri: displayImage }} style={styles.avatar} />
          </View>
          <View>
            <Text size={16} weight={600} color="grey-800">
              {profile.name || 'No Name'}
            </Text>
            <Text size={13} color="grey-400">
              {profile.email || 'No Email'}
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color="#999"
            style={{ marginLeft: 'auto' }}
          />
        </TouchableOpacity>

        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text size={14} color="grey-500">
              Balance:
            </Text>
            <TouchableOpacity>
              <Text size={13} color="primary-300">
                Transaction history
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            size={28}
            weight={700}
            color="grey-800"
            style={styles.balanceAmount}
          >
            ₦{profile.balance || '0.00'}
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.withdrawButton}
              onPress={() => router.push('/profile/withdraw' as never)}
            >
              <Text size={14} weight={600} color="grey-800">
                Withdraw
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.fundButton}
              onPress={() => router.push('/profile/fundWallet' as never)}
            >
              <Text size={14} weight={600} style={{ color: '#fff' }}>
                Fund wallet
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <ProfileOption
            icon="lock-closed-outline"
            label="Password & security"
            desc="Update your password and manage account security."
          />
          <ProfileOption
            icon="notifications-outline"
            label="Notifications"
            desc="Control alerts for live updates and requests."
            onPress={() => router.push('/profile/notifications' as never)}
          />
          <ProfileOption
            icon="location-outline"
            label="Location & privacy"
            desc="Control your location settings."
            onPress={() => router.push('/location' as never)}
          />
          <ProfileOption
            icon="help-circle-outline"
            label="Help & Support"
            desc="Get answers or contact support."
          />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text size={15} weight={600} color="danger">
            Log out
          </Text>
          <Ionicons
            name="log-out-outline"
            size={18}
            color="#f00"
            style={{ marginLeft: 6 }}
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}
