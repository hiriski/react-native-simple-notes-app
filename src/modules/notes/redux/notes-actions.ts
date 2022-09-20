// Enum action types.
import { NotesActionTypes } from './notes-actions-types.enum';

// Interfaces.
import { ToastState } from './notes-reducer';

/** Actions definitions */
interface ISetToast {
  type: typeof NotesActionTypes.SET_TOAST;
  payload: ToastState;
}

interface IResetToast {
  type: typeof NotesActionTypes.RESET_TOAST;
}

/** Union action types */
export type NotesActions = ISetToast | IResetToast;

/** Actions creators */
export const toast_actionSetToast = (payload: ToastState): ISetToast => ({
  type: NotesActionTypes.SET_TOAST,
  payload,
});
// Action alias
export const toast_actionShowToast = (payload: Omit<ToastState, 'show'>) => {
  return toast_actionSetToast({
    show: true,
    variant: payload.variant,
    messages: payload.messages,
    severity: payload.severity,
    placement: payload.placement,
    autoHideDuration: payload.autoHideDuration,
  });
};

export const toast_actionResetToast = (): IResetToast => ({
  type: NotesActionTypes.RESET_TOAST,
});
// Action alias
export const toast_actionCloseToast = () => {
  return toast_actionResetToast();
};
