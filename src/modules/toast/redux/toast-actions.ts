// Enum action types.
import { ToastActionTypes } from './toast-actions-types.enum';

// Interfaces.
import { ToastState } from './toast-reducer';

/** Actions definitions */
interface ISetToast {
  type: typeof ToastActionTypes.SET_TOAST;
  payload: ToastState;
}

interface IResetToast {
  type: typeof ToastActionTypes.RESET_TOAST;
}

/** Union action types */
export type ToastActions = ISetToast | IResetToast;

/** Actions creators */
export const toast_actionSetToast = (payload: ToastState): ISetToast => ({
  type: ToastActionTypes.SET_TOAST,
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
  type: ToastActionTypes.RESET_TOAST,
});
// Action alias
export const toast_actionCloseToast = () => {
  return toast_actionResetToast();
};
