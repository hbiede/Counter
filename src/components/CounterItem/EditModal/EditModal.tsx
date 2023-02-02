import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  AccessibilityInfo,
  findNodeHandle,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { Animation } from 'react-native-animatable';

import { MaterialIcons } from '@expo/vector-icons';

import useStyle from 'Components/ThemeProvider/useStyle';

import useTheme from 'Components/ThemeProvider/useTheme';

import EditModalStyles from './EditModal.style';

export const ModalState = {
  NONE: 'None',
  TITLE: 'Title',
  INCREMENT: 'Increment',
} as const;

type Props = {
  backButtonCallback?: () => void;
  error: string | null;
  isVisible: boolean;
  onSave: (newValue: string) => void;
  type?: (typeof ModalState)[keyof typeof ModalState];
  value?: string;
};

const EditModal = ({
  backButtonCallback = () => {},
  error,
  isVisible,
  onSave,
  type = ModalState.NONE,
  value: propValue = '',
}: Props): JSX.Element => {
  const style = useStyle(EditModalStyles);
  const theme = useTheme();

  const [value, setValue] = useState(propValue);
  const onValueChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );
  const invertValue = useCallback(() => {
    if (value) {
      if (value?.startsWith('-')) {
        setValue(value.slice(1));
      } else {
        setValue(`-${value}`);
      }
    } else {
      setValue('1');
    }
  }, [value]);

  useEffect(() => {
    setValue(propValue);
  }, [propValue]);

  const onSaveCallback = useCallback(() => onSave(value), [onSave, value]);

  const [selectTextOnFocus, setSelectTextOnFocus] = useState(true);
  useEffect(() => {
    AccessibilityInfo.isScreenReaderEnabled().then((result) =>
      setSelectTextOnFocus(!result),
    );
  }, []);
  const [animationTime, setAnimationTime] = useState(300);
  const [animation, setAnimation] = useState<{
    animateIn?: Animation;
    animateOut?: Animation;
  }>({
    animateIn: undefined,
    animateOut: undefined,
  });
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then((result) => {
      setAnimationTime(result ? 500 : 300);
      setAnimation(
        result
          ? {
              animateIn: 'fadeIn' as const,
              animateOut: 'fadeOut' as const,
            }
          : {
              animateIn: undefined,
              animateOut: undefined,
            },
      );
    });
  }, []);

  const errorViewRef = useRef<View>(null);
  const focusErrorOnAccessibility = useCallback(() => {
    if (errorViewRef.current) {
      const reactTag = findNodeHandle(errorViewRef.current);
      if (reactTag) {
        AccessibilityInfo.setAccessibilityFocus(reactTag);
      }
    }
  }, []);

  return (
    <SafeAreaView>
      <Modal
        accessibilityViewIsModal
        animationIn={animation.animateIn}
        animationInTiming={animationTime}
        animationOut={animation.animateOut}
        animationOutTiming={animationTime}
        isVisible={isVisible}
        onAccessibilityEscape={backButtonCallback}
        onBackButtonPress={backButtonCallback}
        style={style.modalContainer}
      >
        <KeyboardAvoidingView style={style.container}>
          <View>
            <View style={style.headerRow}>
              <TouchableOpacity
                style={style.headerButtonContainer}
                onPress={backButtonCallback}
                accessible
                accessibilityLabel={value === propValue ? 'Back' : 'Cancel'}
              >
                <MaterialIcons
                  name={value === propValue ? 'chevron-left' : 'close'}
                  style={style.headerButton}
                />
              </TouchableOpacity>
              <Text style={style.titleText} accessible={false}>
                Set {type}
              </Text>
              <TouchableOpacity
                style={style.headerButtonContainer}
                onPress={onSaveCallback}
                accessible
                accessibilityLabel={`Confirm ${type}`}
              >
                <MaterialIcons name="check" style={style.headerButton} />
              </TouchableOpacity>
            </View>
            <View style={style.textInputContainer}>
              <TextInput
                keyboardType={type === 'Increment' ? 'number-pad' : 'default'}
                onSubmitEditing={onSaveCallback}
                onChangeText={onValueChange}
                placeholder={propValue}
                placeholderTextColor={`${theme.colors.text}88`}
                value={value}
                allowFontScaling
                selectTextOnFocus={selectTextOnFocus}
                style={style.textInput}
              />
            </View>
            {error && (
              <View
                style={style.errorContainer}
                accessibilityLiveRegion="assertive"
                accessibilityRole="alert"
                ref={errorViewRef}
                onLayout={focusErrorOnAccessibility}
              >
                <Text style={style.errorText}>{error}</Text>
              </View>
            )}
          </View>
          {type === ModalState.INCREMENT && (
            <TouchableOpacity
              style={style.invertButton}
              onPress={invertValue}
              accessibilityLabel="Invert value"
              accessibilityHint="Multiply the increment value by -1"
            >
              <Text style={style.invertButtonText} accessible={false}>
                +/-
              </Text>
            </TouchableOpacity>
          )}
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

export default EditModal;
