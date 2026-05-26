import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router, useLocalSearchParams } from 'expo-router'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  Platform,
  RefreshControl,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { ChevronLeft } from 'lucide-react-native'
import { format } from 'date-fns'

import Text from '@/components/text'
import api from '@/lib/api'
import { useBoundStore } from '@/state'
import { getMessages, sendMessage } from '@/services/chat'
import { getRequestById } from '@/services/requests'
import { Message } from '@/services/chat/chat.types'
import { COLORS } from '@/constants/theme'
import { ThemedView } from '@/components/themed-view'
import { showToastMessage } from '@/components/notification'
import { catchErr } from '@/utils/error-handlers'
import { getResolvedAvataUri } from '@/utils/resolver'
import { pusherService } from '@/lib/pusher'
import { generateId } from '@/utils/generator'
import { getUserById } from '@/services/profile'
import useRefresh from '@/hooks/use-pull-refresh'

export default function ChatScreen() {
  const { conversationId, requestId, receiverId } = useLocalSearchParams<{
    conversationId: string
    requestId: string
    receiverId: string
  }>()

  const { bottom } = useSafeAreaInsets()
  const flatListRef = useRef<FlatList>(null)

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const [keyboardOffset, setKeyboardOffset] = useState(0)
  const [receiver, setReceiver] = useState<User>()

  const currentUser = useBoundStore((state) => state.user)

  const { refreshing, onRefreshQuery } = useRefresh()

  useEffect(() => {
    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'

    const show = Keyboard.addListener(showEvent, (e) =>
      setKeyboardOffset(e.endCoordinates.height)
    )
    const hide = Keyboard.addListener(hideEvent, () => setKeyboardOffset(0))

    return () => {
      show.remove()
      hide.remove()
    }
  }, [])

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true)

      if (!conversationId) return

      const data = await getMessages(conversationId)
      setMessages(Array.isArray(data) ? data.reverse() : [])
    } finally {
      setLoading(false)
    }
  }, [conversationId])

  const getReceiver = useCallback(async () => {
    try {
      if (!receiverId) return

      const data = await getUserById(receiverId)

      setReceiver(data)
    } catch (error) {
      console.error(error)
    }
  }, [receiverId])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  useEffect(() => {
    getReceiver()
  }, [getReceiver])

  useEffect(() => {
    if (!conversationId) return

    const channel = `chat.${conversationId}`

    const subscribeChat = async () => {
      await pusherService.subscribe(channel, (data: Message) => {
        if (typeof data === 'string') return
        setMessages((prev) => [...prev, data])
      })
    }

    subscribeChat()

    return () => {
      pusherService.unsubscribe(channel)
    }
  }, [conversationId])

  const handleSend = async () => {
    if (!input.trim() || !conversationId) return

    try {
      setSending(true)

      await sendMessage(conversationId, input)

      setMessages((prevMessage) => [
        ...prevMessage,
        {
          id: generateId(),
          message: input,
          conversation_id: conversationId,
          sender_id: currentUser?.id ?? '',
        },
      ])
      setInput('')

      flatListRef.current?.scrollToEnd({ animated: true })
    } catch (error) {
      showToastMessage(
        catchErr(error).message ?? 'Failed to send a message',
        'error'
      )
    } finally {
      setSending(false)
    }
  }

  const lastSeen = receiver?.last_seen ? new Date(receiver.last_seen) : null

  const renderItem = ({ item }: { item: Message }) => {
    const isMe = item.sender_id == currentUser?.id

    return (
      <View
        style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}
      >
        <Text size={14} style={{ color: isMe ? COLORS.grey[800] : '#111' }}>
          {item.message}
        </Text>
      </View>
    )
  }

  return (
    <ThemedView hasTopPadding style={styles.container}>
      <View style={{ flex: 1, paddingBottom: keyboardOffset }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={24} color={COLORS.grey[800]} />
          </TouchableOpacity>
          <View style={styles.headerAvatar}>
            <Image
              source={{ uri: getResolvedAvataUri(receiver?.name ?? '') }}
              style={styles.avatar}
            />
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text size={16} weight={600} color="grey-800">
              {receiver?.name ?? 'Chat'}
            </Text>
            <Text size={12} color="grey-400">
              {lastSeen
                ? lastSeen?.getTime() === Date.now()
                  ? 'Online'
                  : format(lastSeen, 'hh:mm:ss')
                : 'Offline'}
            </Text>
          </View>
        </View>

        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator style={{ marginTop: 20 }} />
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 16 }}
            keyboardShouldPersistTaps="handled"
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => onRefreshQuery(fetchMessages)}
              />
            }
            showsVerticalScrollIndicator={false}
          />
        )}

        <View style={[styles.inputRow, { paddingBottom: bottom + 10 }]}>
          <TextInput
            placeholder="Message..."
            placeholderTextColor="#9ca3af"
            value={input}
            onChangeText={setInput}
            style={styles.textInput}
          />
          <TouchableOpacity
            disabled={sending || !input.trim()}
            onPress={handleSend}
            style={[
              styles.sendBtn,
              (sending || !input.trim()) && { opacity: 0.5 },
            ]}
          >
            {sending ? (
              <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
              <Ionicons name="send" color="#fff" size={18} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: COLORS.grey[50],
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#d1d5db',
    marginLeft: 12,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 9999,
  },
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 10,
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderColor: '#e5e7eb',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
  },
  sendBtn: {
    marginLeft: 10,
    backgroundColor: '#2563eb',
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
