import { combineReducers } from 'redux';

// Root State.
export type RootState = {
  myReducer: {
    foo: string;
  };
};

// Reducers.
type MyState = {
  foo: string;
};

export const myReducer = (state: MyState = { foo: 'bar' }, action: any): MyState => {
  return state;
};

export default combineReducers<RootState>({
  myReducer,
});
