import { Image, StyleSheet, Text as RNText, View } from 'react-native'

import Text from '@/components/text'
import { COLORS } from '@/constants/theme'
import { getResolvedAvataUri } from '@/utils/resolver'
import { FONTS } from '@/constants/fonts'

import { OfferPreviewProps } from '../requests.types'

const AVATAR_SIZE = 32
const OVERLAP = 14

const PLACEHOLDER_SEEDS = ['P', 'H', 'W', 'D', 'J']

export default function OffersPreview({
  count,
  avatarUris,
  hasUser,
}: OfferPreviewProps) {
  if (count <= 0 && !hasUser) return null

  const displayCount = count
  const uris = Array.from(
    { length: displayCount },
    (_, i) => avatarUris?.[i] ?? getResolvedAvataUri(PLACEHOLDER_SEEDS[i])
  )

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.avatarStack,
          { width: AVATAR_SIZE + (displayCount - 1) * (AVATAR_SIZE - OVERLAP) },
        ]}
      >
        {uris.map((uri, index) => (
          <Image
            key={index}
            source={{ uri }}
            style={[
              styles.avatar,
              {
                left: index * (AVATAR_SIZE - OVERLAP),
                zIndex: displayCount + index,
              },
            ]}
          />
        ))}
      </View>
      <Text
        size={13}
        lineHeight={18}
        color="grey-500"
        align={count <= 0 && hasUser ? 'center' : 'left'}
      >
        <RNText style={styles.boldText}>
          {hasUser && count > 0
            ? 'You and'
            : hasUser && count <= 0
              ? 'You have'
              : null}
        </RNText>{' '}
        {count > 0 ? (
          <RNText style={styles.boldText}>
            {count > 3 ? `${count}+` : count}{' '}
            {count === 1 ? 'person has' : 'people have'}
          </RNText>
        ) : null}
        {count > 0 && hasUser
          ? ' already sent their offer.'
          : hasUser
            ? 'already sent an offer'
            : null}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 10,
  },
  avatarStack: {
    height: AVATAR_SIZE,
    position: 'relative',
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 2,
    borderColor: COLORS.white,
    position: 'absolute',
    backgroundColor: COLORS.grey[50],
  },
  boldText: {
    fontFamily: FONTS.dm_sans[600],
    color: COLORS.grey[700],
  },
})
