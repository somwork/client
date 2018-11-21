import React, { Component } from 'react'
import Layout from '../../components/Layout'
import task from '../../api/task'
import DatePicker from '../../components/DatePicker'
import moment from 'moment'
import Alert from '../../components/Alert'
import { withRouter } from 'react-router-dom'
import camelcase from 'camelcase'

export default withRouter(class Create extends Component {
  state = {
    startDate: moment(),
    endDate: moment(),
    title: "",
    description: "",
    urgency: "",
    error: null
  }

  fields = [
    //["label", "Type", Validation method]
    ["Title", "text", v => v.length > 0, false],
    ["Description", "text", v => v.length > 0, true],
    ["Urgency", "text", v => v.length > 0, false]
  ]

  updateHandler = async event => {
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
        urgency: this.state.urgency,
        start: this.state.startDate.toDate(), //toDate() to convert moment()-date to standard JS-date, due to Superstruckt and server limitations
        deadline: this.state.endDate.toDate() //toDate() to convert moment()-date to standard JS-date, due to Superstruckt and server limitations
      }
      await task.update(this.props.match.params.id, taskData)
      this.props.history.push('/tasks')
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

  componentDidMount = () => {
    this.getTask()
  }

  /**
   * Gets Task arguments and Setstate
   */
  getTask = async () => {
    const task = await task.get(this.props.match.params.id);
    this.setState({
      title: task.title,
      description: task.description,
      urgency: task.urgency,
      startDate: task.startDate,
      endDate: task.endDate,
    })
  }

  /**
   * Sets the selected  date
   * @param {Date} date
   */
  updateStartDate = (date) => {
    this.setState({
      startDate: date,
      endDate: date,
    })

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
          <h2>Task</h2>
          {this.state.error && (
            <Alert>{this.state.error} </Alert>
          )}
          <form onUpdate={this.updateHandler}>
            {this.fields.map(this.fieldRender.bind(this))}
            <label>
              Starting Date
            <DatePicker onChange={this.updateStartDate} minDate={moment()} selected={this.state.startDate} />
            </label>
            <label>
              Deadline
            <DatePicker onChange={this.updateEndDate} minDate={this.state.startDate} selected={this.state.endDate} />
            </label>
          </form>
          <input type="Update" value="Update" onClick={this.UpdateHandler} />
        </section>
      </Layout>
    )
  }
})
