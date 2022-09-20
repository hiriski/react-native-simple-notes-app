import { combineReducers } from 'redux';

// Reducers.
import { themeReducer, ThemeState } from '@/modules/theme/redux';
import { toastReducer, ToastState } from '@/modules/toast/redux';
import { notesReducer, NotesState } from '@/modules/notes/redux';

// Root State.
export type RootState = {
  theme: ThemeState;
  toast: ToastState;
  notes: NotesState;
};

export default combineReducers<RootState>({
  theme: themeReducer,
  toast: toastReducer,
  notes: notesReducer,
});
