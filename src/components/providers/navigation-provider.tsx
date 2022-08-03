import React, { FC, PropsWithChildren, ReactNode } from 'react';

// Navigation container.
import { NavigationContainer } from '@react-navigation/native';

export const NavigationProvider: FC<PropsWithChildren<ReactNode>> = ({ children }) => (
  <NavigationContainer>{children}</NavigationContainer>
);
