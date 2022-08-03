import { ButtonColor } from '../button';
const AvailableIcons = ['material-icons', 'material-community-icons', 'ionicons'] as const;
// const AvailableIcons = AppConfig.RNVectorIcons as const;

export type IconButtonColor = 'default' | ButtonColor;
export type IconButtonVariant = 'default' | 'contained';
export type IconTypeIconButton = typeof AvailableIcons[number];
