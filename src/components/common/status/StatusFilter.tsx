import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { SerializedError } from '@reduxjs/toolkit';
import Alert from '../message/Alert';
import SmallSpinner from '../loading/SmallSpinner';

interface IStatusFilter<T> {
  loading: boolean;
  error?: SerializedError;
  data: T | T[];
  children?: JSX.Element;
  className?: string;
}

function StatusFilter<T>({
  loading,
  error,
  data,
  children,
  className,
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
    <div className={className}>
      <Alert setMessage={setErrorMessage} message={errorMessage} />
      {/* {!!error && <p> {error.message}</p>} */}
      {!!loading && <SmallSpinner />}
      {!!children && !loading && children}
      {!data && !loading && <p>No data yet...</p>}
    </div>
  );
}

export default StatusFilter;
