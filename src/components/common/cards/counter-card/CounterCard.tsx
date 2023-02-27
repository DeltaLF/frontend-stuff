import React from 'react';
import { Counter } from '../../../../redux/graphql/renderServer/types';
import Card from 'react-bootstrap/Card';
import { PlusCircle, DashCircle } from 'react-bootstrap-icons';
import './counter-card.scss';
import { useIncreaseCounterMutation } from '../../../../redux/graphql/renderServer/renderServerQLApi';
import StatusFilter from '../../status/StatusFilter';

function CounterCard({ data }: { data: Counter }) {
  const [increaseCoutner, result] = useIncreaseCounterMutation();
  const { isError, isLoading } = result;
  return (
    <Card className="counter-card" key={data.id}>
      <Card.Header>{data.data}</Card.Header>
      <Card.Body>
        <DashCircle
          onClick={() => {
            increaseCoutner({ id: data.id, value: -1 });
          }}
        />
        <StatusFilter data={data} loading={isLoading}>
          <h3>{data.count}</h3>
        </StatusFilter>

        <PlusCircle
          onClick={() => {
            increaseCoutner({ id: data.id, value: 1 });
          }}
        />
      </Card.Body>
    </Card>
  );
}

export default CounterCard;
