import React, { FC } from 'react';

// Base components.
import { TextBase, TextBaseProps } from '@/components/core/base';

// Interfaces.
import { IThemeTypography } from '@/modules/theme/interfaces';
import { StyleSheet } from 'react-native';

// Helper
import { getTypographyFontSize, getTypographyFontWeight } from './typography.helper';

interface Props extends TextBaseProps {
  variant?: keyof IThemeTypography;
}

export const Typography: FC<Props> = (props) => {
  const { variant, style, children, ...rest } = props;

  return (
    <TextBase
      {...rest}
      style={StyleSheet.flatten([
        {
          fontSize: getTypographyFontSize(variant as keyof IThemeTypography),
          fontWeight: getTypographyFontWeight(variant as keyof IThemeTypography),
        },
        { ...style },
      ])}>
      {children}
    </TextBase>
  );
};

Typography.defaultProps = {
  variant: 'body',
};
