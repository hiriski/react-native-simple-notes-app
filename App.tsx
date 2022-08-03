import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

// Gesture Handler Root View.
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// React Native Screens.
import { enableScreens } from 'react-native-screens';

// Providers.
import { ReduxProvider, ThemeProvider, NavigationProvider, SafeAreaProvider } from '@/components/providers';

// RootStack navigator.
import { RootStackNavigator } from '@/navigators';

// Bottom sheet modal provider.
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

// Toast
import { Toast } from '@/components/core/toast';
import { StatusBar } from '@/components/shared';

enableScreens();

const App: FC = () => {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <NavigationProvider>
          <GestureHandlerRootView style={styles.root}>
            <SafeAreaProvider>
              <BottomSheetModalProvider>
                <StatusBar translucent backgroundColor="transparent" />
                <Toast />
                <RootStackNavigator />
              </BottomSheetModalProvider>
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </NavigationProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
});

export default App;
