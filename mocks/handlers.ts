import { rest } from 'msw';
import { JOKE_SERVER_URL } from '../src/redux/apis/joke/jokeApi';

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
];
