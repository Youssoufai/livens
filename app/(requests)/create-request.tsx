import {
  ReactElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'
import { StyleSheet, View } from 'react-native'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'

import { ThemedView } from '@/components/themed-view'
import Text from '@/components/text'
import CreateRequestForm from '@/modules/request/components/create-request-form'
import RequestConditionForm from '@/modules/request/components/request-condition-form'
import RequestRewardForm from '@/modules/request/components/request-reward'
import RequestConfirmForm from '@/modules/request/components/confirm-request'
import { REQUEST_STEP_META } from '@/modules/request/requests.data'
import { CustomHeader } from '@/components/custom-header'
import { COLORS } from '@/constants/theme'
import RequestSuccessIcon from '@/assets/icons/request-sucess.svg'
import SuccessModal from '@/components/success-modal'
import { useRequestStore } from '@/state/request'

const renderFormArea = (
  step: number,
  direction: Direction,
  requestId: string,
  gotoNext: (step: number) => void,
  openModal: VoidFunction
) => {
  let fieldContent: Record<number, ReactElement> = {
    1: <CreateRequestForm direction={direction} onNext={() => gotoNext(2)} />,
    2: (
      <RequestConditionForm direction={direction} onNext={() => gotoNext(3)} />
    ),
    3: <RequestRewardForm direction={direction} onNext={() => gotoNext(4)} />,
    4: (
      <RequestConfirmForm
        direction={direction}
        requestId={requestId}
        onSuccessModal={openModal}
      />
    ),
  }

  return fieldContent[step]
}

const CreateRequest = () => {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState<'back' | 'forward'>('forward')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const navigation = useNavigation()
  const router = useRouter()
  const queryParams = useLocalSearchParams<{ id?: string; step?: string }>()

  const clearFields = useRequestStore((state) => state.resetRequest)

  const { title, subtitle } = REQUEST_STEP_META[step - 1]

  const handleBack = useCallback(() => {
    setStep((prev) => prev - 1)
    setDirection('back')
  }, [])

  const goBack = useCallback(() => {
    clearFields()
    router.back()
  }, [router, clearFields])

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <CustomHeader
          showBack
          backFunc={step > 1 ? handleBack : goBack}
          containerStyle={styles.navigationHeader}
        />
      ),
    })
  }, [step, navigation, handleBack, goBack])

  useEffect(() => {
    const paramsStep = +(queryParams?.step ?? 0)
    if (!isNaN(paramsStep) && +paramsStep > 0) {
      setStep(paramsStep)
    }
  }, [queryParams.step])

  const handleNext = (step: number) => {
    setDirection('forward')
    setStep(step)
  }

  const dismissModal = () => {
    setIsModalOpen(false)
    router.replace('/(tabs)/requests')
  }

  return (
    <>
      <ThemedView hasBottomPadding style={styles.container}>
        <View style={styles.headerContent}>
          <Text size={13} color="grey-400">
            Step {step} of 4
          </Text>
          <Text size={24} weight={700} color="grey-800">
            {queryParams && step === 1 ? 'Edit request' : title}
          </Text>
          {subtitle && (
            <Text size={14} lineHeight={22} color="grey-500">
              {subtitle}
            </Text>
          )}
        </View>

        <View style={styles.formArea}>
          {renderFormArea(
            step,
            direction,
            queryParams.id ?? '',
            handleNext,
            () => {
              setIsModalOpen(true)
            }
          )}
        </View>
      </ThemedView>
      <SuccessModal
        isOpen={isModalOpen}
        title={`Your request has been ${queryParams.id ? 'edited' : 'posted'}!`}
        description="Your request is now visible to the public, expect some responses
              soon!"
        icon={<RequestSuccessIcon width={158} height={118} />}
        onDismiss={dismissModal}
      />
    </>
  )
}

export default CreateRequest

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingHorizontal: 0,
  },
  navigationHeader: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey[50],
  },
  headerContent: {
    rowGap: 4,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  formArea: {
    flex: 1,
    marginTop: 8,
    paddingBottom: 24,
  },
})
