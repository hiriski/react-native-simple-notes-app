import React, { FC, ReactNode } from 'react';
import { TouchableNativeFeedback, View, Image, StyleSheet, Pressable } from 'react-native';

// React Navigation
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Drop shadow
import DropShadow from 'react-native-drop-shadow';

// Icons
import { Ionicons } from '@/components/icons';

// Core components
import { Typography } from '@/components/core';

// Utils
import { createSpacing } from '@/modules/theme/utils';
import { useTheme } from '@/modules/theme/hooks';

// Constants
import { RoutesConstant } from '@/constants';

// Theme config.
import * as themeConfig from '@/modules/theme/config';

// Screen and Stacks.
import { HomeScreen } from '@/modules/home/screens';
import { SettingsScreen } from '@/modules/settings/screens';

// Assets
import { NotesBlueXsIcon, SettingsXsIcon } from '@/assets';

const EmptyComponent = () => null;

export interface IBottomTabParamList extends Record<string, object | undefined> {
  HomeScreen: undefined;
  Phrasebook: undefined;
  Profile: undefined;
  ChatStack: undefined;
}

const TabStack = createBottomTabNavigator<IBottomTabParamList>();

export const BottomTabNavigator: FC = () => {
  // const navigationHook = useNavigation();
  const theme = useTheme();

  const renderActiveBadge = () => {
    return (
      <View
        style={{
          width: 22,
          height: 3,
          backgroundColor: theme.palette.common.white,
          borderRadius: 10,
          position: 'absolute',
          bottom: 0,
        }}
      />
    );
  };

  const renderCustomTab = ({ state, descriptors, navigation }: BottomTabBarProps): ReactNode => {
    return (
      <DropShadow style={styles.customTab_shadow}>
        <View
          style={StyleSheet.flatten([
            styles.tabBarRoot,
            {
              backgroundColor: theme.palette.primary.main,
            },
          ])}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            let icon = null;
            const iconSize = 26;
            switch (route.name) {
              case RoutesConstant.BottomTab.HomeScreen:
                icon = <Image source={NotesBlueXsIcon} style={{ height: iconSize, width: iconSize }} />;
                break;
              case RoutesConstant.BottomTab.SettingsScreen:
                icon = <Image source={SettingsXsIcon} style={{ height: iconSize, width: iconSize }} />;
                break;
            }
            const { options } = descriptors[route.key];

            const onPress = () => {
              if (route.name === 'AddOnTabItem') {
                if (route.name === 'AddOnTabItem') {
                  navigation.navigate(RoutesConstant.EditableNoteScreen);
                }
              } else {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  // The `merge: true` option makes sure that the params inside the tab screen are preserved
                  navigation.navigate({ name: route.name, merge: true } as never);
                }
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            if (route.name === 'AddOnTabItem') {
              return (
                <Pressable
                  key={route.key}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={({ pressed }) => ({
                    height: 62,
                    width: 62,
                    backgroundColor: isFocused ? '#fff' : theme.palette.secondary.main,
                    marginTop: -68,
                    borderRadius: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...(pressed && {
                      backgroundColor: theme.palette.secondary.dark,
                    }),
                  })}>
                  <Ionicons
                    name="add"
                    color={isFocused ? theme.palette.secondary.main : themeConfig.paletteBase.common.white}
                    size={36}
                  />
                </Pressable>
              );
            }

            return (
              <View key={route.key} style={{ flex: 1, alignItems: 'center' }}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={({ pressed }) =>
                    StyleSheet.flatten([
                      styles.tabBarItem,
                      {
                        ...(pressed && {
                          backgroundColor: 'rgba(255,255,255,0.3)',
                        }),
                      },
                    ])
                  }>
                  {icon}
                </Pressable>
                {isFocused && renderActiveBadge()}
              </View>
            );
          })}
        </View>
      </DropShadow>
    );
  };

  return (
    <TabStack.Navigator
      initialRouteName={RoutesConstant.BottomTab.HomeScreen}
      screenOptions={{ headerShown: false }}
      tabBar={renderCustomTab}>
      <TabStack.Screen name={RoutesConstant.BottomTab.HomeScreen} component={HomeScreen} />
      <TabStack.Screen name="AddOnTabItem" component={EmptyComponent} />
      <TabStack.Screen name={RoutesConstant.BottomTab.SettingsScreen} component={SettingsScreen} />
    </TabStack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: createSpacing(2),
    paddingBottom: createSpacing(1),
  },
  customTab_shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  tabBarItem: {
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
