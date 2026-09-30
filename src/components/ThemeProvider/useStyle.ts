import { useRef } from 'react';
import type {
  ImageStyle as SMImageStyle,
  TextStyle as SMTextStyle,
  ViewStyle as SMViewStyle,
} from 'react-native-size-matters';
import { ScaledSheet } from 'react-native-size-matters';
import memoizeOne from 'memoize-one';
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';

import useTheme from 'Components/ThemeProvider/useTheme';
import type { ThemeType } from 'Components/ThemeProvider/DefaultTheme';

import NamedStyles = StyleSheet.NamedStyles;

type StyleFunc<S> = ((theme: ThemeType) => S) | S;

/**
 * The result of computing and flattening a style sheet object
 *
 * @see StyleProp
 */
type Style<T extends NamedStyles<T>> = ReturnType<typeof ScaledSheet.create<T>>;

/**
 * Styles for a text-displaying component
 */
export type StrTextStyle = TextStyle | SMTextStyle;

/**
 * Styles for a container-type component
 */
export type StrViewStyle = Omit<ViewStyle, keyof SMViewStyle> &
  Omit<SMViewStyle, Exclude<keyof SMViewStyle, keyof ViewStyle>>;

/**
 * Styles for an image-based component
 */
export type StrImageStyle = Omit<ImageStyle, keyof SMImageStyle> &
  Omit<SMImageStyle, Exclude<keyof SMImageStyle, keyof ImageStyle>>;

const getStyles = <S extends NamedStyles<unknown>>(
  styles: StyleFunc<S>,
  theme: ThemeType,
): S => {
  if (styles instanceof Function) {
    return styles(theme);
  }

  if (styles !== null) {
    return styles;
  }
  return {} as S;
};

const useStyle = <T, S extends NamedStyles<T>>(style: StyleFunc<S>): Style<S> =>
  useRef(memoizeOne(ScaledSheet.create)).current(
    getStyles<S>(style, useTheme()),
  ) as unknown as Style<S>;

export default useStyle;
