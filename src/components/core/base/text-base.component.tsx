import React, { FC } from 'react';

// RN
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';

// Hooks.
import { useTheme } from '@/modules/theme/hooks';

export interface TextBaseProps extends Omit<TextProps, 'style'> {
  style?: TextStyle;
}

export const TextBase: FC<TextBaseProps> = (props) => {
  const { children, style, ...rest } = props;
  const { palette } = useTheme();

  return (
    <Text {...rest} style={StyleSheet.flatten([styles.root, { color: palette.text.primary, ...style }])}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  root: {
    fontFamily: 'Plus Jakarta Sans',
  },
});
