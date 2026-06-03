const { withProjectBuildGradle, withAppBuildGradle } = require('@expo/config-plugins');

// Forces media3-exoplayer and related modules to the version expo-video was compiled against.
// react-native-vision-camera (CameraX 1.7.0-alpha01) transitively pulls in a
// newer media3 that changed the LoadControl.getAllocator() signature, causing
// AbstractMethodError at runtime in VideoPlayerLoadControl.
// NOTE: media3-muxer must NOT be pinned to 1.8.0 — camera-video:1.7.0-alpha01 requires
// media3-muxer:1.9.0 for MediaMuxerCompat (introduced in 1.9.0). Forcing it to 1.8.0
// causes NoClassDefFoundError: MediaMuxerCompat at runtime when recording video.
const MEDIA3_VERSION = '1.8.0';
const MEDIA3_MUXER_VERSION = '1.9.0';

// Only pin the exoplayer-family modules that expo-video's VideoPlayerLoadControl
// implements against. media3-muxer and media3-common are intentionally excluded.
const MEDIA3_MODULES = [
  'media3-exoplayer',
  'media3-exoplayer-dash',
  'media3-exoplayer-hls',
  'media3-session',
  'media3-ui',
  'media3-datasource-okhttp',
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
            force "androidx.media3:media3-muxer:${MEDIA3_MUXER_VERSION}"
            force "org.jetbrains.kotlin:kotlin-stdlib:${KOTLIN_VERSION}"
            force "org.jetbrains.kotlin:kotlin-stdlib-jdk7:${KOTLIN_VERSION}"
            force "org.jetbrains.kotlin:kotlin-stdlib-jdk8:${KOTLIN_VERSION}"
            force "org.jetbrains.kotlinx:kotlinx-coroutines-android:${COROUTINES_VERSION}"
            force "org.jetbrains.kotlinx:kotlinx-coroutines-core:${COROUTINES_VERSION}"
        }
    }
}
`;

const media3MuxerDep = `    implementation "androidx.media3:media3-muxer:${MEDIA3_MUXER_VERSION}"`;

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
