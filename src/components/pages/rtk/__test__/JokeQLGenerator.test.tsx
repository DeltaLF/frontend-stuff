import JokeQLGenerator from '../JokeQLGenerator';
import { render, screen, waitFor } from '../../../../utils/test-utils';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { server } from '../../../../../mocks/server';
import { graphql } from 'msw';

describe('test joke generator button', () => {
  test('inital state that all 3 checkboxs are selected', () => {
    render(<JokeQLGenerator />, {});
    const idCheckbox = screen.getByRole('checkbox', { name: 'joke id' });
    expect(idCheckbox).toBeChecked();
    expect(idCheckbox).not.toBeDisabled();
    const contentCheckbox = screen.getByRole('checkbox', {
      name: 'joke content',
    });
    expect(contentCheckbox).toBeChecked();
    expect(contentCheckbox).not.toBeDisabled();
    const permalinkCheckbox = screen.getByRole('checkbox', {
      name: 'permalink',
    });
    expect(permalinkCheckbox).toBeChecked();
    expect(permalinkCheckbox).not.toBeDisabled();
  });

  test('id check box is disabled after unselecting content and permalinkCheckbox', async () => {
    // not allowed to uncheck all checkbox
    render(<JokeQLGenerator />, {});
    const user = userEvent.setup();
    const contentCheckbox = screen.getByRole('checkbox', {
      name: 'joke content',
    });
    await user.click(contentCheckbox);
    const permalinkCheckbox = screen.getByRole('checkbox', {
      name: 'permalink',
    });
    await user.click(permalinkCheckbox);
    const idCheckbox = screen.getByRole('checkbox', { name: 'joke id' });
    expect(idCheckbox).toBeDisabled();
    // clickable after check at least 2 checkboxs
    await user.click(contentCheckbox);
    expect(idCheckbox).not.toBeDisabled();
  });

  test('fetch joke and create todo list after the button is clicked and all the options are checked so id, content, link exisit', async () => {
    const { store } = render(<JokeQLGenerator />, {});
    const user = userEvent.setup();
    const fetchJokeButton = screen.getByRole('button', {
      name: /Fetch Joke graphql/i,
    });
    await user.click(fetchJokeButton);
    // the state only update after the second click
    await waitFor(() => {
      const { todos, jokeApi } = store.getState();
      const newTodo = todos.todos[0];
      expect(newTodo.title).toBe('Read a joke');
      expect(
        newTodo.content.indexOf(
          'joke link: https://icanhazdadjoke.com/j/vXgNZ0wcxAd'
        )
      ).toBeGreaterThan(-1);
      expect(newTodo.content.indexOf('joke id: vXgNZ0wcxAd')).toBeGreaterThan(
        -1
      );
      expect(
        newTodo.content.indexOf(
          'I’m on a whiskey diet. I’ve lost three days already.'
        )
      ).toBeGreaterThan(-1);
    });
  });

  test('there is only id in content of todolist after unchecking content, permaink', async () => {
    const { store } = render(<JokeQLGenerator />, {});
    const user = userEvent.setup();
    const contentCheckbox = screen.getByRole('checkbox', {
      name: 'joke content',
    });
    // uncheck content
    await user.click(contentCheckbox);
    const permalinkCheckbox = screen.getByRole('checkbox', {
      name: 'permalink',
    });
    await user.click(permalinkCheckbox);
    const fetchJokeButton = screen.getByRole('button', {
      name: /Fetch Joke graphql/i,
    });
    await user.click(fetchJokeButton);
    await waitFor(() => {
      const { todos, jokeApi } = store.getState();
      const newTodo = todos.todos[0];
      expect(newTodo.title).toBe('Read a joke');
      expect(
        newTodo.content.indexOf(
          'joke link: https://icanhazdadjoke.com/j/vXgNZ0wcxAd'
        )
      ).toBe(-1);
      // only joke id exists
      expect(newTodo.content.indexOf('joke id: vXgNZ0wcxAd')).toBeGreaterThan(
        -1
      );
      expect(
        newTodo.content.indexOf(
          'I’m on a whiskey diet. I’ve lost three days already.'
        )
      ).toBe(-1);
    });
  });

  test('jokeQL server is unavailable ', async () => {
    // overwrite properly handled mock server to 404
    server.resetHandlers(
      graphql.operation(async (req, res, ctx) => {
        // return res(ctx.data('error'), ctx.errors(payload.errors));
        return res(ctx.status(500), ctx.errors([{ message: 'server error' }]));
      })
    );
    render(<JokeQLGenerator />, {});
    const user = userEvent.setup();
    const fetchJokeButton = screen.getByRole('button', {
      name: /Fetch Joke graphql/i,
    });
    await user.click(fetchJokeButton);
    await waitFor(() => {
      const alertMessage = screen.getByRole('alert'); //, { name: /Request failed/i })
      expect(alertMessage).toBeInTheDocument();
      expect(alertMessage).toHaveTextContent(/Something went wrong/i);
    });
  });
});
