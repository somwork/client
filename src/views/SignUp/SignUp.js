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

    this.handleSubmitFields = this.handleSubmitFields.bind(this);
    this.VerifyString = this.VerifyString.bind(this);
    this.VerifyEmail = this.VerifyEmail.bind(this);
    this.verifyPassword = this.verifyPassword.bind(this);
    this.comparePassword = this.comparePassword.bind(this);
  }

  handleSubmitFields(event) {

    if(this.state.includes(null)){
      return;
    }

    var url = 'https://localhost:5001/api/workers/';

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
    event.preventDefault();
  }

  VerifyString({ target }) {
    const {name} = target;
    if(name.length<=0){
      console.log('is empty')
      return;
    }
    console.log(name+' exsists')

    this.setState({
      [name]: target.value
    });
  }

  VerifyEmail({ target }) {
    const {name} = target;
    if(!target.value.includes('@')){
      console.log('email needs @')
      return;
    }
    console.log('email contains @')

    if(!target.value.includes('.')){
      console.log('email does not contain dot( . )')
      return;
    }
    console.log('email contaions dot( . )')

      this.setState({
        [name]: target.value
      });

  }

  verifyPassword({ target }) {
    const {name} = target;

    if(target.value.length<8) {
      console.log('password to short')
      return;
    }
    console.log('password length ok')

    this.setState({
      [name]: target.value
    });
  }

  comparePassword({ target }) {
    const {name} = target;

    if(this.state.password!==target.value) {
      console.log('password do not match')
      return;
    }
    console.log('password match')

    this.setState({
      [name]: target.value
    });
  }

  render(){
    return (
      <Layout>
        <h1>Sign up</h1>
          <form onSubmit={this.handleSubmitFields}>
            <label>
              First Name
              <input type="text" name="firstname" onChange={this.VerifyString} required/>
            </label>

            <label>
              Last Name
              <input type="text" name="lastname" onChange={this.VerifyString} required/>
            </label>

            <label>
              Email
              <input type="email" name="email" onChange={this.VerifyEmail} required/>
            </label>

            <label>
              Username
              <input type="username" name="username" onChange={this.VerifyString} required/>
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
