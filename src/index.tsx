import React, { Profiler } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import { store } from './redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Profiler
    id="App"
    onRender={(
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime
    ) => {
      console.log(
        'id:',
        id,
        'phase',
        phase,
        'actualDuration',
        actualDuration,
        'baseDuration',
        baseDuration,
        'startTime',
        startTime,
        'commitTime',
        commitTime
      );
    }}
  >
    <React.StrictMode>
      <HashRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </HashRouter>
    </React.StrictMode>
  </Profiler>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
