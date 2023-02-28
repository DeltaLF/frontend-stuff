import {
  getByRole,
  queryByText,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '../../../../utils/test-utils';
import GraphqlPage from '../GraphqlPage';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { server } from '../../../../../mocks/server';
import { rest } from 'msw';
import { graphql } from 'msw';
// import { JOKE_SERVER_URL } from '../../../../redux/apis/joke/types';

describe('test GraphqlPage', () => {
  test('successfully fetch counters and render them', async () => {
    const { store } = render(<GraphqlPage />, {});
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    const cardTitle = await screen.findByText(/lalala/i); // wait until the text appears
    expect(cardTitle).toBeInTheDocument();

    // loading disapears after response is back
    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();

    const increaseCounterButtons = screen.getAllByLabelText('increase-counter');
    expect(increaseCounterButtons).toHaveLength(5);
  });

  test('trigger increasment of counter successfully', async () => {
    const { store } = render(<GraphqlPage />, {});
    const user = userEvent.setup();
    const increaseCounterButtons = await screen.findAllByLabelText(
      'increase-counter'
    );
    expect(screen.getByText('146')).toBeInTheDocument();
    expect(increaseCounterButtons).toHaveLength(5);
    const firstButton = increaseCounterButtons[0].firstChild;
    await user.click(firstButton as Element);
    const increased = await screen.findByText('147'); // added
    expect(increased).toBeInTheDocument();
    expect(screen.queryByText('146')).not.toBeInTheDocument();
  });

  test('failed to fetch counters and render them', async () => {
    // modify the server handler

    server.resetHandlers(
      graphql.query('getAllCounters', async (req, res, ctx) => {
        // return res(ctx.data('error'), ctx.errors(payload.errors));
        return res(ctx.status(500), ctx.errors([{ message: 'server error' }]));
      })
    );
    render(<GraphqlPage />, {});
    const loadingElement = screen.getByText(/Loading/i);
    expect(loadingElement).toBeInTheDocument();
    const errorMessage = await screen.findByText(/Something went wrong/i);
    expect(errorMessage).toBeInTheDocument();
    const nodata = await screen.findByText(/No data yet/i);
    expect(nodata).toBeInTheDocument();
  });
});
