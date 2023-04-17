import React from 'react';
import { Counter } from '../../../../redux/graphql/renderServer/types';
import Card from 'react-bootstrap/Card';
import { PlusCircle, DashCircle } from 'react-bootstrap-icons';
import './counter-card.scss';

function CounterCard({
  id,
  count,
  data,
  increaseCounterHanlder,
}: Counter & {
  increaseCounterHanlder(id: string, value: number): void;
}) {
  return (
    <Card className="counter-card" key={id}>
      <Card.Header>{data}</Card.Header>
      <Card.Body>
        <div className="decrease-counter" aria-label="decrease-counter">
          <DashCircle
            onClick={() => {
              increaseCounterHanlder(id, -1);
            }}
          />
        </div>

        {/* <StatusFilter data={data} loading={isLoading}> */}
        <h3>{count}</h3>
        {/* </StatusFilter> */}
        <div className="increase-counter" aria-label="increase-counter">
          <PlusCircle
            onClick={() => {
              increaseCounterHanlder(id, 1);
            }}
          />
        </div>
      </Card.Body>
    </Card>
  );
}
// export default CounterCard;

export default React.memo(
  CounterCard,
  function areEqual(
    { id: prevId, count: prevCount, data: prevData },
    { id, count, data }
  ) {
    // skip increaseCounterHanlder
    return id === prevId && count === prevCount && prevData === data;
  }
);
