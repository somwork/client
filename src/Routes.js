import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Create from "./views/Task/Create";
import Update from "./views/Task/Update";
import OverView from "./views/Task/OverView";
import View from "./views/Task/View";

export default () => [
  <Route path="/" exact component={Dashboard} />,
  <Route path="/login" component={Login} />,
  <Route path='/sign-up' component={SignUp}/>,
  <Route path="/task/create" component={Create} />,
  <Route path="/task/update" component={Update} />,
  <Route path='/task/list' component={OverView} />,
  <Route path='/task/detail/:id' component={View} />,
  <Route path="/logout" component={logout} />
  
];

