import React, { FC } from 'react';
import { StatusBar as ReactNativeStatusBar, StatusBarProps } from 'react-native';

// Hooks
import { useTheme } from '@/modules/theme/hooks';
// import { useIsFocused } from '@react-navigation/native';

export const StatusBar: FC<StatusBarProps> = (props: StatusBarProps) => {
  const { palette } = useTheme();
  return <ReactNativeStatusBar barStyle={palette.mode === 'dark' ? 'light-content' : 'dark-content'} {...props} />;
};
