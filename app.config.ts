import { ExpoConfig, ConfigContext } from 'expo/config'
import withOneSignal from 'onesignal-expo-plugin/plugin'

export default (ctx: ConfigContext): ExpoConfig => {
  const { config } = ctx

  return {
    ...config,
    name: 'Livelens',
    slug: 'livelens',
    version: '1.0.3',
    orientation: 'portrait',
    icon: './assets/images/app-icon.png',
    splash: {
      image: './assets/images/splash-icon-main.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    scheme: 'com.livelensinc.app',
    userInterfaceStyle: 'light',
    ios: {
      bundleIdentifier: 'com.livelensinc.app',
      supportsTablet: false,
      usesAppleSignIn: true,
      infoPlist: {
        NSCameraUsageDescription:
          'Allow $(PRODUCT_NAME) to access your camera to capture photos and videos for your profile and service requests.',
        NSMicrophoneUsageDescription:
          '$(PRODUCT_NAME) needs access to your Microphone to record audio for video recordings.',
        NSPhotoLibraryUsageDescription:
          'Allow $(PRODUCT_NAME) to access your photo library so you can choose images and videos to upload, such as a profile photo or a photo of a requested service.',
        NSPhotoLibraryAddUsageDescription:
          'Allow $(PRODUCT_NAME) to save photos and videos to your library so you can keep a copy of images you upload or download in the app.',
        NSLocationWhenInUseUsageDescription:
          'Allow $(PRODUCT_NAME) to access your location while you use the app so we can find nearby services and show your current address when you submit a request, such as locating a nearby provider.',
        UIBackgroundModes: ['remote-notification'],
      },
      entitlements: {
        'aps-environment':
          process.env.EXPO_PUBLIC_ENVIRONMENT === 'development'
            ? 'development'
            : 'production',
      },
    },
    android: {
      package: 'com.livelensinc.app',
      permissions: [
        'android.permission.CAMERA',
        'android.permission.RECORD_AUDIO',
      ],
      blockedPermissions: [
        'android.permission.READ_MEDIA_IMAGES',
        'android.permission.READ_MEDIA_VIDEO',
      ],
      adaptiveIcon: {
        foregroundImage: './assets/images/app-icon.png',
        backgroundColor: '#E6F4FE',
      },
      googleServicesFile: './assets/json/google-services.json',
    },
    plugins: [
      withOneSignal({
        mode:
          process.env.EXPO_PUBLIC_ENVIRONMENT === 'development'
            ? 'development'
            : 'production',
        smallIcons: ['./assets/images/notification-icon.png'],
        largeIcons: ['./assets/images/notification-icon.png'],
      }),
      './plugins/withAndroidMedia3Fix',
      [
        'expo-video',
        {
          supportsBackgroundPlayback: false,
          supportsPictureInPicture: false,
        },
      ],
      'expo-web-browser',
      'expo-secure-store',
      'expo-font',
      'expo-router',
      'react-native-compressor',
      'expo-apple-authentication',
      [
        'expo-build-properties',
        {
          ios: {
            useFrameworks: 'static',
            deploymentTarget: '15.1',
          },
          android: {
            enableProguardInReleaseBuilds: true,
            extraProguardRules: '-dontwarn org.slf4j.impl.StaticLoggerBinder',
          },
        },
      ],
      [
        '@react-native-google-signin/google-signin',
        {
          iosUrlScheme:
            'com.googleusercontent.apps.850951594746-c6gip8g9qns1ju0bit4hf5975l5c0pq4',
        },
      ],
      [
        'expo-file-system',
        {
          supportsOpeningDocumentsInPlace: true,
          enableFileSharing: true,
        },
      ],
      [
        'expo-media-library',
        {
          photosPermission:
            'Allow $(PRODUCT_NAME) to access your photo library so you can choose images and videos to upload, such as a profile photo or a photo of a requested service.',
          savePhotosPermission:
            'Allow $(PRODUCT_NAME) to save photos and videos to your library so you can keep a copy of images you upload or download in the app.',
          isAccessMediaLocationEnabled: false,
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      ...(config.extra || {}),
      googleMapApiKey: process.env.GOOGLE_MAP_API_KEY,
      googleSigninWebClientId: process.env.GOOGLE_SIGNIN_WEB_CLIENT_ID,
      googleSigninIosClientId: process.env.GOOGLE_SIGNIN_IOS_CLIENT_ID,
      eas: {
        build: {},
        projectId: '8fbc9bfa-fe29-4a98-8ae4-00dbf973823f',
      },
      router: {},
    },
    owner: 'livelens-mobile',
  }
}
