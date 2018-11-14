import React,{Component} from "react";
import Layout from '../../components/Layout';
import camelcase from 'camelcase';
<<<<<<< HEAD
import serverApi from '../../api/worker';

export default class SignUp extends Component{

  constructor(props){
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username:'',
      password:'',
      verifyPassword:''
    };
  }
=======
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
>>>>>>> master

  fields = [
    //["label", "Type", Validation method]
    ["First name","text", v => v.length > 0],
    ["Last name","text", v => v.length > 0],
    ["Email","email", v => (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(v)], // eslint-disable-line],
    ["Username","text", v => v.length > 0],
    ["Password","password", v => v.length >= 8],
    ["Verify password","password", v => v === this.state.password && v.length>=8]
  ]
<<<<<<< HEAD
 /**
   * event listener for <input/>'s
   * adds changes to this.state
   * @param  {event}
=======

  /**
   * event listener for input
   * adds changes to this.state
   * @param  {Object} event
>>>>>>> master
   */
  changeHandler = event => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }
<<<<<<< HEAD
/**
   * event listener for <Submit/>
   * validates all inputfields before sending a post request to the server
   * @param {event}
   */
  submitHandler= event =>{
=======

  /**
   * event listener for Submit
   * validates all inputfields before sending a post request to the server
   * @param {Object} event
   */
  submitHandler= async event =>{
>>>>>>> master
    event.preventDefault();

    if(!this.validator()){
      //invalid input
      return false;
    }
<<<<<<< HEAD
    const response = serverApi.post(this.state);
=======
    await worker.create(this.state);
>>>>>>> master
  }

  /**
   * Checks if all input fields meets their specific requirements
<<<<<<< HEAD
   * @return {boolean}
=======
   * @return {Boolean}
>>>>>>> master
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
<<<<<<< HEAD
   * @return {HTML} <label><input/><label/>
=======
   * @return {JSX} an input surrounded with a label
>>>>>>> master
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

<<<<<<< HEAD
    /**
   * Creates the signUp view
   * @return {HTML} View
=======
  /**
   * Creates the signUp view
   * @return {JSX} View
>>>>>>> master
   */
  render(){
    return (
      <Layout>
        <h1>Sign Up</h1>
        <form onSubmit={this.submitHandler}>
          {this.fields.map(this.fieldRender.bind(this))}
          <input type="submit" value="Submit"/>
        </form>
      </Layout>
    )
  }
}
