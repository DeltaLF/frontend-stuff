/*
Hoster: Redner
Schema registry: apollographql
Database: mongodb atlas

backend schema
  "Schema definitions"
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
*/

export const RENDER_SERVER_URI =
  'https://graphql-backend-for-frontend-stuff.onrender.com/';

export type Counter = {
  id: string;
  count: number;
  data: string;
};

export type CounterResponse = {
  code: number;
  success: boolean;
  message: string;
  coutner: Counter;
};

export type RenderServerQLType = {
  counters?: Counter[];
  counter?: Counter;
  increaseCounter?: CounterResponse;
};
