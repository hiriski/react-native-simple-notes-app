import { IThemePalette } from '@/modules/theme/interfaces';
const AvailableIcons = ['material-icons', 'material-community-icons', 'ionicons'] as const;
// const AvailableIcons = AppConfig.RNVectorIcons as const;

export type ButtonColor = keyof Pick<IThemePalette, 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error'>;
export type ButtonVariant = 'contained' | 'outlined' | 'text';
export type AdornmentIconTypeButton = typeof AvailableIcons[number];
