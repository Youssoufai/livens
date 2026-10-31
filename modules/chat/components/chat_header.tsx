import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { ChevronLeft } from 'lucide-react-native'
import { format } from 'date-fns'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'

import { getUserById } from '@/services/profile'
import Text from '@/components/text'
import { getResolvedAvataUri } from '@/utils/resolver'
import { COLORS } from '@/constants/theme'
import { pusherService } from '@/lib/pusher'
import { UserPresence } from '@/services/chat/chat.types'

import { ChatHeaderProps } from '../chat.types'

const ChatHeader = ({ receiverId }: ChatHeaderProps) => {
  const [receiver, setReceiver] = useState<User>()
  const [isActive, setIsActive] = useState(false)

  const router = useRouter()

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
    if (!receiverId) return

    const channel = 'users'

    const subscribeUserStatus = async () => {
      await pusherService.subscribe(channel, (data: UserPresence) => {
        if (typeof data === 'string') return
        setIsActive(data.is_active === 1)
      })
    }

    subscribeUserStatus()

    return () => {
      pusherService.unsubscribe(channel)
    }
  }, [receiverId])

  useEffect(() => {
    getReceiver()

    console.log('whyyy')
  }, [getReceiver, isActive])

  const lastSeen = receiver?.last_seen ? new Date(receiver.last_seen) : null

  return (
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
          {isActive
            ? 'Online'
            : lastSeen
              ? format(lastSeen, 'hh:mm:ss')
              : 'Offline'}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
})

export default ChatHeader
