import { ThemeType } from 'Components/ThemeProvider/DefaultTheme';
import useTheme from 'Components/ThemeProvider/useTheme';

type StyleFunc<S> = ((theme: ThemeType) => S) | S;

const getStyles = <S>(styles: StyleFunc<S>, theme: ThemeType): S => {
  if (styles instanceof Function) {
    return styles(theme);
  }

  if (styles !== null && styles instanceof Object) {
    return styles;
  }
  return {} as S;
};

const useStyle = <S>(style: StyleFunc<S>): S => getStyles<S>(style, useTheme());

export default useStyle;
