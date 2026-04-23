import { useRouter } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native'
// import { LinearGradient } from 'expo-linear-gradient'
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated'

import { ThemedView } from '@/components/themed-view'
import { ONBOARDING_DATA } from '@/modules/onboarding/onboarding.data'
import Text from '@/components/text'
import Button from '@/components/ui/button'
import AppStorage from '@/utils/storage'
import { STORE_KEYS } from '@/constants'
import { OnboardingStatus } from '@/modules/auth/auth.types'

// import { getToken } from "./utils/secureStore";

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    position: 'relative',
  },
  content: {
    rowGap: 40,
    justifyContent: 'flex-end',
  },
  buttonWrapper: {
    paddingBottom: 10,
  },
  btnLabel: {
    color: '#000000',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
})

const width = Dimensions.get('window').width

SlideInRight.springify()
  .damping(30)
  .mass(5)
  .withInitialValues({ transform: [{ translateX: width + 200 }] })
  .stiffness(10)
  .overshootClamping(10)

SlideOutLeft.springify().damping(30).mass(5).stiffness(10).overshootClamping(10)

export default function Onboarding() {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)

  const storage = useRef(new AppStorage()).current

  const contentData = ONBOARDING_DATA[step]

  const router = useRouter()

  useEffect(() => {
    try {
      setLoading(true)
      const onboarding = storage.getItem<'string'>(STORE_KEYS.onboarding) as
        | OnboardingType
        | undefined

      if (!onboarding) {
        return
      } else if (onboarding === OnboardingStatus.in_progress) {
        router.push('/(onboarding)/welcome')
        return
      } else if (onboarding === OnboardingStatus.completed) {
        router.push('/(auth)/login')
        return
      }
    } catch (error) {
      console.error('Failed to resolve onboarding state:', error)
    } finally {
      setLoading(false)
    }
  }, [router, storage])

  const handleNextStep = () => {
    setStep((prevStep) => {
      if (prevStep === 1) {
        router.push('/(onboarding)/welcome')
        return prevStep
      }

      return prevStep + 1
    })
  }

  if (loading) return null

  return (
    <Animated.View
      key={step}
      entering={SlideInRight}
      exiting={SlideOutLeft}
      style={styles.imageBackground}
    >
      <ImageBackground
        source={contentData.image}
        style={styles.imageBackground}
      >
        {/* <LinearGradient
          colors={['#00000000', '#000000']}
          style={styles.overlay}> */}
        <ThemedView
          lightColor="transparent"
          hasTopPadding
          hasBottomPadding
          style={styles.content}
        >
          <Text size={40} lineHeight={46} color="white" weight={500}>
            {contentData.content}
          </Text>
          <View style={styles.buttonWrapper}>
            <Button
              label={contentData.btnText}
              buttonColor="white"
              labelStyle={styles.btnLabel}
              onPress={handleNextStep}
            />
          </View>
        </ThemedView>
        {/* </LinearGradient> */}
      </ImageBackground>
    </Animated.View>
  )
}
