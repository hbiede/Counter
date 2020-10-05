import { View } from 'react-native';
import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import CounterScreenStyle from 'Screens/CounterScreen/CounterScreen.style';

import useStyle from 'Components/ThemeProvider/useStyle';
import CounterItem from 'Components/CounterItem/CounterItem';
import GetCounters from 'Redux/actions/GetCounters';

const CounterScreen = (): JSX.Element => {
  const dispatch = useDispatch();
  const styles = useStyle(CounterScreenStyle);

  useEffect(() => {
    GetCounters().then((action) => {
      dispatch(action);
    });
    // Only call on load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <CounterItem count={1} />
    </View>
  );
};

export default CounterScreen;
