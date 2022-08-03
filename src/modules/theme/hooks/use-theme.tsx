import { useContext } from 'react';
import { themeContext } from '@/modules/theme/context';
import { ITheme } from '@/modules/theme/interfaces';

type UseTheme = ITheme;

export const useTheme = (): UseTheme => {
  const theme = useContext(themeContext);
  return theme;
};
