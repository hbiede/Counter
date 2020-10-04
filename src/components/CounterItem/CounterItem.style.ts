import { Dimensions, TextStyle, ViewStyle } from 'react-native';

import { ThemeType } from 'Components/ThemeProvider/DefaultTheme';

type Style = {
  background: Record<number, ViewStyle>;
  text: TextStyle;
};

const { height, width } = Dimensions.get('window');

const headerSpace = 0;
const footerSpace = 0;
const adjustedHeight = height - headerSpace - footerSpace;

const style = (theme: ThemeType): Style => {
  const defaultBackground: ViewStyle = {
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    paddingVertical: 'auto',
    width,
  };
  return {
    background: {
      1: {
        ...defaultBackground,
        height: adjustedHeight,
      },
      2: {
        ...defaultBackground,
        height: Math.floor(adjustedHeight / 2),
      },
      3: {
        ...defaultBackground,
        height: Math.floor(adjustedHeight / 3),
      },
    },
    text: {
      fontSize: 100,
      color: theme.colors.primary,
    },
  };
};

export default style;
