import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { ViewStyle } from 'react-native';

// SafeAreaView
import { SafeAreaView as ReactNativeSafeAreaView } from 'react-native-safe-area-context';

// Hooks
import { useTheme } from '@/modules/theme/hooks';

interface Props extends PropsWithChildren<ReactNode | any> {
  backgroundColor?: 'paper' | 'default';
  style?: ViewStyle;
}

export const SafeAreaView: FC<Props> = ({ children, backgroundColor, style }) => {
  const theme = useTheme();
  return (
    <ReactNativeSafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          backgroundColor === 'default' ? theme.palette.background.default : theme.palette.background.paper,
        ...style,
      }}>
      {children}
    </ReactNativeSafeAreaView>
  );
};

SafeAreaView.defaultProps = {
  backgroundColor: 'paper',
};
