import React, { FC, useCallback, useState } from 'react';

// RN
import { StyleSheet, View, TextInput, TextInputProps, TextStyle } from 'react-native';

// Utils.
import { createSpacing } from '@/modules/theme/utils';

// Theme config.
import { shape } from '@/modules/theme/config';

// Core components.
import { Typography } from '@/components/core';

// Hooks
import { useTheme } from '@/modules/theme/hooks';

// Theme libs.
import { grey, red } from '@/modules/theme/libs';

// Interfaces
import { IThemePalette, ThemeSize } from '@/modules/theme/interfaces';

export type TextInputVariant = 'filled' | 'outlined';
export type TextInputColor = keyof Pick<IThemePalette, 'primary' | 'secondary'>;

interface TextInputBaseProps extends Omit<TextInputProps, 'style'> {
  size?: ThemeSize;
  margin?: 'none' | 'dense' | 'normal';
  variant?: TextInputVariant;
  rounded?: boolean;
  color?: TextInputColor;
  label?: string;
  labelSize?: ThemeSize;
  labelStyle?: TextStyle;
  style?: TextStyle;
  isError?: boolean;
  helperText?: string;
}

export const TextInputBase: FC<TextInputBaseProps> = (props) => {
  const { size, margin, variant, rounded, style, label, labelSize, labelStyle, isError, helperText, ...rest } = props;
  const { palette } = useTheme();

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, [isFocused]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, [isFocused]);

  return (
    <View
      style={StyleSheet.flatten([
        styles.textInput_root,
        margin === 'none' && {
          marginBottom: createSpacing(0),
        },
        margin === 'dense' && {
          marginBottom: createSpacing(2),
        },
        margin === 'normal' && {
          marginBottom: createSpacing(3),
        },
      ])}>
      {/* --- Input label --- */}
      {label && (
        <Typography
          style={StyleSheet.flatten([
            styles.label,
            labelSize === 'small' && {
              ...styles.label_small,
            },
            labelSize === 'medium' && {
              ...styles.label_medium,
            },
            labelSize === 'large' && {
              ...styles.label_large,
            },
            {
              color: palette.text.secondary,
              fontWeight: '500',

              ...labelStyle,
            },
          ])}>
          {label}
        </Typography>
      )}
      <TextInput
        {...rest}
        placeholderTextColor={palette.text.disabled}
        onFocus={handleFocus}
        onEndEditing={handleBlur}
        style={StyleSheet.flatten([
          styles.textInput,
          {
            color: palette.text.primary,
            ...style,
          },

          // Rounded button style
          rounded && {
            borderRadius: 50,
          },

          // Text input size styles.
          size === 'small' && {
            ...styles.textInput_small,
          },
          size === 'medium' && {
            ...styles.textInput_medium,
          },
          size === 'large' && {
            ...styles.textInput_large,
          },

          // Styles for variant outlined
          variant === 'outlined' &&
            props.editable && {
              backgroundColor: palette.background.paper,
              borderColor: palette.divider,
            },
          // Styles for variant outlined disabled.
          variant === 'outlined' &&
            !props.editable && {
              backgroundColor: palette.mode === 'light' ? grey[100] : grey[900],
              borderColor: palette.mode === 'light' ? grey[200] : grey[900],
              color: palette.text.disabled,
            },
          // Styles for variant outlined error.
          variant === 'outlined' &&
            isError && {
              borderColor: red[500],
              color: red[600],
            },
          // Styles for variant outlined focused.
          isFocused &&
            variant === 'outlined' && {
              borderColor: palette.secondary.main,
            },

          // Styles for variant filled
          variant === 'filled' && {
            backgroundColor: palette.mode === 'light' ? grey[200] : grey[900],
            borderColor: palette.mode === 'light' ? grey[200] : grey[900],
          },
          // Styles for variant filled disabled.
          variant === 'filled' &&
            !props.editable && {
              backgroundColor: palette.mode === 'light' ? grey[300] : grey[800],
              borderColor: palette.mode === 'light' ? grey[300] : grey[800],
              color: palette.text.disabled,
            },
          // Styles for variant filled error.
          variant === 'filled' &&
            isError && {
              backgroundColor: 'rgba(255, 0, 0, 0.05)',
              borderColor: red[500],
              color: red[600],
            },
        ])}
      />

      {/* --- Helper text --- */}
      {helperText && (
        <Typography
          style={StyleSheet.flatten([
            styles.helperText,
            {
              color: isError ? red[500] : palette.text.secondary,
              fontWeight: '500',
            },
          ])}>
          {helperText}
        </Typography>
      )}
    </View>
  );
};

TextInputBase.defaultProps = {
  size: 'medium',
  margin: 'normal',
  variant: 'outlined',
  rounded: false,
  color: 'secondary', // Default secondary, because in this project i gonna use red as primary color, it's look like error field 😅
  labelSize: 'small',
  editable: true,
  isError: false,
  helperText: undefined,
};

const styles = StyleSheet.create({
  textInput_root: {},

  textInput: {
    borderWidth: 1,
    borderRadius: shape.borderRadius,
    fontWeight: '500',
  },

  textInput_small: {
    minHeight: 34,
    fontSize: 12,
    paddingHorizontal: createSpacing(2),
  },
  textInput_medium: {
    minHeight: 40,
    fontSize: 13.5,
    paddingHorizontal: createSpacing(3),
  },
  textInput_large: {
    minHeight: 46,
    fontSize: 15,
    paddingHorizontal: createSpacing(4),
  },

  label: {
    fontWeight: '500',
    marginBottom: createSpacing(1.5),
  },
  label_small: {
    fontSize: 11,
  },
  label_medium: {
    fontSize: 13,
  },
  label_large: {
    fontSize: 15,
  },

  helperText: {
    fontSize: 11,
    marginTop: createSpacing(1),
    marginLeft: createSpacing(2),
  },
});
