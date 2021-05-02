import React, { useCallback } from 'react';
import { Alert, Platform, Text, TouchableOpacity, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { useDispatch } from 'react-redux';

import CounterItemStyle from 'Components/CounterItem/CounterItem.style';
import useStyle from 'Components/ThemeProvider/useStyle';
import { Counter } from 'Statics/Types';
import { removeCounter, updateCounter } from 'Redux/modules/counters';
import useTheme from 'Components/ThemeProvider/useTheme';

type Props = {
  data: Counter;
  division?: 1 | 2 | 3 | 4;
  isEditing?: boolean;
};

const CounterItem = ({ data, division = 1, isEditing }: Props): JSX.Element => {
  const dispatch = useDispatch();

  const onTap = useCallback(
    () =>
      dispatch(
        updateCounter({
          ...data,
          tally: data.tally + data.increment,
        }),
      ),
    [data, dispatch],
  );
  const onReset = useCallback(
    () =>
      dispatch(
        updateCounter({
          ...data,
          tally: 0,
        }),
      ),
    [data, dispatch],
  );
  const onRemove = useCallback(() => dispatch(removeCounter(data)), [
    data,
    dispatch,
  ]);
  const onSetName = useCallback(
    (newName: string | undefined) => {
      if (newName && newName !== data.name) {
        dispatch(
          updateCounter({
            ...data,
            name: newName,
          }),
        );
      }
    },
    [data, dispatch],
  );
  const onEditTitle = useCallback(() => {
    Alert.prompt(
      'Counter Name',
      undefined,
      [
        {
          text: 'Ok',
          onPress: onSetName,
          style: 'default',
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      'plain-text',
      `${data.name}`,
    );
  }, [data.name, onSetName]);
  const onSetIncrement = useCallback(
    (newInc: string | undefined) => {
      const parsedInc = Number.parseInt(newInc ?? '0', 10);
      if (
        parsedInc &&
        !Number.isNaN(parsedInc) &&
        Number.isFinite(parsedInc) &&
        parsedInc > 0 &&
        parsedInc !== data.increment
      ) {
        dispatch(
          updateCounter({
            ...data,
            increment: parsedInc,
          }),
        );
      }
    },
    [data, dispatch],
  );
  const onEditIncrement = useCallback(() => {
    Alert.prompt(
      'Counter Increment',
      undefined,
      [
        {
          text: 'Ok',
          onPress: onSetIncrement,
          style: 'default',
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      'plain-text',
      `${data.increment}`,
      'number-pad',
    );
  }, [data.increment, onSetIncrement]);

  const style = useStyle(
    CounterItemStyle(Math.min(4, division) as 1 | 2 | 3 | 4),
  );
  const theme = useTheme();

  if (isEditing) {
    return (
      <View style={style.background} accessible>
        <TouchableOpacity
          onPress={onEditTitle}
          style={{ paddingHorizontal: 10 }}
          hitSlop={{
            top: 20,
            left: 20,
            bottom: 20,
            right: 20,
          }}
        >
          <Text style={style.detail}>{data.name}</Text>
        </TouchableOpacity>
        <View
          style={{
            alignContent: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <MaterialIcons
            name="close"
            size={45}
            style={style.removeButtonContra}
          />
          <Text style={style.tally}>
            {data.tally > 1e5 ? data.tally.toPrecision(3) : data.tally}
          </Text>
          <TouchableOpacity style={style.removeButton} onPress={onRemove}>
            <MaterialIcons
              name="close"
              size={45}
              color={theme.colors.secondary}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={onEditIncrement}
          style={{
            paddingHorizontal: 10,
            opacity: Platform.OS === 'ios' ? 1 : 0,
          }}
          hitSlop={{
            top: 20,
            left: 20,
            bottom: 20,
            right: 20,
          }}
        >
          <Text style={style.detail}>{data.increment}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={onTap}
      style={style.background}
      onLongPress={onReset}
      delayLongPress={1000}
    >
      <Text style={style.detail}>{data.name}</Text>
      <View
        style={{
          alignContent: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Text style={style.tally}>
          {data.tally > 1e5 ? data.tally.toPrecision(3) : data.tally}
        </Text>
      </View>
      <Text style={[style.detail, { opacity: 0 }]}>{data.increment}</Text>
    </TouchableOpacity>
  );
};

export default CounterItem;
