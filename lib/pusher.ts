import { Pusher } from '@pusher/pusher-websocket-react-native'
import { envConfig } from '@/utils/config'

class PusherService {
  private static instance: PusherService
  private pusher = Pusher.getInstance()
  private initialized = false

  static getInstance() {
    if (!this.instance) this.instance = new PusherService()
    return this.instance
  }

  async init() {
    if (this.initialized) return
    this.initialized = true

    await this.pusher.init({
      apiKey: envConfig.pusherKey ?? '',
      cluster: 'eu',
      onConnectionStateChange: (current, prev) => {
        console.log('[PUSHER STATE]', prev, '->', current)
      },

      onError: (msg, code, err) => {
        console.log('[PUSHER ERROR]', msg, code, err)
      },
    })

    await this.pusher.connect()
    console.log('[PUSHER CONNECTED]')
  }

  async subscribe(channelName: string, callback?: (data: any) => void) {
    return this.pusher.subscribe({
      channelName,

      onSubscriptionSucceeded: () => {
        console.log('[SUBSCRIBED]', channelName)
      },

      onSubscriptionError: (channel, message, error) => {
        console.log('[SUBSCRIPTION ERROR]', channel, message, error)
      },

      onEvent: (event) => {
        console.log('[EVENT]', event)

        if (event.eventName.startsWith('pusher:')) {
          return
        }

        let data = event.data

        try {
          data = JSON.parse(event.data)
        } catch {}

        callback?.(data)
      },
    })
  }

  async unsubscribe(channelName: string) {
    await this.pusher.unsubscribe({
      channelName,
    })
  }

  async disconnect() {
    await this.pusher.disconnect()
  }
}

export const pusherService = PusherService.getInstance()
