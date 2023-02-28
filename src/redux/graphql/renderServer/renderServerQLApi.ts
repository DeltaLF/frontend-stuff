import { createApi } from '@reduxjs/toolkit/query/react';
import { request, gql, ClientError } from 'graphql-request';

import {
  Counter,
  CounterResponse,
  RenderServerQLType,
  RENDER_SERVER_URI,
} from './types';

const renderServerQLBaseQuery =
  ({ baseUrl }: { baseUrl: string }) =>
  async ({
    body,
    variables,
  }: {
    body: string;
    variables?: { [key: string]: null | number | string };
  }) => {
    try {
      // #todo remember to properly type
      const result = await request<RenderServerQLType>(
        baseUrl,
        body,
        variables
      );
      return { data: result };
    } catch (error) {
      if (error instanceof ClientError) {
        return {
          error: { status: error.response.status, data: error.response.data },
        };
      }

      return {
        error: { status: 500, message: 'something went wrong!' },
      };
    }
  };

export const renderServerQLApi = createApi({
  reducerPath: 'renderServerQLApi',
  baseQuery: renderServerQLBaseQuery({
    baseUrl: RENDER_SERVER_URI,
  }),
  tagTypes: ['Counter'],
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
      // providesTags: ['Counter'],
      providesTags: (result = [], error, arg) => {
        // result: response data from BE
        return result.map((counter) => {
          return { type: 'Counter', id: counter.id };
        });
      },
      transformResponse: (response) => {
        return response.counters ? response.counters : [];
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        // prevent passing non-serializable value in redux
        const { status, data } = baseQueryReturnValue;
        let message = 'something went wrong';
        if (data && typeof data === 'object' && 'message' in data) {
          message = data.message as string;
        }
        return {
          status,
          message,
        };
      },
    }),
    getCounter: builder.query<Counter, { id: string }>({
      query: ({ id }) => {
        return {
          body: gql`
            query getCounter{
              counters(id: ${id}) {
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
      providesTags: (_result, _err, id) =>
        typeof id === 'string'
          ? [{ type: 'Counter', id }]
          : [{ type: 'Counter' }],
      transformResponse: (response) => {
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
          message,
        };
      },
    }),
    increaseCounter: builder.mutation<
      CounterResponse,
      { id: string; value: number | null }
    >({
      query: ({ id, value }) => {
        return {
          body: gql`
            mutation increaseCounter($id: ID!, $value: Int) {
              increaseCounter(id: $id, value: $value) {
                code
                success
                message
                counter {
                  id
                  count
                  data
                }
              }
            }
          `,
          variables: {
            id,
            value,
          },
        };
      },
      // invalidatesTags: ['Counter'], // update Counters
      invalidatesTags: (result, _err, args) => {
        return [{ type: 'Counter', id: args.id }];
      },
      transformResponse: (response) => {
        if (!response.increaseCounter) {
          throw Error('Cannot fetch data from server');
        }
        return response.increaseCounter;
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        // prevent passing non-serializable value in redux
        const { status, data } = baseQueryReturnValue;

        let message = 'something went wrong';
        if (data && typeof data === 'object' && 'message' in data) {
          message = data.message as string;
        }
        return {
          status,
          message,
        };
      },
    }),
  }),
});

export const {
  useGetCountersQuery,
  useGetCounterQuery,
  useIncreaseCounterMutation,
} = renderServerQLApi;
