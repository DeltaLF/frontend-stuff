import { Alert as BootstrapAlert, AlertProps } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

interface IAlert extends Partial<AlertProps> {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  duration?: number;
}
// props for varaint...
function Alert({
  message,
  setMessage,
  duration = 3,
  variant = 'danger',
  ...props
}: IAlert) {
  // clear message after duration timeout
  useEffect(() => {
    if (message) {
      const id = setTimeout(() => {
        setMessage('');
      }, duration * 1000);
      return () => {
        clearTimeout(id);
      };
    }
  }, [message]);

  return (
    <BootstrapAlert
      {...props}
      variant={variant}
      show={!!message}
      style={{
        minWidth: '16rem',
        position: 'absolute',
        top: '1.5rem',
        left: '50vw',
        transform: 'translateX(-50%)',
      }}
    >
      {message}
    </BootstrapAlert>
  );
}

export default Alert;
