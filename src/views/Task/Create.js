import React, { Component } from 'react'
import Layout from '../../components/Layout'
import task from '../../api/task'
import DatePicker from '../../components/DatePicker'
import moment from 'moment'

export default class Create extends Component {

  state = {
    startDate : moment(),
    endDate : null
  }


  createTaskOnClick = () => {
    // validateInput()
    this.getCurrentDateString()
  }

  validateInput() {

  }

  updateStartDate = (date) => {
    this.setState({startDate : date})
  }

  updateEndDate = (date) => {
    this.setState({endDate : date})

  }

  render() {
    return (
      <Layout>
        <h2>Create Task</h2>
        <label>
          Title
      <input type="text" />
        </label>
        <label>
          Starting Date
      <DatePicker  onChange={this.updateStartDate} minDate={moment()} selected={this.state.startDate} />
        </label>
        <label>
          Deadline
      <DatePicker onChange={this.updateEndDate} minDate={this.state.startDate} selected={this.state.endDate} />
        </label>
        <label>
          Description
      <textarea></textarea>
        </label>
        <label>
          Urgency
      <input type="text" />
        </label>
        <input type="submit" value="Create Task" onClick={this.createTaskOnClick} />
      </Layout>
    )
  }
}
