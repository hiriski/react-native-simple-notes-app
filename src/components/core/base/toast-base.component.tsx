import React, { FC, ReactNode } from 'react';

// RM
import { StyleSheet, TextStyle, ViewStyle, View } from 'react-native';

// Reanimated 2
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

// Base components.
import { TextBase } from './text-base.component';

// Hooks.
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Utilities
import { isSmallScreen } from '@/utils';
import { createSpacing } from '@/modules/theme/utils';

// Theme config.
import { shape } from '@/modules/theme/config';

// Interfaces
import { ToastState } from '@/modules/toast/redux';

export interface ToastBaseProps extends Pick<ToastState, 'show' | 'placement' | 'messages'> {
  style?: ViewStyle;
  textStyle?: TextStyle;
  renderLeftContent?: ReactNode;
  renderRightContent?: ReactNode;
  enableBoxShadow?: boolean;
}

/**
 * Reanimated 2 Toast base - (Unstyled toast.)
 * This component implemented by core component toast.component.tsx
 */
export const ToastBase: FC<ToastBaseProps> = (props) => {
  const safeAreaInsets = useSafeAreaInsets();
  const { show, messages, placement, style, textStyle, renderLeftContent, renderRightContent, enableBoxShadow } = props;

  const positionY = useSharedValue<number>(placement === 'top' ? -200 : 200);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(positionY.value) }],
    };
  });

  if (show) {
    if (placement === 'top') {
      positionY.value = 0;
    }
    if (placement === 'bottom') {
      positionY.value = createSpacing(-3);
    }
  }

  if (!show) {
    if (placement === 'top') {
      positionY.value = -200;
    }
    if (placement === 'bottom') {
      positionY.value = 200;
    }
  }

  return (
    <Animated.View
      style={[
        styles.defaultToastStyles,
        enableBoxShadow && styles.toastShadow,
        (renderLeftContent || renderRightContent) && styles.toastWithAdornment,
        {
          ...(placement === 'top' && {
            top: safeAreaInsets.top + createSpacing(1),
          }),
          ...(placement === 'bottom' && {
            bottom: safeAreaInsets.bottom, // don't need add extra spacing
          }),
        },
        animatedStyle,
        style,
      ]}>
      {renderLeftContent && <View style={styles.leftContentStyle}>{renderLeftContent}</View>}
      <View style={styles.textContainer}>
        <TextBase style={StyleSheet.flatten([styles.defaultTextStyle, { ...textStyle }])}>{messages}</TextBase>
      </View>
      {renderRightContent && <View style={styles.rightContentStyle}>{renderRightContent}</View>}
    </Animated.View>
  );
};

ToastBase.defaultProps = {
  placement: 'top',
  enableBoxShadow: false,
  renderLeftContent: undefined,
  renderRightContent: undefined,
};

const styles = StyleSheet.create({
  defaultToastStyles: {
    minHeight: 40,
    borderRadius: shape.borderRadius,
    margin: createSpacing(isSmallScreen ? 3 : 4),
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    left: 0,
    zIndex: 100,
    paddingHorizontal: createSpacing(4),
    paddingVertical: createSpacing(3),
  },
  toastWithAdornment: {
    paddingVertical: createSpacing(2.4),
    paddingHorizontal: createSpacing(2),
  },
  toastShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  textContainer: {
    flex: 1,
  },
  defaultTextStyle: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: createSpacing(-1),
  },
  leftContentStyle: {
    marginRight: 'auto',
  },
  rightContentStyle: {
    marginLeft: 'auto',
  },
});
