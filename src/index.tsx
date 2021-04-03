import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.sass'
ReactDOM.render(
  <React.StrictMode>
    <link href="../node_modules/bulma/css/bulma.min.css" rel="stylesheet"/>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);