import { rest, graphql } from 'msw';
import { JOKE_SERVER_URL } from '../src/redux/apis/joke/types';
import { graphql as graphqlRequest } from 'graphql';
import { jokeSchema, jokeRoot } from './graphql_mock/joke';
import { counterSchema, counterRoot } from './graphql_mock/counter';

export const handlers = [
  // get random joke
  rest.get(JOKE_SERVER_URL, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: '99UDQZgyIBd',
        joke: "Two satellites decided to get married. The wedding wasn't much, but the reception was incredible.",
        status: 200,
      })
    );
  }),
  // ---------------------- graphql server handler ----------------------
  // get random joke with grahql
  // handle a "joke" query
  graphql.query('joke', async (req, res, ctx) => {
    const reqJson = await req.json();
    const { query } = reqJson;
    /* 
    return value of request is not a normal javascript object
    but an object without prototype
    */
    const payload = await graphqlRequest({
      schema: jokeSchema,
      source: query,
      rootValue: jokeRoot,
      variableValues: req.variables,
    });
    // use JSON parse, stringify to make data become the normal javascript object
    const data = await JSON.parse(JSON.stringify(payload.data));
    return res(ctx.data(data), ctx.errors(payload.errors));
  }),
  // for counter server
  graphql.query('getAllCounters', async (req, res, ctx) => {
    const reqJson = await req.json();
    const { query } = reqJson;
    const payload = await graphqlRequest({
      schema: counterSchema,
      source: query,
      rootValue: counterRoot,
      variableValues: req.variables,
    });
    const data = await JSON.parse(JSON.stringify(payload.data));
    return res(ctx.data(data), ctx.errors(payload.errors));
  }),
  // graphql.query('counter', async (req, res, ctx) => {}),
  graphql.mutation('increaseCounter', async (req, res, ctx) => {
    const reqJson = await req.json();
    const { query } = reqJson;
    const payload = await graphqlRequest({
      schema: counterSchema,
      source: query,
      rootValue: counterRoot,
      variableValues: req.variables,
    });
    const data = await JSON.parse(JSON.stringify(payload.data));
    return res(ctx.data(data), ctx.errors(payload.errors));
  }),
  graphql.operation(async (req, res, ctx) => {
    console.log('graphql is mismatched!', req.body);
    // this callback will be invoked if graphql is not matched
  }),
];
