import { cacheDirectory, downloadAsync } from 'expo-file-system/legacy'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

import ProgressBar from '@/components/progress-bar'
import StepTransition from '@/components/step-animate-wrapper'
import Text from '@/components/text'
import { COLORS } from '@/constants/theme'
import { useGetResponseStatus } from '@/hooks/queries/use-requests'
import { ThemedView } from '@/components/themed-view'
import { DEFAULT_CHECKLIST } from '@/modules/offers/offer.data'
import { envConfig } from '@/utils/config'
import {
  MediaType,
  RequestResponseStatusType,
} from '@/services/requests/request.types'
import { CustomHeader } from '@/components/custom-header'
import { globalStyles } from '@/styles/globalStyles'
import EditResponseSkeleton from '@/components/placeholder/edit-response-skeleton'
import { storeMediaViaUrl } from '@/modules/request/requests.handler'

import StepCapture from '@/modules/offers/components/step-capture'
import StepComment from '@/modules/offers/components/step-comment'
import StepReviewEdit from '@/modules/offers/components/step-review-edit'

type Step = 1 | 2 | 3

const TOTAL_STEPS = 3

export default function EditResponse() {
  const { request_id } = useLocalSearchParams<{ request_id: string }>()
  const navigation = useNavigation()

  const { data, isLoading } = useGetResponseStatus(request_id)

  const [step, setStep] = useState<Step>(1)
  const [direction, setDirection] = useState<Direction>('forward')
  const [media, setMedia] = useState<FileType[]>([])
  const [comment, setComment] = useState('')
  const [initialized, setInitialized] = useState(false)

  const getResolvedMedia = async (media: MediaType[]) => {
    const existingMedia = (media ?? []).map(async (item) => {
      const file = await storeMediaViaUrl(item.url)

      return file
    })

    setMedia(await Promise.all(existingMedia))
    setInitialized(true)
  }

  useEffect(() => {
    if (data?.response && !initialized) {
      getResolvedMedia(data.response?.media_paths)
      setComment(data.response?.comment ?? '')
    }
  }, [data?.response?.media_paths, data?.response.comment, initialized])

  const goBack = useCallback(() => {
    if (step === 1) {
      router.back()
      return
    }
    setDirection('back')
    setStep((s) => Math.max(s - 1, 1) as Step)
  }, [step])

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <CustomHeader
          showBack
          backFunc={goBack}
          containerStyle={globalStyles.screenHeaderContainer}
        />
      ),
    })
  }, [navigation, goBack])

  const descriptionItems = useMemo(() => {
    const raw = (data?.request?.description ?? '')
      .split(/\n|•|-/)
      .map((s) => s.trim())
      .filter(Boolean)
    return raw.length > 1 ? raw : DEFAULT_CHECKLIST
  }, [data?.request?.description])

  const didPayloadChange = comment !== (data?.response?.comment ?? '')

  const goNext = () => {
    setDirection('forward')
    setStep((s) => Math.min(s + 1, 3) as Step)
  }

  if (isLoading || !initialized) {
    return <EditResponseSkeleton />
  }

  return (
    <ThemedView style={styles.container} hasBottomPadding>
      <View style={styles.header}>
        <Text size={12} color="grey-400">
          Step {step} of {TOTAL_STEPS}
        </Text>
        <View style={styles.progressWrapper}>
          <ProgressBar
            progress={(step / TOTAL_STEPS) * 100}
            containerStyle={styles.progressContainer}
          />
        </View>
      </View>

      <StepTransition direction={direction} key={step}>
        {step === 1 && (
          <StepCapture
            descriptionItems={descriptionItems}
            media={media}
            onMediaChange={setMedia}
            onNext={goNext}
          />
        )}
        {step === 2 && (
          <StepComment
            comment={comment}
            onCommentChange={setComment}
            onNext={goNext}
          />
        )}
        {step === 3 && (
          <StepReviewEdit
            requestId={request_id}
            media={media}
            comment={comment}
            // disableEdit={!didPayloadChange}
            onEditMedia={() => {
              setDirection('back')
              setStep(1)
            }}
            onEditComment={() => {
              setDirection('back')
              setStep(2)
            }}
          />
        )}
      </StepTransition>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingHorizontal: 0,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    columnGap: 12,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  progressWrapper: {
    flex: 1,
  },
  progressContainer: {
    backgroundColor: COLORS.grey[50],
  },
})
