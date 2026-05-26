import { Pressable, RefreshControl, StyleSheet, View } from 'react-native'
import { Divider, Menu } from 'react-native-paper'
import { ChevronRight, Ellipsis, Video } from 'lucide-react-native'
import { Image } from 'expo-image'
import { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

import Text from '@/components/text'
import Button from '@/components/ui/button'
import { COLORS } from '@/constants/theme'
import ReplyIcon from '@/assets/icons/reply.svg'
import { useGetResponseStatus } from '@/hooks/queries/use-requests'
import RequestResponderStatusSkeleton from '@/components/placeholder/response-status-placeholder'
import Switch from '@/components/ui/switch'
import SuccessModal from '@/components/success-modal'
import {
  useCompleteRequest,
  useMakeRequestPublicMutation,
  useWithdrawResponderMutation,
} from '@/hooks/mutations/use-request'
import { showToastMessage } from '@/components/notification'
import { catchErr } from '@/utils/error-handlers'
import ScreenLoader from '@/components/screen-loader'
import { startConversation } from '@/services/chat'

import { RequestSuccessModalType } from '../requests.types'
import { getRequestSuccessModalContent } from '../requests.data'
import ScrollView from '@/components/scrollview'
import useRefresh from '@/hooks/use-pull-refresh'
import { queryClient } from '@/services'

const RequestResponderStatus = ({ id }: { id: string }) => {
  const [isPublic, setIsPublic] = useState(false)
  const [visibleModal, setVisibleModal] = useState<RequestSuccessModalType>()
  const [showMenuItems, setShowMenuItems] = useState(false)
  const [chatLoading, setChatLoading] = useState(false)

  const { refreshing, onRefresh } = useRefresh()

  const router = useRouter()

  const { data: responseStatusData, isLoading } = useGetResponseStatus(id)
  const { mutateAsync: completeRequest, isPending: isCompletingRequest } =
    useCompleteRequest(id)
  const { mutateAsync: withdrawResponder, isPending: isWithdrawingResponder } =
    useWithdrawResponderMutation(id)
  const { mutateAsync: makeRequestPublic, isPending: isMakingPublic } =
    useMakeRequestPublicMutation(id)

  useEffect(() => {
    if (responseStatusData?.response?.media_paths.length) {
      setIsPublic(!!Number(responseStatusData?.request?.make_public))
    }
  }, [
    responseStatusData?.request?.make_public,
    responseStatusData?.response?.media_paths,
  ])

  if (isLoading) return <RequestResponderStatusSkeleton />
  if (!responseStatusData) return null
  if (responseStatusData.request.status === 'pending') return null

  const dismissModal = () => setVisibleModal(undefined)

  const responder = responseStatusData.response?.user
  const media = responseStatusData.response?.media_paths?.slice(0, 4)

  const modalDetails = getRequestSuccessModalContent(
    responder,
    dismissModal,
    setVisibleModal,
    visibleModal
  )

  const isButtonDisabled = !responseStatusData.response?.media_paths?.length

  const handleVisibilitySwitch = async (value: boolean) => {
    let errorMsg = ''
    try {
      await makeRequestPublic(id)
      setIsPublic(value)
    } catch (error) {
      errorMsg =
        catchErr(error).message ?? 'Failed to make public due to an error'
    } finally {
      showToastMessage(
        errorMsg ||
          (value
            ? "You've successfully made this request's media public"
            : 'Your request media are hidden from the public'),
        errorMsg ? 'error' : 'success'
      )
    }
  }

  const approveAndPay = async () => {
    try {
      await completeRequest()

      setVisibleModal('request_completed')
    } catch (error) {
      showToastMessage(
        catchErr(error).message ?? 'Something went wrong',
        'error'
      )
    }
  }

  const handleWithdrawResponder = async () => {
    let errorMessage = ''
    setShowMenuItems(false)

    try {
      await withdrawResponder(id)

      router.replace({ pathname: '/(tabs)/requests' })
    } catch (error) {
      errorMessage =
        catchErr(error).message ?? 'Something went wrong. Please, try again'
    } finally {
      showToastMessage(
        errorMessage || 'Responder withdrawn successfully',
        errorMessage ? 'error' : 'success'
      )
    }
  }

  const handleMessaging = async () => {
    setChatLoading(true)
    try {
      let conversation_id = responseStatusData.request.conversation_id

      if (!conversation_id) {
        const response = await startConversation(
          [responseStatusData.request.responder ?? ''],
          id
        )

        queryClient.invalidateQueries({ queryKey: ['request-status', id] })

        conversation_id = response.id
      }

      router.push({
        pathname: '/(requests)/chat',
        params: {
          conversationId: conversation_id,
          requestId: responseStatusData.request.id,
          receiverId: responseStatusData.response.user_id,
        },
      })
    } catch (error) {
      showToastMessage(catchErr(error).message ?? '', 'error')
    } finally {
      setChatLoading(false)
    }
  }

  const responderRightContent =
    responseStatusData?.request?.status !== 'completed' ? (
      <View style={styles.responderRight}>
        <Button
          label="Message"
          buttonColor="white"
          labelColor="black"
          loading={chatLoading}
          btnStyle={styles.messageButton}
          onPress={handleMessaging}
        />
        <Menu
          visible={showMenuItems}
          anchor={
            <Pressable onPress={() => setShowMenuItems(true)}>
              <Ellipsis size={24} color="#1C1B1F" />
            </Pressable>
          }
          anchorPosition="bottom"
          style={styles.dropdownMenu}
          contentStyle={styles.dropdownMenuContent}
          onDismiss={() => setShowMenuItems(false)}
        >
          <Menu.Item
            title={
              <Text size={14} lineHeight={20} color="black">
                Withdraw responder
              </Text>
            }
            style={styles.dropdownItem}
            onPress={handleWithdrawResponder}
          />
        </Menu>
      </View>
    ) : null

  return (
    <>
      <Animated.View
        style={styles.container}
        entering={FadeIn}
        exiting={FadeOut}
      >
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefresh([['request-status', id]])}
            />
          }
        >
          <View style={styles.responderCard}>
            <View style={styles.responderCardContent}>
              <View style={styles.responderLeft}>
                <View style={styles.avatar} />
                <View style={styles.responderInfo}>
                  <Text size={16} lineHeight={20} weight={700} color="grey-500">
                    {responder?.name}
                  </Text>
                  <Text size={14} lineHeight={20} weight={600} color="grey-300">
                    {responder?.location}
                  </Text>
                </View>
              </View>

              {responderRightContent}
            </View>
            {responseStatusData.request.status !== 'completed' && (
              <>
                <Divider style={styles.divider} />

                <View style={styles.section}>
                  <Text size={16} lineHeight={20} weight={600} color="black">
                    Uploaded content
                  </Text>
                  {media?.length ? (
                    <>
                      <View style={styles.uploadWrapper}>
                        <View style={styles.uploadeContent}>
                          {media.map((photo, index) => {
                            if (photo.type.startsWith('video/')) {
                              return (
                                <View style={styles.videoThumb}>
                                  <Video
                                    size={24}
                                    color={COLORS.white}
                                    style={styles.videoIcon}
                                  />
                                </View>
                              )
                            }

                            return (
                              <Image
                                key={`uploaded_response_media_${index}`}
                                source={{
                                  uri: photo.url,
                                }}
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
                          <Text
                            size={14}
                            lineHeight={20}
                            weight={600}
                            color="black"
                          >
                            Make available to public
                          </Text>
                        </View>
                        <View style={styles.publicSearchContent}>
                          <View style={styles.publicSearchText}>
                            <Text size={14} lineHeight={20} color="black">
                              Allow this content to be displayed in public
                              searches and related locations.
                            </Text>
                          </View>
                          <Switch
                            value={isPublic}
                            trackColor={COLORS.primary[400]}
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
              </>
            )}

            <Divider style={styles.divider} />

            <View style={styles.section}>
              <Text size={16} lineHeight={20} weight={600} color="black">
                Responder comments
              </Text>
              <Text size={16} lineHeight={24} color="grey-500">
                {responseStatusData?.response?.comment ??
                  'No comment has been added yet.'}
              </Text>
            </View>
          </View>

          {responseStatusData.request.status !== 'completed' && (
            <View style={styles.bottomContainer}>
              <View style={styles.warningBox}>
                <ReplyIcon width={21} height={21} />
                <View style={styles.warningContent}>
                  <Text size={14} weight={700} color="primary-500">
                    Automatic payment
                  </Text>
                  <Text size={12} lineHeight={16} color="grey-500">
                    You have 48 hours to withdraw this responder from the
                    request otherwise payment will be made immediately content
                    has been uploaded.
                  </Text>
                </View>
              </View>

              {/* CTA */}
              <Button
                label="Approve & Pay"
                loading={isCompletingRequest}
                disabled={isButtonDisabled}
                onPress={approveAndPay}
              />
            </View>
          )}
        </ScrollView>
      </Animated.View>
      <SuccessModal
        isOpen={!!visibleModal}
        title={modalDetails?.title ?? ''}
        description={modalDetails?.description ?? ''}
        icon={modalDetails?.icon || <></>}
        onDismiss={() => {
          router.replace('/(tabs)/home')
          dismissModal()
        }}
      >
        {modalDetails?.content}
      </SuccessModal>
      <ScreenLoader isLoading={isWithdrawingResponder || isMakingPublic} />
    </>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 8,
  },
  responderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    flex: 1,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    backgroundColor: '#D9D9D9',
  },
  responderInfo: {
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
    columnGap: 10,
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
  dropdownMenu: {
    backgroundColor: COLORS.white,
  },
  dropdownMenuContent: {
    backgroundColor: COLORS.white,
  },
  dropdownItem: {
    backgroundColor: COLORS.white,
  },
  warningBox: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary[50],
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 6,
    columnGap: 6,
  },
  videoThumb: {
    width: '100%',
    height: '100%',
    position: 'relative',
    borderRadius: 10,
    backgroundColor: COLORS.grey[800],
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoIcon: {
    position: 'absolute',
  },
  warningContent: {
    rowGap: 4,
    flex: 1,
  },
})

export default RequestResponderStatus
