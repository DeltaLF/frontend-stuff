import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../components/pages/home/Home';
import RTKpage from '../components/pages/rtk/RTKpage';
import GraphqlPage from '../components/pages/graphql/GraphqlPage';
import UtilsPage from '../components/pages/utilsPage/UtilsPage';
import './main.scss';

function Main() {
  return (
    <div className="Main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rtk" element={<RTKpage />} />
        <Route path="/graphql" element={<GraphqlPage />} />
        <Route path="/utils" element={<UtilsPage />} />
      </Routes>
    </div>
  );
}

export default Main;
