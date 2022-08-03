// Enum action types.
import { ThemeActionTypes } from './theme-actions-types.enum';

// Interfaces.
import { PaletteMode } from '@/modules/theme/interfaces';

/** Actions definitions */
interface IThemeToggleMode {
  type: typeof ThemeActionTypes.TOGGLE_MODE;
}

interface IThemeSetMode {
  type: typeof ThemeActionTypes.SET_THEME_MODE;
  payload: PaletteMode;
}

/** Union action types */
export type ThemeActions = IThemeToggleMode | IThemeSetMode;

/** Actions creators */
export const theme_actionToggleMode = (): IThemeToggleMode => ({
  type: ThemeActionTypes.TOGGLE_MODE,
});

export const theme_setMode = (payload: PaletteMode): IThemeSetMode => ({
  type: ThemeActionTypes.SET_THEME_MODE,
  payload,
});
