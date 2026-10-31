import AsyncStorage from '@react-native-async-storage/async-storage'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { Keyboard, Platform, StyleSheet, View } from 'react-native'

import { ThemedView } from '@/components/themed-view'
import ChatBody from '@/modules/chat/components/chat_body'
import ChatHeader from '@/modules/chat/components/chat_header'

export default function ChatScreen() {
  const { conversationId, requestId, receiverId } = useLocalSearchParams<{
    conversationId: string
    requestId: string
    receiverId: string
  }>()

  const [keyboardOffset, setKeyboardOffset] = useState(0)

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

  return (
    <ThemedView hasTopPadding style={styles.container}>
      <View style={{ flex: 1, paddingBottom: keyboardOffset }}>
        <ChatHeader receiverId={receiverId} />
        <ChatBody conversationId={conversationId} />
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
})
