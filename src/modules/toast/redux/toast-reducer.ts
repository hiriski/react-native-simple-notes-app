// Action types.
import { ToastActionTypes } from './toast-actions-types.enum';

// Union action types.
import { ToastActions } from './toast-actions';

// Interfaces.
import { ToastPlacement, ToastSeverity, ToastVariant } from '@/modules/toast/interfaces';

// App config.
import { AppConfig } from '@/config';

export interface ToastState {
  show: boolean;
  variant: ToastVariant;
  severity?: ToastSeverity;
  placement?: ToastPlacement;
  messages: string | null;
  autoHide?: boolean;
  autoHideDuration?: number;
  enableCloseButton?: boolean;
  showIcon?: boolean;
}

const initialState: ToastState = {
  show: false,
  variant: 'filled',
  severity: undefined,
  placement: AppConfig.DefaultToastPlacement as ToastState['placement'],
  messages: '',
  autoHide: true,
  autoHideDuration: AppConfig.DefaultToastAutoHideDuration,
  enableCloseButton: false,
  showIcon: true,
};

export const toastReducer = (state: ToastState = initialState, action: ToastActions): ToastState => {
  switch (action.type) {
    case ToastActionTypes.SET_TOAST:
      return {
        ...state,
        show: action.payload.show,
        variant: action.payload.variant,
        severity: action.payload.severity,
        placement: action.payload.placement ?? initialState.placement,
        messages: action.payload.messages,
        autoHide: typeof action.payload.autoHide !== 'boolean' ? initialState.autoHide : action.payload.autoHide,
        autoHideDuration: action.payload.autoHideDuration ?? initialState.autoHideDuration,
        enableCloseButton: action.payload.enableCloseButton ?? initialState.enableCloseButton,
        showIcon: typeof action.payload.showIcon !== 'boolean' ? initialState.showIcon : action.payload.showIcon,
      };

    case ToastActionTypes.RESET_TOAST:
      return {
        ...initialState,
        placement: state.placement, // Keep this value
      };

    default:
      return state;
  }
};
