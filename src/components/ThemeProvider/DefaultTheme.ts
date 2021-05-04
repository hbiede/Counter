import { useColorScheme } from 'react-native';

export type ThemeType = {
  colors: {
    accentBackground: `#${string}`;
    background: `#${string}`;
    border: `#${string}`;
    error: `#${string}`;
    errorText: `#${string}`;
    primary: `#${string}`;
    secondary: `#${string}`;
    text: `#${string}`;
  };
  currentTheme: ReturnType<typeof useColorScheme>;
};

export const lightTheme: ThemeType = {
  colors: {
    accentBackground: '#D9D9D9',
    background: '#f2f2f2',
    border: '#CCCCCC',
    error: '#F0B7AD',
    errorText: '#892615',
    primary: '#2262B4',
    secondary: '#000000',
    text: '#353636',
  },
  currentTheme: 'light',
};

export const darkTheme: ThemeType = {
  colors: {
    ...lightTheme.colors,
    accentBackground: '#353636',
    background: '#000000',
    primary: '#3A83E0',
    secondary: '#FFFFFF',
    text: '#FFFFFF',
  },
  currentTheme: 'dark',
};
