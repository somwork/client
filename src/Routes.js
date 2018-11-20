import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Create from "./views/Task/Create";
import Update from "./views/Task/Update";
import auth from "./api/auth";

export default () => [
  <Route path='/' exact component={Main} />,
  <Route path='/second' component={Second} />,
  <Route path='/task/create' component={Create} />,
  <Route path='/task/update/:id' component={Update} />,
]
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
      <Route path="/task/update" component={Update} />
      <Route path="/logout" component={logout} />
    </div>
  </Router>
);
