import JokeGenerator from '../JokeGenerator';
import { render, screen, waitFor } from '../../../../utils/test-utils';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('test joke generator button', () => {
  test('fetch joke and create todo list after the button is clicked', async () => {
    const { store } = render(<JokeGenerator />, {});
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
});
