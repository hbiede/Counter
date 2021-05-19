import { ExpoConfig, ConfigContext } from '@expo/config';

// noinspection JSUnusedGlobalSymbols
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Counter - Counting Utility',
  description: 'Quick and Versatile Counter',
  githubUrl: 'https://github.com/hbiede/Counter',
  slug: 'Counter',
  entryPoint: 'src/App.tsx',
  privacy: 'public',
  platforms: ['ios', 'android'],
  version: '1.2.0',
  orientation: 'default',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#2262B4',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.hbiede.Counter',
    requireFullScreen: false,
    userInterfaceStyle: 'automatic',
    buildNumber: '1',
  },
  android: {
    package: 'com.hbiede.Counter',
    versionCode: 10200,
    softwareKeyboardLayoutMode: 'resize',
  },
});
