import React, { FC, ReactNode } from 'react';

// RN
import { StyleSheet, Pressable, PressableProps, ViewStyle, TextStyle, View } from 'react-native';

// Base components.
import { TextBase } from './text-base.component';

// Theme config.
import { shape } from '@/modules/theme/config';

// Utils
import { createSpacing } from '@/modules/theme/utils';
import { isAndroid } from '@/utils';

// Interfaces
import { ThemeSize } from '@/modules/theme/interfaces';

export interface BaseButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  size?: ThemeSize;
  renderStartAdornment?: ReactNode;
  renderEndAdornment?: ReactNode;
  style?: ViewStyle;
  pressedStyle?: ViewStyle;
  textStyle?: TextStyle;
}

/**
 * Base Button Component without variant, color and friend props 🙈
 */
export const BaseButton: FC<BaseButtonProps> = (props) => {
  const { title, size, renderStartAdornment, renderEndAdornment, style, pressedStyle, textStyle, ...rest } = props;

  return (
    <Pressable
      {...rest}
      style={({ pressed }) =>
        StyleSheet.flatten([
          styles.buttonRoot,

          size === 'small' && {
            height: 32,
          },
          size === 'medium' && {
            height: 40,
          },
          size === 'large' && {
            height: 46,
          },

          /** Style props */
          { ...style },

          /** Pressed style props */
          pressed && pressedStyle,
        ])
      }>
      <View style={styles.buttonContainer}>
        {renderStartAdornment}
        <TextBase
          style={StyleSheet.flatten([
            styles.buttonText,
            {
              ...(size === 'small' && {
                fontSize: 12,
                ...(isAndroid && {
                  lineHeight: 14,
                }),
              }),
              ...(size === 'medium' && {
                fontSize: 13.5,
                ...(isAndroid && {
                  lineHeight: 16,
                }),
              }),
              ...(size === 'large' && {
                fontSize: 15,
                ...(isAndroid && {
                  lineHeight: 17,
                }),
              }),

              /** Text style props */
              ...textStyle,
            },
          ])}>
          {title}
        </TextBase>
        {renderEndAdornment}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonRoot: {
    minWidth: 40,
    paddingHorizontal: createSpacing(3.5),
    borderRadius: shape.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    letterSpacing: 0.15,
    fontWeight: '500',
  },
});

BaseButton.defaultProps = {
  size: 'medium',
};
