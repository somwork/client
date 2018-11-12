import React,{Component} from "react";
import Layout from '../../components/Layout';

export default class SignUp extends Component{

  constructor(props){
    super(props);
    this.state = {
      data: { firstName: '',lastName: '', email: '', username:'',password:''},
      validation: { validFirstName: false,validLastName: false, validEmail: false, validUsername: false, validPassword: false,ValidsubmitClicked: false}
    };

    this.handleSubmitFields = this.handleSubmitFields.bind(this);
    this.verifyFirstName = this.verifyFirstName.bind(this);
    this.verifyLastName = this.verifyLastName.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.verifyUsername = this.verifyUsername.bind(this);
    this.verifyPassword = this.verifyPassword.bind(this);
    this.comparePassword = this.comparePassword.bind(this);
  }

  TestValidValidation(){
    console.log('Validation:')
    for (const isValid in this.state.validation){
    console.log(isValid+": "+this.state.validation[isValid]) // TEST
    }
  }

  TestValidData(){
    console.log('Data:')
    for (const isValid in this.state.data){
    console.log(isValid+": "+this.state.data[isValid]) // TEST
    }
  }

  addToStateData(name,value){
  const newState = {...this.state}
  newState.data[name] = value;
  this.setState(newState);
  }

  addToStateValidation(name,value){
    const newState = {...this.state}
    newState.validation[name] = value;
    this.setState(newState);
    }

  async handleSubmitFields(event){
    event.preventDefault();

    this.addToStateValidation('ValidsubmitClicked',true);

    this.TestValidValidation();//TEST
    //this.TestValidData();//TEST
    console.log("ValidsubmitClicked: "+this.state.validation['ValidsubmitClicked']);

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

  verifyFirstName( {target} ){
    const {name} = target;
    if(name.length<=0){
      this.addToStateValidation('validFirstName',false);
      return;
    }
    this.addToStateValidation('validFirstName',true);
    this.addToStateData(name,target.value);
  }

  verifyLastName({ target }) {
    const {name} = target;
    if(name.length<=0){
      this.addToStateValidation('validLastName',false);
      return;
    }
    this.addToStateValidation('validLastName',true);
    this.addToStateData(name,target.value);
  }

  verifyUsername({ target }) {
    const {name} = target;
    if(name.length<=0){
      this.addToStateValidation('validUsername',false);
      return;
    }
    this.addToStateValidation('validUsername',true);
    this.addToStateData(name,target.value);
  }

  verifyEmail({ target }) {
    const {name} = target;
    const test = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)\|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])\|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!test.test(target.value)){
      this.addToStateValidation('validEmail',false);
      return;
    }
    this.addToStateValidation('validEmail',true);
    this.addToStateData(name,target.value);
  }

  verifyPassword({ target }){
    const {name} = target;
    if(target.value.length<8) {

      this.addToStateValidation('validPassword',false);
      return;
    }
    this.addToStateData(name,target.value);
  }

  comparePassword({ target }) {
    const {name} = target;
    if(this.state.data.password!==target.value) {
      this.addToStateValidation('validPassword',false);
      return;
    }
    this.addToStateValidation('validPassword',true);
  }

  render(){
    return (
      <Layout>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmitFields}>
          <label>
            First Name
            <input className={(!this.state.validation.validFirstName && this.state.validation.submitClicked) ? "failed" : ""}
            type="text" name="firstName" onChange={this.verifyFirstName}  value={this.state.data.firstName} required/>
          </label>

          <label>
            Last Name
            <input className={(!this.state.validation.validLastName && this.state.validation.submitClicked) ? "failed" : ""}
            type="text" name="lastName" onChange={this.verifyLastName}  value={this.state.data.lastName} required/>
          </label>

          <label>
            Email
            <input className={(!this.state.validation.validEmail && this.state.validation.submitClicked) ? "failed" : ""}
            type="email" name="email" onChange={this.verifyEmail} value={this.state.data.email} required/>
          </label>

          <label>
            Username
            <input className={(!this.state.validation.validUsername && this.state.validation.submitClicked) ? "failed" : ""}
            type="username" name="username" onChange={this.verifyUsername} value={this.state.data.username} required/>
          </label>

          <label>
            Password
            <input className={(!this.state.validation.validPassword && this.state.validation.submitClicked) ? "failed" : ""}
            type="password" name="password" min="8" onChange={this.verifyPassword}  value={this.state.data.password} required/>
          </label>

          <label>
            Verify Password
            <input className={(!this.state.validation.validPassword && this.state.validation.submitClicked) ? "failed" : ""}
            type="password" name="verifyPassword"  min="8" onChange={this.comparePassword} required/>
          </label>

          <label>
            <input type="submit" value="Submit" />
          </label>
        </form>
      </Layout>
    )
  }
}
