import React from 'react';
import LoadingWrapper from './LoadingWrapper';

function ShowArticle() {
  function reFetchArticle() {
    // axois.get('/articles')
    // mimic get from server
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        if (Math.floor(Math.random() * 2) === 0) {
          resolve('article one');
        } else {
          reject('fail');
        }
      }, 1000);
    });
  }
  function renderArticle(data: string | number) {
    return <div>{data}</div>;
  }
  return (
    <div className="mt-5">
      <h3>article</h3>
      <button onClick={reFetchArticle}>Refetch article</button>
      <LoadingWrapper<string | number>
        loadData={reFetchArticle}
        renderData={renderArticle}
      ></LoadingWrapper>
    </div>
  );
}

export default ShowArticle;
