import { createContext } from 'react';

// Interfaces.
import { ITheme } from '@/modules/theme/interfaces';

export const themeContext = createContext<ITheme>({} as ITheme);
