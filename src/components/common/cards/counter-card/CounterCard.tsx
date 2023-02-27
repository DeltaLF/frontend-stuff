import React from 'react';
import { Counter } from '../../../../redux/graphql/renderServer/types';
import Card from 'react-bootstrap/Card';
import { PlusCircle, DashCircle } from 'react-bootstrap-icons';
import './counter-card.scss';

function CounterCard({ data }: { data: Counter }) {
  return (
    <Card className="counter-card" key={data.id}>
      <Card.Header>{data.data}</Card.Header>
      <Card.Body>
        <DashCircle />
        <h3>{data.count}</h3>
        <PlusCircle />
      </Card.Body>
    </Card>
  );
}

export default CounterCard;
