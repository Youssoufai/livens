import { Pressable, StyleSheet, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { Image } from 'expo-image'
import {
  Eye,
  Bookmark,
  ChevronRight,
  Share2,
  History,
  Video as VideoIcon,
} from 'lucide-react-native'
import { useState } from 'react'
import { Divider } from 'react-native-paper'

import { ThemedView } from '@/components/themed-view'
import Text from '@/components/text'
import ScrollView from '@/components/scrollview'
import { COLORS } from '@/constants/theme'
import { formatTimeAgo } from '@/utils/format'
import { getResolvedAvataUri } from '@/utils/resolver'
import PostActionRow from '@/modules/search/components/post-action-row'
import PostDetailSkeleton from '@/components/placeholder/post-detail-skeleton'
import MediaDisplay from '@/components/media-display'
import { MediaType } from '@/services/requests/request.types'
import { useGetSearchDetails } from '@/hooks/queries/use-search'

const PostDetail = () => {
  const { id } = useLocalSearchParams<{
    id: string
  }>()

  const [selectedMedia, setSelectedMedia] = useState<MediaType | null>(null)

  const { data: detailsData, isLoading } = useGetSearchDetails(id)

  const response = detailsData?.response
  const requestData = detailsData
  const media = response?.media_paths?.slice(0, 4)

  const requesterAvatar = getResolvedAvataUri(
    requestData?.user.profile_photo ?? requestData?.user?.name ?? 'U'
  )
  const responderAvatar = getResolvedAvataUri(
    requestData?.responder.profile_photo ?? requestData?.responder.name ?? 'R'
  )

  const postedAt = requestData?.created_at
    ? formatTimeAgo(requestData?.created_at)
    : null
  const respondedAt = response?.created_at
    ? formatTimeAgo(response.created_at)
    : null

  const viewCount =
    detailsData?.views && detailsData?.views.toString() !== '0'
      ? detailsData?.views
      : undefined
  const saveCount =
    detailsData?.saves && detailsData?.saves.toString() !== '0'
      ? detailsData?.saves
      : undefined

  return (
    <>
      <ThemedView hasBottomPadding style={styles.container}>
        {isLoading ? (
          <ScrollView style={styles.content}>
            <PostDetailSkeleton />
          </ScrollView>
        ) : (
          <ScrollView style={styles.content}>
            <View style={styles.userRow}>
              <Image source={{ uri: requesterAvatar }} style={styles.avatar} />
              <View style={styles.userMeta}>
                <Text size={14} lineHeight={18} weight={600} color="grey-700">
                  {requestData?.user?.name ?? 'Unknown'}
                </Text>
                <Text size={12} lineHeight={16} color="grey-300">
                  {requestData?.user?.location ?? ''}
                </Text>
              </View>
            </View>

            <Text size={20} lineHeight={24} color="grey-500">
              {requestData?.description ?? ''}
            </Text>

            {/* Location */}
            {requestData?.location ? (
              <View style={styles.locationRow}>
                <Text size={12} lineHeight={16} color="grey-300">
                  Request location:{' '}
                </Text>
                <Text
                  size={12}
                  lineHeight={16}
                  weight={500}
                  style={styles.locationLink}
                >
                  {requestData.location}
                </Text>
              </View>
            ) : null}

            <Divider style={styles.divider} />

            {viewCount || saveCount || postedAt ? (
              <View style={styles.statsRow}>
                {viewCount ? (
                  <PostActionRow value={`${viewCount} views`} icon={Eye} />
                ) : null}
                {viewCount && saveCount ? (
                  <Text size={13} lineHeight={18} color="grey-300">
                    {' · '}
                  </Text>
                ) : null}
                {saveCount ? (
                  <PostActionRow
                    value={`${saveCount} save${Number(saveCount) !== 1 ? 's' : ''}`}
                    icon={Bookmark}
                  />
                ) : null}
                {(viewCount || saveCount) && postedAt ? (
                  <Text size={13} lineHeight={18} color="grey-300">
                    {' · '}
                  </Text>
                ) : null}
                {postedAt ? (
                  <PostActionRow value={postedAt} icon={History} />
                ) : null}
              </View>
            ) : null}

            <Divider style={styles.divider} />

            <Text size={18} lineHeight={24} weight={700} color="grey-800">
              Responses
            </Text>

            {response ? (
              <View style={styles.responseCard}>
                <View style={styles.responderRow}>
                  <Image
                    source={{ uri: responderAvatar }}
                    style={styles.responderAvatar}
                  />
                  <View style={styles.responderMeta}>
                    <Text
                      size={14}
                      lineHeight={18}
                      weight={600}
                      color="grey-700"
                    >
                      {requestData?.responder?.name ?? 'Responder'}
                    </Text>
                    {respondedAt ? (
                      <Text size={12} lineHeight={16} color="grey-300">
                        {respondedAt}
                      </Text>
                    ) : null}
                  </View>
                </View>

                {/* Comment */}
                {response.comment ? (
                  <Text size={14} lineHeight={22} color="grey-500">
                    {response.comment}
                  </Text>
                ) : null}

                {/* Media — same pattern as request-responder-status.tsx */}
                {media && media.length > 0 ? (
                  <View style={styles.uploadWrapper}>
                    <ScrollView horizontal style={styles.uploadContent}>
                      {media.map((item, index) => {
                        if (item.url.endsWith('mp4')) {
                          return (
                            <View
                              key={`media_${index}`}
                              style={styles.uploadedImage}
                            >
                              <Pressable
                                style={styles.videoThumb}
                                onPress={() => setSelectedMedia(item)}
                              >
                                <VideoIcon
                                  size={24}
                                  color={COLORS.white}
                                  style={styles.videoIcon}
                                />
                              </Pressable>
                            </View>
                          )
                        }
                        return (
                          <Pressable
                            key={`media_${index}`}
                            onPress={() => setSelectedMedia(item)}
                          >
                            <Image
                              source={{ uri: item.url }}
                              priority="high"
                              style={styles.uploadedImage}
                            />
                          </Pressable>
                        )
                      })}
                    </ScrollView>
                  </View>
                ) : null}
              </View>
            ) : (
              <View style={styles.noResponses}>
                <Text size={14} lineHeight={20} color="grey-300">
                  No responses yet.
                </Text>
              </View>
            )}
          </ScrollView>
        )}
      </ThemedView>
      <MediaDisplay
        selectedMedia={selectedMedia}
        onDismiss={() => setSelectedMedia(null)}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey[50],
  },
  headerBtn: {
    padding: 4,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
    rowGap: 6,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.grey[50],
  },
  userMeta: {
    rowGap: 2,
    flex: 1,
  },
  locationRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  locationLink: {
    color: COLORS.grey[500],
    textDecorationLine: 'underline',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.grey[50],
    marginVertical: 16,
  },
  responseCard: {
    marginTop: 12,
    rowGap: 12,
  },
  responderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  responderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.grey[50],
  },
  responderMeta: {
    rowGap: 2,
    flex: 1,
  },
  uploadWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 16,
  },
  uploadContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    columnGap: 10,
    height: 200,
  },
  uploadedImage: {
    width: 160,
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  videoThumb: {
    width: 160,
    height: '100%',
    borderRadius: 8,
    backgroundColor: COLORS.grey[700],
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoIcon: {
    position: 'absolute',
  },
  noResponses: {
    marginTop: 12,
    paddingVertical: 24,
    alignItems: 'center',
  },
})

export default PostDetail
