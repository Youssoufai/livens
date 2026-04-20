import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native'
// import { LinearGradient } from 'expo-linear-gradient'
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated'
import { overlay } from 'react-native-paper'

import { ThemedView } from '@/components/themed-view'
import { ONBOARDING_DATA } from '@/modules/onboarding/onboarding.data'
import Text from '@/components/text'
import Button from '@/components/ui/button'

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

  const contentData = ONBOARDING_DATA[step]

  const router = useRouter()

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const token = await getToken("token");
  //       console.log("TOKEN FOUND IN INDEX:", token);

  //       // Defer navigation until router/RootLayout is mounted.
  //       // Using setTimeout lets the router finish initializing.
  //       if (token && token.length > 0) {

  //         setTimeout(() => router.replace("/(root)/(tabs)/search"), 50);

  //       } else {
  //         setTimeout(() => router.replace("/(onboarding)/onboarding"), 50);
  //       }
  //     } catch (error) {
  //       console.log("Token check error:", error);
  //       setTimeout(() => router.replace("/(auth)/login"), 50);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   checkAuth();
  // }, []);

  const handleNextStep = () => {
    setStep((prevStep) => {
      if (prevStep === 1) {
        router.push('/(onboarding)/welcome')
        return prevStep
      }

      return prevStep + 1
    })
  }

  return (
    <Animated.View
      key={step}
      entering={SlideInRight}
      exiting={SlideOutLeft}
      style={styles.imageBackground}>
      <ImageBackground
        source={contentData.image}
        style={styles.imageBackground}>
        {/* <LinearGradient
          colors={['#00000000', '#000000']}
          style={styles.overlay}> */}
        <ThemedView
          lightColor="transparent"
          hasTopPadding
          hasBottomPadding
          style={styles.content}>
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
