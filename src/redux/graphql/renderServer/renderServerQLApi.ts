import { createApi } from '@reduxjs/toolkit/query/react';
import { request, gql, ClientError } from 'graphql-request';

import { Counter, RenderServerQLType, RENDER_SERVER_URI } from './types';

const renderServerQLBaseQuery =
  ({ baseUrl }: { baseUrl: string }) =>
  async ({ body }: { body: string }) => {
    try {
      // #todo remember to properly type
      const result = await request<RenderServerQLType>(baseUrl, body);
      return { data: result };
    } catch (error) {
      if (error instanceof ClientError) {
        return { error: { status: error.response.status, data: error } };
      }
      return { error: { status: 500, data: error } };
    }
  };

export const renderServerQLApi = createApi({
  reducerPath: 'renderServerQLApi',
  baseQuery: renderServerQLBaseQuery({
    baseUrl: RENDER_SERVER_URI,
  }),
  endpoints: (builder) => ({
    getCounters: builder.query<Counter[], void>({
      query: () => ({
        body: gql`
          query getAllCounters {
            counters {
              id
              count
              data
            }
          }
        `,
      }),
      transformResponse: (response) => {
        // #todo this might be wrong
        return response.counters ? response.counters : [];
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        // prevent passing non-serializable value in redux
        const { status, data } = baseQueryReturnValue;
        let message = 'something wentwrong';
        if (data && typeof data === 'object' && 'message' in data) {
          message = data.message as string;
        }
        return {
          status,
          data: {
            message,
          },
        };
      },
    }),
    getCounter: builder.query<Counter, { id: string }>({
      query: ({ id }) => {
        return {
          body: gql`
            query getCounter($counterId: ID!) {
              counters(id: $counterId) {
                id
                count
                data
              }
            }
          `,
          variables: {
            counterId: id,
          },
        };
      },
      transformResponse: (response) => {
        // #todo this might be wrong
        if (!response.counter) {
          throw Error('Cannot fetch data from server');
        }
        return response.counter;
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        // prevent passing non-serializable value in redux
        const { status, data } = baseQueryReturnValue;
        let message = 'something wentwrong';
        if (data && typeof data === 'object' && 'message' in data) {
          message = data.message as string;
        }
        return {
          status,
          data: {
            message,
          },
        };
      },
    }),
  }),
});

export const { useGetCountersQuery, useGetCounterQuery } = renderServerQLApi;
