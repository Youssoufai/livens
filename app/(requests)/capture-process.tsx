import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { useCallback, useLayoutEffect, useMemo, useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'

import ProgressBar from '@/components/progress-bar'
import StepTransition from '@/components/step-animate-wrapper'
import Text from '@/components/text'
import { COLORS } from '@/constants/theme'
import { useGetRequestByIdQuery } from '@/hooks/queries/use-requests'
import StepSubmitted from '@/modules/offers/components/step-submitted'
import { ThemedView } from '@/components/themed-view'
import { DEFAULT_CHECKLIST } from '@/modules/offers/offer.data'
import { CustomHeader } from '@/components/custom-header'
import { globalStyles } from '@/styles/globalStyles'

import StepCapture from '@/modules/offers/components/step-capture'
import StepComment from '@/modules/offers/components/step-comment'
import StepReview from '@/modules/offers/components/step-review'

type Step = 1 | 2 | 3 | 4

const TOTAL_STEPS = 3

export default function CaptureProcess() {
  const { request_id } = useLocalSearchParams<{ request_id: string }>()
  const navigation = useNavigation()

  const { data: request } = useGetRequestByIdQuery(request_id)

  const [step, setStep] = useState<Step>(1)
  const [direction, setDirection] = useState<Direction>('forward')
  const [media, setMedia] = useState<FileType[]>([])
  const [comment, setComment] = useState('')

  const goBack = useCallback(() => {
    if (step === 1) {
      router.back()
      return
    }
    setDirection('back')
    setStep((s) => Math.max(s - 1, 1) as Step)
  }, [step, router])

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
    const raw = (request?.description ?? '')
      .split(/\n|•|-/)
      .map((s) => s.trim())
      .filter(Boolean)
    return raw.length > 1 ? raw : DEFAULT_CHECKLIST
  }, [request?.description])

  const goNext = () => {
    setDirection('forward')
    setStep((s) => Math.min(s + 1, 4) as Step)
  }

  const showHeader = step < 4

  return (
    <ThemedView style={styles.container} hasBottomPadding>
      {showHeader && (
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
      )}

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
          <StepReview
            requestId={request_id}
            media={media}
            comment={comment}
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
        {step === 4 && <StepSubmitted />}
      </StepTransition>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingHorizontal: 0,
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
