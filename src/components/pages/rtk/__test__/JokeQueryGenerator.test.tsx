import JokeQueryGenerator from '../JokeQueryGenerator';
import { render, screen, waitFor } from '../../../../utils/test-utils';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { server } from '../../../../../mocks/server';
import { rest } from 'msw';
import { JOKE_SERVER_URL } from '../../../../redux/apis/joke/types';

describe('test joke generator button', () => {
  test('fetch joke and create todo list after the button is clicked', async () => {
    const { store } = render(<JokeQueryGenerator />, {});
    const user = userEvent.setup();
    const fetchJokeButton = screen.getByRole('button', { name: /Fetch Joke/i });
    await user.click(fetchJokeButton);
    // the state only update after the second click
    await user.click(fetchJokeButton);
    await waitFor(() => {
      const { todos, jokeApi } = store.getState();
      expect(todos.todos[0].title).toBe('Read a joke');
    });
  });
  test('fetcch joke while server is unavialable', async () => {
    // overwrite properly handled mock server to 404
    server.resetHandlers(
      rest.get(JOKE_SERVER_URL, (req, res, ctx) => {
        return res(
          ctx.status(404),
          ctx.json({
            message: 'page not found',
          })
        );
      })
    );
    const { store } = render(<JokeQueryGenerator />, {});
    const user = userEvent.setup();
    const fetchJokeButton = screen.getByRole('button', { name: /Fetch Joke/i });
    await user.click(fetchJokeButton);
    await waitFor(() => {
      const alertMessage = screen.getByRole('alert'); //, { name: /Request failed/i })
      expect(alertMessage).toBeInTheDocument();
      expect(alertMessage).toHaveTextContent(/Something went wrong/i);
    });
  });
});
