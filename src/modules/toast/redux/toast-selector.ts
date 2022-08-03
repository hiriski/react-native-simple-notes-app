import { RootState } from '@/store/root-reducer';
import { ToastState } from '@/modules/toast/redux';

export const toast_rootSelector = (state: RootState): ToastState => state.toast;
