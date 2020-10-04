import { View } from 'react-native';
import React from 'react';

import CounterScreenStyle from 'Screens/CounterScreen/CounterScreen.style';

import useStyle from 'Components/ThemeProvider/useStyle';
import CounterItem from 'Components/CounterItem/CounterItem';

const CounterScreen = (): JSX.Element => {
  const styles = useStyle(CounterScreenStyle);
  return (
    <View style={styles.container}>
      <CounterItem count={1} />
    </View>
  );
};

export default CounterScreen;
