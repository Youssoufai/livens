import { Image } from 'react-native'

import { OptionType } from './search.types'

export const HOME_OPTIONS: OptionType[] = [
  {
    title: 'Search a place',
    description: 'See the most recent news and updates about a place.',
    icon: () => (
      <Image
        source={require('@/assets/images/place-search.png')}
        resizeMode="contain"
        style={{ width: 45, height: 45 }}
      />
    ),
    link: '/(tabs)/home',
  },
  {
    title: 'Ask the public',
    description:
      'Get answers from locals about what’s happening in a location.',
    icon: () => (
      <Image
        source={require('@/assets/images/chat-bubble.png')}
        resizeMode="contain"
        style={{ width: 45, height: 45 }}
      />
    ),
    link: '/(tabs)/home',
  },
]
