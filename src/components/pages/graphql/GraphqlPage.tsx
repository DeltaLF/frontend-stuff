import React from 'react';
import { Card } from 'react-bootstrap';
import Cards from '../../common/cards/Cards';
import CounterFetcher from './CounterFetcher';
import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import StatusFilter from '../../common/status/StatusFilter';
import { Counter } from '../../../redux/graphql/renderServer/types';

const GraphqlPage = () => {
  const queryCounters = useAppSelector(
    (state: RootState) =>
      state.renderServerQLApi.queries?.['getCounters(undefined)']
  );

  const { data, status, error } = queryCounters || {};

  return (
    <div className="graphql-page">
      <h1>Graphql page</h1>
      <CounterFetcher />
      <StatusFilter data={data} error={error} loading={status === 'pending'}>
        <Cards
          dataArr={(data as Counter[]) || []}
          renderCard={(data) => (
            <Card className="todo-card">
              <Card.Header>{data.data}</Card.Header>
              <h3>{data.count}</h3>
            </Card>
          )}
        />
      </StatusFilter>
    </div>
  );
};

export default GraphqlPage;
