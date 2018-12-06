import React, { Component } from 'react'
import Layout from '../../components/Layout'
import Alert from '../../components/Alert'
import camelcase from 'camelcase'
import { withRouter } from 'react-router-dom'
import worker from '../../api/worker';
import employer from '../../api/employer';
import location from '../../api/location';
import qualityassurance from '../../api/qualityAssurance';
import auth from '../../api/auth';

const api = { worker, employer, qualityassurance }

export default withRouter(class ChangeProfile extends Component {
  state = {
    firstName: "",
    lastName: '',
    email: '',
    username: '',
    type: '',
    error: null,
    country: '',
    city: '',
    zipCode: '',
    primaryLine: '',
    secondaryLine: ''
  };

  fields = [
    //["label", "Type", Validation method]
    ["First name", "text", v => v.length > 0],
    ["Last name", "text", v => v.length > 0],
    ["Email", "email", v => (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(v)], // eslint-disable-line
    ["Username", "text", v => v.length > 0]
  ]

  locationFields = [
    //["label", "Type", Validation method]
    ["City", "text", v => v.length > 0],
    ["Zipcode", "number", v => v >= 0],
    ["Primary Line", "text", v => v.length > 0],
    ["Secondary Line", "text", v => v.length > 0]
  ]

  countries = [
    ["Denmark" , "Denmark"],
    ["Germany" ,"Germany"],
    ["USA" , "USA"],
    ["England" , "England"]
  ]

  /**
  * event listener for input
  * adds changes to this.state
  * @param  {Object} event
  */
  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  /**
   * event listener for Submit
   * validates all inputfields before sending a post request to the server
   * @param {Object} event
   */
  submitHandler = async event => {
    event.preventDefault();

    if (!this.validator()) {
      this.setState({ error: "Invalid input" })
      return
    }

    try {
      localStorage.removeItem('user')
      const res = await api[auth.type()].update({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        username: this.state.username,
        id: auth.id()
      });

      const locationUpdate = await location.update({
        country: this.state.country,
        city: this.state.city,
        zipCode: this.state.zipcode,
        primaryLine: this.state.primaryLine,
        secondaryLine: this.state.secondaryLine,
        userId: auth.id(),
        id: auth.id()
      });

      if(locationUpdate.error) {
        return this.setState({ error: locationUpdate.error })
      }

      if (res.error) {
        return this.setState({ error: res.error })
      }
    } catch (err) {
      this.setState({ error: err.message })
    }
  }

  /**
   * Checks if all input fields meets their specific requirements
   * @return {Boolean}
   */
  validator = () => {
    for (const [label, _, validator] of this.fields) { // eslint-disable-line
      if (!validator(this.state[camelcase(label)])) {
        return false;
      }
    }
    return true;
  }

  /**
  * Component setup
  */
  async componentDidMount() {
    await this.getUser()
    await this.getLocation()
  }

  /**
   * Get current authenticated user
   * @return {Promise}
   */
  getUser = async () => {
    this.setState(await auth.user())
  }

  /**
   * Get current location for the user
   * @return {Promise}
   */
  getLocation = async () => {
    this.setState(await location.get(auth.id()))
  }


  /**
   * Renders input fields based on definitions in fields[]
   * @param {String} label
   * @param {Mixed} type
   * @param {Method} validator
   * @param {boolean} isTextArea
   * @return {JSX} an input surrounded with a label
   */
  fieldRender([label, type, validator]) {
    const name = camelcase(label);
    return (
      <label key={name}>
        {label}
        <input
          name={name}
          type={type}
          defaultValue={this.state[name]}
          onChange={this.changeHandler}
          className={validator(this.state[name]) ? "valid" : ""}
          required
        />
      </label>
    )
  }

  /**
  * Render options item
  * @param  {Array}
  * @return {JSX}
  */
  renderOption = ([option, name]) => (
    <option key={option} defaultValue={this.state[name]} value={option}>{name}</option>
  )

  handleSelectChange = async event => {
    await this.setState({ country: event.target.value })
  }

  render() {
    return (
      <Layout>
        <section>
          <h2>Change profile</h2>
          {this.state.error && (
            <Alert>{this.state.error} </Alert>
          )}
          <form onSubmit={this.submitHandler}>
            {this.fields.map(this.fieldRender.bind(this))}
            <label>
            Country
            <select value={this.state.country} onChange={this.handleSelectChange}>
              {this.countries.map(this.renderOption.bind(this))}
            </select>
            </label>
            {this.locationFields.map(this.fieldRender.bind(this))}
          </form>
          <input type="submit" value="Change profile" onClick={this.submitHandler} />
        </section>
      </Layout>
    )
  }
})
