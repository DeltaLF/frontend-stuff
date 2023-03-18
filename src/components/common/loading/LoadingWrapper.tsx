import React, { ReactElement, useEffect, useState } from 'react';

interface ILoadingWrapper<T> {
  loadData: () => Promise<T>;
  renderData: (data: T) => ReactElement;
}

function LoadingWrapper<T>({ loadData, renderData }: ILoadingWrapper<T>) {
  const [data, setData] = useState<null | T>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    // not sure when should the laodData be invoked
    loadData()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        if (typeof error === 'string') {
          setError(error);
        } else {
          setError('Something went wrong!');
        }
      });
  }, []);
  if (error) return <div>{error}</div>;
  if (data === null) {
    return <div>loading effect</div>;
  } else {
    return <div>{renderData(data)}</div>;
  }
}

export default LoadingWrapper;
