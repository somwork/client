import React,{Component} from "react";
import camelcase from 'camelcase'
import Layout from '../../components/Layout';

export default class SignUp extends Component{
  state = {
    firstName: '',
    lastName: '',
    email: '',
    username:'',
    password:'',
    verifyPassword: ''
  }

  fields = [
    ["First Name", "text", v => v.length > 0],
    ["Last Name", "text", v => v.length > 0],
    ["Email", "email", v => (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(v)], // eslint-disable-line
    ["Username", "text", v => v.length > 0],
    ["Password", "password", v => v.length > 0 && this.state.verifyPassword === v],
    ["Verify Password", "password", v => v.length > 0 && this.state.password === v],
  ]

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  validate = () => {
    for (const [label, _, validator] of this.fields) {
      if (!validator(this.state[camelcase(label)])) {
        return false
      }
    }

    return true
  }

  submitHandler = event => {
    event.preventDefault()

    if (!this.validate()) {
      alert("Invalid input...")
      return
    }

    // do fetch stuff
  }

  render () {
    return (
      <Layout>
        <h1>Sign Up</h1>
        <form onSubmit={this.submitHandler}>
          {this.fields.map(this.renderField.bind(this))}
          <input type="submit" value="Submit" />
        </form>
      </Layout>
    )
  }

  renderField ([label, type, validator]) {
    const name = camelcase(label)
    return (
      <label key={name}>
        {label}
        <input
          type={type}
          name={name}
          className={validator(this.state[name]) ? "valid" : ""}
          onChange={this.changeHandler}
          value={this.state[name]}
          required
        />
      </label>
    )
  }
}
