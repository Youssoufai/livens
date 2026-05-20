import { Dimensions, StyleSheet, View } from 'react-native'
import {
  ReactElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import Animated, {
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
} from 'react-native-reanimated'

import ProgressBar from '@/components/progress-bar'
import { ThemedView } from '@/components/themed-view'
import AuthHeader from '@/modules/auth/components/auth-header'
import CreateAccountForm from '@/modules/auth/components/create-account-form'
import KeyboardScrollView from '@/components/keyboard-scrollview'
import { CustomHeader } from '@/components/custom-header'
import VerifyEmailForm from '@/modules/auth/components/verify-email-form'
import { getCreateAccountHeaderData } from '@/modules/auth/auth.data'
import LocationForm from '@/modules/auth/components/location-form'
import { COLORS } from '@/constants/theme'

const FORM_STAGES_LENGTH = 3
const width = Dimensions.get('window').width

SlideInRight.springify()
  .damping(30)
  .mass(5)
  .stiffness(10)
  .overshootClamping(10)
  .withInitialValues({ transform: [{ translateX: width + 200 }] })

SlideOutRight.springify()
  .damping(30)
  .mass(5)
  .stiffness(10)
  .overshootClamping(10)

SlideOutLeft.springify().damping(30).mass(5).stiffness(10).overshootClamping(10)

SlideInLeft.springify().damping(30).mass(5).stiffness(10).overshootClamping(10)

export default function CreateAccount() {
  const [step, setStep] = useState(1)
  const [counter, setCounter] = useState(0)
  const [direction, setDirection] = useState<'forward' | 'back'>()
  const [email, setEmail] = useState('')

  const queryParams = useLocalSearchParams<{ step: string }>()
  const navigation = useNavigation()
  const router = useRouter()

  const handleBack = useCallback(() => {
    setStep((prevStep) => {
      if (prevStep === 1) {
        router.back()
        return prevStep
      } else if (prevStep === FORM_STAGES_LENGTH) {
        return 1
      }
      return prevStep - 1
    })
    setDirection('back')
    setCounter((prevCount) => prevCount + 1)
  }, [router])

  const updateEmail = (email: string) => {
    setEmail(email)
    handleNext()
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <CustomHeader
          title={
            <View style={styles.progressWrapper}>
              {Array.from({ length: FORM_STAGES_LENGTH })
                .fill('')
                .map((_, index) => {
                  const value = index + 1 <= step ? 100 : 0
                  return (
                    <ProgressBar
                      key={`progress_${index}`}
                      progress={value}
                      containerStyle={styles.progressbar}
                    />
                  )
                })}
            </View>
          }
          containerStyle={styles.headerContainer}
          showBack
          backFunc={handleBack}
        />
      ),
    })
  }, [step, navigation, handleBack])

  useEffect(() => {
    if (queryParams.step) setStep(+queryParams.step)
  }, [queryParams.step])

  const handleNext = () => {
    setStep((prevStep) =>
      prevStep >= FORM_STAGES_LENGTH ? prevStep : prevStep + 1
    )

    setDirection('forward')
    setCounter((prevCount) => prevCount + 1)
  }

  const authProgressForm: Record<number, ReactElement> = {
    1: <CreateAccountForm onNext={updateEmail} />,
    2: <VerifyEmailForm email={email} onNext={handleNext} />,
    3: <LocationForm />,
  }

  const header = getCreateAccountHeaderData(email)[step - 1]

  return (
    <ThemedView hasBottomPadding style={styles.container}>
      <Animated.View
        key={counter}
        exiting={direction === 'back' ? SlideOutRight : SlideOutLeft}
        entering={direction === 'back' ? SlideInLeft : SlideInRight}
        style={styles.content}
      >
        <AuthHeader title={header.title} description={header.description} />

        {authProgressForm[step]}
      </Animated.View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 19,
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey[50],
  },
  content: {
    flex: 1,
    paddingBottom: 26,
  },
  progressWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
    width: 250,
    alignSelf: 'center',
  },
  progressbar: {
    height: 3,
    borderRadius: 0.5,
    flex: 1,
  },
  hint: {
    marginTop: -10,
    marginBottom: 14,
  },
  label: {
    marginBottom: 6,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 4,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: '#FAFAFA',
    marginTop: 0,
  },
  phoneInput: {
    flex: 1,
  },
})
