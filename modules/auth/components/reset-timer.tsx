import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

import Text from '@/components/text'
import { handleErrorInstances } from '@/utils/error-handlers'
import { showToastMessage } from '@/components/notification'

import { ResetTimerProps } from '../auth.types'

const ResetTimer = ({
  startTime,
  value,
  onUpdatePressed,
  onResend,
}: ResetTimerProps) => {
  const handleResend = async () => {
    onUpdatePressed?.(true)

    if (value) {
      try {
        const response = await onResend(value)

        // setTimer(startTime)
      } catch (error) {
        showToastMessage(handleErrorInstances(error), 'error')
      } finally {
        onUpdatePressed?.(false)
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text size={16} lineHeight={20} color="grey-400">
        Didn’t receive code?
      </Text>
      <Pressable
        onPress={handleResend}
        style={({ pressed }) => pressed && { opacity: 0.75 }}
      >
        <Text size={16} lineHeight={20} weight={600} color="grey-700">
          Resend
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  content: {},
  resendContent: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
})

export default ResetTimer
