import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native'

import Text from '@/components/text'
import { COLORS } from '@/constants/theme'
import { Message } from '@/services/chat/chat.types'

export type OptimisticMessage = Message & { status?: 'pending' | 'sent' | 'failed' }

type Props = {
  message: string
  status?: OptimisticMessage['status']
  isMe: boolean
  onRetry: () => void
}

export function ChatBubble({ message, status, isMe, onRetry }: Props) {
  return (
    <View style={isMe ? { alignItems: 'flex-end' } : { alignItems: 'flex-start' }}>
      <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
        <Text size={14} style={{ color: isMe ? COLORS.grey[800] : '#111' }}>
          {message}
        </Text>
      </View>
      {isMe && status === 'pending' && (
        <ActivityIndicator
          size="small"
          color={COLORS.grey[400]}
          style={{ marginTop: 2, marginRight: 4 }}
        />
      )}
      {isMe && status === 'failed' && (
        <TouchableOpacity
          onPress={onRetry}
          style={{ marginTop: 2, marginRight: 4 }}
        >
          <Text size={11} style={{ color: '#ef4444' }}>
            Failed · Tap to retry
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  bubble: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
    marginVertical: 6,
    maxWidth: '75%',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  bubbleMe: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.blue[50],
    borderBottomRightRadius: 4,
  },
  bubbleOther: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.grey[50],
    borderBottomLeftRadius: 4,
  },
})
