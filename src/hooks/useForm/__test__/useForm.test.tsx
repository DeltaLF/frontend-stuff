import { render, screen } from '@testing-library/react';
import FormComponent from '../FormComponent';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('tests custom hook useForm', () => {
  it('tests initial', () => {
    render(<FormComponent />);
    expect(
      screen.getByRole('textbox', { name: /account/i })
    ).toBeInTheDocument();
    // password doesn't have a role
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.queryAllByText(/invalid input/i)).toHaveLength(0);
  });

  it('tests typing valid data', async () => {
    render(<FormComponent />);
    const user = userEvent.setup();
    const accountInput = screen.getByRole('textbox', { name: /account/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const validAccount = 'notover8';
    const validPasswrod = 'notover12';
    await user.type(accountInput, validAccount);
    await user.type(passwordInput, validPasswrod);
    expect(accountInput).toHaveValue(validAccount);
    expect(passwordInput).toHaveValue(validPasswrod);
    expect(screen.queryAllByText(/invalid input/i)).toHaveLength(0);
  });

  it('tests typing invalid data', async () => {
    render(<FormComponent />);
    const user = userEvent.setup();
    const accountInput = screen.getByRole('textbox', { name: /account/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const inValidAccount = 'invalid account input due to the length';
    const inValidPasswrod = 'invalid password input due to the length';
    expect(screen.queryAllByText(/invalid input/i)).toHaveLength(0);
    await user.type(accountInput, inValidAccount);
    expect(screen.queryAllByText(/invalid input/i)).toHaveLength(1);
    await user.type(passwordInput, inValidPasswrod);
    expect(accountInput).toHaveValue(inValidAccount);
    expect(passwordInput).toHaveValue(inValidPasswrod);
    expect(screen.queryAllByText(/invalid input/i)).toHaveLength(2);

    // remove invalid input
    await user.clear(accountInput);
    expect(screen.queryAllByText(/invalid input/i)).toHaveLength(1);
    await user.clear(passwordInput);
    expect(screen.queryAllByText(/invalid input/i)).toHaveLength(0);
  });
});
