import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
} from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { Image } from 'expo-image'
import { ArrowLeft, Bookmark, ChevronRight, Share2, Video as VideoIcon } from 'lucide-react-native'

import { ThemedView } from '@/components/themed-view'
import Text from '@/components/text'
import ScrollView from '@/components/scrollview'
import { COLORS } from '@/constants/theme'
import { formatTimeAgo } from '@/utils/format'
import { getResolvedAvataUri } from '@/utils/resolver'
import { useGetRequestByIdQuery, useGetResponseStatus } from '@/hooks/queries/use-requests'

const PostDetail = () => {
  const { id, views, saves } = useLocalSearchParams<{
    id: string
    views?: string
    saves?: string
  }>()

  const { data: requestData, isLoading: isLoadingRequest } =
    useGetRequestByIdQuery(id)
  const { data: statusData, isLoading: isLoadingStatus } =
    useGetResponseStatus(id)

  const response = statusData?.response
  const media = response?.media_paths?.slice(0, 4)

  const requesterAvatar = getResolvedAvataUri(requestData?.user?.name ?? 'U')
  const responderAvatar = getResolvedAvataUri(response?.user?.name ?? 'R')

  const postedAt = requestData?.created_at
    ? formatTimeAgo(requestData.created_at)
    : null
  const respondedAt = response?.created_at
    ? formatTimeAgo(response.created_at)
    : null

  const viewCount = views && views !== '0' ? views : undefined
  const saveCount = saves && saves !== '0' ? saves : undefined

  const isLoading = isLoadingRequest || isLoadingStatus

  return (
    <ThemedView hasTopPadding hasBottomPadding style={styles.container}>
      {/* Custom header */}
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [
            styles.headerBtn,
            pressed && { opacity: 0.7 },
          ]}
          onPress={() => router.back()}
        >
          <ArrowLeft size={22} color={COLORS.grey[800]} />
        </Pressable>

        <Text size={16} lineHeight={20} weight={700} color="grey-800">
          Search result
        </Text>

        <View style={styles.headerActions}>
          <Pressable
            style={({ pressed }) => [
              styles.headerBtn,
              pressed && { opacity: 0.7 },
            ]}
          >
            <Bookmark size={20} color={COLORS.grey[700]} />
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.headerBtn,
              pressed && { opacity: 0.7 },
            ]}
          >
            <Share2 size={20} color={COLORS.grey[700]} />
          </Pressable>
        </View>
      </View>

      {isLoading ? (
        <View style={styles.loaderWrapper}>
          <ActivityIndicator size="large" color={COLORS.primary[500]} />
        </View>
      ) : (
        <ScrollView style={styles.content}>
          {/* Requester info */}
          <View style={styles.userRow}>
            <Image source={{ uri: requesterAvatar }} style={styles.avatar} />
            <View style={styles.userMeta}>
              <Text size={15} lineHeight={20} weight={700} color="grey-700">
                {requestData?.user?.name ?? 'Unknown'}
              </Text>
              <Text size={13} lineHeight={18} color="grey-300">
                {requestData?.user?.location ?? ''}
              </Text>
            </View>
          </View>

          {/* Request question */}
          <Text size={22} lineHeight={30} weight={700} color="grey-800">
            {requestData?.description ?? ''}
          </Text>

          {/* Location */}
          {requestData?.location ? (
            <View style={styles.locationRow}>
              <Text size={13} lineHeight={18} color="grey-400">
                Request location:{' '}
              </Text>
              <Text
                size={13}
                lineHeight={18}
                weight={600}
                style={styles.locationLink}
              >
                {requestData.location}
              </Text>
            </View>
          ) : null}

          {/* Stats row */}
          {(viewCount || saveCount || postedAt) ? (
            <View style={styles.statsRow}>
              {viewCount ? (
                <Text size={13} lineHeight={18} color="grey-400">
                  {viewCount} views
                </Text>
              ) : null}
              {viewCount && saveCount ? (
                <Text size={13} lineHeight={18} color="grey-300">
                  {' · '}
                </Text>
              ) : null}
              {saveCount ? (
                <Text size={13} lineHeight={18} color="grey-400">
                  {saveCount} save{Number(saveCount) !== 1 ? 's' : ''}
                </Text>
              ) : null}
              {(viewCount || saveCount) && postedAt ? (
                <Text size={13} lineHeight={18} color="grey-300">
                  {' · '}
                </Text>
              ) : null}
              {postedAt ? (
                <Text size={13} lineHeight={18} color="grey-400">
                  {postedAt}
                </Text>
              ) : null}
            </View>
          ) : null}

          <View style={styles.divider} />

          {/* Responses section */}
          <Text size={18} lineHeight={24} weight={700} color="grey-800">
            Responses
          </Text>

          {response ? (
            <View style={styles.responseCard}>
              {/* Responder header */}
              <View style={styles.responderRow}>
                <Image
                  source={{ uri: responderAvatar }}
                  style={styles.responderAvatar}
                />
                <View style={styles.responderMeta}>
                  <Text size={14} lineHeight={18} weight={600} color="grey-700">
                    {response.user?.name ?? 'Responder'}
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
                  <View style={styles.uploadContent}>
                    {media.map((photo, index) => {
                      if (photo.type.startsWith('video/')) {
                        return (
                          <View
                            key={`media_${index}`}
                            style={styles.uploadedImage}
                          >
                            <View style={styles.videoThumb}>
                              <VideoIcon
                                size={24}
                                color={COLORS.white}
                                style={styles.videoIcon}
                              />
                            </View>
                          </View>
                        )
                      }
                      return (
                        <Image
                          key={`media_${index}`}
                          source={{ uri: photo.url }}
                          priority="high"
                          style={styles.uploadedImage}
                        />
                      )
                    })}
                  </View>
                  <Pressable
                    style={({ pressed }) => ({
                      opacity: pressed ? 0.7 : 1,
                      paddingRight: 4,
                    })}
                    onPress={() =>
                      router.push({
                        pathname: '/(requests)/uploaded-images',
                        params: { id },
                      })
                    }
                  >
                    <ChevronRight size={22} color={COLORS.grey[500]} />
                  </Pressable>
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
  loaderWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
    rowGap: 14,
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
    color: COLORS.blue[500],
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
  },
  uploadedImage: {
    flex: 1,
    height: 103,
    borderRadius: 4,
    overflow: 'hidden',
  },
  videoThumb: {
    width: '100%',
    height: '100%',
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
