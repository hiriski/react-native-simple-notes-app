import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

// Gesture Handler Root View.
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// React Native Screens.
import { enableScreens } from 'react-native-screens';

// Providers.
import { NavigationProvider, SafeAreaProvider } from '@/components/providers';

// RootStack navigator.
import { RootStackNavigator } from '@/navigators';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

enableScreens();

const App: FC = () => {
  return (
    <NavigationProvider>
      <GestureHandlerRootView style={styles.root}>
        <SafeAreaProvider>
          <BottomSheetModalProvider>
            <RootStackNavigator />
          </BottomSheetModalProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </NavigationProvider>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
});

export default App;
