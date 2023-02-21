import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { SerializedError } from '@reduxjs/toolkit';
import Alert from '../message/Alert';

interface IStatusFilter<T> {
  loading: boolean;
  error?: SerializedError;
  data: T | T[];
  children?: JSX.Element;
}

function StatusFilter<T>({
  loading,
  error,
  data,
  children,
}: IStatusFilter<T>): JSX.Element {
  //   if (error) {
  //     return <p className="mt-3"> {error.message}</p>;
  //   }
  //   if (loading) {
  //     return (
  //       <Spinner animation="border" role="status">
  //         <span className="visually-hidden">Loading...</span>
  //       </Spinner>
  //     );
  //   }
  //   if (data) {
  //     return <>{children}</>;
  //   }
  //   return <p className="mt-3">No data yet...</p>;
  const [errorMessage, setErrorMessage] = useState<string>(
    error?.message || ''
  );
  useEffect(() => {
    if (error?.message) {
      setErrorMessage(error.message);
    }
  }, [error]);
  return (
    <div className="mt-3">
      <Alert setMessage={setErrorMessage} message={errorMessage} />
      {/* {!!error && <p> {error.message}</p>} */}
      {!!loading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {!!children && children}
      {!data && !loading && <p>No data yet...</p>}
    </div>
  );
}

export default StatusFilter;
