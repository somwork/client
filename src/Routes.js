import React from 'react';
import { Route } from "react-router-dom";
import Main from './views/Main';
import Second from './views/Second';

export default () => [
  <Route path='/' exact component={Main} />,
  <Route path='/second' component={Second} />,
]
