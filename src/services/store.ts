import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsSliceReducer from './slices/ingredientsSlice';
import burgerSliceReducer from './slices/burgerSlice';
import feedSliceReducer from './slices/feedsSlice';
import userSliceReducer from './slices/userSlice';
import orderSliceReducer from './slices/ordersSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientsSliceReducer,
  burger: burgerSliceReducer,
  feed: feedSliceReducer,
  user: userSliceReducer,
  orders: orderSliceReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
