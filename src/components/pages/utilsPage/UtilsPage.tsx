import React from 'react';
import LoadingWrapper from '../../common/loading/LoadingWrapper';

const UtilsPage = () => {
  return (
    <div>
      Utils page
      <ShowArticle />
    </div>
  );
};

export default UtilsPage;

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
    <>
      <span>article</span>
      <button onClick={reFetchArticle}>Refetch article</button>
      <LoadingWrapper<string | number>
        loadData={reFetchArticle}
        renderData={renderArticle}
      ></LoadingWrapper>
    </>
  );
}
