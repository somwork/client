import React,{Component} from "react";
import Layout from '../../components/Layout';

export default class SignUp extends Component{

  constructor(props) {
    super(props);
    this.state = {
      data: { firstName: '',Lastname: '', email: '', username:'',password:''},
      validation: { validFirstName: false,validLastName: false, validEmail: false, validUsername: false, validPassword: false}
    };

    this.handleSubmitFields = this.handleSubmitFields.bind(this);
    this.verifyString = this.verifyString.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.verifyPassword = this.verifyPassword.bind(this);
    this.comparePassword = this.comparePassword.bind(this);
  }

  addToState(name,value){
  const newState = { ...this.state }
  newState.data[name] = value
  this.setState(newState);
  }

  async handleSubmitFields(event) {
    event.preventDefault();

    for(const isValid in this.state.validation){
      if (!isValid) {
        return;
      }
    }

    const url = 'https://localhost:5001/api/workers/';

    const result = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(this.state.data),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    const serverResponds = await result.json()
  }

  verifyString({ target }) {
    const {name} = target;
    if(name.length<=0){
      return;
    }
    this.addToState(name,target.value);
  }

  verifyEmail({ target }) {
    const {name} = target;
    const test = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)\|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])\|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!test.test(target.value)){
      return;
    }
    this.addToState(name,target.value);
  }

  verifyPassword({ target }){
    if(target.value.length<8) {
      return;
    }
  }

  comparePassword({ target }) {
    const {name} = target;

    if(this.state.password!==target.value) {
      return;
    }
    this.addToState(name,target.value);
  }

  render(){
    return (
      <Layout>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmitFields}>
          <label>
            First Name
            <input type="text" name="firstname" onChange={this.verifyString} required/>
          </label>

          <label>
            Last Name
            <input type="text" name="lastname" onChange={this.verifyString} required/>
          </label>

          <label>
            Email
            <input type="email" name="email" onChange={this.verifyEmail} required/>
          </label>

          <label>
            Username
            <input type="username" name="username" onChange={this.verifyString} required/>
          </label>

          <label>
            Password
            <input type="password" name="password" min="8" onChange={this.verifyPassword} required/>
          </label>

          <label>
            Verify Password
            <input type="password" name="verifyPassword"  min="8" onChange={this.comparePassword} required/>
          </label>

          <label>
            <input type="submit" value="Submit" />
          </label>
        </form>
      </Layout>
    )
  }
}
