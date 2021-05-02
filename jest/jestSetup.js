import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
