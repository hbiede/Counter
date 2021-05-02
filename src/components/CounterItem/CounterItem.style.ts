import { Dimensions } from 'react-native';

import { ThemeType } from 'Components/ThemeProvider/DefaultTheme';
import { StrTextStyle, StrViewStyle } from 'Components/ThemeProvider/useStyle';

type Style = {
  background: StrViewStyle;
  detail: StrTextStyle;
  removeButton: StrTextStyle;
  removeButtonContra: StrTextStyle;
  tally: StrTextStyle;
};

const headerSpace = 50;
const footerSpace = 100;

const style = (divisionCount: 1 | 2 | 3 | 4) => (theme: ThemeType): Style => {
  const { height, width } = Dimensions.get('window');
  const adjustedHeight = height - headerSpace - footerSpace;
  return {
    background: {
      alignItems: 'center',
      borderColor: theme.colors.border,
      borderRadius: 20,
      borderWidth: 1,
      backgroundColor: theme.colors.background,
      height: Math.floor(adjustedHeight / divisionCount),
      justifyContent: 'space-between',
      marginBottom: 10,
      width: width - 20,

      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    detail: {
      color: theme.colors.primary,
      fontSize: '25@ms0.2',
      lineHeight: '30@ms0.2',
      textAlign: 'center',
    },
    removeButton: {
      position: 'absolute',
      right: 25,
    },
    removeButtonContra: {
      left: 25,
      opacity: 0,
      position: 'absolute',
    },
    tally: {
      color: theme.colors.secondary,
      fontSize: '100@ms0.2',
      lineHeight: '110@ms0.2',
      maxWidth: width - 30,
      textAlign: 'center',
    },
  };
};

export default style;
