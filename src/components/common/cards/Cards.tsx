import React from 'react';
import Container from 'react-bootstrap/Container';
import './cards.scss';

type CardsProps<T> = {
  dataArr: T[];
  renderCard: (data: T) => React.ReactNode;
};

function Cards<T>({ dataArr, renderCard }: CardsProps<T>) {
  return (
    <Container className="mt-3 mb-3">
      <div className="cards-group">{dataArr.map(renderCard)}</div>
    </Container>
  );
}

export default Cards;
