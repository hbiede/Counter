export type ThemeType = {
  colors: {
    background: string;
    primary: string;
  };
};

export const lightTheme: ThemeType = {
  colors: {
    background: '#f2f2f2',
    primary: '#2262B4',
  },
};

export const darkTheme: ThemeType = {
  colors: {
    background: '#000000',
    primary: '#2262B4',
  },
};
