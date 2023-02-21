import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useGetCountersQuery } from '../../../redux/graphql/renderServer/renderServerQLApi';
import Alert from '../../common/message/Alert';

function CounterFetcher() {
  const { data, error, isLoading, refetch } = useGetCountersQuery();
  function fetchCoutners() {
    // fetchCounters from render backend server
    refetch();
  }
  const [errorMessage, setErrorMessage] = useState<string>('');
  return (
    <>
      <Alert setMessage={setErrorMessage} message={errorMessage} />
      <Button
        variant="warning"
        className="todo-button"
        style={{ marginLeft: '1rem' }}
        onClick={fetchCoutners}
      >
        Fetch Counters
      </Button>
    </>
  );
}

export default CounterFetcher;
