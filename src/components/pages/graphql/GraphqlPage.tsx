import React from 'react';
import { Card } from 'react-bootstrap';
import Cards from '../../common/cards/Cards';

const GraphqlPage = () => {
  const mockCounterData = [
    { id: '1', count: 0, data: 'first counter' },
    { id: '2', count: 5, data: 'second counter' },
  ];
  return (
    <div className="graphql-page">
      <h1>Graphql page</h1>{' '}
      <Cards
        dataArr={mockCounterData}
        renderCard={(data) => (
          <Card className="todo-card">
            <Card.Header>{data.data}</Card.Header>
            <h3>{data.count}</h3>
          </Card>
        )}
      />
    </div>
  );
};

export default GraphqlPage;
