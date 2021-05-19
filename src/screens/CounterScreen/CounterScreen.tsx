import { FlatList, TouchableOpacity, useColorScheme, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { MaterialIcons } from '@expo/vector-icons';

import { StatusBar } from 'expo-status-bar';

import CounterScreenStyle from 'Screens/CounterScreen/CounterScreen.style';

import useStyle from 'Components/ThemeProvider/useStyle';
import { CounterItem } from 'Components/CounterItem';
import { TallyHeader } from 'Components/TallyHeader';

import { AppReduxState } from 'Redux/modules/reducer';
import { appendCounter, defaultCounter } from 'Redux/modules/counters';
import { Counter } from 'Statics/Types';

const CounterScreen = (): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);
  const onSetEditing = useCallback(() => setIsEditing(!isEditing), [isEditing]);

  const counters = useSelector(
    (state: AppReduxState) => state.counters.counters,
  );

  const listRef = useRef<FlatList<Counter>>(null);
  useEffect(() => {
    if (counters.length === 4 && listRef.current) {
      listRef.current.scrollToOffset({
        animated: true,
        offset: 0,
      });
    }
  }, [counters]);

  useEffect(() => {
    if (counters.length === 0 && isEditing) {
      setIsEditing(false);
    }
  }, [isEditing, counters]);

  const dispatch = useDispatch();
  const addCounterCallback = useCallback(() => {
    let newName: string | undefined;
    if (counters.find(({ name }) => defaultCounter.name === name)) {
      const regexMatch = new RegExp(
        `${defaultCounter.name.toLocaleLowerCase()} \\((\\d+)\\)`,
      );
      newName = `${defaultCounter.name} (${
        Math.max(
          ...counters.map(({ name }) => {
            const match = regexMatch.exec(name.toLocaleLowerCase());
            return match ? Number.parseInt(match[1], 10) : 0;
          }),
        ) + 1
      })`;
    }
    dispatch(appendCounter({ name: newName }));
  }, [counters, dispatch]);

  const style = useStyle(CounterScreenStyle);
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
            accessibilityLabel="Add a counter"
          >
            <MaterialIcons name="add" color="#FFFFFF" size={30} />
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
        addCounterCallback={addCounterCallback}
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
        ListHeaderComponent={
          counters.length > 0 ? <View style={{ height: 10 }} /> : null
        }
        initialNumToRender={6}
        keyboardShouldPersistTaps="handled"
        ref={listRef}
      />
    </View>
  );
};

export default CounterScreen;
