import { createApi } from '@reduxjs/toolkit/query/react';
import { request, gql, ClientError } from 'graphql-request';
import { JOKE_SERVER_URL } from '../../apis/joke/types';
import { JokeQL, JokeQLKey, JokeQLOptions } from './types';

export const JOKE_GRAPHQL_SERVER_URL = JOKE_SERVER_URL + 'graphql';

const jokeGraphqlBaseQuery =
  ({ baseUrl }: { baseUrl: string }) =>
  async ({ body }: { body: string }) => {
    try {
      const result = await request<{ joke: JokeQL }>(baseUrl, body);
      return { data: result };
    } catch (error) {
      if (error instanceof ClientError) {
        return { error: { status: error.response.status } };
      }
      return { error: { status: 500 } };
    }
  };

export const jokeQLApi = createApi({
  reducerPath: 'jokeQLApi',
  baseQuery: jokeGraphqlBaseQuery({
    baseUrl: JOKE_GRAPHQL_SERVER_URL,
  }),
  endpoints: (builder) => ({
    getRandomJokeQL: builder.query<JokeQL, JokeQLOptions>({
      query: (jokeQLOptions) => {
        let queryKey = ''; //'id joke permalink';
        for (const key in jokeQLOptions) {
          if (!!jokeQLOptions[key as JokeQLKey] as boolean) {
            queryKey += key + ' ';
          }
        }
        return {
          body: gql`
            query joke{
              joke {
                ${queryKey}
              }
            }
          `,
        };
      },
      transformResponse: (response) => {
        return response.joke;
      },
    }),
  }),
});

export const { useGetRandomJokeQLQuery } = jokeQLApi;
