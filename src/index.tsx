import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import WorkoutApp from './WorkoutApp';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

const mount = document.getElementById('root');

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <WorkoutApp />
    </BrowserRouter>
  </React.StrictMode>
);

ReactDOM.render(app, mount);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
