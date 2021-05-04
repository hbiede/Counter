import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MaterialIcons } from '@expo/vector-icons';

import useStyle from 'Components/ThemeProvider/useStyle';

import useTheme from 'Components/ThemeProvider/useTheme';

import EditModalStyles from './EditModal.style';

type Props = {
  backButtonCallback?: () => void;
  error: string | null;
  isVisible: boolean;
  onSave: (newValue: string) => void;
  type?: string;
  value?: string;
};

const EditModal = ({
  backButtonCallback = () => {},
  error,
  isVisible,
  onSave,
  type = '',
  value: propValue = '',
}: Props): JSX.Element => {
  const style = useStyle(EditModalStyles);
  const theme = useTheme();
  const { top: topMargin } = useSafeAreaInsets();

  const [value, setValue] = useState(propValue);
  const onValueChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );
  useEffect(() => {
    setValue(propValue);
  }, [propValue]);

  const onSaveCallback = useCallback(() => onSave(value), [onSave, value]);

  return (
    <SafeAreaView>
      <Modal
        isVisible={isVisible}
        style={[style.container, { marginTop: topMargin }]}
        onBackButtonPress={backButtonCallback}
      >
        <View style={style.headerRow}>
          <TouchableOpacity
            style={style.headerButtonContainer}
            onPress={backButtonCallback}
          >
            <MaterialIcons
              name={value === propValue ? 'chevron-left' : 'close'}
              style={style.headerButton}
            />
          </TouchableOpacity>
          <Text style={style.titleText}>Set {type}</Text>
          <TouchableOpacity
            style={style.headerButtonContainer}
            onPress={onSaveCallback}
          >
            <MaterialIcons name="check" style={style.headerButton} />
          </TouchableOpacity>
        </View>
        <View style={style.textInputContainer}>
          <TextInput
            keyboardType={type === 'Increment' ? 'numeric' : 'default'}
            onSubmitEditing={onSaveCallback}
            onChangeText={onValueChange}
            placeholder={propValue}
            placeholderTextColor={`${theme.colors.text}88`}
            value={value}
            allowFontScaling
            selectTextOnFocus
            style={style.textInput}
          />
        </View>
        {error && (
          <View style={style.errorContainer}>
            <Text style={style.errorText}>{error}</Text>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
};

export default EditModal;
