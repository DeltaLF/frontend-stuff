import React, { PropsWithChildren } from 'react';
import { render as renderRTL } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import type { store, RootState } from '../redux/store';
import todosReducer from '../redux/features/todos/todosSlice';
import { jokeApi } from '../redux/apis/joke/jokeApi';
import { jokeQLApi } from '../redux/graphql/joke/jokeApiQL';
import logger from 'redux-logger';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<Partial<RootState>>;
  store?: typeof store;
}

function render(
  ui: React.ReactElement,
  {
    preloadedState = {
      todos: { todos: [] },
    },
    store = configureStore({
      preloadedState,
      reducer: {
        todos: todosReducer,
        jokeApi: jokeApi.reducer,
        jokeQLApi: jokeQLApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
          .concat(logger)
          .concat(jokeApi.middleware)
          .concat(jokeQLApi.middleware),
      devTools: process.env.NODE_ENV != 'production',
    }),
    ...renderOptions
  }: ExtendedRenderOptions
) {
  // eslint bans {}
  function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
    return <Provider store={store}> {children}</Provider>;
  }

  return { store, ...renderRTL(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export * from '@testing-library/react';
// override render method in testing library
export { render };
