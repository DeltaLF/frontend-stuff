import React from 'react';
import './cards.scss';

type CardsProps<T> = {
  dataArr: T[];
  renderCard: (data: T) => React.ReactNode;
};

function Cards<T>({ dataArr, renderCard }: CardsProps<T>) {
  return <div className="cards-group">{dataArr.map(renderCard)}</div>;
}

export default Cards;
