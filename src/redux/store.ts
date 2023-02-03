import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './features/todos/todosSlice';
import { jokeApi } from './apis/joke/jokeApi';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    [jokeApi.reducerPath]: jokeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger).concat(jokeApi.middleware),
  devTools: process.env.NODE_ENV != 'production',
});

// share the store state type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
