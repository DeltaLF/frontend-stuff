import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import Main from './Main';

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/rtk">RTK</Link>
          </li>
          <li>
            <Link to="/graphql">Graphql</Link>
          </li>
          <li>
            <Link to="/utils">Utils</Link>
          </li>
        </ul>
      </nav>
      <Main />
    </div>
  );
}

export default App;
