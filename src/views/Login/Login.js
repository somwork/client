import React, { Component } from "react"
import { Redirect, withRouter } from "react-router-dom"
import Layout from "../../components/Layout"
import Alert from "../../components/Alert"
import auth from "../../api/auth"
import './Login.css'

export default withRouter(class Login extends Component {
  state = {
    username: "",
    password: "",
    error: null,
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleLogin = async event => {
    event.preventDefault()

    try {
      await auth.login(this.state.username, this.state.password)
      this.props.history.push('/')
    } catch({ message }) {
      this.setState({ error: message })
    }
  }

  handleSignUp = () => {
    this.props.history.push('/sign-up')
  }

  render() {
    if (auth.ok()) {
      return <Redirect to='/' />
    }

    return (
      <Layout hideSideBar>
        <section className='login'>
          <div>
            <form onSubmit={this.handleLogin}>
              <h1>Login</h1>
              {this.state.error && (
                <Alert>{this.state.error}</Alert>
              )}
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
              <div className='actions'>
                <input type="submit" value="Login" />
                <button className='secondary' onClick={this.handleSignUp}>Sign Up</button>
              </div>
            </form>
          </div>
        </section>
      </Layout>
    )
  }
})
