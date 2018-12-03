import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Create from "./views/Task/Create";
import Update from "./views/Task/Update";
import List from "./views/Task/List";
import View from "./views/Task/View";
import ChangeProfile from "./views/Account/ChangeProfile";
import auth from "./api/auth";


function logout() {
  auth.logout()
  return <Redirect to='/login' />
}

export default () => (
  <Router>
    <div>
      <Route path="/" exact component={Dashboard} />
      <Route path="/login" component={Login} />
      <Route path='/sign-up' component={SignUp} />
      <Route path="/task/create" component={Create} />
      <Route path="/task/update/:id" component={Update} />
      <Route path='/task/list' component={List} />,
      <Route path='/task/detail/:id' component={View} />,
      <Route path="/logout" component={logout} />
      <Route path="/account" component={ChangeProfile} />
    </div>
  </Router>
);
