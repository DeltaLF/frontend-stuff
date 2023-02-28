import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './features/todos/todosSlice';
import { jokeApi } from './apis/joke/jokeApi';
import { jokeQLApi } from './graphql/joke/jokeApiQL';
import { renderServerQLApi } from './graphql/renderServer/renderServerQLApi';

import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    [jokeApi.reducerPath]: jokeApi.reducer,
    [jokeQLApi.reducerPath]: jokeQLApi.reducer,
    [renderServerQLApi.reducerPath]: renderServerQLApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(logger)
      .concat(jokeApi.middleware)
      .concat(jokeQLApi.middleware)
      .concat(renderServerQLApi.middleware),
  devTools: process.env.NODE_ENV != 'production',
});

// share the store state type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
