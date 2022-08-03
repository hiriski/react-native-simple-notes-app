import React, { FC } from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';

import { RoutesConstant } from '@/constants';
import { IRootStackParamList } from '@/navigators';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<IRootStackParamList, typeof RoutesConstant.HomeScreen>;

export const HomeScreen: FC<Props> = () => {
  return (
    <SafeAreaView style={styles.root}>
      <View>
        <Text style={styles.font}>Hello 👋 </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  font: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '300',
    fontSize: 26,
  },
});
