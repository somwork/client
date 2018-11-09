import React from 'react';
import { Route } from "react-router-dom";
import Main from './views/Main';
import Second from './views/Second';
import Create from './views/Task/Create';
import Update from './views/Task/Update';

export default () => [
  <Route path='/' exact component={Main} />,
  <Route path='/second' component={Second} />,
  <Route path='/task/create' component={Create} />,
  <Route path='/task/update' component={Update} />,
]

