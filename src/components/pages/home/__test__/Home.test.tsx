import React from 'react';
import { getByText, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../Home';
import { BrowserRouter } from 'react-router-dom';

test('redner home page by default', async () => {
  render(<Home />, { wrapper: BrowserRouter });
  const user = userEvent.setup();
  const title = screen.getByRole('heading', { name: /About this website/i });
  expect(title).toBeInTheDocument();
  const startBtn = screen.getByRole('button', { name: /get started/i });
  await user.click(startBtn);
  expect(global.window.location.pathname).toContain('/rtk');
});
