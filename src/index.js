import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './Routes';
import './default.css'

const App = () => (
  <Router>
    <div>
      <Routes />
    </div>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('root'));
