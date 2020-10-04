import { Dimensions, ViewStyle } from 'react-native';

import { ThemeType } from 'Components/ThemeProvider/DefaultTheme';

const { height, width } = Dimensions.get('window');

type Style = {
  container: ViewStyle;
};

const style = (theme: ThemeType): Style => ({
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    flex: 1,
    height,
    justifyContent: 'center',
    width,
  },
});

export default style;
