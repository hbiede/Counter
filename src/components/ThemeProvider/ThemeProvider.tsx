import React, { ReactElement, PropsWithChildren, useMemo } from 'react';

import { useColorScheme } from 'react-native';

import { darkTheme, lightTheme, ThemeType } from './DefaultTheme';

const ThemeContext = React.createContext(lightTheme);

type Props = {
  theme?: ThemeType;
};

const ThemeProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
  theme,
}): ReactElement => {
  const colorScheme = useColorScheme();
  const currentTheme = useMemo((): ThemeType => {
    if (theme === undefined) {
      return colorScheme === 'dark' ? darkTheme : lightTheme;
    }
    return theme;
  }, [colorScheme, theme]);

  return (
    <ThemeContext.Provider value={currentTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
export { ThemeContext };
