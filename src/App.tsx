import React from 'react';
import { registerRootComponent } from 'expo';

import { AppearanceProvider } from 'react-native-appearance';

import CounterScreen from 'Screens/CounterScreen/CounterScreen';

import ThemeProvider from 'Components/ThemeProvider/ThemeProvider';

const App = (): JSX.Element => (
  <AppearanceProvider>
    <ThemeProvider>
      <CounterScreen />
    </ThemeProvider>
  </AppearanceProvider>
);

registerRootComponent(App);
export default App;
