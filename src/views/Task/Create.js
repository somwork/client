import React, { Component } from 'react'
import Layout from '../../components/Layout'
import task from '../../api/task'
import DatePicker from '../../components/DatePicker'
import moment from 'moment'
import Alert from '../../components/Alert'
import camelcase from 'camelcase'
import { withRouter } from 'react-router-dom'
import './Task.css'

export default withRouter(class Create extends Component {
  state = {
    startDate: moment(),
    endDate: moment(),
    title: "",
    description: "",
    urgencystring: 'norush', //Basic value in radio togglegroup, setting it ensures something is selected
    error: null
  }

  fields = [
    //["label", "Type", Validation method, isTextArea]
    ["Title", "text", v => v.length > 0, false],
    ["Description", "text", v => v.length > 0, true],
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
      const taskData = {
        title: this.state.title,
        description: this.state.description,
        urgencystring: this.state.urgencystring,
        start: this.state.startDate.toDate(), //toDate() to convert moment()-date to standard JS-date, due to Superstruckt and server limitations
        deadline: this.state.endDate.toDate() //toDate() to convert moment()-date to standard JS-date, due to Superstruckt and server limitations
      }
      await task.create(taskData)
      this.props.history.push('/task/list')
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
   * Sets the selected  date
   * @param {Date} date
   */
  updateStartDate = (date) => {
    this.setState({ startDate: date })
    this.setState({ endDate: date })
  }

  /**
   * Sets selected date of deadline
   * @param {Date} date
   */
  updateEndDate = (date) => {
    this.setState({ endDate: date })

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
          <h2>Create Task</h2>
          {this.state.error && (
            <Alert>{this.state.error} </Alert>
          )}
          <form onSubmit={this.submitHandler}>
            {this.fields.map(this.fieldRender.bind(this))}
            <label>
              Starting Date
              <DatePicker onChange={this.updateStartDate} minDate={moment()} selected={this.state.startDate} />
            </label>
            <label>
              Deadline
              <DatePicker onChange={this.updateEndDate} minDate={this.state.startDate} selected={this.state.endDate} />
            </label>
            <div>
              <label>
                Urgency
              <br/>
              <label>
                <input
                  type="radio"
                  name="urgencystring"
                  value="norush"
                  onChange={this.handleChange}
                  checked={this.state.urgencystring === 'norush'}
                  required
                />
                No Rush
              </label>
              <span/>
              <label>
                <input
                  type="radio"
                  name="urgencystring"
                  value="urgent"
                  onChange={this.handleChange}
                  checked={this.state.urgencystring === 'urgent'}
                  required
                />
                Urgent
              </label>
              <span/>
              <label>
                <input
                  type="radio"
                  name="urgencystring"
                  value="asap"
                  onChange={this.handleChange}
                  checked={this.state.urgencystring === 'asap'}
                  required
                />
                 ASAP
                 </label>
              </label>
            </div>
          </form>
          <input type="submit" value="Create Task" onClick={this.submitHandler} />
        </section>
      </Layout>
    )
  }
})
