import React, { Component } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import "./Login.css";
import auth from "../../api/auth";

export default class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleLogin = async event => {
    event.preventDefault();
    await auth.login(this.state.username, this.state.password);
  };

  render() {
    return (
      <Layout>
        <section>
          <h1>Login</h1>
          <form onSubmit={this.handleLogin}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <input type="submit" value="Login" />
          </form>
        </section>
      </Layout>
    );
  }
}
