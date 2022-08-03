import React, { FC, ReactElement, ReactNode } from 'react';
import { StyleSheet, ActivityIndicator, TextStyle } from 'react-native';

// Base components.
import { BaseIconButton, BaseIconButtonProps } from '@/components/core/base';

// Theme lib
import { grey } from '@/modules/theme/libs';

// Icon components.
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@/components/icons';

// Hooks
import { useTheme } from '@/modules/theme/hooks';

// Helper

import { getMainColor, getDarkenColor, getLightenColor, getContrastTextColor } from '@/modules/theme/utils';

// Interfaces.
import { IconTypeIconButton, IconButtonColor, IconButtonVariant } from './icon-button.interface';
import { IThemePalette } from '@/modules/theme/interfaces';

// App config.
import { AppConfig } from '@/config';

interface Props extends BaseIconButtonProps {
  color?: IconButtonColor;
  variant?: IconButtonVariant;
  icon?: string;
  iconType?: IconTypeIconButton;
  iconStyle?: TextStyle;
  isLoading?: boolean;
}

export const IconButton: FC<Props> = (props) => {
  const { variant, color, isLoading, style, iconType, icon, iconStyle, ...rest } = props;
  const { palette } = useTheme();

  const renderSpinner = (): ReactElement => {
    let spinnerSize = 18;
    switch (props.size) {
      case 'small':
        spinnerSize = 18;
        break;
      case 'medium':
        spinnerSize = 22;
        break;
      case 'large':
        spinnerSize = 26;
        break;
      default:
        break;
    }
    return (
      <ActivityIndicator
        style={styles.spinnerStyle}
        size={spinnerSize}
        color={
          variant === 'contained'
            ? getContrastTextColor(color as keyof IThemePalette, palette)
            : getMainColor(color as keyof IThemePalette, palette)
        }
      />
    );
  };

  const renderIcon = (): ReactNode => {
    const getIconSize = () => {
      if (props.size === 'small') {
        return 18;
      }
      if (props.size === 'medium') {
        return 22;
      }
      if (props.size === 'large') {
        return 26;
      }
      return 18;
    };
    if (iconType === 'ionicons') {
      return (
        <Ionicons
          name={String(icon)}
          size={getIconSize()}
          color={
            color === 'default'
              ? palette.text.secondary
              : variant === 'contained'
              ? getContrastTextColor(color as keyof IThemePalette, palette)
              : getMainColor(color as keyof IThemePalette, palette)
          }
          style={StyleSheet.flatten([{ ...iconStyle }])}
        />
      );
    } else if (iconType === 'material-community-icons') {
      return (
        <MaterialCommunityIcons
          name={String(icon)}
          size={getIconSize()}
          color={
            color === 'default'
              ? palette.text.primary
              : variant === 'contained'
              ? getContrastTextColor(color as keyof IThemePalette, palette)
              : getMainColor(color as keyof IThemePalette, palette)
          }
          style={iconStyle}
        />
      );
    } else if (iconType === 'material-icons') {
      return (
        <MaterialIcons
          name={String(icon)}
          size={getIconSize()}
          color={
            color === 'default'
              ? palette.text.primary
              : variant === 'contained'
              ? getContrastTextColor(color as keyof IThemePalette, palette)
              : getMainColor(color as keyof IThemePalette, palette)
          }
          style={iconStyle}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <BaseIconButton
      /**
       * Button styles.
       */
      style={StyleSheet.flatten([
        styles.buttonRoot,
        {
          // Button color for variant contained
          ...(variant === 'contained' &&
            color === 'default' && {
              backgroundColor: palette.mode === 'light' ? grey[200] : 'rgba(255, 255, 255, 0.1)',
            }),
          ...(variant === 'contained' &&
            color !== 'default' && {
              backgroundColor: getMainColor(color as keyof IThemePalette, palette),
            }),

          // Button color for variant outlined
          ...(variant === 'default' && {
            backgroundColor: 'transparent',
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
          ...(variant === 'contained' &&
            color === 'default' && {
              backgroundColor: palette.mode === 'light' ? grey[300] : 'rgba(255, 255, 255, 0.2)',
            }),
          ...(variant === 'contained' &&
            color !== 'default' && {
              backgroundColor: getDarkenColor(color as keyof IThemePalette, palette),
            }),

          // Pressed button color for variant outlined
          ...(variant === 'default' &&
            color === 'default' && {
              backgroundColor: palette.mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)',
            }),
          ...(variant === 'default' &&
            color !== 'default' && {
              backgroundColor:
                palette.mode === 'light'
                  ? getLightenColor(color as keyof IThemePalette, palette)
                  : 'rgba(255, 255, 255, 0.1)',
            }),
        },
        { ...style },
      ])}
      {...rest}>
      {isLoading ? renderSpinner() : renderIcon()}
    </BaseIconButton>
  );
};

const styles = StyleSheet.create({
  buttonRoot: {},
  spinnerStyle: {},
});

IconButton.defaultProps = {
  color: 'default',
  size: 'medium',
  variant: 'default',
  isLoading: false,
  icon: undefined,
  iconType: AppConfig.DefaultVectorIconType as IconTypeIconButton, // default icon type
};
