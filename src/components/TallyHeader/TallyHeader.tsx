import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useStyle from 'Components/ThemeProvider/useStyle';
import useTheme from 'Components/ThemeProvider/useTheme';

import TallyHeaderStyles from './TallyHeader.style';

type Props = {
  addCounterCallback?: () => void;
  isEditing?: boolean;
  isEmpty?: boolean;
  onSetEditing: () => void;
};

const TallyHeader = ({
  addCounterCallback = () => {},
  isEditing,
  isEmpty,
  onSetEditing,
}: Props): JSX.Element => {
  const style = useStyle(TallyHeaderStyles);
  const theme = useTheme();

  const { top } = useSafeAreaInsets();

  const leftButton = isEmpty ? (
    <MaterialIcons
      name="info"
      size={30}
      style={{ opacity: 0 }}
      accessibilityElementsHidden={false}
    />
  ) : (
    <TouchableOpacity onPress={onSetEditing} accessibilityRole="imagebutton">
      <MaterialIcons
        name={isEditing ? 'check' : 'edit'}
        color={theme.colors.primary}
        size={30}
        accessibilityLabel={isEditing ? 'Confirm counters' : 'Edit counters'}
      />
    </TouchableOpacity>
  );

  const rightButton =
    !isEmpty && !isEditing ? (
      <TouchableOpacity
        onPress={addCounterCallback}
        accessibilityRole="imagebutton"
      >
        <MaterialIcons
          name="add"
          color={theme.colors.primary}
          size={35}
          accessibilityLabel="Add counter"
        />
      </TouchableOpacity>
    ) : (
      <MaterialIcons
        name="add"
        color={theme.colors.primary}
        size={35}
        style={{ opacity: 0 }}
        accessibilityElementsHidden={false}
      />
    );

  return (
    <>
      <View style={style.shadowContainer} accessibilityRole="header">
        <View
          style={[
            style.container,
            {
              paddingTop: top,
            },
          ]}
        >
          {leftButton}
          <Text style={style.title} accessible={false}>
            Counter
          </Text>
          {rightButton}
        </View>
      </View>
    </>
  );
};

export default TallyHeader;
