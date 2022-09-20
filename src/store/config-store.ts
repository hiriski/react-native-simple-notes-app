import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Async Storage
import rootReducer from './root-reducer';
import rootSaga from './root-saga';
import { __DEV__ } from '@/constants';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

// Middleware: Redux Persist Config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [], // (Save Specific Reducers)
  // blacklist: [], // (Don't Save Specific Reducers)
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// @ts-ignore
const composeEnhancers = __DEV__ ? composeWithDevTools({ realtime: true }) : compose;

const middlewares = [sagaMiddleware];

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux: Store
// @ts-ignore
export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(...middlewares)));

// Middleware: Redux Persist Persister
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
