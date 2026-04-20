import { Stack } from 'expo-router'

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="create-account" />
      <Stack.Screen name="confirm-email" />
      <Stack.Screen name="location" />
      <Stack.Screen name="redirect" />
      <Stack.Screen name="success" />
    </Stack>
  )
}
