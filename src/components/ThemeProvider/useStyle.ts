import { useRef } from 'react';
import { ScaledSheet, StringifiedStyles } from 'react-native-size-matters';
import memoizeOne from 'memoize-one';
import {
  ImageStyle,
  RegisteredStyle,
  TextStyle,
  ViewStyle,
} from 'react-native';

import useTheme from 'Components/ThemeProvider/useTheme';
import { ThemeType } from 'Components/ThemeProvider/DefaultTheme';

type StyleFunc<S> = ((theme: ThemeType) => S) | S;

/**
 * The result of computing and flattening a style sheet object
 *
 * @see RegisteredStyle
 */
type Style<T> = {
  [P in keyof T]: RegisteredStyle<
    T[P] & Record<Extract<keyof T[P], keyof StringifiedStyles>, number>
  >;
};

/**
 * Styles for a text-displaying component
 */
export type StrTextStyle = TextStyle | StringifiedStyles;

/**
 * Styles for a container-type component
 */
export type StrViewStyle = Omit<ViewStyle, keyof StringifiedStyles> &
  Omit<StringifiedStyles, Exclude<keyof StringifiedStyles, keyof ViewStyle>>;

/**
 * Styles for an image-based component
 */
export type StrImageStyle = Omit<ImageStyle, keyof StringifiedStyles> &
  Omit<StringifiedStyles, Exclude<keyof StringifiedStyles, keyof ImageStyle>>;

const getStyles = <S>(styles: StyleFunc<S>, theme: ThemeType): S => {
  if (styles instanceof Function) {
    return styles(theme);
  }

  if (styles !== null && styles instanceof Object) {
    return styles;
  }
  return {} as S;
};

const useStyle = <S>(style: StyleFunc<S>): Style<S> =>
  useRef(memoizeOne(ScaledSheet.create)).current(
    getStyles<S>(style, useTheme()),
  );

export default useStyle;
