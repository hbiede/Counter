import React, { useCallback, useState } from 'react';
import {
  AccessibilityActionEvent,
  AccessibilityInfo,
  Alert,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics';

import { MaterialIcons } from '@expo/vector-icons';

import { useDispatch } from 'react-redux';

import CounterItemStyle from 'Components/CounterItem/CounterItem.style';
import useStyle from 'Components/ThemeProvider/useStyle';
import { Counter } from 'Statics/Types';
import { removeCounter, updateCounter } from 'Redux/modules/counters';
import useTheme from 'Components/ThemeProvider/useTheme';
import EditModal, {
  ModalState,
} from 'Components/CounterItem/EditModal/EditModal';

type Props = {
  data: Counter;
  division?: 1 | 2 | 3 | 4;
  isEditing?: boolean;
};

const CounterItem = ({ data, division = 1, isEditing }: Props): JSX.Element => {
  const dispatch = useDispatch();
  const [currentModalState, setModalState] = useState<
    typeof ModalState[keyof typeof ModalState]
  >(ModalState.NONE);
  const [error, setError] = useState<string | null>(null);

  const onTap = useCallback(() => {
    void impactAsync(ImpactFeedbackStyle.Light);
    dispatch(
      updateCounter({
        ...data,
        tally: data.tally + data.increment,
      }),
    );
  }, [data, dispatch]);
  const onReset = useCallback(() => {
    if (data.tally !== 0) {
      void impactAsync(ImpactFeedbackStyle.Heavy);
      Alert.alert('Reset?', 'Would you like to reset the count to zero?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            dispatch(
              updateCounter({
                ...data,
                tally: 0,
              }),
            );
          },
        },
      ]);
    }
  }, [data, dispatch]);

  const onRemove = useCallback(
    () => dispatch(removeCounter(data)),
    [data, dispatch],
  );

  const onBackPress = useCallback(() => {
    setModalState(ModalState.NONE);
    setError(null);
  }, []);

  const onSetName = useCallback(
    (newName: string | undefined) => {
      if (newName && newName !== data.name) {
        dispatch(
          updateCounter({
            ...data,
            name: newName,
          }),
        );
        setModalState(ModalState.NONE);
        setError(null);
      } else if (newName !== data.name) {
        setError('Invalid Title');
      } else {
        setModalState(ModalState.NONE);
      }
    },
    [data, dispatch],
  );
  const onEditTitle = useCallback(() => setModalState(ModalState.TITLE), []);

  const onSetIncrement = useCallback(
    (newInc: string | undefined) => {
      const parsedInc = Number.parseInt(newInc ?? '0', 10);
      if (
        parsedInc &&
        !Number.isNaN(parsedInc) &&
        Number.isFinite(parsedInc) &&
        parsedInc !== data.increment
      ) {
        dispatch(
          updateCounter({
            ...data,
            increment: parsedInc,
          }),
        );
        setModalState(ModalState.NONE);
        setError(null);
      } else if (parsedInc !== data.increment) {
        setError('Invalid Increment\n(Must be a whole number)');
        AccessibilityInfo.announceForAccessibility(
          'Failed to set increment. Increment must be a whole number',
        );
      } else {
        setModalState(ModalState.NONE);
        setError(null);
      }
    },
    [data, dispatch],
  );
  const onEditIncrement = useCallback(
    () => setModalState(ModalState.INCREMENT),
    [],
  );
  const onAccessibilityAction = useCallback(
    (event: AccessibilityActionEvent) => {
      // eslint-disable-next-line default-case
      switch (event.nativeEvent.actionName) {
        case 'increment':
          dispatch(
            updateCounter({
              ...data,
              tally: data.tally + data.increment,
            }),
          );
          break;
        case 'decrement':
          dispatch(
            updateCounter({
              ...data,
              tally: data.tally - data.increment,
            }),
          );
          break;
        case 'longpress':
        case 'longPress':
        case 'magicTap':
          dispatch(
            updateCounter({
              ...data,
              tally: 0,
            }),
          );
      }
    },
    [data, dispatch],
  );

  const style = useStyle(
    CounterItemStyle(Math.min(4, division) as 1 | 2 | 3 | 4),
  );
  const theme = useTheme();

  if (isEditing) {
    return (
      <>
        <EditModal
          backButtonCallback={onBackPress}
          error={error}
          isVisible={currentModalState !== ModalState.NONE}
          onSave={
            currentModalState === ModalState.TITLE ? onSetName : onSetIncrement
          }
          type={currentModalState}
          value={
            currentModalState === ModalState.TITLE
              ? data.name
              : `${data.increment}`
          }
        />
        <View style={style.background} accessible={false}>
          <TouchableOpacity
            onPress={onEditTitle}
            style={{ paddingHorizontal: 10 }}
            hitSlop={{
              top: 20,
              left: 20,
              bottom: 20,
              right: 20,
            }}
            accessibilityHint="Tap to edit counter name"
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
            <Text style={style.tally} accessible={false}>
              {data.tally > 1e5 ? data.tally.toPrecision(3) : data.tally}
            </Text>
            <TouchableOpacity
              style={style.removeButton}
              onPress={onRemove}
              accessible
              accessibilityLabel="Delete"
              accessibilityHint="Tap to delete counter"
            >
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
            }}
            hitSlop={{
              top: 20,
              left: 20,
              bottom: 20,
              right: 20,
            }}
          >
            <Text
              style={style.detail}
              accessibilityLabel={`increment count: ${data.increment}`}
              accessibilityRole="adjustable"
            >
              {data.increment}
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  return (
    <TouchableHighlight
      onPress={onTap}
      style={style.background}
      onLongPress={onReset}
      delayLongPress={1000}
      accessible
      onAccessibilityTap={onTap}
      onAccessibilityAction={onAccessibilityAction}
      accessibilityActions={[
        { name: 'increment' },
        { name: 'decrement' },
        { name: 'longPress' },
        { name: 'longpress' },
        { name: 'magicTap' },
      ]}
      accessibilityRole="adjustable"
      accessibilityLabel={`${data.name}. current count: ${Math.abs(
        data.tally,
      )}`}
    >
      <>
        <Text style={style.detail}>{data.name}</Text>
        <View
          style={{
            alignContent: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Text
            style={style.tally}
            accessibilityLabel={`current count: ${data.tally}`}
          >
            {data.tally > 1e5 ? data.tally.toPrecision(3) : data.tally}
          </Text>
        </View>
        <Text
          style={[style.detail, { opacity: 0 }]}
          accessible={false}
          accessibilityElementsHidden={false}
        >
          {data.increment}
        </Text>
      </>
    </TouchableHighlight>
  );
};

export default CounterItem;
