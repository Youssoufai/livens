import { router, Tabs } from 'expo-router'
import { Platform, Pressable, StyleSheet } from 'react-native'
import { Ellipsis } from 'lucide-react-native'

import { getToken } from '@/utils/secureStore'
import { COLORS } from '@/constants/theme'
import TabBar from '@/components/tab-bar'
import HelpIcon from '@/components/icons/help'
import ScheduleIcon from '@/components/icons/schedule'
import SearchIcon from '@/components/icons/search'
import AccountIcon from '@/components/icons/account'
import { CustomHeader } from '@/components/custom-header'
import { actuateFontSize, actuateLineHeight } from '@/utils/normalize'
import { FONTS } from '@/constants/fonts'

const styles = StyleSheet.create({
  tabHeaderTitle: {
    fontFamily: FONTS.dm_sans[700],
    fontSize: actuateFontSize(28),
    lineHeight: actuateLineHeight(28, 32),
    color: COLORS.black,
    alignSelf: 'flex-start',
    textAlign: 'left',
    paddingLeft: 0,
  },
})

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
      detachInactiveScreens={Platform.OS === 'android' ? false : true}
      backBehavior="history"
      screenOptions={{
        headerShown: true,
      }}
      tabBar={(props) => <TabBar icons={tabsIcons} {...props} />}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="requests"
        options={{
          title: 'Request',
          header(props) {
            return (
              <CustomHeader
                title="Requests"
                titleStyle={styles.tabHeaderTitle}
                // moreInfo={
                //   <Pressable>
                //     <Ellipsis size={24} color="#1C1B1F" />
                //   </Pressable>
                // }
              />
            )
          },
        }}
      />
      <Tabs.Screen name="schedule" />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: true,
          header: () => (
            <CustomHeader title="Profile" titleStyle={styles.tabHeaderTitle} />
          ),
        }}
      />
    </Tabs>
  )
}
