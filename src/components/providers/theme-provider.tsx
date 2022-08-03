import React, { FC, PropsWithChildren, ReactNode, useMemo } from 'react';

// Hooks.
import { useAppSelector } from '@/store';

// Theme context.
import { themeContext as ThemeContext } from '@/modules/theme/context';

// Utils
import { createTheme } from '@/modules/theme/utils';

// Selectors.
import { theme_rootSelector } from '@/modules/theme/redux';

// Interfaces.
import { ITheme } from '@/modules/theme/interfaces';

export const ThemeProvider: FC<PropsWithChildren<ReactNode>> = ({ children }) => {
  /**
   * NOTES:
   * This component should be wrapped inside Redux Context Provider.
   */
  const { mode } = useAppSelector((state) => theme_rootSelector(state));
  const theme = useMemo<ITheme>(() => createTheme(mode), [mode]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};
