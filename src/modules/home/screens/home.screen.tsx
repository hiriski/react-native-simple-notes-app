import React, { FC } from 'react';
import { View, StyleSheet, SafeAreaView, Button } from 'react-native';

import { RoutesConstant } from '@/constants';
import { IRootStackParamList } from '@/navigators';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { toast_actionSetToast } from '@/modules/toast/redux';
import { theme_actionToggleMode } from '@/modules/theme/redux';
import { useTheme } from '@/modules/theme/hooks';
import { Typography } from '@/components/core';

type Props = NativeStackScreenProps<IRootStackParamList, typeof RoutesConstant.HomeScreen>;

export const HomeScreen: FC<Props> = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleShowToast = (): void => {
    dispatch(
      toast_actionSetToast({
        show: true,
        messages: 'Opss. something went wrong!',
        severity: 'error',
        variant: 'filled',
        enableCloseButton: true,
        autoHide: false,
        placement: 'top',
      }),
    );
  };

  return (
    <SafeAreaView style={StyleSheet.flatten([styles.root, { backgroundColor: theme.palette.background.default }])}>
      <View>
        <Typography style={styles.font}>Hello 👋 </Typography>
        <Button onPress={() => dispatch(theme_actionToggleMode())} title="Toggle theme mode" />
        <Button onPress={handleShowToast} title="Toggle Toast" />
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
