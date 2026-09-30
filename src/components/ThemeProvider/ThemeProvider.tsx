import type { ReactElement, PropsWithChildren } from 'react';
import React, { useMemo } from 'react';

import { useColorScheme } from 'react-native';

import type { ThemeType } from './DefaultTheme';
import { darkTheme, lightTheme } from './DefaultTheme';

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
