import { rest, graphql } from 'msw';
import { JOKE_SERVER_URL } from '../src/redux/apis/joke/types';
import { graphql as graphqlRequest, buildSchema } from 'graphql';

const jokeSchema = buildSchema(`
type Query{
  joke: Joke
}

type Joke {
  id: String
  joke: String
  permalink: String
}
`);

const jokeRoot = {
  joke: () => {
    return {
      id: 'vXgNZ0wcxAd',
      joke: 'I’m on a whiskey diet. I’ve lost three days already.',
      permalink: 'https://icanhazdadjoke.com/j/vXgNZ0wcxAd',
    };
  },
};

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
  // get random joke with grahql
  // handle a "joke" query
  graphql.query('joke', async (req, res, ctx) => {
    // mws doesn't handle anoymous Graphql (the joke graphql is an anonymous graphql) so use graph.operation as workaround
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
    // return res(
    //   ctx.data({
    //     joke: {
    //       id: 'vXgNZ0wcxAd',
    //       joke: 'I’m on a whiskey diet. I’ve lost three days already.',
    //       permalink: 'https://icanhazdadjoke.com/j/vXgNZ0wcxAd',
    //     },
    //   })
    // );
  }),
  graphql.operation(async (req, res, ctx) => {
    // this callback will be invoked if graphql is not matched
  }),
];
