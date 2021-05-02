export type ThemeType = {
  colors: {
    accentBackground: `#${string}`;
    background: `#${string}`;
    border: `#${string}`;
    primary: `#${string}`;
    secondary: `#${string}`;
  };
};

export const lightTheme: ThemeType = {
  colors: {
    accentBackground: '#D9D9D9',
    background: '#f2f2f2',
    border: '#cccccc',
    primary: '#2262B4',
    secondary: '#000000',
  },
};

export const darkTheme: ThemeType = {
  colors: {
    accentBackground: '#353636',
    background: '#000000',
    border: '#cccccc',
    primary: '#2262B4',
    secondary: '#ffffff',
  },
};
