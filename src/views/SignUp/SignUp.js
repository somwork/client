import React,{Component} from "react";
import Layout from '../../components/Layout';
import camelcase from 'camelcase';
import worker from '../../api/worker';

export default class SignUp extends Component{

  state = {
    firstName: '',
    lastName: '',
    email: '',
    username:'',
    password:'',
    verifyPassword:''
  };

  fields = [
    //["label", "Type", Validation method]
    ["First name","text", v => v.length > 0],
    ["Last name","text", v => v.length > 0],
    ["Email","email", v => (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(v)], // eslint-disable-line],
    ["Username","text", v => v.length > 0],
    ["Password","password", v => v.length >= 8],
    ["Verify password","password", v => v === this.state.password && v.length>=8]
  ]

  /**
   * event listener for input
   * adds changes to this.state
   * @param  {Object} event
   */
  changeHandler = event => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  /**
   * event listener for Submit
   * validates all inputfields before sending a post request to the server
   * @param {Object} event
   */
  submitHandler= async event =>{
    event.preventDefault();

    if(!this.validator()){
      //invalid input
      return false;
    }
    await worker.create(this.state);
  }

  /**
   * Checks if all input fields meets their specific requirements
   * @return {Boolean}
   */
  validator = () =>{
    for(const [label,_,validator] of this.fields){
      if(!validator(this.state[camelcase(label)])){
        return false;
      }
    }
    return true;
  }

  /**
   * Constructor for an inputfield
   * @param {String} label
   * @param {Mixed} type
   * @param {Method} validator
   * @return {JSX} an input surrounded with a label
   */
  fieldRender([label,type,validator]){
   const name = camelcase(label);
    return(
      <label key = {name}>
        {label}
        <input
          name={name}
          type={type}
          value={this.state[name]}
          onChange={this.changeHandler}
          className={validator(this.state[name]) ? "valid": ""}
          required
        />
      </label>
    )
  }

  /**
   * Creates the signUp view
   * @return {JSX} View
   */
  render(){
    return (
      <Layout hideSideBar>
        <section>
          <h1>Sign Up</h1>
          <form onSubmit={this.submitHandler}>
            {this.fields.map(this.fieldRender.bind(this))}
            <input type="submit" value="Submit"/>
          </form>
        </section>
      </Layout>
    )
  }
}
