import React from 'react';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';
import { AppearanceProvider } from 'react-native-appearance';

import { PersistGate } from 'redux-persist/integration/react';

import { SafeAreaProvider } from 'react-native-safe-area-context/src/SafeAreaContext';

import CounterScreen from 'Screens/CounterScreen/CounterScreen';

import ThemeProvider from 'Components/ThemeProvider/ThemeProvider';

import AppReducer from 'Redux/modules/reducer';

const App = (): JSX.Element => {
  const { persistor, store } = AppReducer;
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <AppearanceProvider>
            <ThemeProvider>
              <CounterScreen />
            </ThemeProvider>
          </AppearanceProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

registerRootComponent(App);
export default App;
