import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Joke, JOKE_SERVER_URL } from './types';

export const jokeApi = createApi({
  reducerPath: 'jokeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: JOKE_SERVER_URL,
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // getRandomJoke, search joke with param
    // query: executed while componentDidMount and refetch the cached data while
    getRandomJoke: builder.query<Joke, void>({
      query: () => '',
    }),
  }),
});

export const { useGetRandomJokeQuery } = jokeApi;
