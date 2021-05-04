import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useStyle from 'Components/ThemeProvider/useStyle';
import useTheme from 'Components/ThemeProvider/useTheme';
import { appendCounter } from 'Redux/modules/counters';

import TallyHeaderStyles from './TallyHeader.style';

type Props = {
  isEditing?: boolean;
  isEmpty?: boolean;
  onSetEditing: () => void;
};

const TallyHeader = ({
  isEditing,
  isEmpty,
  onSetEditing,
}: Props): JSX.Element => {
  const dispatch = useDispatch();
  const addCounterCallback = useCallback(() => {
    dispatch(appendCounter());
  }, [dispatch]);

  const style = useStyle(TallyHeaderStyles);
  const theme = useTheme();

  const { top } = useSafeAreaInsets();

  const leftButton = isEmpty ? (
    <MaterialIcons name="info" size={30} style={{ opacity: 0 }} />
  ) : (
    <TouchableOpacity onPress={onSetEditing}>
      <MaterialIcons name="edit" color={theme.colors.primary} size={30} />
    </TouchableOpacity>
  );

  const rightButton =
    !isEmpty && !isEditing ? (
      <TouchableOpacity onPress={addCounterCallback}>
        <MaterialIcons name="add" color={theme.colors.primary} size={35} />
      </TouchableOpacity>
    ) : (
      <MaterialIcons
        name="add"
        color={theme.colors.primary}
        size={35}
        style={{ opacity: 0 }}
      />
    );

  return (
    <>
      <View style={style.shadowContainer}>
        <View
          style={[
            style.container,
            {
              paddingTop: top,
            },
          ]}
        >
          {leftButton}
          <Text style={style.title}>Counter</Text>
          {rightButton}
        </View>
      </View>
    </>
  );
};

export default TallyHeader;
