import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);
