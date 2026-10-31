import { Image } from 'expo-image'
import { Pressable, StyleSheet, Text as RNText, View } from 'react-native'
import { Video as VideoIcon } from 'lucide-react-native'

import Text from '@/components/text'
import { COLORS } from '@/constants/theme'
import { formatTimeAgo } from '@/utils/format'
import { getResolvedAvataUri } from '@/utils/resolver'
import LineBlock from '@/components/line-block'
import { LINE_BLOCK_SPACING } from '@/constants'

import { SearchResultCardProps } from '../search.types'

const MEDIA_SIZE = 32
const OVERLAP = 16
const DISPLAY_COUNT = 3

const SearchResultCard = ({
  description,
  location,
  user,
  responderName,
  responderCreatedAt,
  responderComment,
  responderMediaPaths,
  onPress,
}: SearchResultCardProps) => {
  const requesterAvatar = getResolvedAvataUri(user?.name ?? 'U')

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
    >
      <View style={styles.userRow}>
        <Image source={{ uri: requesterAvatar }} style={styles.avatar} />
        <View style={styles.userMeta}>
          <Text size={14} lineHeight={18} weight={600} color="grey-700">
            {user?.name ?? 'Unknown'}
          </Text>
          <Text size={12} lineHeight={16} color="grey-300">
            {user?.location ?? ''}
          </Text>
        </View>
      </View>

      <Text size={18} lineHeight={24} color="grey-800">
        {description}
      </Text>

      {location ? (
        <Text size={12} lineHeight={16} color="grey-300">
          Request location: {location}
        </Text>
      ) : null}

      {responderName ? (
        <View style={styles.responsePreview}>
          <LineBlock />
          <View style={styles.responseHeader}>
            <Image
              source={{ uri: getResolvedAvataUri(responderName) }}
              style={styles.responderAvatar}
            />
            <View style={styles.responderDetails}>
              <View style={styles.responderMeta}>
                <Text size={13} lineHeight={18} weight={600} color="grey-700">
                  {responderName}
                </Text>
                <Text size={11} lineHeight={16} color="grey-300">
                  Responded
                  {responderCreatedAt
                    ? ` • ${formatTimeAgo(responderCreatedAt)}`
                    : ''}
                </Text>
              </View>
              <View style={styles.responderActionsWrapper}>
                {responderComment ? (
                  <RNText
                    numberOfLines={2}
                    style={[styles.responseComment, styles.commentText]}
                  >
                    {responderComment}
                  </RNText>
                ) : null}

                {responderMediaPaths &&
                  responderMediaPaths.slice(0, 3).length > 0 && (
                    <View style={styles.mediaThumbnailRow}>
                      {responderMediaPaths
                        .slice(0, DISPLAY_COUNT)
                        .map((media, index) => (
                          <View
                            key={`thumb_${media.public_id}_${index}`}
                            style={[
                              styles.thumbnailWrapper,
                              {
                                left: index * (MEDIA_SIZE - OVERLAP),
                                zIndex: DISPLAY_COUNT + index,
                              },
                            ]}
                          >
                            {media.url.endsWith('mp4') ? (
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
            </View>
          </View>
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
    width: 40,
    height: 40,
    borderRadius: 18,
    backgroundColor: COLORS.grey[50],
  },
  userMeta: {
    rowGap: 2,
    flex: 1,
  },
  responderDetails: {
    flex: 1,
  },
  responsePreview: {
    marginTop: 4,
    paddingLeft: LINE_BLOCK_SPACING,
    rowGap: 6,
  },
  responseHeader: {
    paddingTop: 12,
    flexDirection: 'row',
    columnGap: 8,
  },
  responderAvatar: {
    width: 24,
    height: 24,
    borderRadius: 14,
    backgroundColor: COLORS.grey[50],
  },
  responderMeta: {
    rowGap: 1,
    flex: 1,
  },
  responderActionsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
    justifyContent: 'space-between',
  },
  responseComment: {
    flex: 1,
  },
  commentText: {
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.grey[400],
  },
  mediaThumbnailRow: {
    flexDirection: 'row',
    columnGap: 6,
    height: 32,
    position: 'relative',
    width: MEDIA_SIZE * 3 - OVERLAP * 2,
  },
  thumbnailWrapper: {
    width: MEDIA_SIZE,
    height: MEDIA_SIZE,
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: COLORS.grey[50],
    position: 'absolute',
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
