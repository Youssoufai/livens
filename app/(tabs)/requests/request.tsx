import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { router } from 'expo-router'
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
import { styles } from '@/styles/requestTabStyle'

const Tab = createMaterialTopTabNavigator()

function AvailableRequests() {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [userLoaded, setUserLoaded] = useState(false)

  const loadCurrentUser = async () => {
    try {
      const userId = await AsyncStorage.getItem('user_id')
      if (userId) setCurrentUserId(String(userId))
    } finally {
      setUserLoaded(true)
    }
  }

  const fetchRequests = async () => {
    try {
      const { data } = await api.get<{ data: Request[] }>('/all-requests')
      setRequests(data?.data || [])
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCurrentUser()
    fetchRequests()
  }, [])

  if (loading || !userLoaded) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {requests.map((req) => {
        const isOwner = String(currentUserId) === String(req.user_id)
        return (
          <View key={req.id} style={styles.card}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (!req?.id) return
                if (isOwner) {
                  router.push(`/requests/requestDetails/${req.id}` as never)
                } else {
                  router.push({
                    pathname: `/requests/accept-request/${req.id}` as never,
                    params: { request_id: String(req.id) },
                  })
                }
              }}>
              <View style={styles.userRow}>
                <View style={styles.avatar} />
                <View>
                  <Text size={15} weight={600} color="grey-800">
                    {req.user?.name || 'Unknown User'}
                  </Text>
                  <Text size={13} color="grey-400">
                    {req.location || 'Unknown location'}
                  </Text>
                </View>
              </View>
              <Text size={14} color="grey-800" style={styles.description}>
                {req.description}
              </Text>
              <Text size={13} color="grey-400" style={styles.locationText}>
                Request location:{' '}
                <Text size={13} color="primary-300">
                  {req.location}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        )
      })}
    </ScrollView>
  )
}

function PostedRequests() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <Text size={13} color="grey-400" style={styles.sectionHeaderText}>
            Waiting for responses
          </Text>
        </View>
        <View style={styles.lightCard}>
          <Text size={15} weight={600} color="grey-800" style={styles.cardTitle}>
            The Nosta Café
          </Text>
          <Text size={13} color="grey-400" style={styles.cardDescription}>
            I want to see what the cinema currently looks like. Also ask for the price of movie
            tickets, and…
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/requests/index2' as never)}>
        <Ionicons name="add" size={26} color="#fff" />
      </TouchableOpacity>
    </View>
  )
}

function SentOffers() {
  return (
    <View style={styles.emptyContainer}>
      <Ionicons name="paper-plane-outline" size={40} color="#ccc" />
      <Text size={16} weight={600} color="grey-400" style={styles.emptyTitle}>
        No offers sent
      </Text>
      <Text size={14} color="grey-400" style={styles.emptyText}>
        When you send an offer, it will appear here.
      </Text>
    </View>
  )
}

export default function RequestsTabs() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <Text size={22} weight={700} color="grey-800" style={styles.headerTitle}>
          Requests
        </Text>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: '#000' },
          tabBarLabelStyle: { fontWeight: '600', textTransform: 'none', fontSize: 14 },
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#999',
          tabBarStyle: { backgroundColor: '#fff', elevation: 0, borderBottomWidth: 1, borderBottomColor: '#eee' },
        }}>
        <Tab.Screen name="Available" component={AvailableRequests} />
        <Tab.Screen name="Posted" component={PostedRequests} />
        <Tab.Screen name="Sent offers" component={SentOffers} />
      </Tab.Navigator>
    </SafeAreaView>
  )
}
