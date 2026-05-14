import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

const SearchLayout = () => {
  return (
    <Stack
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    />
  )
}

export default SearchLayout
