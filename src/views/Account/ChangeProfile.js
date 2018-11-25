import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Layout from '../../components/Layout';
import Alert from '../../components/Alert';
import camelcase from 'camelcase';
import worker from '../../api/worker';
import employer from '../../api/employer';
import auth from '../../api/auth';

const api = { worker, employer }

export default withRouter(class SignUp extends Component {
  state = {
    user: {
      firstName: "",
      lastName: '',
      email: '',
      username: '',
    },
    type: '',
    error: null
  };

  fields = [
    //["label", "Type", Validation method]
    ["First name", "text", v => v.length > 0],
    ["Last name", "text", v => v.length > 0],
    ["Email", "email", v => (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(v)], // eslint-disable-line
    ["Username", "text", v => v.length > 0]
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
      const res = await api[this.state.type].update(this.state.user);

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
  componentDidMount() {
    console.log("DidMount")
    this.getUser()
  }

  /**
   * Get current authenticated user
   * @return {Promise}
   */
  getUser = async () => {
    console.log("getUser")
    const userType = auth.type()
    if (userType === 'worker') {
      console.log("worker")
      this.setState({ user: await worker.get(auth.id()) })
      this.setState({ type: await userType })
      return
    }

    if (userType === 'employer') {
      this.setState({ user: await employer.get(auth.id()) })
      this.setState({ type: await userType })
      return
    }
  }

  /**
 * Constructor for an inputfield
 * @param {String} label
 * @param {Mixed} type
 * @param {Method} validator
 * @return {JSX} an input surrounded with a label
 */
  fieldRender([label, type, validator]) {
    console.log("fieldrender " + label)
    const name = camelcase(label);
    return (
      <label key={name}>
        {label}
        <input
          name={name}
          type={type}
          value={this.state[name]}
          onChange={this.changeHandler}
          //className={validator(this.state[name]) ? "valid" : ""}
          required
        />
      </label>
    )
  }

  /**
  * Creates the signUp view
  * @return {JSX} View
  */
  render() {
    return (
      <Layout hideSideBar>
        <section className="sign-up">
          <form onSubmit={this.submitHandler}>
            <h1>Change profile</h1>
            {this.state.error && (
              <Alert>{this.state.error}</Alert>
            )}
            {this.fields.map(this.fieldRender.bind(this))}
            <input type="submit" value="Submit" />
          </form>
        </section>
      </Layout>
    )
  }
})
