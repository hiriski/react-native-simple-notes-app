import React, { FC } from 'react';

// RN
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

// Hooks.
import { useTheme } from '@/modules/theme/hooks';

export interface ViewBaseProps extends Omit<ViewProps, 'style'> {
  style?: ViewStyle;
}

export const ViewBase: FC<ViewBaseProps> = (props) => {
  const { children, style, ...rest } = props;
  const { palette } = useTheme();

  return (
    <View
      style={StyleSheet.flatten([styles.root, { backgroundColor: palette.background.default, ...style }])}
      {...rest}>
      {children}
    </View>
  );
};

ViewBase.defaultProps = {};

const styles = StyleSheet.create({
  root: {},
});
