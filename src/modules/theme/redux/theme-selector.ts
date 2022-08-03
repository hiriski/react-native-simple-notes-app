import { RootState } from '@/store/root-reducer';
import { ThemeState } from '@/modules/theme/redux/theme-reducer';

export const theme_rootSelector = (state: RootState): ThemeState => state.theme;
