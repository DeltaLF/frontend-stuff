import { buildSchema } from 'graphql';

export const jokeSchema = buildSchema(`
type Query{
  joke: Joke
}

type Joke {
  id: String
  joke: String
  permalink: String
}
`);

export const jokeRoot = {
  joke: () => {
    return {
      id: 'vXgNZ0wcxAd',
      joke: 'I’m on a whiskey diet. I’ve lost three days already.',
      permalink: 'https://icanhazdadjoke.com/j/vXgNZ0wcxAd',
    };
  },
};
