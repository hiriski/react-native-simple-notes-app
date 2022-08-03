import React, { FC, ReactElement, ReactNode } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';

// Base components.
import { BaseButton, BaseButtonProps } from '@/components/core/base';

// Theme lib
import { common, grey } from '@/modules/theme/libs';

// Icon components.
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@/components/icons';

// Hooks
import { useTheme } from '@/modules/theme/hooks';

// Helper
import {
  createSpacing,
  getMainColor,
  getContrastTextColor,
  getLightenColor,
  getDarkenColor,
} from '@/modules/theme/utils';

// Interfaces.
import { AdornmentIconTypeButton, ButtonColor, ButtonVariant } from './button.interface';

interface Props extends BaseButtonProps {
  color?: ButtonColor;
  variant?: ButtonVariant;
  rounded?: boolean;
  startIcon?: string;
  endIcon?: string;
  iconType?: AdornmentIconTypeButton;
  isLoading?: boolean;
}

export const Button: FC<Props> = (props) => {
  const { variant, rounded, color, isLoading, style, startIcon, endIcon, iconType, ...rest } = props;
  const { palette } = useTheme();

  const renderSpinner = (): ReactElement => {
    let spinnerSize = 0;
    switch (props.size) {
      case 'small':
        spinnerSize = 12;
        break;
      case 'medium':
        spinnerSize = 16;
        break;
      case 'large':
        spinnerSize = 18;
        break;
      default:
        spinnerSize = 16;
        break;
    }
    return (
      <ActivityIndicator
        style={styles.spinnerStyle}
        size={spinnerSize}
        color={
          variant === 'contained'
            ? getContrastTextColor(color as ButtonColor, palette)
            : getMainColor(color as ButtonColor, palette)
        }
      />
    );
  };

  const renderIcon = (placement: 'start' | 'end'): ReactNode => {
    const getIconSize = () => {
      if (props.size === 'small') {
        return 16;
      }
      if (props.size === 'medium') {
        return 20;
      }
      if (props.size === 'large') {
        return 24;
      }
      return 24;
    };
    if (iconType === 'ionicons') {
      return (
        <Ionicons
          name={String(placement === 'start' ? startIcon : endIcon)}
          size={getIconSize()}
          color={
            props.disabled
              ? grey[500]
              : variant === 'contained'
              ? getContrastTextColor(color as ButtonColor, palette)
              : getMainColor(color as ButtonColor, palette)
          }
          style={placement === 'start' ? styles.iconButtonPlacementLeft : styles.iconButtonPlacementRight}
        />
      );
    } else if (iconType === 'material-community-icons') {
      return (
        <MaterialCommunityIcons
          name={String(placement === 'start' ? startIcon : endIcon)}
          size={getIconSize()}
          color={
            props.disabled
              ? grey[500]
              : variant === 'contained'
              ? getContrastTextColor(color as ButtonColor, palette)
              : getMainColor(color as ButtonColor, palette)
          }
          style={placement === 'start' ? styles.iconButtonPlacementLeft : styles.iconButtonPlacementRight}
        />
      );
    } else if (iconType === 'material-icons') {
      return (
        <MaterialIcons
          name={String(placement === 'start' ? startIcon : endIcon)}
          size={getIconSize()}
          color={
            props.disabled
              ? grey[500]
              : variant === 'contained'
              ? getContrastTextColor(color as ButtonColor, palette)
              : getMainColor(color as ButtonColor, palette)
          }
          style={placement === 'start' ? styles.iconButtonPlacementLeft : styles.iconButtonPlacementRight}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <BaseButton
      /**
       * Button styles.
       */
      style={StyleSheet.flatten([
        styles.buttonRoot,
        {
          // Rounded button
          ...(rounded && {
            borderRadius: 50,
          }),

          // Button color for variant contained
          ...(variant === 'contained' && {
            backgroundColor: getMainColor(color as ButtonColor, palette),
            borderColor: getMainColor(color as ButtonColor, palette),
          }),

          // Button color for variant outlined
          ...(variant === 'outlined' && {
            backgroundColor: 'transparent',
            borderColor: getMainColor(color as ButtonColor, palette),
          }),

          // Button color for variant text
          ...(variant === 'text' && {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
          }),

          // Button style for disabled button
          ...(props.disabled && {
            backgroundColor: palette.mode === 'light' ? grey[300] : grey[900],
            borderColor: palette.mode === 'light' ? grey[300] : grey[900],
          }),
        },
        { ...style },
      ])}
      /**
       * Pressed style
       */
      pressedStyle={StyleSheet.flatten([
        {
          // Pressed button color for variant contained
          ...(variant === 'contained' && {
            backgroundColor: getDarkenColor(color as ButtonColor, palette),
            borderColor: getDarkenColor(color as ButtonColor, palette),
          }),

          // Pressed button color for variant outlined
          ...(variant === 'outlined' && {
            backgroundColor:
              palette.mode === 'light' ? getLightenColor(color as ButtonColor, palette) : 'rgba(255, 255, 255, 0.1)',
          }),

          // Button color for variant text
          ...(variant === 'text' && {
            opacity: 0.75,
          }),

          // Pressed button color for variant text
          // ...(variant === 'text' && {
          //   backgroundColor: 'transparent',
          // }),
        },
        { ...style },
      ])}
      /**
       * Button text style
       */
      textStyle={StyleSheet.flatten([
        styles.buttonTextStyle,
        {
          /* I don't need spacing in typography anymore. */
          // ...(startIcon && {
          //   marginLeft: createSpacing(1.8),
          // }),
          // ...(endIcon && {
          //   marginRight: createSpacing(1.8),
          // }),

          // Text button color for variant button outlined
          ...(variant === 'outlined' && {
            color: getMainColor(color as ButtonColor, palette),
          }),

          // Text button color for variant button text
          ...(variant === 'text' && {
            color: getMainColor(color as ButtonColor, palette),
          }),

          ...(props.disabled && {
            color: palette.mode === 'light' ? grey[500] : grey[600],
          }),
        },
      ])}
      /**
       * Start & End Adortment
       */
      renderStartAdornment={isLoading ? renderSpinner() : startIcon && renderIcon('start')}
      renderEndAdornment={endIcon && renderIcon('end')}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  buttonRoot: {
    borderWidth: 1,
    borderStyle: 'solid',
  },
  buttonTextStyle: {
    color: common.white,
  },
  spinnerStyle: {
    marginRight: createSpacing(1.5),
  },
  iconButtonPlacementLeft: {
    marginRight: createSpacing(1.6),
  },
  iconButtonPlacementRight: {
    marginLeft: createSpacing(1.6),
  },
});

Button.defaultProps = {
  color: 'primary',
  size: 'medium',
  rounded: false,
  variant: 'contained',
  isLoading: false,
  startIcon: undefined,
  endIcon: undefined,
};
