// Action types.
import { ThemeActionTypes } from './theme-actions-types.enum';

// Union action types.
import { ThemeActions } from './theme-actions';

// Interfaces.
import type { PaletteMode } from '@/modules/theme/interfaces';

export interface ThemeState {
  mode: PaletteMode;
}

const initialState: ThemeState = {
  mode: 'light',
};

export const themeReducer = (state: ThemeState = initialState, action: ThemeActions): ThemeState => {
  switch (action.type) {
    case ThemeActionTypes.TOGGLE_MODE:
      return {
        ...state,
        mode: state.mode === 'dark' ? 'light' : 'dark',
      };

    case ThemeActionTypes.SET_THEME_MODE:
      return {
        ...state,
        mode: action.payload,
      };

    default:
      return state;
  }
};
