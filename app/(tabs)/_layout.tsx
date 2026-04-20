import { Ionicons } from '@expo/vector-icons'
import { router, Tabs } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'

import { getToken } from '@/utils/secureStore'

export default function TabsLayout() {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken('token')
      if (!token || String(token).length === 0) {
        router.replace('/(auth)/login' as never)
      } else {
        setAuthenticated(true)
      }
      setLoading(false)
    }
    checkAuth()
  }, [])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#de1c1c" />
      </View>
    )
  }

  if (!authenticated) return null

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'red',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0.5,
          borderTopColor: '#ddd',
          height: 70,
          paddingBottom: 12,
          marginBottom: 4,
        },
      }}>
      <Tabs.Screen
        name="search"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="requests"
        options={{
          title: 'Request',
          tabBarIcon: ({ color, size }) => <Ionicons name="chatbubbles" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />
    </Tabs>
  )
}
