import React,{ Component } from "react";
import { withRouter } from "react-router-dom";
import Layout from '../../components/Layout';
import Alert from '../../components/Alert';
import camelcase from 'camelcase';
import worker from '../../api/worker';
import employer from '../../api/employer';
import './SignUp.css'

const api = { worker, employer }

export default withRouter(class SignUp extends Component{
  state = {
    firstName: '',
    lastName: '',
    email: '',
    username:'',
    password:'',
    verifyPassword:'',
    type: 'worker',
    error: null,
    country: 'Denmark',
    city: '',
    zipCode: '',
    primaryLine: '',
    secondaryLine: ''
  };

  fields = [
    //["label", "Type", Validation method]
    ["First name","text", v => v.length > 0],
    ["Last name","text", v => v.length > 0],
    ["Email","email", v => (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(v)], // eslint-disable-line
    ["Username","text", v => v.length > 0],
    ["City", "text", v => v.length > 0],
    ["Zipcode", "number", v => v >= 0],
    ["Primary Line", "text", v => v.length > 0],
    ["Secondary Line", "text", v => v.length >= 0, true],
    ["Password","password", v => v.length >= 8],
    ["Verify password","password", v => v === this.state.password && v.length >= 8]
  ]

  countries = [
    ["Denmark"],
    ["Germany"],
    ["USA"],
    ["England"]
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
      this.setState({ error: "Invalid input" })
      return
    }

    try {
      const res = await api[this.state.type].create({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      }, {
        country: this.state.country,
        city: this.state.city,
        zipCode: this.state.zipcode,
        primaryLine: this.state.primaryLine,
        secondaryLine: this.state.secondaryLine
      });

      if (res.error) {
        return this.setState({ error: res.error })
      }

      this.props.history.push('/login')
    } catch(err) {
      this.setState({ error: err.message })
    }
  }

  /**
   * Checks if all input fields meets their specific requirements
   * @return {Boolean}
   */
  validator = () =>{
    for (const [label, _, validator] of this.fields) { // eslint-disable-line
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
  fieldRender([label,type,validator, ignore]){
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
          required = {!ignore}
        />
      </label>
    )
  }

  /**
  * Render options item
  * @param  {Array}
  * @return {JSX}
  */
  renderOption = ([name]) => (
    <option key={name} defaultValue={this.state[name]} value={name}>{name}</option>
  )

  handleSelectChange = async event => {
    await this.setState({ country: event.target.value })
  }

  /**
   * Creates the signUp view
   * @return {JSX} View
   */
  render(){
    return (
      <Layout hideSideBar>
        <section className="sign-up">
          <form onSubmit={this.submitHandler}>
            <h1>Sign Up</h1>
            {this.state.error && (
              <Alert>{this.state.error}</Alert>
            )}
            <label>
              <input
                name='type'
                type='radio'
                value='worker'
                onChange={this.changeHandler}
                checked={this.state.type === 'worker'}
                required
              /> Worker
            </label>
            <span />
            <label>
              <input
                name='type'
                type='radio'
                value='employer'
                onChange={this.changeHandler}
                checked={this.state.type === 'employer'}
                required
              /> Employer
            </label><br />
            <label>
            Country
            <select value={this.state.country} onChange={this.handleSelectChange}>
              {this.countries.map(this.renderOption.bind(this))}
            </select>
            </label>
            {this.fields.map(this.fieldRender.bind(this))}
            <input type="submit" value="Submit"/>
          </form>
        </section>
      </Layout>
    )
  }
})
