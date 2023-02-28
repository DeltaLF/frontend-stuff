import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useGetCountersQuery } from '../../../redux/graphql/renderServer/renderServerQLApi';
import Alert from '../../common/message/Alert';
import WrappedTooltips from '../../common/message/WrappedTooltips';

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
      <WrappedTooltips
        content="Fetch from a graphql backend implemented by myself"
        placement="top"
      >
        <Button
          variant="warning"
          className="todo-button"
          style={{ marginLeft: '1rem' }}
          onClick={fetchCoutners}
        >
          Fetch Counters
        </Button>
      </WrappedTooltips>
    </>
  );
}

export default CounterFetcher;
