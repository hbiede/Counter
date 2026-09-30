import { useContext } from 'react';

import type { ThemeType } from './DefaultTheme';
import { ThemeContext } from './ThemeProvider';

export default (): ThemeType => useContext(ThemeContext);
