import { Stack } from 'expo-router'

import { CustomHeader } from '@/components/custom-header'
import { useAuthGuard } from '@/hooks/use-auth-guard'

const RequestLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="create-request"
        options={{ headerShown: true, header: () => <CustomHeader showBack /> }}
      />
    </Stack>
  )
}

export default RequestLayout
