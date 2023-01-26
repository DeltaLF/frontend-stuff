import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from '../Navbar';
import { BrowserRouter } from 'react-router-dom';

test('redner home page by default', async () => {
  render(<Navbar />, { wrapper: BrowserRouter });
  const user = userEvent.setup();
  expect(global.window.location.pathname).toBe('/');

  // check rtk
  const rtkNav = screen.getByRole('link', { name: /RTK/i });
  await user.click(rtkNav);
  expect(global.window.location.pathname).toContain('/rtk');

  // check graphql
  const graphqlNav = screen.getByRole('link', { name: /graphql/i });
  await user.click(graphqlNav);
  expect(global.window.location.pathname).toContain('/graphql');

  // check utils
  const utilsNav = screen.getByRole('link', { name: /utils/i });
  await user.click(utilsNav);
  expect(global.window.location.pathname).toContain('/utils');
});

test('toggle theme', async () => {
  const { container } = render(<Navbar />, { wrapper: BrowserRouter });
  const user = userEvent.setup();
  const themeDOMInit = document.documentElement.getAttribute('data-theme');
  expect(themeDOMInit).toBeNull();

  // clcik theme toggle
  const themeToggle = container.getElementsByClassName('Navbar--icon');
  expect(themeToggle).toHaveLength(1);
  await user.click(themeToggle[0]);
  // expect(themeToggle).toBeInTheDocument();
  const themeDark = document.documentElement.getAttribute('data-theme');
  expect(themeDark).toBe('dark');

  // light
  await user.click(themeToggle[0]);
  const themeLight = document.documentElement.getAttribute('data-theme');
  expect(themeLight).toBe('light');
});
