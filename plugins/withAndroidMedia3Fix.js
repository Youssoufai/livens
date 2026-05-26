const { withProjectBuildGradle, withAppBuildGradle } = require('@expo/config-plugins');

// Forces all media3 libraries to the version expo-video was compiled against.
// react-native-vision-camera (CameraX 1.7.0-alpha01) transitively pulls in a
// newer media3 that changed the LoadControl.getAllocator() signature, causing
// AbstractMethodError at runtime in VideoPlayerLoadControl.
const MEDIA3_VERSION = '1.8.0';

const MEDIA3_MODULES = [
  'media3-common',
  'media3-exoplayer',
  'media3-exoplayer-dash',
  'media3-exoplayer-hls',
  'media3-session',
  'media3-ui',
  'media3-datasource-okhttp',
  'media3-muxer',
];

// Pin Kotlin stdlib/coroutines to avoid duplicate class conflicts across Firebase,
// VisionCamera, and other packages that each pull in different Kotlin versions.
const KOTLIN_VERSION = '2.1.20';
const COROUTINES_VERSION = '1.10.1';

const resolutionBlock = `
subprojects {
    configurations.all {
        resolutionStrategy {
${MEDIA3_MODULES.map((m) => `            force "androidx.media3:${m}:${MEDIA3_VERSION}"`).join('\n')}
            force "org.jetbrains.kotlin:kotlin-stdlib:${KOTLIN_VERSION}"
            force "org.jetbrains.kotlin:kotlin-stdlib-jdk7:${KOTLIN_VERSION}"
            force "org.jetbrains.kotlin:kotlin-stdlib-jdk8:${KOTLIN_VERSION}"
            force "org.jetbrains.kotlinx:kotlinx-coroutines-android:${COROUTINES_VERSION}"
            force "org.jetbrains.kotlinx:kotlinx-coroutines-core:${COROUTINES_VERSION}"
        }
    }
}
`;

const media3MuxerDep = `    implementation "androidx.media3:media3-muxer:${MEDIA3_VERSION}"`;

module.exports = function withAndroidMedia3Fix(config) {
  config = withProjectBuildGradle(config, (config) => {
    if (!config.modResults.contents.includes('withAndroidMedia3Fix')) {
      config.modResults.contents += `\n// withAndroidMedia3Fix\n${resolutionBlock}`;
    }
    return config;
  });

  // Explicitly declare media3-muxer so it is bundled in the APK.
  // camera-video uses Media3MuxerImpl at runtime but declares media3-muxer as
  // optional, so the resolution strategy alone won't include it in the APK.
  config = withAppBuildGradle(config, (config) => {
    if (!config.modResults.contents.includes(media3MuxerDep.trim())) {
      config.modResults.contents = config.modResults.contents.replace(
        /(\bdependencies\s*\{)/,
        `$1\n${media3MuxerDep}`
      );
    }
    return config;
  });

  return config;
};
