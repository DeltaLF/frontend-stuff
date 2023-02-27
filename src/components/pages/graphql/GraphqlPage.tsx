import React from 'react';
import Cards from '../../common/cards/Cards';
import CounterFetcher from './CounterFetcher';
import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import StatusFilter from '../../common/status/StatusFilter';
import { Counter } from '../../../redux/graphql/renderServer/types';
import './graphqlPage.scss';
import CounterCard from '../../common/cards/counter-card/CounterCard';

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
          renderCard={(data) => <CounterCard data={data} key={data.id} />}
        />
      </StatusFilter>
    </div>
  );
};

export default GraphqlPage;
