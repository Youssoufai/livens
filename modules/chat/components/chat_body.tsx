import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

import useRefresh from '@/hooks/use-pull-refresh'
import { pusherService } from '@/lib/pusher'
import { Message } from '@/services/chat/chat.types'
import {
  ChatBubble,
  OptimisticMessage,
} from '@/modules/request/components/chat-bubble'
import { useBoundStore } from '@/state'
import { getMessages, sendMessage } from '@/services/chat'
import { generateId } from '@/utils/generator'

import { ChatBodyProps } from '../chat.types'

const ChatBody = ({ conversationId }: ChatBodyProps) => {
  const { bottom } = useSafeAreaInsets()
  const flatListRef = useRef<FlatList>(null)

  const [messages, setMessages] = useState<OptimisticMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const { refreshing, onRefreshQuery } = useRefresh()

  const currentUser = useBoundStore((state) => state.user)

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

  const fetchMessages = useCallback(
    async (silent = false) => {
      try {
        if (!silent) setLoading(true)

        if (!conversationId) return

        const data = await getMessages(conversationId)
        setMessages(Array.isArray(data) ? data.reverse() : [])
      } finally {
        if (!silent) setLoading(false)
      }
    },
    [conversationId]
  )

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

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

  const renderItem = ({ item }: { item: OptimisticMessage }) => (
    <ChatBubble
      {...item}
      isMe={item.sender_id == currentUser?.id}
      onRetry={() => handleResend(item)}
    />
  )

  return (
    <>
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
    </>
  )
}

const styles = StyleSheet.create({
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

export default ChatBody
