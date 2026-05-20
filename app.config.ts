import { ExpoConfig, ConfigContext } from 'expo/config'

export default (ctx: ConfigContext): ExpoConfig => {
  const { config } = ctx

  return {
    ...config,
    name: 'Livelens',
    slug: 'livelens',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/logo.png',
    splash: {
      image: './assets/images/splash-icon-main.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    scheme: 'com.livelens.app',
    userInterfaceStyle: 'light',
    ios: {
      bundleIdentifier: 'com.livelens.app',
      supportsTablet: true,
      infoPlist: {
        NSCameraUsageDescription:
          'Allow $(PRODUCT_NAME) to access your camera to capture photos and videos.',
        NSMicrophoneUsageDescription:
          '$(PRODUCT_NAME) needs access to your Microphone to record audio for video recordings.',
        NSPhotoLibraryAddUsageDescription:
          'Allow $(PRODUCT_NAME) to save photos to your library',
        UIBackgroundModes: ['remote-notification'],
      },
      entitlements: {
        'aps-environment': 'development',
      },
    },
    android: {
      package: 'com.livelens.app',
      permissions: [
        'android.permission.CAMERA',
        'android.permission.RECORD_AUDIO',
      ],
      adaptiveIcon: {
        foregroundImage: './assets/images/logo.png',
        backgroundColor: '#E6F4FE',
      },
    },
    plugins: [
      [
        'onesignal-expo-plugin',
        {
          mode: 'development',
        },
      ],
      [
        'expo-video',
        {
          supportsBackgroundPlayback: true,
          supportsPictureInPicture: true,
        },
      ],
      [
        'expo-camera',
        {
          cameraPermission: 'Allow $(PRODUCT_NAME) to access your camera',
        },
      ],

      'expo-web-browser',
      'expo-secure-store',
      'expo-font',
      'expo-router',
      [
        'expo-build-properties',
        {
          ios: {
            useFrameworks: 'static',
          },
        },
      ],
      [
        '@react-native-google-signin/google-signin',
        {
          iosUrlScheme:
            'com.googleusercontent.apps.850951594746-obmitsnsu02semv5itrg90la46peq9ee',
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
          photosPermission: 'Allow $(PRODUCT_NAME) to access your photos.',
          savePhotosPermission: 'Allow $(PRODUCT_NAME) to save photos.',
          isAccessMediaLocationEnabled: true,
          granularPermissions: ['audio', 'photo'],
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
        build: {
          experimental: {
            ios: {
              appExtensions: [
                {
                  targetName: 'OneSignalNotificationServiceExtension',
                  bundleIdentifier:
                    'com.eegour.livelens.OneSignalNotificationServiceExtension',
                  entitlements: {
                    'com.apple.security.application-groups': [
                      'group.com.eegour.livelens.onesignal',
                    ],
                  },
                },
                {
                  targetName: 'OneSignalNotificationServiceExtension',
                  bundleIdentifier:
                    'com.eegour.livelens.OneSignalNotificationServiceExtension',
                  entitlements: {
                    'com.apple.security.application-groups': [
                      'group.com.eegour.livelens.onesignal',
                    ],
                  },
                },
                {
                  targetName: 'OneSignalNotificationServiceExtension',
                  bundleIdentifier:
                    'com.livelens.app.OneSignalNotificationServiceExtension',
                  entitlements: {
                    'com.apple.security.application-groups': [
                      'group.com.livelens.app.onesignal',
                    ],
                  },
                },
              ],
            },
          },
        },
        projectId: '8fbc9bfa-fe29-4a98-8ae4-00dbf973823f',
      },
      router: {},
    },
    owner: 'livelens-mobile',
  }
}
