import React, { useCallback } from 'react';
import Cards from '../../common/cards/Cards';
import CounterFetcher from './CounterFetcher';
import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import StatusFilter from '../../common/status/StatusFilter';
import { Counter } from '../../../redux/graphql/renderServer/types';
import './graphqlPage.scss';
import CounterCard from '../../common/cards/counter-card/CounterCard';
import { Alert } from 'react-bootstrap';
import { useIncreaseCounterMutation } from '../../../redux/graphql/renderServer/renderServerQLApi';

const GraphqlPage = () => {
  const queryCounters = useAppSelector(
    (state: RootState) =>
      state.renderServerQLApi.queries?.['getCounters(undefined)']
  );
  const [increaseCoutner] = useIncreaseCounterMutation();
  const increaseCounterHanlder = useCallback((id: string, value: number) => {
    increaseCoutner({ id, value });
  }, []);
  const { data, status, error } = queryCounters || {};

  return (
    <div className="graphql-page">
      <h1>Graphql page</h1>
      <Alert variant="warning">
        Note: Backend is hosted by render.com and it might take a while to awake
        the service
      </Alert>
      <CounterFetcher />
      <StatusFilter
        data={data}
        error={error}
        loading={status === 'pending'}
        className="mt-3"
      >
        <Cards
          dataArr={(data as Counter[]) || []}
          renderCard={(data) => (
            <CounterCard
              {...data}
              key={data.id}
              increaseCounterHanlder={increaseCounterHanlder}
            />
          )}
        />
      </StatusFilter>
    </div>
  );
};

export default GraphqlPage;
