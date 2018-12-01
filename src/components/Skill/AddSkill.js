import React, { Component } from 'react'
import Layout from '../../components/Layout'
import skill from '../../api/skill'
import Alert from '../../components/Alert'
import camelcase from 'camelcase'
import { withRouter } from 'react-router-dom'

export default withRouter(class Create extends Component {
  state = {
    title: ''
  }

  fields = [
    //["label", "Type", Validation method, isTextArea]
    ["Title", "text", v => v.length > 0, false]
  ]

  /**
   * Creates task based on data in inputfields
   */
  submitHandler = async event => {
    event.preventDefault()
    //invalid input handling
    if (!this.validator()) {
      this.setState({ error: "Invalid input" })
      return
    }

    //input valid
    try {
      await skill.create({ title: this.state.title })
    } catch (e) {
      this.setState({ error: e.message })
    }
  }

  /**
   * Validates input based on validation method defined in Fields[]
   * @return {boolean}
   */
  validator = () => {
    for (const [label, _, validator] of this.fields) { // eslint-disable-line
      if (!validator(this.state[camelcase(label)])) {
        return false
      }
    }
    return true
  }

  /**
   * Renders input fields based on definitions in fields[]
   * @param {String} label
   * @param {Mixed} type
   * @param {Method} validator
   * @param {boolean} isTextArea
   * @return {JSX} an input surrounded with a label
   */
  fieldRender([label, type, validator, isTextArea]) {
    const name = camelcase(label);
    if (isTextArea === true) {
      return (
        <label key={name}>
          {label}
          <textarea
            name={name}
            value={this.state[name]}
            onChange={this.handleChange}
            className={validator(this.state[name]) ? "valid" : ""}
            required
          />
        </label>
      )
    }

    return (
      <label key={name}>
        {label}
        <input
          name={name}
          type={type}
          value={this.state[name]}
          onChange={this.handleChange}
          className={validator(this.state[name]) ? "valid" : ""}
          required
        />
      </label>
    )
  }

  /**
   * Sets state data when changes are made in text-inputs
   * @param {Event} event
   */
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })

  }

  render() {
    return (
      <Layout>
        <section>
          <h2>Create Skill</h2>
          {this.state.error && (
            <Alert>{this.state.error} </Alert>
          )}
          <form onSubmit={this.submitHandler}>
            {this.fields.map(this.fieldRender.bind(this))}
          </form>
          <input type="submit" value="Create Task" onClick={this.submitHandler} />
        </section>
      </Layout>
    )
  }
})
