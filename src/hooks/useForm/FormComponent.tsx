import React from 'react';
import { useForm } from './useForm';
import { ValidationRule } from './useForm.type';

interface LoginReq {
  account: string;
  pwd: string;
}

const validationRule: ValidationRule<LoginReq> = {
  account: (v) => v.length > 8,
  pwd: (v) => v.length > 12,
};

function FormComponent() {
  const [loginReq, formSetter, validationResult] = useForm<LoginReq>(
    {
      account: '',
      pwd: '',
    },
    validationRule
  );

  return (
    <form className="login-form">
      <label htmlFor="account">Account</label>
      <input
        id="account"
        type="text"
        value={loginReq.account}
        onChange={formSetter.account}
      />
      <div className="invalid">{validationResult.account?.error}</div>

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={loginReq.pwd}
        onChange={formSetter.pwd}
      />
      <div className="invalid">{validationResult.pwd?.error}</div>
    </form>
  );
}

export default FormComponent;
