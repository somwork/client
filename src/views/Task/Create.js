import React, { Component } from 'react'
import Layout from '../../components/Layout'
import task from '../../api/task'
import DatePicker from '../../components/DatePicker'
import moment from 'moment'

export default class Create extends Component {

  state = {
    startDate: moment(),
    endDate: moment(),
    title: null,
    description: null,
    urgency: null
  }


  /**
   * Creates task based on data in inputfields
   */
  createTaskOnClick = () => {
      const taskData = {
        title: this.state.title,
        description: this.state.description,
        urgency: this.state.urgency,
        startDate: this.state.startDate,
        endDate: this.state.endDate
      }

      task.create(taskData)
      //Redirect to users task-overview
  }

  /**
   * Validate data in inputfields
   */

  validateInput() {
    //TODO

  }

  /**
   * Sets the selected  date
   */
  updateStartDate = (date) => {
    this.setState({ startDate: date })
  }

  /**
   * Sets selected date of deadline
   */
  updateEndDate = (date) => {
    this.setState({ endDate: date })

  }

  /**
   * Sets state data when changes are made in text-inputs
   */
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })

  }

  render() {
    return (
      <Layout>
        <h2>Create Task</h2>
        <label>
          Title
      <input type="text" onChange={this.handleChange} name="title" />
        </label>
        <label>
          Starting Date
      <DatePicker onChange={this.updateStartDate} minDate={moment()} selected={this.state.startDate} />
        </label>
        <label>
          Deadline
      <DatePicker onChange={this.updateEndDate} minDate={this.state.startDate} selected={this.state.endDate} />
        </label>
        <label>
          Description
      <textarea onChange={this.handleChange} name="description"></textarea>
        </label>
        <label>
          Urgency
      <input type="text" onChange={this.handleChange} name="urgency" />
        </label>
        <input type="submit" value="Create Task" onClick={this.createTaskOnClick} />
      </Layout>
    )
  }
}
