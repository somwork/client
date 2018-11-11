import React, { Component } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import "./Login.css";
import * as tokenService from "../../scripts/token.js";

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
    // await fetch("https://localhost:5001/api/token", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(this.state)
    // })
    //   .then(function(response) {
    //     return response.json();
    //   })
    //   .then(function(myJson) {
    //     localStorage.setItem("Tokens", JSON.stringify(myJson));
    //     console.log(JSON.stringify(myJson));
    //   });
    console.log("HEJ");
    const result = await tokenService.LoginFetch({
      method: "POST",
      body: JSON.stringify(this.state)
    });
    console.log(result);
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
          <Link to="/">Main view</Link>
        </section>
      </Layout>
    );
  }
}
