import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './features/todos/todosSlice';
import { jokeApi } from './apis/joke/jokeApi';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    [jokeApi.reducerPath]: jokeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jokeApi.middleware),
});

// share the store state type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
