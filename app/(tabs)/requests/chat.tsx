import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Text from '@/components/text'
import api from '@/lib/api'
import { Message, User } from '@/models/auth'

export default function ChatScreen() {
  const { conversation_id } = useLocalSearchParams<{ conversation_id: string }>()
  const flatListRef = useRef<FlatList>(null)

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    const loadCurrentUser = async () => {
      const raw = await AsyncStorage.getItem('user')
      if (raw) setCurrentUser(JSON.parse(raw))
    }
    loadCurrentUser()
  }, [])

  const fetchMessages = async () => {
    if (!conversation_id) return
    try {
      setLoading(true)
      const { data } = await api.get<{ data: Message[] }>(`/conversations/${conversation_id}/messages`)
      setMessages(Array.isArray(data.data) ? data.data : [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [conversation_id])

  const handleSend = async () => {
    if (!input.trim() || !conversation_id || sending) return
    try {
      setSending(true)
      await api.post('/messages', {
        conversation_id,
        message: input.trim(),
      })
      setInput('')
      await fetchMessages()
      flatListRef.current?.scrollToEnd({ animated: true })
    } finally {
      setSending(false)
    }
  }

  const renderItem = ({ item }: { item: Message }) => {
    const isMe = item.sender_id === currentUser?.id
    return (
      <View
        style={[
          styles.bubble,
          isMe ? styles.bubbleMe : styles.bubbleOther,
        ]}>
        <Text size={14} style={{ color: isMe ? '#fff' : '#111' }}>
          {item.message}
        </Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f7fb' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={10}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="#111" />
          </TouchableOpacity>
          <View style={styles.headerAvatar} />
          <View style={{ marginLeft: 12 }}>
            <Text size={16} weight={600} color="grey-800">
              {currentUser?.name || 'Chat'}
            </Text>
            <Text size={12} color="grey-400">
              Active now
            </Text>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 16 }}
            keyboardShouldPersistTaps="handled"
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />
        )}

        <View style={styles.inputRow}>
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
            style={[styles.sendBtn, (sending || !input.trim()) && { opacity: 0.5 }]}>
            <Ionicons name="send" color="#fff" size={18} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderColor: '#e5e7eb',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#d1d5db',
    marginLeft: 12,
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
    backgroundColor: '#2563eb',
    borderBottomRightRadius: 4,
  },
  bubbleOther: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
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
