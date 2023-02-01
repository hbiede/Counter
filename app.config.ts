import { ExpoConfig } from '@expo/config-types';

const IS_INT_DEV = process.env.APP_VARIANT === 'internal_development';

const config: ExpoConfig = {
  name: IS_INT_DEV ? 'Expo Counter' : 'Counter',
  description: 'Quick and Versatile Counter',
  githubUrl: 'https://github.com/hbiede/Counter',
  slug: 'Counter',
  entryPoint: './index.js',
  privacy: 'public',
  platforms: ['ios', 'android'],
  version: '2.17.1',
  orientation: 'default',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#2262B4',
  },
  ios: {
    buildNumber: '1',
    bundleIdentifier: IS_INT_DEV
      ? 'com.hbiede.intDev.Counter'
      : 'com.hbiede.Counter',
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
      NSCameraUsageDescription:
        'The camera is used to scan QR codes/barcodes, and to capture images for transactions.',
      UIBackgroundModes: ['fetch'],
    },
    supportsTablet: true,
    requireFullScreen: false,
    userInterfaceStyle: 'automatic',
  },
  android: {
    package: IS_INT_DEV ? 'com.hbiede.intDev.Counter' : 'com.hbiede.Counter',
    softwareKeyboardLayoutMode: 'resize',
    versionCode: 10301,
  },
  assetBundlePatterns: [
    'resources/**',
    'submodules/wedgekit/resources/**',
    'submodules/wedgekit/**/resources/**',
  ],
  extra: {
    eas: {
      projectId: '2bc8e381-5b34-4f55-ab86-4bd2de63a06e',
    },
  },
  updates: {
    url: 'https://u.expo.dev/2bc8e381-5b34-4f55-ab86-4bd2de63a06e',
  },
  jsEngine: IS_INT_DEV ? 'jsc' : 'hermes',
  runtimeVersion: {
    policy: 'sdkVersion',
  },
};

export default config;
