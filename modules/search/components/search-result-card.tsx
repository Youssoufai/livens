import { Image } from 'expo-image'
import { Pressable, StyleSheet, Text as RNText, View } from 'react-native'
import { Video as VideoIcon } from 'lucide-react-native'

import Text from '@/components/text'
import { COLORS } from '@/constants/theme'
import { formatTimeAgo } from '@/utils/format'
import { getResolvedAvataUri } from '@/utils/resolver'

import { SearchResultItem } from '../search.types'

type SearchResultCardProps = {
  item: SearchResultItem
  onPress: (id: string) => void
}

const SearchResultCard = ({ item, onPress }: SearchResultCardProps) => {
  const topResponse = item.responses?.[0]
  const requesterAvatar = getResolvedAvataUri(item.user?.name ?? 'U')

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => onPress(item.id)}
    >
      {/* Requester row */}
      <View style={styles.userRow}>
        <Image source={{ uri: requesterAvatar }} style={styles.avatar} />
        <View style={styles.userMeta}>
          <Text size={14} lineHeight={18} weight={600} color="grey-700">
            {item.user?.name ?? 'Unknown'}
          </Text>
          <Text size={12} lineHeight={16} color="grey-300">
            {item.user?.location ?? ''}
          </Text>
        </View>
      </View>

      {/* Request question */}
      <Text size={15} lineHeight={22} weight={600} color="grey-800">
        {item.description}
      </Text>

      {/* Request location */}
      {item.location ? (
        <Text size={12} lineHeight={16} color="grey-300">
          Request location: {item.location}
        </Text>
      ) : null}

      {/* Response preview */}
      {topResponse ? (
        <View style={styles.responsePreview}>
          <View style={styles.responseHeader}>
            <Image
              source={{ uri: getResolvedAvataUri(topResponse.user?.name ?? 'R') }}
              style={styles.responderAvatar}
            />
            <View style={styles.responderMeta}>
              <Text size={13} lineHeight={18} weight={600} color="grey-700">
                {topResponse.user?.name ?? 'Responder'}
              </Text>
              <Text size={11} lineHeight={16} color="grey-300">
                {topResponse.user?.location ?? ''}{' '}
                {topResponse.created_at
                  ? `• ${formatTimeAgo(topResponse.created_at)}`
                  : ''}
              </Text>
            </View>
          </View>

          {topResponse.comment ? (
            <RNText
              numberOfLines={2}
              style={[styles.responseComment, styles.commentText]}
            >
              {topResponse.comment}
            </RNText>
          ) : null}

          {/* Media thumbnail */}
          {topResponse.media_paths?.length > 0 && (
            <View style={styles.mediaThumbnailRow}>
              {topResponse.media_paths.slice(0, 3).map((media, index) => (
                <View key={`thumb_${index}`} style={styles.thumbnailWrapper}>
                  {media.type.startsWith('video') ? (
                    <View style={styles.videoThumb}>
                      <VideoIcon size={16} color={COLORS.white} />
                    </View>
                  ) : (
                    <Image
                      source={{ uri: media.url }}
                      style={styles.thumbnail}
                      priority="normal"
                    />
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      ) : (
        <Text size={13} lineHeight={18} color="grey-300">
          No responses yet
        </Text>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    rowGap: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey[50],
    backgroundColor: COLORS.white,
  },
  cardPressed: {
    backgroundColor: '#F9F9F9',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.grey[50],
  },
  userMeta: {
    rowGap: 2,
    flex: 1,
  },
  responsePreview: {
    marginTop: 4,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.grey[50],
    rowGap: 6,
  },
  responseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  responderAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.grey[50],
  },
  responderMeta: {
    rowGap: 1,
    flex: 1,
  },
  responseComment: {
    paddingLeft: 36,
  },
  commentText: {
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.grey[400],
  },
  mediaThumbnailRow: {
    flexDirection: 'row',
    columnGap: 6,
    paddingLeft: 36,
  },
  thumbnailWrapper: {
    width: 64,
    height: 64,
    borderRadius: 4,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  videoThumb: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.grey[700],
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default SearchResultCard
