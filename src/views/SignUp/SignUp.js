import React,{Component} from "react";
import Layout from '../../components/Layout';

export default class SignUp extends Component{
  render(){
    return (
      <Layout>
        <h1>Sign up</h1>
          <form>
            <label>
              First Name
              <input type="text" name="firstname" required/>
            </label>

            <label>
              Last Name
              <input type="text" name="lastname" required/>
            </label>

            <label>
              Email
              <input type="email" name="email" required/>
            </label>

            <label>
              Username
              <input type="username" name="sername" required/>
            </label>

             <label>
              Password
              <input type="password" name="password" min="8" required/>
            </label>

            <label>
             Verify Password
              <input type="password" name="verifyPassword"  min="8"  required/>
            </label>
          </form>
          <form>
          <label>
            <br></br>
            <input type="submit" value="Submit" />
          </label>
          </form>
      </Layout>
    )
  }
}
