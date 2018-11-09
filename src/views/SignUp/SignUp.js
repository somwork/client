import React,{Component} from "react";
import Layout from '../../components/Layout';

export default class SignUp extends Component{

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      Lastname: '',
      email: '',
      username:'',
      password:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitFields = this.handleSubmitFields.bind(this);
    this.verifyPassword = this.verifyPassword.bind(this);
  }

  handleChange({ target }) {
    const {name} = target;

    this.setState({
      [name]: target.value
    });
  }

  handleSubmitFields(event) {

    event.preventDefault();
  }

  verifyPassword(event) {
    if(this.state.password===event.target.value) {
      console.log('password valid')
      alert('Passwords match')
    }
  }

  render(){
    return (
      <Layout>
        <h1>Sign up</h1>
          <form onSubmit={this.handleSubmitFields}>
            <label>
              First Name
              <input type="text" name="firstname" onChange={this.handleChange} required/>
            </label>

            <label>
              Last Name
              <input type="text" name="lastname" onChange={this.handleChange} required/>
            </label>

            <label>
              Email
              <input type="email" name="email" onChange={this.handleChange} required/>
            </label>

            <label>
              Username
              <input type="username" name="username" onChange={this.handleChange} required/>
            </label>

             <label>
              Password
              <input type="password" name="password" min="8" onChange={this.handleChange} required/>
            </label>

            <label>
             Verify Password
              <input type="password" name="verifyPassword"  min="8" onChange={this.verifyPassword} required/>
            </label>

            <label>
              <input type="submit" value="Submit" />
            </label>
          </form>
      </Layout>
    )
  }
}
