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
import { ChatBubble, OptimisticMessage } from '@/modules/request/components/chat-bubble'
import { ThemedView } from '@/components/themed-view'
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

  const [messages, setMessages] = useState<OptimisticMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
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

  const fetchMessages = useCallback(async (silent = false) => {
    try {
      if (!silent) setLoading(true)

      if (!conversationId) return

      const data = await getMessages(conversationId)
      setMessages(Array.isArray(data) ? data.reverse() : [])
    } finally {
      if (!silent) setLoading(false)
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
        setMessages((prev) => {
          const optimisticIdx = prev.findIndex(
            (m) =>
              m.status === 'pending' &&
              m.sender_id === data.sender_id &&
              m.message === data.message
          )
          if (optimisticIdx !== -1) {
            const updated = [...prev]
            updated[optimisticIdx] = data
            return updated
          }
          return [...prev, data]
        })
      })
    }

    subscribeChat()

    return () => {
      pusherService.unsubscribe(channel)
    }
  }, [conversationId])

  const handleSend = async () => {
    if (!input.trim() || !conversationId) return

    const tempId = generateId()
    const text = input.trim()

    setMessages((prev) => [
      ...prev,
      {
        id: tempId,
        message: text,
        conversation_id: conversationId,
        sender_id: currentUser?.id ?? '',
        status: 'pending' as const,
      },
    ])
    setInput('')
    flatListRef.current?.scrollToEnd({ animated: true })

    try {
      await sendMessage(conversationId, text)
      setMessages((prev) =>
        prev.map((m) =>
          m.id === tempId ? { ...m, status: 'sent' as const } : m
        )
      )
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === tempId ? { ...m, status: 'failed' as const } : m
        )
      )
    }
  }

  const handleResend = async (msg: OptimisticMessage) => {
    if (!conversationId) return

    setMessages((prev) =>
      prev.map((m) =>
        m.id === msg.id ? { ...m, status: 'pending' as const } : m
      )
    )

    try {
      await sendMessage(conversationId, msg.message)
      setMessages((prev) =>
        prev.map((m) =>
          m.id === msg.id ? { ...m, status: 'sent' as const } : m
        )
      )
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === msg.id ? { ...m, status: 'failed' as const } : m
        )
      )
    }
  }

  const lastSeen = receiver?.last_seen ? new Date(receiver.last_seen) : null

  const renderItem = ({ item }: { item: OptimisticMessage }) => (
    <ChatBubble
      {...item}
      isMe={item.sender_id == currentUser?.id}
      onRetry={() => handleResend(item)}
    />
  )

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
                onRefresh={() => onRefreshQuery(() => fetchMessages(true))}
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
            disabled={!input.trim()}
            onPress={handleSend}
            style={[styles.sendBtn, !input.trim() && { opacity: 0.5 }]}
          >
            <Ionicons name="send" color="#fff" size={18} />
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
