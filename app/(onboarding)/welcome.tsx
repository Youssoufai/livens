import { Image, StyleSheet, View } from 'react-native'
import { Link, useRouter } from 'expo-router'

import { ThemedView } from '@/components/themed-view'
import Text from '@/components/text'
import ScrollView from '@/components/scrollview'
import Button from '@/components/ui/button'

import AppLogo from '@/assets/icons/in-app-logo.svg'
import GoogleLogo from '@/assets/icons/logos_google.svg'
import FacebookLogo from '@/assets/icons/logos_facebook.svg'
import { Divider } from 'react-native-paper'
import { COLORS } from '@/constants/theme'

const snipImage = require('@/assets/images/snip.png')

const Welcome = () => {
  const router = useRouter()

  const loginWithGoogle = () => {}

  const loginWithFacebook = () => {}

  return (
    <ThemedView hasBottomPadding hasTopPadding>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.header}>
          <AppLogo />
          <View style={styles.headerText}>
            <Text
              size={32}
              lineHeight={36}
              weight={700}
              align="center"
              color="black">
              Welcome to Livelens
            </Text>
            <Text size={16} lineHeight={24} align="center" color="grey-400">
              Location insights at your fingertips.
            </Text>
          </View>
        </View>
        <View>
          <Image source={snipImage} style={styles.image} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            label="Create a new account"
            onPress={() => router.push('/(onboarding)/create-account')}
          />
          <Button
            label="Continue with Google"
            icon={<GoogleLogo />}
            alignIcon="left"
            labelColor="black"
            btnStyle={styles.socialButton}
            onPress={loginWithGoogle}
          />
          <Button
            label="Contiue with Facebook"
            icon={<FacebookLogo />}
            alignIcon="left"
            labelColor="black"
            btnStyle={styles.socialButton}
            onPress={loginWithFacebook}
          />
          <View style={styles.dividerWrapper}>
            <Divider style={styles.divider} />
            <Text size={12} lineHeight={16} weight={600} color="grey-500">
              OR
            </Text>
            <Divider style={styles.divider} />
          </View>
          <Text
            size={16}
            lineHeight={20}
            weight={600}
            align="center"
            color="black">
            Already have an account?{' '}
            <Link href="/(auth)/login" style={styles.link}>
              Sign in
            </Link>
          </Text>
        </View>
      </ScrollView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    rowGap: 40,
  },
  header: {
    rowGap: 12,
    alignItems: 'center',
    paddingTop: 12,
  },
  headerText: {
    rowGap: 8,
  },
  image: {
    width: '100%',
    maxWidth: 328,
    height: 211,
    alignSelf: 'center',
  },
  buttonWrapper: {
    rowGap: 12,
  },
  socialButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#CDCDCD',
  },
  dividerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
    marginBottom: 10,
  },
  divider: {
    flex: 1,
  },
  link: {
    color: COLORS.primary[400],
  },
})

export default Welcome
