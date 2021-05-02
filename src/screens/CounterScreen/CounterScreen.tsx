import { FlatList, TouchableOpacity, useColorScheme, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { MaterialIcons } from '@expo/vector-icons';

import { StatusBar } from 'expo-status-bar';

import CounterScreenStyle from 'Screens/CounterScreen/CounterScreen.style';

import useStyle from 'Components/ThemeProvider/useStyle';
import { CounterItem } from 'Components/CounterItem';
import { TallyHeader } from 'Components/TallyHeader';
import { AppReduxState } from 'Redux/modules/reducer';
import { appendCounter } from 'Redux/modules/counters';
import useTheme from 'Components/ThemeProvider/useTheme';

const CounterScreen = (): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);
  const onSetEditing = useCallback(() => setIsEditing(!isEditing), [isEditing]);

  const counters = useSelector(
    (state: AppReduxState) => state.counters.counters,
  );

  useEffect(() => {
    if (counters.length === 0 && isEditing) {
      setIsEditing(false);
    }
  }, [isEditing, counters]);

  const dispatch = useDispatch();
  const addCounterCallback = useCallback(() => {
    dispatch(appendCounter());
  }, [dispatch]);

  const style = useStyle(CounterScreenStyle);
  const theme = useTheme();
  const colorScheme = useColorScheme();
  if (counters.length === 0) {
    return (
      <View style={style.safeAreaContainer}>
        <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />
        <TallyHeader
          onSetEditing={onSetEditing}
          isEditing={isEditing}
          isEmpty={counters.length === 0}
        />
        <View style={style.emptyContainer}>
          <TouchableOpacity
            onPress={addCounterCallback}
            style={style.addButton}
          >
            <MaterialIcons
              name="add"
              color={theme.colors.background}
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={style.safeAreaContainer}>
      <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />
      <TallyHeader
        onSetEditing={onSetEditing}
        isEditing={isEditing}
        isEmpty={counters.length === 0}
      />
      <FlatList
        contentContainerStyle={style.container}
        data={counters}
        keyExtractor={(counter) => counter.key}
        scrollEnabled={counters.length > 4}
        renderItem={({ item }) => (
          <CounterItem
            data={item}
            division={Math.min(4, counters.length) as 1 | 2 | 3 | 4}
            isEditing={isEditing}
          />
        )}
        initialNumToRender={6}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

export default CounterScreen;
