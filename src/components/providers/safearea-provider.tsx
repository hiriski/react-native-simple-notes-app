import React, { FC, PropsWithChildren, ReactNode } from 'react';

// Safe Area Provider
import { SafeAreaProvider as Provider } from 'react-native-safe-area-context';

export const SafeAreaProvider: FC<PropsWithChildren<ReactNode>> = ({ children }) => <Provider>{children}</Provider>;
