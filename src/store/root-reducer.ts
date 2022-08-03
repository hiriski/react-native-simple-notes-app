import { combineReducers } from 'redux';

// Reducers.
import { themeReducer, ThemeState } from '@/modules/theme/redux';
import { toastReducer, ToastState } from '@/modules/toast/redux';

// Root State.
export type RootState = {
  theme: ThemeState;
  toast: ToastState;
};

export default combineReducers<RootState>({
  theme: themeReducer,
  toast: toastReducer,
});
