import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { store } from './config-store';
import { RootState } from './root-reducer';

type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = (): unknown => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
