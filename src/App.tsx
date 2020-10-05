import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';
import { AppearanceProvider } from 'react-native-appearance';

import CounterScreen from 'Screens/CounterScreen/CounterScreen';

import ThemeProvider from 'Components/ThemeProvider/ThemeProvider';

import AppReducer from 'Redux/modules/reducer';

const App = (): JSX.Element => {
  const store = createStore(AppReducer);
  return (
    <Provider store={store}>
      <AppearanceProvider>
        <ThemeProvider>
          <CounterScreen />
        </ThemeProvider>
      </AppearanceProvider>
    </Provider>
  );
};

registerRootComponent(App);
export default App;
