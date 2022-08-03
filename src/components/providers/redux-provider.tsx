import React, { FC, PropsWithChildren, ReactNode } from 'react';

// React Redux Provider component.
import { Provider } from 'react-redux';

// Redux Persist
import { PersistGate } from 'redux-persist/integration/react';

// config store.
import { store, persistor } from '@/store';

export const ReduxProvider: FC<PropsWithChildren<ReactNode>> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
