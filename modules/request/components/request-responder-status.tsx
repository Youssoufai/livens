import { Pressable, StyleSheet, View } from 'react-native'
import { Divider } from 'react-native-paper'
import { ChevronRight, CircleQuestionMark, Ellipsis } from 'lucide-react-native'
import { Image } from 'expo-image'
import { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

import Text from '@/components/text'
import Button from '@/components/ui/button'
import { COLORS } from '@/constants/theme'
import ReplyIcon from '@/assets/icons/reply.svg'
import {
  useGetRequestByIdQuery,
  useGetResponseStatus,
} from '@/hooks/queries/use-requests'
import RequestResponderStatusSkeleton from '@/components/placeholder/response-status-placeholder'
import { envConfig } from '@/utils/config'
import Switch from '@/components/ui/Switch'
import ScreenLoader from '@/components/screen-loader'

const RequestResponderStatus = ({ id }: { id: string }) => {
  const [isVisible, setIsVisible] = useState(false)

  const router = useRouter()

  const { data: requestData, isLoading } = useGetRequestByIdQuery(id)
  const { data: responseStatusData } = useGetResponseStatus(id)

  if (isLoading) return <RequestResponderStatusSkeleton />

  if (!requestData?.responder) return null

  const handleVisibilitySwitch = (value: boolean) => {
    setIsVisible(value)
  }

  return (
    <Animated.View style={styles.container} entering={FadeIn} exiting={FadeOut}>
      <View style={styles.responderCard}>
        <View style={styles.responderCardContent}>
          <View style={styles.responderLeft}>
            <View style={styles.avatar} />
            <View style={styles.responderInfo}>
              <Text size={16} lineHeight={20} weight={700} color="grey-500">
                {requestData.responder.name}
              </Text>
              <Text size={14} lineHeight={28} weight={600} color="grey-300">
                {requestData.responder.location}
              </Text>
            </View>
          </View>

          <View style={styles.responderRight}>
            <Button
              label="Message"
              buttonColor="white"
              labelColor="black"
              btnStyle={styles.messageButton}
              onPress={() => {}}
            />
            <Pressable>
              <Ellipsis size={24} color="#1C1B1F" />
            </Pressable>
          </View>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.section}>
          <Text size={16} lineHeight={20} weight={600} color="black">
            Uploaded content
          </Text>
          {responseStatusData?.media_paths.length ? (
            <>
              <View style={styles.uploadWrapper}>
                <View style={styles.uploadeContent}>
                  {responseStatusData?.media_paths.map((photo) => {
                    return (
                      <Image
                        source={{ uri: envConfig.imageBaseUrl + photo }}
                        priority="high"
                        style={styles.uploadedImage}
                      />
                    )
                  })}
                </View>
                <Pressable
                  style={styles.moreImagesButton}
                  onPress={() =>
                    router.push({
                      pathname: '/(requests)/uploaded-images',
                      params: { id },
                    })
                  }
                >
                  <ChevronRight />
                </Pressable>
              </View>
              <View style={styles.publicSearchWrapper}>
                <View style={styles.publicSearchHeader}>
                  <Text size={14} lineHeight={20} weight={600} color="black">
                    Make available to public
                  </Text>
                </View>
                <View style={styles.publicSearchContent}>
                  <View style={styles.publicSearchText}>
                    <Text size={14} lineHeight={20} color="black">
                      Allow this content to be displayed in public searches and
                      related locations.
                    </Text>
                  </View>
                  <Switch
                    value={isVisible}
                    trackColor={COLORS.primary[300]}
                    thumbColor={COLORS.white}
                    onValueChange={handleVisibilitySwitch}
                  />
                </View>
              </View>
            </>
          ) : (
            <Text size={14} lineHeight={20} color="black">
              No content has been uploaded yet.
            </Text>
          )}
        </View>

        <Divider style={styles.divider} />

        <View style={styles.section}>
          <Text size={16} lineHeight={20} weight={600} color="black">
            Responder comments
          </Text>
          <Text size={16} lineHeight={24} color="grey-500">
            {responseStatusData?.comment ?? 'No comment has been added yet.'}
          </Text>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.warningBox}>
          <ReplyIcon width={21} height={21} />
          <View style={styles.warningContent}>
            <Text size={14} weight={700} color="primary-500">
              Automatic payment
            </Text>
            <Text size={12} lineHeight={16} color="grey-500">
              You have 48 hours to withdraw this responder from the request
              otherwise payment will be made immediately content has been
              uploaded.
            </Text>
          </View>
        </View>

        {/* CTA */}
        <Button label="Approve & Pay" disabled onPress={() => {}} />
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingTop: 24,
  },

  responderCard: {
    // alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: -2,
      height: 3,
    },
    shadowOpacity: 0.01,
    shadowRadius: 8,
    elevation: 3,
  },
  responderCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  responderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    backgroundColor: '#D9D9D9',
  },

  responderInfo: {
    rowGap: 2,
    flex: 1,
  },

  responderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },

  messageButton: {
    paddingHorizontal: 16,
    height: 36,
    width: 'auto',
    borderColor: '#CDCDCD',
    borderWidth: 1,
  },

  moreDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.grey[300],
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.grey[200],
    marginVertical: 16,
  },

  section: {
    rowGap: 6,
  },
  uploadedImage: {
    flex: 1,
    height: 103,
  },
  uploadWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 16,
  },
  uploadeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    flex: 1,
  },
  moreImagesButton: {
    paddingRight: 12,
  },
  publicSearchWrapper: {
    rowGap: 12,
  },
  publicSearchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  publicSearchContent: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
  },
  publicSearchText: {
    flex: 1,
  },
  bottomContainer: {
    marginTop: 'auto',
    rowGap: 12,
    paddingHorizontal: 16,
  },

  warningBox: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary[50],
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 6,
    columnGap: 6,
  },

  warningContent: {
    rowGap: 4,
    flex: 1,
  },
})

export default RequestResponderStatus
