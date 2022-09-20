import React, { FC } from 'react';
import { View, StyleSheet, SafeAreaView, Button } from 'react-native';

import { RoutesConstant } from '@/constants';
import { IRootStackParamList } from '@/navigators';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { useTheme } from '@/modules/theme/hooks';
import { Typography } from '@/components/core';
import { BaseButton } from '@/components/core/base';
import { theme_actionToggleMode } from '@/modules/theme/redux';

type Props = NativeStackScreenProps<IRootStackParamList, typeof RoutesConstant.BottomTab.HomeScreen>;

export const SettingsScreen: FC<Props> = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <SafeAreaView style={StyleSheet.flatten([styles.root, { backgroundColor: theme.palette.background.default }])}>
      <View>
        <Typography style={styles.font}>Settings Screen 👋 </Typography>
        <Button onPress={() => dispatch(theme_actionToggleMode())} title="Toggle Theme" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ececec',
  },
  font: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '300',
    fontSize: 26,
  },
});
