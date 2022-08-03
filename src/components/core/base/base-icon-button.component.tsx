import React, { FC } from 'react';

// RN
import { StyleSheet, Pressable, PressableProps, ViewStyle } from 'react-native';

// Interfaces
import { ThemeSize } from '@/modules/theme/interfaces';

export interface BaseIconButtonProps extends Omit<PressableProps, 'style'> {
  size?: ThemeSize;
  style?: ViewStyle;
  pressedStyle?: ViewStyle;
}

export const BaseIconButton: FC<BaseIconButtonProps> = (props) => {
  const { size, children, style, pressedStyle, ...rest } = props;

  return (
    <Pressable
      {...rest}
      style={({ pressed }) =>
        StyleSheet.flatten([
          styles.buttonRoot,

          size === 'small' && {
            height: 28,
            width: 28,
            borderRadius: 28,
          },
          size === 'medium' && {
            height: 38,
            width: 38,
            borderRadius: 38,
          },
          size === 'large' && {
            height: 48,
            width: 48,
            borderRadius: 48,
          },

          /** Style props */
          { ...style },

          /** Pressed style props */
          pressed && pressedStyle,
        ])
      }>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonRoot: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

BaseIconButton.defaultProps = {
  size: 'medium',
};
