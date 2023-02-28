import { buildSchema } from 'graphql';

const PAYLOAD = [
  {
    id: '523401e7-7dfb-42e9-8df4-15879e45c3fb',
    count: 146,
    data: 'lalala',
  },
  {
    id: 'afbe381a-07d7-4564-a4cf-9687dc1f7a96',
    count: 29,
    data: '2023/02/17',
  },
  {
    id: '175a3d76-7683-4d53-8eca-a9955416857a',
    count: -1,
    data: '2023/02/17__1',
  },
  {
    id: '87382fb8-a7ea-4fc6-bc1d-bb56b4fafb26',
    count: 0,
    data: '2023/02/17__3',
  },
  {
    id: '47b37912-1815-4010-8a07-83a279d77935',
    count: 502,
    data: '2023/02/17__4',
  },
];

export const counterSchema = buildSchema(`
type Query {
    "fields"
    counters: [Counter]!
    counter(id: ID!): Counter
  }

  type Counter {
    id: ID!
    count: Int!
    data: String
  }

  type Mutation {
    createCounter(data: String): CounterResponse!
    "default value: 1"
    increaseCounter(id: ID!, value: Int): CounterResponse!
    deleteCounter(id: ID!): CounterResponse!
  }

  type CounterResponse {
    code: Int!
    success: Boolean!
    message: String!
    counter: Counter
  }
`);

export const counterRoot = {
  counters: () => {
    return PAYLOAD;
  },
  couter: (id: string) => {
    return PAYLOAD.filter((counter) => counter.id === id);
  },
  increaseCounter: ({ id, value }: { id: string; value: number }) => {
    for (const counter of PAYLOAD) {
      if (counter.id === id) {
        counter.count += value;
        return {
          code: 200,
          success: true,
          message: 'increase successfully',
          counter: counter,
        };
      }
    }
  },
};
