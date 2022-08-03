import React, { FC } from 'react';

// React Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Constants
import { RoutesConstant } from '@/constants';

// Screens and Stacks
import { HomeScreen } from '@/modules/home';

// Interface
export interface IRootStackParamList extends Record<string, object | undefined> {
  WelcomeScreen: undefined;
}

// Root Stack
const RootStack = createNativeStackNavigator<IRootStackParamList>();

export const RootStackNavigator: FC = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name={RoutesConstant.HomeScreen} component={HomeScreen} />
    </RootStack.Navigator>
  );
};
