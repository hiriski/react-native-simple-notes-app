import React, { FC } from 'react';

// React Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Constants
import { RoutesConstant } from '@/constants';

// Screens and Stacks
import { BottomTabNavigator } from './bottom-tab.navigator';
import { EditableNoteScreen } from '@/modules/notes/screens';
import { INote } from '@/modules/notes/interfaces';

// Interface
export interface IRootStackParamList extends Record<string, object | undefined> {
  EditableNoteScreen: { note: INote } | undefined;
}

// Root Stack
const RootStack = createNativeStackNavigator<IRootStackParamList>();

export const RootStackNavigator: FC = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name={RoutesConstant.BottomTabStack} component={BottomTabNavigator} />
      <RootStack.Screen name={RoutesConstant.EditableNoteScreen} component={EditableNoteScreen} />
    </RootStack.Navigator>
  );
};
