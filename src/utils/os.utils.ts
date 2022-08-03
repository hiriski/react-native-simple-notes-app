import { Platform } from 'react-native';

/**
 * Is iOs
 */
export const isIOS: boolean = Platform.OS === 'ios';

/**
 * Is Android
 */
export const isAndroid: boolean = Platform.OS === 'android';
