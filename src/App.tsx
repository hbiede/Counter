import React from 'react';
import { Provider } from 'react-redux';

import {
  lockAsync,
  OrientationLock,
  supportsOrientationLockAsync,
} from 'expo-screen-orientation';

import { PersistGate } from 'redux-persist/integration/react';

import { SafeAreaProvider } from 'react-native-safe-area-context/src/SafeAreaContext';

import { Platform } from 'react-native';

import CounterScreen from 'Screens/CounterScreen/CounterScreen';

import ThemeProvider from 'Components/ThemeProvider/ThemeProvider';

import AppReducer from 'Redux/modules/reducer';

const App = (): JSX.Element => {
  const { persistor, store } = AppReducer;
  if (!(Platform.OS === 'ios' && Platform.isPad)) {
    supportsOrientationLockAsync(OrientationLock.PORTRAIT_UP).then(
      (supported) => {
        if (supported) void lockAsync(OrientationLock.PORTRAIT_UP);
      },
    );
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <ThemeProvider>
            <CounterScreen />
          </ThemeProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
