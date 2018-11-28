import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import './default.css'
import budget from './api/budget'
global.budget = budget

const App = () => (
  <Routes />
)

ReactDOM.render(<App />, document.getElementById('root'));
