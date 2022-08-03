import { Dimensions } from 'react-native';

export const isSmallScreen: boolean = Dimensions.get('screen').width < 380;
