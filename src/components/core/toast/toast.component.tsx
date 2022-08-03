import React, { FC, ReactElement, useEffect } from 'react';

// RN
import { StyleSheet } from 'react-native';

// Base components.
import { ToastBase } from '@/components/core/base/toast-base.component';

// Core components.
import { IconButton } from '@/components/core/icon-button';

// Icons components.
import { Ionicons } from '@/components/icons';

// Theme utils.
import { getMainColor, getLightenColor, getDarkenColor, createSpacing } from '@/modules/theme/utils';

// Hooks
import { useTheme } from '@/modules/theme/hooks';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/store';

// Action creators and selectors.
import { toast_actionResetToast, toast_actionSetToast, toast_rootSelector } from '@/modules/toast/redux';

// Interfaces.
import { ToastSeverity } from '@/modules/toast/interfaces';

export const Toast: FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { show, messages, severity, variant, placement, autoHide, autoHideDuration, enableCloseButton, showIcon } =
    useAppSelector((s) => toast_rootSelector(s));

  /**
   * Handle close toast but keep another values.
   * @return {void}
   */
  const handleCloseToast = (): void => {
    dispatch(
      toast_actionSetToast({
        show: false,
        messages,
        severity,
        variant,
        placement,
        autoHide,
        autoHideDuration,
        enableCloseButton,
        showIcon,
      }),
    );
  };

  useEffect(() => {
    if (show && autoHide) {
      // Close toast but keep the values of severity, variant, and placement
      setTimeout(() => {
        handleCloseToast();
      }, autoHideDuration);

      // Reset toast
      setTimeout(() => {
        dispatch(toast_actionResetToast());
      }, Number(autoHideDuration) + 1250);
    }
  }, [show]);

  /** Render Icon */
  const renderIcon = (): ReactElement => {
    let iconName;
    switch (severity) {
      case 'error':
        iconName = 'warning-outline';
        break;
      case 'warning':
        iconName = 'md-information-circle-outline';
        break;
      case 'success':
        iconName = 'checkmark-done-outline';
        break;
      case 'info':
        iconName = 'ios-alert';
        break;
      default:
        iconName = 'md-information-circle-outline';
        break;
    }
    return (
      <Ionicons
        name={iconName}
        size={20}
        style={{ marginLeft: createSpacing(1) }}
        color={
          variant === 'filled' ? theme.palette.common.white : getMainColor(severity as ToastSeverity, theme.palette)
        }
      />
    );
  };

  const renderCloseButton = (): ReactElement => {
    return variant === 'filled' ? (
      <IconButton
        size="small"
        onPress={handleCloseToast}
        variant="contained"
        color={severity}
        icon="close"
        iconType="ionicons"
      />
    ) : (
      <IconButton
        size="small"
        onPress={handleCloseToast}
        variant="default"
        color={severity}
        icon="close"
        iconType="ionicons"
      />
    );
  };

  return (
    <ToastBase
      show={show}
      messages={messages}
      placement={placement}
      enableBoxShadow={variant !== 'filled'}
      style={StyleSheet.flatten([
        {
          ...(variant === 'filled' && {
            backgroundColor: getMainColor(severity as ToastSeverity, theme.palette),
          }),
          ...(variant === 'default' && {
            backgroundColor: getLightenColor(severity as ToastSeverity, theme.palette),
          }),
          ...(variant === 'outlined' && {
            backgroundColor: theme.palette.background.paper,
            borderWidth: 1,
            borderColor: getMainColor(severity as ToastSeverity, theme.palette),
          }),
        },
      ])}
      // Text style
      textStyle={StyleSheet.flatten([
        styles.toastTextStyles,
        {
          ...(variant === 'default' && {
            color: getDarkenColor(severity as ToastSeverity, theme.palette),
          }),
          ...(variant === 'filled' && {
            color: theme.palette.common.white,
          }),
          ...(variant === 'outlined' && {
            color: getMainColor(severity as ToastSeverity, theme.palette),
          }),

          ...(showIcon && {
            marginLeft: createSpacing(1.4),
          }),
        },
      ])}
      renderLeftContent={showIcon ? renderIcon() : null}
      /** NOTES! Keep display close button when autoHide is false */
      renderRightContent={enableCloseButton ? renderCloseButton() : autoHide ? renderCloseButton() : null}
    />
  );
};

const styles = StyleSheet.create({
  toastTextStyles: {}, // Please use styles in base-toast.component
});
