import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

import { CustomHeader } from '@/components/custom-header'
import { COLORS } from '@/constants/theme'

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey[50],
  },
})

const SearchLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Post Details',
          header(props) {
            return (
              <CustomHeader
                title={props.options.title}
                containerStyle={styles.container}
                showBack
              />
            )
          },
        }}
        name="post-detail"
      />
    </Stack>
  )
}

export default SearchLayout
