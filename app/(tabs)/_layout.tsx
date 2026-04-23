import { Ionicons } from '@expo/vector-icons'
import { router, Tabs } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'

import { getToken } from '@/utils/secureStore'
import { COLORS } from '@/constants/theme'
import TabBar from '@/components/tab-bar'
import HelpIcon from '@/components/icons/help'
import ScheduleIcon from '@/components/icons/schedule'
import SearchIcon from '@/components/icons/search'
import AccountIcon from '@/components/icons/account'

const tabsIcons = (isFocused: boolean) => {
  const color = isFocused ? COLORS.primary[500] : COLORS.grey[200]

  return {
    home: <SearchIcon fill={color} width={24} height={24} />,
    requests: <HelpIcon fill={color} width={24} height={24} />,
    schedule: <ScheduleIcon fill={color} width={24} height={24} />,
    profile: <AccountIcon fill={color} width={24} height={24} />,
  }
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <TabBar icons={tabsIcons} {...props} />}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="requests"
        options={{
          title: 'Request',
        }}
      />
      <Tabs.Screen name="schedule" />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  )
}
