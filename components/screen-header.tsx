import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { ReactNode } from 'react'
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import Text from './text'

interface ScreenHeaderProps {
  title?: string
  onBack?: () => void
  right?: ReactNode
  style?: ViewStyle
}

export default function ScreenHeader({ title, onBack, right, style }: ScreenHeaderProps) {
  const handleBack = onBack ?? (() => router.back())

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={handleBack} hitSlop={8}>
        <Ionicons name="chevron-back" size={24} color="#111827" />
      </TouchableOpacity>

      {title ? (
        <Text size={17} weight={600} color="grey-800" style={styles.title}>
          {title}
        </Text>
      ) : (
        <View style={styles.spacer} />
      )}

      <View style={styles.right}>{right ?? <View style={{ width: 24 }} />}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  spacer: {
    flex: 1,
  },
  right: {
    alignItems: 'flex-end',
  },
})
