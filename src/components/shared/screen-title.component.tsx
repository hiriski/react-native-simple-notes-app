import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';

// Core components
import { IconButton, Typography } from '@/components/core';

// Hooks
import { useTheme } from '@/modules/theme/hooks';
import { useNavigation } from '@react-navigation/native';

// Utils
import { isSmallScreen } from '@/utils';
import { createSpacing } from '@/modules/theme/utils';

// Interfaces
import { ThemeSize } from '@/modules/theme/interfaces';

interface Props extends PropsWithChildren<ReactNode | any> {
  title?: string;
  titleSize?: ThemeSize;
  enableBackButton?: boolean;
  renderLeftContent?: ReactNode;
  renderRightContent?: ReactNode;
  backgroundColor?: 'paper' | 'default';
  spacingHorizontal?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
  backButtonStyle?: ViewStyle;
  backButtonIconStyle?: TextStyle;
}

export const ScreenTitle: FC<Props> = (props) => {
  const {
    title,
    titleSize,
    enableBackButton,
    renderLeftContent,
    renderRightContent,
    backgroundColor,
    spacingHorizontal,
    style,
    textStyle,
    backButtonStyle,
    backButtonIconStyle,
  } = props;
  const theme = useTheme();
  const navigation = useNavigation();

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View
      style={StyleSheet.flatten([
        styles.root,
        {
          backgroundColor:
            backgroundColor === 'default' ? theme.palette.background.default : theme.palette.background.paper,
          ...style,
        },
      ])}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: createSpacing(Number(spacingHorizontal)),
        }}>
        {enableBackButton && !renderLeftContent && (
          <IconButton
            icon="arrow-back"
            iconType="ionicons"
            onPress={handleBack}
            style={StyleSheet.flatten([{ marginRight: createSpacing(4.2), marginLeft: -8, ...backButtonStyle }])}
            iconStyle={backButtonIconStyle}
          />
        )}

        {renderLeftContent && <View style={styles.leftContent}>{renderLeftContent}</View>}

        <Typography
          numberOfLines={1}
          style={StyleSheet.flatten([
            styles.title,
            titleSize === 'small' && styles.title_small,
            titleSize === 'medium' && styles.title_medium,
            titleSize === 'large' && styles.title_large,
            { ...textStyle },
          ])}>
          {title}
        </Typography>
        <View style={styles.rightContent}>{renderRightContent}</View>
      </View>
    </View>
  );
};

ScreenTitle.defaultProps = {
  title: '',
  backgroundColor: 'paper',
  spacingHorizontal: 6,
  enableBackButton: false,
  titleSize: 'medium',
};

const styles = StyleSheet.create({
  root: {
    paddingTop: createSpacing(2.6),
    paddingBottom: createSpacing(3.2),
  },
  title: {
    fontWeight: '700',
  },
  title_small: {
    fontSize: 18,
    lineHeight: 20,
  },
  title_medium: {
    fontSize: 21,
    lineHeight: 23,
  },
  title_large: {
    fontSize: 26,
    lineHeight: 28,
  },
  leftContent: {
    marginRight: createSpacing(6),
  },
  rightContent: {
    marginLeft: 'auto',
  },
});
