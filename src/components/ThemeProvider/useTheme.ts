import { useContext } from 'react';

import { ThemeType } from './DefaultTheme';
import { ThemeContext } from './ThemeProvider';

export default (): ThemeType => useContext(ThemeContext);
