import React from "react";
import { Route } from "react-router-dom";

import Main from "./views/Main";
import Second from "./views/Second";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Create from "./views/Task/Create";
import Update from "./views/Task/Update";
import OverView from "./views/Task/OverView";
import TaskView from "./views/Task/View";
import OfferView from "./views/Offer/View";

export default () => [
  <Route path="/" exact component={Main} />,
  <Route path="/second" component={Second} />,
  <Route path="/login" component={Login} />,
  <Route path='/sign-up' component={SignUp}/>,
  <Route path="/task/create" component={Create} />,
  <Route path="/task/update" component={Update} />,
  <Route path='/task/list' component={OverView} />,
  <Route path='/task/detail/:id' component={TaskView} />,
  <Route path='/Offer/detail/' component={OfferView} />

];
