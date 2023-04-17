import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
const Home = React.lazy(() => import('../../components/pages/home/Home'));
const RTKpage = React.lazy(() => import('../../components/pages/rtk/RTKpage'));
const GraphqlPage = React.lazy(
  () => import('../../components/pages/graphql/GraphqlPage')
);
const UtilsPage = React.lazy(
  () => import('../../components/pages/utilsPage/UtilsPage')
);
import './main.scss';

function Main() {
  return (
    <div className="Main">
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rtk" element={<RTKpage />} />
          <Route path="/graphql" element={<GraphqlPage />} />
          <Route path="/utils" element={<UtilsPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default Main;
