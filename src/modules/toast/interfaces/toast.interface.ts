import { IThemePalette } from '@/modules/theme/interfaces';

export type ToastSeverity = keyof Pick<
  IThemePalette,
  'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'
>;
export type ToastVariant = 'default' | 'filled' | 'outlined';
export type ToastPlacement = 'top' | 'bottom';
